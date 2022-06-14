// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../utils/TokenFactoryUtils.sol";

import "../interfaces/payment/IPaymentKernel.sol";

import "../structs/Payment.sol";
import "../structs/inputs/Payment.sol";

abstract contract PaymentKernel is Context, Ownable, IPaymentKernel {
  using TokenFactoryUtils for address;

  // reservationId:payerAddress:Payment
  mapping(uint256 => mapping(address => Payment)) _payments;

  constructor() {}

  function supportsInterface(bytes4 interfaceId) public pure override(IERC165) returns (bool) {
    return interfaceId == type(IPaymentKernel).interfaceId;
  }

  function lockFunds(LockFundsInput calldata lockFundsInput) external override {
    _payments[lockFundsInput.reservationId][lockFundsInput.from] = Payment(
      lockFundsInput.tokenAddresses,
      lockFundsInput.amounts
    );

    for (uint256 i = 0; i < lockFundsInput.tokenAddresses.length - 1; i++) {
      require(lockFundsInput.tokenAddresses[i] != address(0), "Token address cannot be 0");

      IERC20 tokenContract = IERC20(lockFundsInput.tokenAddresses[i]);

      require(tokenContract.balanceOf(lockFundsInput.from) >= lockFundsInput.amounts[i], "Not enough funds");

      require(
        tokenContract.allowance(lockFundsInput.from, address(this)) >= lockFundsInput.amounts[i],
        "Not enough allowance"
      );

      tokenContract.transferFrom(lockFundsInput.from, address(this), lockFundsInput.amounts[i]);
    }
  }

  function unlockFunds(UnlockFundsInput calldata unlockFundsInput) external override {
    Payment storage payment = _payments[unlockFundsInput.reservationId][unlockFundsInput.from];

    for (uint256 i = 0; i < payment.tokenAddresses.length - 1; i++) {
      require(payment.tokenAddresses[i] != address(0), "Token address cannot be 0");

      require(
        IERC165(payment.tokenAddresses[i]).supportsInterface(type(IERC20).interfaceId),
        "Token address does not implement IERC20"
      );

      IERC20 tokenContract = IERC20(payment.tokenAddresses[i]);

      tokenContract.transferFrom(address(this), unlockFundsInput.from, payment.amounts[i]);
    }
  }
}
