// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../../interfaces/good/IGoodKernel.sol";

import "../../interfaces/payment/IPaymentKernel.sol";
import "../../interfaces/reservation/IReservationTokenFactory.sol";

import "../../structs/Reservation.sol";
import "../../structs/inputs/Reservation.sol";

library ReservationHelper {
  function create(
    mapping(uint256 => Reservation) storage reservations,
    CreateReservationInput calldata createReservationInput,
    address goodKernelAddress,
    address paymentKernelAddress
  ) public returns (uint256 mintedReservationId, uint256 mintedReservationAmount) {
    {
      IGoodKernel goodKernel = IGoodKernel(goodKernelAddress);

      try
        goodKernel.getGoodServiceVouchers(
          GetArrayGoodServiceVouchersInput(
            createReservationInput.goodOwner,
            createReservationInput.goodId,
            createReservationInput.goodServiceId,
            createReservationInput.goodServiceVoucherIds
          )
        )
      returns (GetArrayGoodServiceVouchersOutput memory output) {
        require(output.goodState == GoodState.Unpaused, "RK021");

        // Check if the reservation tokenAddresses are allowed in the goodAcceptedToken
        for (uint256 i = 0; i < createReservationInput.tokenAddresses.length - 1; i++) {
          require(createReservationInput.tokenAddresses[i] != address(0), "RK023");

          bool tokenAddressAccepted = false;

          for (uint256 j = 0; j < output.goodAcceptedTokens.length - 1; j++) {
            if (createReservationInput.tokenAddresses[i] == output.goodAcceptedTokens[j]) {
              tokenAddressAccepted = true;
              break;
            }
          }

          require(tokenAddressAccepted, "RK024");
        }

        require(output.goodServiceState == GoodServiceState.Unpaused, "RK022");

        require(
          createReservationInput.payers.length + createReservationInput.guests.length <= output.goodServiceCapacity,
          "ReservationKernel: Too many payers and guests"
        );

        for (uint256 i = 0; i <= createReservationInput.goodServiceVoucherIds.length - 1; i++) {
          require(output.goodServiceVoucherStates[i] == GoodServiceVoucherState.Available, "RK023");

          mintedReservationAmount += output.goodServiceVoucherAmounts[i];
        }

        // Check if the payer's token amounts are not superior than the limit
        {
          uint256 totalTokenAmounts;

          for (uint256 i = 0; i <= createReservationInput.tokenAmounts.length - 1; i++) {
            totalTokenAmounts += createReservationInput.tokenAmounts[i];
          }

          require(
            totalTokenAmounts ==
              (mintedReservationAmount / output.goodServiceCapacity) * 1 + createReservationInput.guests.length - 1,
            "RK024"
          );
        }
      } catch Error(string memory reason) {
        revert(reason);
      }
    }

    Reservation storage newReservation = reservations[mintedReservationId];

    newReservation.totalAmount = mintedReservationAmount;
    newReservation.goodOwner = createReservationInput.goodOwner;
    newReservation.goodId = createReservationInput.goodId;
    newReservation.goodServiceId = createReservationInput.goodServiceId;
    newReservation.goodServiceVoucherIds = createReservationInput.goodServiceVoucherIds;

    // Init the payers and guests counters in the state
    unchecked {
      newReservation.payersCount = createReservationInput.payers.length;
      newReservation.guestsCount = createReservationInput.guests.length;
    }

    // Init the payers in the state
    newReservation.payers[createReservationInput.from] = Payer(
      createReservationInput.from,
      PayerState.Payed,
      createReservationInput.tokenAddresses,
      createReservationInput.tokenAmounts,
      createReservationInput.guests
    );

    if (createReservationInput.payers.length >= 1) {
      for (uint256 i = 0; i <= createReservationInput.payers.length - 1; i++) {
        require(createReservationInput.payers[i] != address(0), "");

        if (createReservationInput.payers[i] == createReservationInput.from) continue;

        Payer storage payer = newReservation.payers[createReservationInput.payers[i]];

        payer.from = createReservationInput.payers[i];
        payer.state = PayerState.WaitingForPayment;
      }

      newReservation.state = ReservationState.WaitingForPayment;
    } else {
      newReservation.state = ReservationState.Pending;
    }

    // Lock the Payer's funds
    {
      IPaymentKernel paymentKernel = IPaymentKernel(paymentKernelAddress);

      paymentKernel.lockFunds(
        LockFundsInput(
          createReservationInput.from,
          mintedReservationId,
          createReservationInput.tokenAddresses,
          createReservationInput.tokenAmounts
        )
      );
    }
  }

  function cancel(
    mapping(uint256 => Reservation) storage reservations,
    CancelReservationInput calldata cancelReservationInput,
    address reservationTokenFactoryAddress,
    address paymentKernelAddress
  ) public {
    Reservation storage reservation = reservations[cancelReservationInput.reservationId];

    /**require(reservation.state != 0, ""); */

    require(
      reservation.state == ReservationState.WaitingForPayment ||
        reservation.state == ReservationState.Pending ||
        reservation.state == ReservationState.Confirmed,
      "RK025"
    );

    Payer storage payer = reservation.payers[cancelReservationInput.from];

    require(payer.state == PayerState.Payed, "");

    address reservationNftOwner = reservation.goodOwner;

    if (reservation.state == ReservationState.Confirmed) {
      reservationNftOwner = cancelReservationInput.from;
    }

    {
      IReservationTokenFactory reservationTokenFactory = IReservationTokenFactory(reservationTokenFactoryAddress);

      reservationTokenFactory.burn(reservationNftOwner, cancelReservationInput.reservationId, 1);
    }

    if (reservation.payersCount == 1) {
      delete reservations[cancelReservationInput.reservationId];
    } else {
      // Delete completely the payer from the reservation state
      reservation.payersCount -= 1;
      reservation.guestsCount -= payer.guests.length;
      delete reservation.payers[cancelReservationInput.from];

      reservation.state = ReservationState.WaitingForPayment;
    }

    // Unlock the Payer's Funds
    {
      IPaymentKernel paymentKernel = IPaymentKernel(paymentKernelAddress);

      paymentKernel.unlockFunds(
        UnlockFundsInput(
          cancelReservationInput.from,
          cancelReservationInput.reservationId,
          payer.tokenAddresses,
          payer.tokenAmounts
        )
      );
    }
  }

  function complete(mapping(uint256 => Reservation) storage reservations) public {}

  function acceptInvite(
    mapping(uint256 => Reservation) storage reservations,
    AcceptReservationInviteInput calldata acceptReservationInviteInput,
    address goodKernelAddress,
    address paymentKernelAddres
  ) public {
    Reservation storage reservation = reservations[acceptReservationInviteInput.reservationId];

    // require(reservation.id != 0, "RK010");

    require(reservation.state == ReservationState.WaitingForPayment, "RK020");

    Payer storage payer = reservation.payers[acceptReservationInviteInput.from];

    require(payer.from != address(0), "");

    require(payer.state == PayerState.WaitingForPayment, "");

    require(
      acceptReservationInviteInput.tokenAddresses.length == acceptReservationInviteInput.tokenAmounts.length,
      "RK024"
    );

    {
      IGoodKernel goodKernel = IGoodKernel(goodKernelAddress);

      try
        goodKernel.getGoodService(
          GetGoodServiceInput(reservation.goodOwner, reservation.goodId, reservation.goodServiceId)
        )
      returns (GetGoodServiceOutput memory output) {
        require(output.goodState == GoodState.Unpaused, "RK021");

        // Check if the reservation tokenAddresses are allowed in the goodAcceptedToken
        for (uint256 i = 0; i < acceptReservationInviteInput.tokenAddresses.length - 1; i++) {
          require(acceptReservationInviteInput.tokenAddresses[i] != address(0), "RK023");

          bool tokenAddressAccepted = false;

          for (uint256 j = 0; j < output.goodAcceptedTokens.length - 1; j++) {
            if (acceptReservationInviteInput.tokenAddresses[i] == output.goodAcceptedTokens[j]) {
              tokenAddressAccepted = true;
              break;
            }
          }

          require(tokenAddressAccepted, "RK024");
        }

        require(
          reservation.payersCount + reservation.guestsCount + acceptReservationInviteInput.guests.length <=
            output.goodServiceCapacity,
          "ReservationKernel: Too many payers and guests"
        );
      } catch Error(string memory reason) {
        revert(reason);
      }
    }

    payer.state = PayerState.Payed;
    payer.guests = acceptReservationInviteInput.guests;

    // Check if the request token amounts are not superior than the payer limit
    {
      uint256 totalTokenAmounts;

      for (uint256 i = 0; i <= acceptReservationInviteInput.tokenAmounts.length - 1; i++) {
        totalTokenAmounts += acceptReservationInviteInput.tokenAmounts[i];
      }

      require(
        totalTokenAmounts == reservation.totalAmount / 1 + acceptReservationInviteInput.guests.length - 1,
        "RK024"
      );
    }

    // Lock the Payer's funds
    {
      IPaymentKernel paymentKernel = IPaymentKernel(paymentKernelAddres);

      paymentKernel.lockFunds(
        LockFundsInput(
          acceptReservationInviteInput.from,
          acceptReservationInviteInput.reservationId,
          acceptReservationInviteInput.tokenAddresses,
          acceptReservationInviteInput.tokenAmounts
        )
      );
    }
  }

  function denyInvite(
    mapping(uint256 => Reservation) storage reservations,
    DenyReservationInviteInput calldata denyReservationInviteInput
  ) public {
    Reservation storage reservation = reservations[denyReservationInviteInput.reservationId];

    // require(reservation.id != 0, "RK010");

    require(reservation.state == ReservationState.WaitingForPayment, "RK020");

    Payer storage payer = reservation.payers[denyReservationInviteInput.from];

    require(payer.from != address(0), "");

    require(payer.state == PayerState.WaitingForPayment, "");

    // Delete completely the payer from the reservation state
    reservation.payersCount -= 1;
    reservation.guestsCount -= payer.guests.length;
    delete reservation.payers[denyReservationInviteInput.from];
  }

  function acceptReservation(
    mapping(uint256 => Reservation) storage reservations,
    AcceptReservationInput calldata acceptReservationInput
  ) public {
    Reservation storage reservation = reservations[acceptReservationInput.reservationId];

    // require(reservation.id != 0, "");

    require(reservation.goodOwner == acceptReservationInput.from, "");

    require(reservation.state == ReservationState.Pending, "");

    reservation.state = ReservationState.Confirmed;
  }

  function denyReservation(
    mapping(uint256 => Reservation) storage reservations,
    DenyReservationInput calldata denyReservationInput
  ) public {
    Reservation storage reservation = reservations[denyReservationInput.reservationId];

    // require(reservation.id != 0, "");

    require(reservation.goodOwner == denyReservationInput.from, "");

    require(reservation.state == ReservationState.Pending, "");

    // reservation.state = ReservationState.Denied;
  }
}
