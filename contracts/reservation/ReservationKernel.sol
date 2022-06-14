// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../utils/access/Ownable.sol";
import "../utils/security/Pausable.sol";

import "../libraries/reservation/ReservationHelper.sol";
import "../utils/TokenFactoryUtils.sol";
import "../utils/access/Routable.sol";

import "../interfaces/reservation/IReservationKernel.sol";
import "../interfaces/reservation/IReservationTokenFactory.sol";
import "../interfaces/good/IGoodKernel.sol";
import "../interfaces/payment/IPaymentKernel.sol";

import "../structs/Reservation.sol";
import "../structs/inputs/Reservation.sol";
import "../structs/inputs/Payment.sol";

contract ReservationKernel is Ownable, Pausable, Routable, IReservationKernel {
  using TokenFactoryUtils for address;
  using ReservationHelper for Reservation;

  address private _goodKernel;

  address private _paymentKernel;

  address private _reservationTokenFactory;

  /// @dev reservationId:Reservation
  mapping(uint256 => Reservation) private _reservations;

  event ReservationCreated();

  constructor(
    address routerAddress,
    address goodKernel,
    address reservationTokenFactory
  ) Routable(routerAddress) {
    _goodKernel = goodKernel;

    _reservationTokenFactory = reservationTokenFactory;
  }

  modifier onlyFromRouterOrOwner() {
    require(
      msg.sender == owner() || msg.sender == router(),
      "GoodKernel: Caller is not the owner or the Router contract"
    );
    _;
  }

  function supportsInterface(bytes4 interfaceId) public pure override(IERC165) returns (bool) {
    return interfaceId == type(IReservationKernel).interfaceId;
  }

  function createReservation(CreateReservationInput calldata createReservationInput)
    external
    override
    returns (
      uint256 mintedReservationId,
      uint256 mintedReservationAmount,
      ReservationState mintedReservationState
    )
  {
    (mintedReservationId, mintedReservationAmount) = ReservationHelper.create(
      _reservations,
      createReservationInput,
      _goodKernel,
      _paymentKernel
    );
  }

  function cancelReservation(CancelReservationInput calldata cancelReservationInput) external override {
    ReservationHelper.cancel(_reservations, cancelReservationInput, _reservationTokenFactory, _paymentKernel);
  }

  function acceptReservationInvite(AcceptReservationInviteInput calldata acceptReservationInviteInput)
    external
    override
  {
    ReservationHelper.acceptInvite(_reservations, acceptReservationInviteInput, _goodKernel, _paymentKernel);
  }

  function denyReservationInvite(DenyReservationInviteInput calldata denyReservationInviteInput) external override {
    ReservationHelper.denyInvite(_reservations, denyReservationInviteInput);
  }

  function acceptReservation(AcceptReservationInput calldata acceptReservationInput) external override {
    ReservationHelper.acceptReservation(_reservations, acceptReservationInput);
  }

  function denyReservation(DenyReservationInput calldata denyReservationInput) external override {
    ReservationHelper.denyReservation(_reservations, denyReservationInput);
  }

  function pause() public virtual override onlyFromRouterOrOwner {
    _pause();
  }

  function _pause() internal override {
    super._pause();
  }

  function unpause() public virtual override onlyFromRouterOrOwner {
    _unpause();
  }

  function _unpause() internal override {
    super._unpause();
  }
}
