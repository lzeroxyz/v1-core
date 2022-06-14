// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../globals/IKernel.sol";

import "../../structs/Reservation.sol";
import "../../structs/inputs/Reservation.sol";

interface IReservationKernel is IKernel {
  function createReservation(CreateReservationInput calldata createReservationInput)
    external
    returns (
      uint256 mintedReservationId,
      uint256 mintedReservationAmount,
      ReservationState mintedReservationState
    );

  function cancelReservation(CancelReservationInput calldata cancelReservationInput) external;

  function acceptReservationInvite(AcceptReservationInviteInput calldata acceptReservationInviteInput) external;

  function denyReservationInvite(DenyReservationInviteInput calldata denyReservationInviteInput) external;

  function acceptReservation(AcceptReservationInput calldata acceptReservationInput) external;

  function denyReservation(DenyReservationInput calldata denyReservationInput) external;

  /**
        function getReservation(address goodOwner, uint256 goodId, uint256 goodServiceId)
    external
    view
    returns(uint256 totalAmount, uint256 startVoucherId, uint256 endVoucherId, ReservationState state, address[] memory payers, address[] memory guests);

    function getReservations(address goodOwner, uint256 goodId, uint256 goodServiceId)
    external
    view
    returns(uint256[] memory ids, uint256[] memory totalAmounts, uint256[] memory startVoucherIds, uint256[] memory endVoucherIds, ReservationState[] memory states, address[] memory payers, address[] memory guests);

    function getReservations(address goodOwner, uint256 goodId, uint256 goodServiceId, uint256[] memory reservationIds)
    external
    view
    returns(uint256[] memory totalAmounts, uint256[] memory startVoucherIds, uint256[] memory endVoucherIds, ReservationState[] memory states, address[] memory payers, address[] memory guests);
 */

  function pause() external;

  function unpause() external;
}
