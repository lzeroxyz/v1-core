// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./utils/KernelUtils.sol";

import "./interfaces/ILZeroRouter.sol";
import "./interfaces/good/IGoodKernel.sol";

import "./structs/inputs/Reservation.sol";

contract LZeroRouter is Context, Ownable, Pausable, ILZeroRouter {
  using KernelUtils for address;

  address private _goodKernelAddress;

  constructor(address goodKernelAddress) {
    _goodKernelAddress = goodKernelAddress;
  }

  function createGood() external override returns (uint256) {
    return 0;
  }

  function createGoods() external override returns (uint256[] memory) {
    uint256[] memory x;

    return x;
  }

  function burnGood(uint256 id) external override {}

  function createReservation(CreateReservationInput calldata createReservationInput) external override {}

  function pause() public override onlyOwner {
    IGoodKernel(_goodKernelAddress).pause();

    _pause();
  }

  function unpause() public override onlyOwner {
    IGoodKernel(_goodKernelAddress).unpause();

    _unpause();
  }

  function setGoodKernel(address goodKernelAddress) public onlyOwner {
    require(goodKernelAddress.isValidKernel(), "LZeroRouter: New Kernel address is not a valid Kernel implementation");

    _goodKernelAddress = goodKernelAddress;

    if (paused()) {
      IGoodKernel(_goodKernelAddress).pause();
    }
  }
}
