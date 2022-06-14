import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { beforeEach, it } from 'mocha';
import {
  getStorageMappingStructAddress,
  getStorageMappingStructProperty,
} from '../../helpers/contract-storage';
import { users } from '../utils';
import { goodKernelContract, reservationKernelContract } from './utils';

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

export async function whenTheRequestedGoodDoesntExist() {
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
    ).to.be.revertedWith('GK011');
  });
}

export async function whenTheGoodStateIsNotUnpaused() {
  beforeEach(async () => {
    await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });

    await goodKernelContract.pauseGood(users.client.address, 1);
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
    ).to.be.revertedWith('RK021');
  });
}

export async function whenTheRequestedTokenAddressesAreZeroAddresses() {
  beforeEach(async () => {
    await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address],
    });
  });

  it('Should revert', async () => {
    expect(
      reservationKernelContract.createReservation({
        goodOwner: users.host.address,
        goodId: 1,
        goodServiceId: 1,
        goodServiceVoucherIds: [1],
        from: users.client.address,
        tokenAddresses: ['0x0'],
        tokenAmounts: [10],
        payers: [],
        guests: [],
      })
    ).to.be.revertedWith('');
  });
}

export async function whenTheRequestedTokenAddressesAreNotAllowed() {
  beforeEach(async () => {
    await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address],
    });
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
    ).to.be.revertedWith('');
  });
}

export async function whenTheRequestedGoodServiceDoesntExists() {
  beforeEach(async () => {
    await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });
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
    ).to.be.revertedWith('GK012');
  });
}

export async function whenTheRequestedGoodServiceIsNotUnpaused() {
  beforeEach(async () => {
    await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });

    await goodKernelContract.createGoodService({
      from: users.client.address,
      goodId: 1,
      capacity: 10,
      tokenUri: 'https://token-cdn.domain/{id}.json',
    });

    await goodKernelContract.pauseGoodService({
      from: users.client.address,
      goodId: 1,
      goodServiceId: 1,
    });
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
    ).to.be.revertedWith('RK022');
  });
}

export async function whenTheRequestedPayersAndGuestsAreSuperiorThanTheGoodServiceCapacity() {
  beforeEach(async () => {
    await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });

    await goodKernelContract.createGoodService({
      from: users.client.address,
      goodId: 1,
      capacity: 1,
      tokenUri: 'https://token-cdn.domain/{id}.json',
    });
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
        payers: [users.other1.address, users.other2.address],
        guests: [users.other1.address, users.other2.address],
      })
    ).to.be.revertedWith('RK022');
  });
}

export async function whenTheRequestedGoodServiceVouchersAreNotUnpaused() {
  beforeEach(async () => {
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
    );
  });
}

export async function whenTheRequestedTokenAmountsAreSuperiorThanTheAmountTheUserHasToPay() {
  beforeEach(async () => {
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
    );
  });
}

export async function whenTheUserHasNotEnoughFunds() {}

export async function whenTheUserHasNotAllowedEnoughTokens() {}

export async function whenTheConditionsAreMet() {
  beforeEach(async () => {
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

    // await reservationKernelContract.createReservation({});
  });

  it('Should increment the reservationCount by 1', async () => {
    // const reservationsCount = getStorage;
  });

  it('Should create a new Reservation in the storage slot', async () => {
    const reservationsMappingAddress = getStorageMappingStructAddress(6, 1);

    const reservationState = BigNumber.from(
      await getStorageMappingStructProperty(
        reservationKernelContract.address,
        reservationsMappingAddress.substring(
          2,
          reservationsMappingAddress.length
        ),
        1,
        1
      )
    );

    expect(reservationState).to.be.equal(0);
  });

  it('Should init the main payer state in the Reservation slot', async () => {
    const reservationsMappingAddress = getStorageMappingStructAddress(6, 1);
  });

  describe('When the request includes payers', async () => {
    it('Should init the other payers in the Reservation slot', async () => {});

    describe('When the request includes guests', async () => {
      it('Should init the guests in the Reservation slot', async () => {});
    });

    it('Should set the Reservation state in WaitingForPayment', async () => {});
  });

  describe('When the request does not includes payers', async () => {});

  describe('When the request includes guests', async () => {
    it('Should init the guests in the Reservation slot', async () => {});
  });

  it("Should lock the user's tokens", async () => {});
}
