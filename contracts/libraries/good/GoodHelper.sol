// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../../structs/Good.sol";
import "../../structs/inputs/Good.sol";

import "../../interfaces/good/IGoodTokenFactory.sol";
import "../../interfaces/good/IGoodServiceTokenFactory.sol";
import "../../interfaces/good/IGoodServiceVoucherTokenFactory.sol";

library GoodHelper {
  function create(
    mapping(address => uint256) storage goodsCount,
    mapping(uint256 => Good) storage userGoods,
    mapping(uint256 => uint256) storage userGoodsIds,
    CreateGoodInput memory createGoodInput,
    address goodTokenFactoryAddress
  ) public returns (uint256 mintedGoodId, GoodState mintedGoodState) {
    IGoodTokenFactory goodTokenFactory = IGoodTokenFactory(goodTokenFactoryAddress);

    mintedGoodId = goodTokenFactory.mint(createGoodInput.from, createGoodInput.tokenUri);

    mintedGoodState = GoodState.Unpaused;

    unchecked {
      goodsCount[createGoodInput.from] += 1;
    }

    Good storage newGood = userGoods[goodsCount[createGoodInput.from]];

    newGood.id = mintedGoodId;
    newGood.state = mintedGoodState;
    newGood.acceptedTokens = createGoodInput.acceptedTokens;

    userGoodsIds[mintedGoodId] = goodsCount[createGoodInput.from];
  }

  function remove(
    mapping(uint256 => Good) storage userGoods,
    mapping(uint256 => uint256) storage userGoodsIds,
    Good storage good,
    RemoveGoodInput memory removeGoodInput,
    address goodTokenFactoryAddress,
    address goodServiceTokenFactoryAddress,
    address goodServiceVoucherTokenFactoryAddress
  ) public {
    IGoodServiceTokenFactory goodServiceTokenFactory = IGoodServiceTokenFactory(goodServiceTokenFactoryAddress);

    IGoodServiceVoucherTokenFactory goodServiceVoucherTokenFactory = IGoodServiceVoucherTokenFactory(
      goodServiceVoucherTokenFactoryAddress
    );

    if (good.servicesCount > 1) {
      uint256[] memory burnableGoodServiceIds;

      for (uint256 i = 0; i < good.servicesCount - 1; i++) {
        mapping(uint256 => GoodServiceVoucher) storage goodServiceVouchers = good.services[i].vouchers;

        uint256[] memory burnableServiceGoodVoucherIds;
        uint256[] memory burnableServiceGoodVoucherAmounts;

        if (good.services[i].vouchersCount > 1) {
          for (uint256 j = 0; i < good.services[i].vouchersCount - 1; i++) {
            if (good.services[i].vouchers[i].id == 0) continue;

            burnableServiceGoodVoucherIds[j] = goodServiceVouchers[j].id;

            burnableServiceGoodVoucherAmounts[j] = goodServiceVouchers[j].amount;
          }

          goodServiceVoucherTokenFactory.burnBatch(
            removeGoodInput.from,
            burnableServiceGoodVoucherIds,
            burnableServiceGoodVoucherAmounts
          );
        } else if (good.services[i].vouchersCount == 1) {
          goodServiceVoucherTokenFactory.burn(
            removeGoodInput.from,
            goodServiceVouchers[0].id,
            goodServiceVouchers[0].amount
          );
        }
      }

      goodServiceTokenFactory.burnBatch(removeGoodInput.from, burnableGoodServiceIds);
    } else if (good.servicesCount == 1) {
      goodServiceTokenFactory.burn(removeGoodInput.from, good.services[0].id);
    }

    delete userGoods[userGoodsIds[removeGoodInput.goodId]];

    IGoodTokenFactory goodTokenFactory = IGoodTokenFactory(goodTokenFactoryAddress);

    goodTokenFactory.burn(removeGoodInput.from, good.id);
  }

  function pause(Good storage good) public {
    // The good is already paused
    require(good.state == GoodState.Unpaused, "GK021");

    good.state = GoodState.Paused;
  }

  function unpause(Good storage good) public {
    // The good is already unpaused
    require(good.state == GoodState.Unpaused, "GK022");

    good.state = GoodState.Unpaused;
  }

  function addService(
    Good storage good,
    CreateGoodServiceInput memory createGoodServiceInput,
    address goodServiceTokenFactoryAddress
  ) public returns (uint256 mintedGoodServiceId, GoodServiceState mintedGoodServiceState) {
    IGoodServiceTokenFactory goodServiceTokenFactory = IGoodServiceTokenFactory(goodServiceTokenFactoryAddress);

    mintedGoodServiceId = goodServiceTokenFactory.mint(createGoodServiceInput.from, createGoodServiceInput.tokenUri);

    mintedGoodServiceState = GoodServiceState.Unpaused;

    unchecked {
      good.servicesCount += 1;
    }

    good.services[good.servicesCount].id = mintedGoodServiceId;
    good.services[good.servicesCount].capacity = createGoodServiceInput.capacity;
    good.services[good.servicesCount].state = mintedGoodServiceState;

    good.servicesIds[mintedGoodServiceId] = good.servicesCount;
  }

  function removeService(
    Good storage good,
    GoodService storage goodService,
    address goodOwner,
    address goodServiceTokenFactoryAddress
  ) public {
    // Unable to burn an unpaused good service
    require(goodService.state == GoodServiceState.Paused, "GK024");

    IGoodServiceTokenFactory goodServiceTokenFactory = IGoodServiceTokenFactory(goodServiceTokenFactoryAddress);

    goodServiceTokenFactory.burn(goodOwner, goodService.id);

    delete good.services[good.servicesIds[goodService.id]];
  }
}
