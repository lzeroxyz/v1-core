// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import '../../good/GoodKernel.sol';

contract GoodKernelMock is GoodKernel {
  constructor(
    address routerAddress,
    address goodTokenFactory,
    address goodServiceTokenFactory,
    address goodServiceVoucherTokenFactory
  )
    GoodKernel(
      routerAddress,
      goodTokenFactory,
      goodServiceTokenFactory,
      goodServiceVoucherTokenFactory
    )
  {}

  function createGood(CreateGoodInput calldata createGoodInput)
    external
    override
    returns (uint256, GoodState)
  {
    return (
      IGoodTokenFactory(_goodTokenFactory).mint(
        createGoodInput.from,
        createGoodInput.tokenUri
      ),
      GoodState.Paused
    );
  }

  function removeGood(RemoveGoodInput calldata removeGoodInput)
    external
    override
  {
    IGoodTokenFactory(_goodTokenFactory).burn(
      removeGoodInput.from,
      removeGoodInput.goodId
    );
  }

  function createGoodService(
    CreateGoodServiceInput calldata createGoodServiceInput
  ) external override returns (uint256, GoodServiceState) {
    return (
      IGoodServiceTokenFactory(_goodServiceTokenFactory).mint(
        createGoodServiceInput.from,
        createGoodServiceInput.tokenUri
      ),
      GoodServiceState.Paused
    );
  }

  function removeGoodService(
    RemoveGoodServiceInput calldata removeGoodServiceInput
  ) external override {
    IGoodServiceTokenFactory(_goodServiceTokenFactory).burn(
      removeGoodServiceInput.from,
      removeGoodServiceInput.goodServiceId
    );
  }

  function removeGoodServices(
    address from,
    uint256 goodId,
    uint256[] memory goodServiceIds
  ) external {
    IGoodServiceTokenFactory(_goodServiceTokenFactory).burnBatch(
      from,
      goodServiceIds
    );
  }

  function createGoodServiceVoucher(
    CreateGoodServiceVoucherInput calldata createGoodServiceVoucher
  ) external override returns (uint256) {
    return
      IGoodServiceVoucherTokenFactory(_goodServiceVoucherTokenFactory).mint(
        createGoodServiceVoucher.from,
        1,
        createGoodServiceVoucher.tokenUri
      );
  }

  function removeGoodServiceVoucher(
    RemoveGoodServiceVoucherInput calldata removeGoodServiceVoucher
  ) external override {
    IGoodServiceVoucherTokenFactory(_goodServiceVoucherTokenFactory).burn(
      removeGoodServiceVoucher.from,
      removeGoodServiceVoucher.goodServiceVoucherId,
      1
    );
  }

  function pause() public override {
    _pause();
  }

  function unpause() public override {
    _unpause();
  }
}
