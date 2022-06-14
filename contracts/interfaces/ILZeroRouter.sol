// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../structs/inputs/Reservation.sol";

interface ILZeroRouter {
  function createGood() external returns (uint256);

  function createGoods() external returns (uint256[] memory);

  function burnGood(uint256 id) external;

  function createReservation(CreateReservationInput calldata createReservationInput) external;

  function pause() external;

  function unpause() external;
}
