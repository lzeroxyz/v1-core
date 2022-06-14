import { expect } from 'chai';
import { users } from '../utils';
import { goodKernelContract, reservationKernelContract } from './utils';

/**
 * Create good, service and voucher prerequisites in order to execute createReservation & cancelReservation tests.
 */
async function createPrerequisites() {
  await goodKernelContract.createGood({
    from: users.host.address,
    tokenUri: 'https://token-cdn.domain/{id}.json',
    acceptedTokens: [users.token1.address, users.token2.address],
  });

  await goodKernelContract.createGoodService({
    from: users.host.address,
    goodId: 1,
    capacity: 1,
    tokenUri: 'https://token-cdn.domain/{id}.json',
  });

  await goodKernelContract.createGoodServiceVoucher({
    from: users.host.address,
    goodId: 1,
    goodServiceId: 1,
    tokenUri: 'https://token-cdn.domain/{id}.json',
    start: Date.now(),
    end: Date.now() + 3600,
    destructionType: 0,
  });
}

export async function whenTheContractIsPaused() {
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
        tokenAddresses: [users.other1.address],
        tokenAmounts: [10],
        payers: [],
        guests: [],
      })
    ).to.be.revertedWith('Pausable: paused');
  });
}

export async function whenTheReservationIsNotFound() {
  it('Should revert', async () => {
    expect(
      reservationKernelContract.cancelReservation({
        from: users.client.address,
        reservationId: 1,
      })
    ).to.be.revertedWith('');
  });
}

export async function whenTheReservationIsNotInTheRightState() {
  beforeEach(async () => {
    await createPrerequisites();

    await reservationKernelContract.createReservation({
      from: users.client.address,
      goodOwner: users.host.address,
      goodId: 1,
      goodServiceId: 1,
      goodServiceVoucherIds: [1],
      tokenAddresses: [users.other1.address],
      tokenAmounts: [10],
      guests: [],
      payers: [],
    });
  });

  it('Should revert', async () => {
    expect(
      reservationKernelContract.cancelReservation({
        from: users.client.address,
        reservationId: 1,
      })
    ).to.be.revertedWith('RK025');
  });
}

export async function whenThePayerIsNotFound() {
  beforeEach(async () => {
    await createPrerequisites();

    await reservationKernelContract.createReservation({
      from: users.client.address,
      goodOwner: users.host.address,
      goodId: 1,
      goodServiceId: 1,
      goodServiceVoucherIds: [1],
      tokenAddresses: [users.other1.address],
      tokenAmounts: [10],
      guests: [],
      payers: [],
    });
  });

  it('Should revert', async () => {
    expect(
      reservationKernelContract.cancelReservation({
        from: users.attacker.address,
        reservationId: 1,
      })
    ).to.be.revertedWith('RK026');
  });
}

export async function whenThePayerIsNotInRightState() {
  beforeEach(async () => {
    await createPrerequisites();

    await reservationKernelContract.createReservation({
      from: users.client.address,
      goodOwner: users.host.address,
      goodId: 1,
      goodServiceId: 1,
      goodServiceVoucherIds: [1],
      tokenAddresses: [users.token1.address],
      tokenAmounts: [10],
      payers: [users.other1.address],
      guests: [],
    });
  });

  it('Should revert', async () => {
    expect(
      reservationKernelContract.cancelReservation({
        from: users.other1.address,
        reservationId: 1,
      })
    ).to.be.revertedWith('');
  });
}

export async function whenTheConditionsAreMet() {
  beforeEach(async () => {
    await createPrerequisites();

    await reservationKernelContract.createReservation({
      from: users.client.address,
      goodOwner: users.host.address,
      goodId: 1,
      goodServiceId: 1,
      goodServiceVoucherIds: [1],
      tokenAddresses: [users.token1.address],
      tokenAmounts: [10],
      payers: [users.other1.address],
      guests: [],
    });
  });

  it('Should burn a reservation token', async () => {
    expect(
      reservationKernelContract.cancelReservation({
        from: users.client.address,
        reservationId: 1,
      })
    ).to.emit('ReservationKernel', 'TransferSingle');
  });

  describe('When the payers count is 1', async () => {
    it('Should delete the cancelled reservation', async () => {
      expect(
        reservationKernelContract.cancelReservation({
          from: users.client.address,
          reservationId: 1,
        })
      ).to.emit('ReservationKernel', 'ReservationCancelled');
    });
  });

  describe('When the payers count is superior than 1', async () => {
    it('Should decrement the payers count', async () => {});

    it('Should decrement the guests count', async () => {});

    it('Should delete the cancelled payer', async () => {});

    it('Should set the reservation state to WaitingForPayment', async () => {});
  });

  it('Should unlock the funds', async () => {});

  it('Should emit a ReservationPayerCancelledEvent', async () => {});
}
