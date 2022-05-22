// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../../structs/Good.sol";
import "../../structs/inputs/Good.sol";

import "../../interfaces/good/IGoodTokenFactory.sol";
import "../../interfaces/good/IGoodServiceTokenFactory.sol";
import "../../interfaces/good/IGoodServiceVoucherTokenFactory.sol";

library GoodServiceHelper {
  function addVoucher(
    GoodService storage goodService,
    CreateGoodServiceVoucherInput memory createGoodServiceVoucherInput,
    address goodServiceVoucherTokenFactoryAddress
  ) public returns (uint256 mintedGoodServiceVoucherId) {
    require(
      createGoodServiceVoucherInput.start > block.timestamp,
      "GoodKernel: Unable to create a voucher with a start timestamp < to the current block timestamp"
    );

    IGoodServiceVoucherTokenFactory goodServiceVoucherTokenFactory = IGoodServiceVoucherTokenFactory(
      goodServiceVoucherTokenFactoryAddress
    );

    mintedGoodServiceVoucherId = goodServiceVoucherTokenFactory.mint(
      createGoodServiceVoucherInput.from,
      goodService.capacity,
      createGoodServiceVoucherInput.tokenUri
    );

    GoodServiceVoucher memory newGoodServiceVoucher;

    newGoodServiceVoucher.id = mintedGoodServiceVoucherId;
    newGoodServiceVoucher.start = createGoodServiceVoucherInput.start;
    newGoodServiceVoucher.end = createGoodServiceVoucherInput.end;
    newGoodServiceVoucher.state = GoodServiceVoucherState.Available;
    newGoodServiceVoucher.destructionType = createGoodServiceVoucherInput.destructionType;

    unchecked {
      uint256 localGoodServiceVoucherCount = goodService.vouchersCount + 1;

      goodService.vouchersCount = localGoodServiceVoucherCount;
    
      goodService.vouchers[localGoodServiceVoucherCount] = newGoodServiceVoucher;

      goodService.vouchersIds[mintedGoodServiceVoucherId] = localGoodServiceVoucherCount;
    }
  }

  function removeVoucher(
    GoodService storage goodService,
    GoodServiceVoucher storage goodServiceVoucher,
    address goodOwner,
    address goodServiceVoucherTokenFactoryAddress
  ) public {
    IGoodServiceVoucherTokenFactory goodVoucherTokenFactory = IGoodServiceVoucherTokenFactory(
      goodServiceVoucherTokenFactoryAddress
    );

    goodVoucherTokenFactory.burn(goodOwner, goodServiceVoucher.id, goodService.capacity);

    delete goodService.vouchers[goodService.vouchersIds[goodServiceVoucher.id]];
  }
}
