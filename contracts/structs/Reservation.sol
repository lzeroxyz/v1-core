// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

enum PayerState {
  WaitingForPayment,
  Payed
}

struct Payer {
  address from;
  PayerState state;
  address[] tokenAddresses;
  uint256[] tokenAmounts;
  address[] guests;
}

enum ReservationState {
  WaitingForPayment,
  Pending,
  Confirmed,
  Cancelled,
  Completed
}

struct Reservation {
  ReservationState state;
  uint256 totalAmount;
  address goodOwner;
  uint256 goodId;
  uint256 goodServiceId;
  uint256[] goodServiceVoucherIds;
  mapping(address => Payer) payers;
  uint256 payersCount;
  uint256 guestsCount;
}
