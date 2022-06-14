// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

struct CreateReservationInput {
  address goodOwner;
  uint256 goodId;
  uint256 goodServiceId;
  uint256[] goodServiceVoucherIds;
  address from;
  address[] tokenAddresses;
  uint256[] tokenAmounts;
  address[] payers;
  address[] guests;
}

struct CancelReservationInput {
  address from;
  uint256 reservationId;
}

struct AcceptReservationInviteInput {
  address from;
  uint256 reservationId;
  address[] tokenAddresses;
  uint256[] tokenAmounts;
  address[] guests;
}

struct DenyReservationInviteInput {
  address from;
  uint256 reservationId;
}

struct CompleteReservationInput {
  address from;
  uint256 reservationId;
  address[] tokenAddresses;
  uint256[] tokenAmounts;
}

struct AcceptReservationInput {
  address from;
  uint256 reservationId;
}

struct DenyReservationInput {
  address from;
  uint256 reservationId;
}
