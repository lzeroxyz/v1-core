import { expect } from 'chai';
import { beforeEach, it } from 'mocha';
import { users } from '../utils';
import { reservationKernelContract } from './utils';

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
        tokenUri: 'https://token-cdn.domain/{id}.json',
        payers: [],
        guests: [],
      })
    ).to.be.revertedWith('Pausable: paused');
  });
}
