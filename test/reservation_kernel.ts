import { expect } from 'chai';
import {
  whenTheConditionsAreMet as createReservationWhenTheConditionsAreMet,
  whenTheContractIsPaused as createReservationWhenTheContractIsPaused,
  whenTheGoodStateIsNotUnpaused as createReservationWhenTheGoodStateIsNotUnpaused,
  whenTheRequestedGoodDoesntExist as createReservationWhenTheRequestedGoodDoesntExist,
  whenTheRequestedGoodServiceDoesntExists as createReservationWhenTheRequestedGoodServiceDoesntExists,
  whenTheRequestedGoodServiceIsNotUnpaused as createReservationWhenTheRequestedGoodServiceIsNotUnpaused,
  whenTheRequestedGoodServiceVouchersAreNotUnpaused as createReservationWhenTheRequestedGoodServiceVouchersAreNotUnpaused,
  whenTheRequestedPayersAndGuestsAreSuperiorThanTheGoodServiceCapacity as createReservationWhenTheRequestedPayersAndGuestsAreSuperiorThanTheGoodServiceCapacity,
  whenTheRequestedTokenAmountsAreSuperiorThanTheAmountTheUserHasToPay as createReservationWhenTheRequestedTokenAmountsAreSuperiorThanTheAmountTheUserHasToPay,
  whenTheUserHasNotAllowedEnoughTokens as createReservationWhenTheUserHasNotAllowedEnoughTokens,
  whenTheUserHasNotEnoughFunds as createReservationWhenTheUserHasNotEnoughFunds,
} from './reservation_kernel/create_reservation';
import {
  deployContracts,
  prepareContracts,
  reservationKernelContract,
} from './reservation_kernel/utils';
import { createUsers, users } from './utils';

describe('ReservationKernel', async () => {
  beforeEach(async () => {
    await createUsers();

    await prepareContracts();

    await deployContracts();
  });

  describe('When the contract constructs', async () => {
    it('Should be unpaused', async () => {
      const currentPauseState = await reservationKernelContract.paused();

      expect(currentPauseState).to.be.false;
    });
  });

  describe('createReservation', () => {
    describe('When the contract is paused', async () => {
      await createReservationWhenTheContractIsPaused();
    });

    describe("When the requested good doesn't exist", async () => {
      await createReservationWhenTheRequestedGoodDoesntExist();
    });

    describe('When the good state is not unpaused', async () => {
      await createReservationWhenTheGoodStateIsNotUnpaused();
    });

    describe("When the requested good service doesn't exists", async () => {
      await createReservationWhenTheRequestedGoodServiceDoesntExists();
    });

    describe('When the requested good service is not unpaused', async () => {
      await createReservationWhenTheRequestedGoodServiceIsNotUnpaused();
    });

    describe('When the requested payers and guests are superior then the good service limit', async () => {
      await createReservationWhenTheRequestedPayersAndGuestsAreSuperiorThanTheGoodServiceCapacity();
    });

    describe('When the requested good service vouchers are not unpaused', async () => {
      await createReservationWhenTheRequestedGoodServiceVouchersAreNotUnpaused();
    });

    describe('When the requested token amounts are superior than the amount the user has to pay', async () => {
      await createReservationWhenTheRequestedTokenAmountsAreSuperiorThanTheAmountTheUserHasToPay();
    });

    describe('When the user has not enough funds', async () => {
      await createReservationWhenTheUserHasNotEnoughFunds();
    });

    describe('When the user has not allowed enough tokens', async () => {
      await createReservationWhenTheUserHasNotAllowedEnoughTokens();
    });

    describe('When the conditions are met', async () => {
      await createReservationWhenTheConditionsAreMet();
    });
  });

  describe('cancelReservation', async () => {
    beforeEach(async () => {
      await deployContracts();
    });

    describe('When the contract is paused', async () => {
      beforeEach(async () => {
        await reservationKernelContract.pause();
      });

      it('Should revert', async () => {
        expect(
          reservationKernelContract.createReservation({
            goodOwner: users.host.address,
            goodId: 1,
            goodServiceId: 1,
            goodServiceVoucherIds: [1],
            from: users.client.address,
            tokenAddress: users.client.address,
            tokenUri: 'https://token-cdn.domain/{id}.json',
            payers: [],
            guests: [],
          })
        ).to.be.revertedWith('Pausable: paused');
      });
    });

    describe("When the reservation doesn't exists", async () => {});

    describe('When the client is not a payer of the reservation', async () => {});

    describe('When the payer has not Payed', async () => {});

    describe('When the conditions are met', async () => {
      it('Should set the Payer state to Cancelled', async () => {});

      it('Should set the Reservation state to WaitingForPayment', async () => {});

      it('Should burn a Reservation NFT token', async () => {});

      it('Should unlock all of the founds locked for the current payer', async () => {});
    });
  });

  describe('acceptReservationInvite', async () => {
    // When the contract is paused
    describe('When the contract is paused', async () => {
      beforeEach(async () => {
        await reservationKernelContract.pause();
      });

      it('Should revert', async () => {
        expect(
          reservationKernelContract.acceptReservationInvite({
            from: users.client.address,
            tokenAddress: users.other1.address,
            reservationId: 1,
            guests: [],
          })
        ).to.be.revertedWith('Pausable: paused');
      });
    });

    // When the reservation doesn't exists
    describe("When the reservation doesn't exists", async () => {
      beforeEach(async () => {});

      it('Should revert', async () => {
        expect(
          reservationKernelContract.acceptReservationInvite({
            from: users.other1.address,
            tokenAddress: users.other2.address,
            reservationId: 1,
            guests: [],
          })
        ).to.be.revertedWith('RK010');
      });
    });

    // When the reservation is not in the WaitingForPayment State
    describe('When the reservation is not in the WaitingForPayment State', async () => {
      beforeEach(async () => {
        await reservationKernelContract.createReservation({
          goodOwner: users.host.address,
          goodId: 1,
          goodServiceId: 1,
          goodServiceVoucherIds: [1],
          from: users.client.address,
          tokenAddress: users.other2.address,
          tokenUri: 'https://token-cdn.domain/{id}.json',
          payers: [users.other1.address],
          guests: [],
        });
      });

      it('Should revert', async () => {
        expect(
          reservationKernelContract.acceptReservationInvite({
            from: users.other1.address,
            tokenAddress: users.other2.address,
            reservationId: 1,
            guests: [],
          })
        ).to.be.revertedWith('RK020');
      });
    });

    // When the payer doesn't exists
    describe('When the client is not registered as a payer', async () => {
      beforeEach(async () => {
        await reservationKernelContract.createReservation({
          goodOwner: users.host.address,
          goodId: 1,
          goodServiceId: 1,
          goodServiceVoucherIds: [1],
          from: users.client.address,
          tokenAddress: users.other2.address,
          tokenUri: 'https://token-cdn.domain/{id}.json',
          payers: [users.other1.address],
          guests: [],
        });
      });

      it('Should revert', async () => {
        expect(
          reservationKernelContract.acceptReservationInvite({
            from: users.other2.address,
            tokenAddress: users.other1.address,
            reservationId: 1,
            guests: [],
          })
        ).to.be.revertedWith('RK020');
      });
    });

    // When the payer is not in the WaitingForPayment State
    describe('When the payer is not in the WaitingForPayment State', async () => {
      beforeEach(async () => {
        await reservationKernelContract.createReservation({
          goodOwner: users.host.address,
          goodId: 1,
          goodServiceId: 1,
          goodServiceVoucherIds: [1],
          from: users.client.address,
          tokenAddress: users.other2.address,
          tokenUri: 'https://token-cdn.domain/{id}.json',
          payers: [users.other1.address],
          guests: [],
        });

        reservationKernelContract.acceptReservationInvite({
          from: users.other2.address,
          tokenAddress: users.other1.address,
          reservationId: 1,
          guests: [],
        });
      });

      it('Should revert', async () => {
        expect(
          reservationKernelContract.acceptReservationInvite({
            from: users.other2.address,
            tokenAddress: users.other1.address,
            reservationId: 1,
            guests: [],
          })
        ).to.be.revertedWith('RK020');
      });
    });

    describe('When the tokenAddresses and tokenAmounts mismatch', async () => {
      it('Should revert', async () => {});
    });

    // When the conditions are met
    describe('When the conditions are met', async () => {
      it('Should set the Payer state to Payed', async () => {});

      it('Should ');
    });
  });

  describe('denyReservationInvite', async () => {
    // When the contract is paused
    describe('When the contract is paused', async () => {
      beforeEach(async () => {
        await reservationKernelContract.pause();
      });

      it('Should revert', async () => {
        expect(
          reservationKernelContract.acceptReservationInvite({
            from: users.client.address,
            tokenAddress: users.other1.address,
            reservationId: 1,
            guests: [],
          })
        ).to.be.revertedWith('Pausable: paused');
      });
    });

    // When the reservation doesn't exists
    describe("When the reservation doesn't exists", async () => {
      beforeEach(async () => {});

      it('Should revert', async () => {
        expect(
          reservationKernelContract.acceptReservationInvite({
            from: users.other1.address,
            tokenAddress: users.other2.address,
            reservationId: 1,
            guests: [],
          })
        ).to.be.revertedWith('RK010');
      });
    });
  });

  describe('acceptReservation', async () => {
    beforeEach(async () => {
      await deployContracts();
    });

    describe('When the contract is paused', async () => {
      beforeEach(async () => {
        await reservationKernelContract.pause();
      });

      it('Should revert', async () => {
        //expect(reservationKernel.acceptReservation(1)).to.be.revertedWith('Pausable: paused');
      });
    });

    describe("When the reservation doesn't exists", async () => {
      it('Should revert', async () => {
        //expect(reservationKernel.acceptReservation(1)).to.be.revertedWith('ReservationKernel: Reservation does not exist');
      });
    });

    describe('When the reservation is already accepted', async () => {
      it('Should revert', async () => {
        //expect(reservationKernel.acceptReservation(1)).to.be.revertedWith('ReservationKernel: Reservation is already accepted');
      });
    });

    describe('When the reservation is already denied', async () => {
      it('Should revert', async () => {
        //expect(reservationKernel.acceptReservation(1)).to.be.revertedWith('ReservationKernel: Reservation is already denied');
      });
    });

    describe('When the founds are not fully completed', async () => {
      it('Should revert', async () => {});
    });

    describe('When the conditions are met', async () => {
      it('Should create a new Reservation Token', async () => {});
    });
  });

  describe('denyReservation', async () => {});

  describe('cancelReservation', async () => {});
});
