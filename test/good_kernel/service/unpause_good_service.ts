import { expect } from 'chai';
import { BigNumber } from 'ethers';
import {
  getStorageMappingStructAddress,
  getStorageMappingStructProperty,
  getStorageMappingStructPropertyAddress,
} from '../../../helpers/contract-storage';
import { users } from '../../utils';
import { goodKernelContract } from '../utils';

export async function whenTheContractIsPaused() {
  beforeEach(async () => {
    await goodKernelContract.pause();
  });

  it('Should revert', async () => {
    expect(
      goodKernelContract.unpauseGoodService({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
      })
    ).to.be.revertedWith('Pausable: paused');
  });
}

export async function whenTheGoodDoesntExists() {
  it('Should revert', async () => {
    expect(
      goodKernelContract.unpauseGoodService({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
      })
    ).to.be.revertedWith('GK011');
  });
}

export async function whenTheGoodServiceDoesntExists() {
  beforeEach(async () => {
    await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });
  });

  it('Should revert', async () => {
    expect(
      goodKernelContract.unpauseGoodService({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
      })
    ).to.be.revertedWith('GK012');
  });
}

export async function whenTheGoodServiceIsNotInTheRightState() {
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
  });

  it('Should revert', async () => {
    expect(
      goodKernelContract.unpauseGoodService({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
      })
    ).to.be.revertedWith('GK024');
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

    await goodKernelContract.pauseGoodService({
      from: users.client.address,
      goodId: 1,
      goodServiceId: 1,
    });
  });

  it('Should set the GoodServiceState to Unpaused', async () => {
    await goodKernelContract.unpauseGoodService({
      from: users.client.address,
      goodId: 1,
      goodServiceId: 1,
    });

    const goodsMappingAddress = getStorageMappingStructAddress(
      5,
      users.client.address.substring(2, users.client.address.length)
    );

    const goodServicesAddress = getStorageMappingStructPropertyAddress(
      goodsMappingAddress.substring(2, goodsMappingAddress.length),
      1,
      4
    );

    const goodServiceState = BigNumber.from(
      await getStorageMappingStructProperty(
        goodKernelContract.address,
        goodServicesAddress.substring(2, goodServicesAddress.length),
        1,
        2
      )
    );

    // 1 = Unpaused
    expect(goodServiceState.toNumber()).to.be.equal(1);
  });

  it('Should emit a GoodServiceUnpaused event', async () => {
    expect(
      goodKernelContract.unpauseGoodService({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
      })
    ).to.emit(goodKernelContract, 'GoodServiceUnpaused');
  });
}
