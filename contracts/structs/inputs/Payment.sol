// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../Good.sol";

struct LockFundsInput {
  address from;
  uint256 reservationId;
  address[] tokenAddresses;
  uint256[] amounts;
}

struct UnlockFundsInput {
  address from;
  uint256 reservationId;
  address[] tokenAddress;
  uint256[] amount;
}
