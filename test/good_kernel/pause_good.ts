import { expect } from 'chai';
import { BigNumber } from 'ethers';
import {
  getStorageMappingStructAddress,
  getStorageMappingStructProperty,
} from '../../helpers/contract-storage';
import { users } from '../utils';
import { goodKernelContract } from './utils';

export async function whenTheContractIsPaused() {
  beforeEach(async () => {
    await goodKernelContract.pause();
  });

  it('Should revert', async () => {
    expect(
      goodKernelContract.pauseGood(users.client.address, 1)
    ).to.be.revertedWith('Pausable: paused');
  });
}

export async function whenTheGoodDoesntExists() {
  it('Should revert', async () => {
    expect(
      goodKernelContract.pauseGood(users.client.address, 1)
    ).to.be.revertedWith('GK011');
  });
}

export async function whenTheGoodIsNotInTheRightState() {
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
      goodKernelContract.pauseGood(users.client.address, 1)
    ).to.be.revertedWith('GK021');
  });
}

export async function whenTheConditionsAreMet() {
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

    await goodKernelContract.pauseGood(users.client.address, 1);
  });

  it('Should set the GoodState to Paused', async () => {
    const goodsMappingAddress = getStorageMappingStructAddress(
      5,
      users.client.address.substring(2, users.client.address.length)
    );
    const goodState = BigNumber.from(
      await getStorageMappingStructProperty(
        goodKernelContract.address,
        goodsMappingAddress.substring(2, goodsMappingAddress.length),
        1,
        1
      )
    );

    // 0 = Paused
    expect(goodState).to.be.equal(0);
  });

  it('Should emit a GoodPaused event', async () => {
    expect(goodKernelContract.pauseGood(users.client.address, 1)).to.emit(
      goodKernelContract,
      'GoodPaused'
    );
  });
}
