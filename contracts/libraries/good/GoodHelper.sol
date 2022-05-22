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
    address goodTokenFactoryAddress
  ) public {
    uint256 localGoodServicesCount = good.servicesCount;

    for (uint256 i; i < localGoodServicesCount; i++) {
      require(good.services[i].id != 0, "");
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
      uint256 localGoodServicesCount = good.servicesCount + 1;

      good.services[localGoodServicesCount].id = mintedGoodServiceId;
      good.services[localGoodServicesCount].capacity = createGoodServiceInput.capacity;
      good.services[localGoodServicesCount].state = mintedGoodServiceState;

      good.servicesIds[mintedGoodServiceId] = localGoodServicesCount;
    }
  }

  /// @param good The good to remove the Service from
  /// @param input The input to process the removal
  /// @param goodServiceId The id of the service to remove
  /// @param goodServiceTokenFactoryAddress The address of the GoodServiceTokenFactory
  function removeService(
    Good storage good,
    RemoveGoodServiceInput calldata input,
    uint256 goodServiceId,
    address goodServiceTokenFactoryAddress
  ) public {
    IGoodServiceTokenFactory goodServiceTokenFactory = IGoodServiceTokenFactory(goodServiceTokenFactoryAddress);

    goodServiceTokenFactory.burn(input.from, goodServiceId);

    delete good.services[goodServiceId];
  }
}
