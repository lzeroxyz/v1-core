// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../globals/IKernel.sol";

import "../../structs/inputs/Payment.sol";

interface IPaymentKernel is IKernel {
  function lockFunds(LockFundsInput calldata lockFundsInput) external;

  function unlockFunds(UnlockFundsInput calldata unlockFundsInput) external;
}
