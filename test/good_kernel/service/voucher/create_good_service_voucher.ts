import { expect } from 'chai';
import { BigNumber } from 'ethers';
import {
  getStorageMappingStructAddress,
  getStorageMappingStructProperty,
  getStorageMappingStructPropertyAddress,
} from '../../../../helpers/contract-storage';
import { users } from '../../../utils';
import { goodKernelContract } from '../../utils';

export async function whenTheContractIsPaused() {
  beforeEach(async () => {
    await goodKernelContract.pause();
  });

  it('Should revert', async () => {
    expect(
      goodKernelContract.createGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        tokenUri: 'https://token-cdn.domain/{id}.json',
        start: BigNumber.from(Date.now()),
        end: BigNumber.from(Date.now() + 1000 * 60 * 60 * 24 * 7),
        destructionType: 1,
      })
    ).to.be.revertedWith('Pausable: paused');
  });
}

export async function whenTheGoodDoesntExist() {
  beforeEach(async () => {});

  it('Should revert', async () => {
    expect(
      goodKernelContract.createGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        tokenUri: 'https://token-cdn.domain/{id}.json',
        start: BigNumber.from(Date.now()),
        end: BigNumber.from(Date.now() + 1000 * 60 * 60 * 24 * 7),
        destructionType: 1,
      })
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
      goodKernelContract.createGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        tokenUri: 'https://token-cdn.domain/{id}.json',
        start: BigNumber.from(Date.now()),
        end: BigNumber.from(Date.now() + 1000 * 60 * 60 * 24 * 7),
        destructionType: 1,
      })
    ).to.be.revertedWith('GK021');
  });
}

export async function whenTheGoodServiceDoesntExist() {
  beforeEach(async () => {
    await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });
  });

  it('Should revert', async () => {
    expect(
      goodKernelContract.createGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        tokenUri: 'https://token-cdn.domain/{id}.json',
        start: BigNumber.from(Date.now()),
        end: BigNumber.from(Date.now() + 1000 * 60 * 60 * 24 * 7),
        destructionType: 1,
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

    await goodKernelContract.pauseGoodService({
      from: users.client.address,
      goodId: 1,
      goodServiceId: 1,
    });
  });

  it('Should revert', async () => {
    expect(
      goodKernelContract.createGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        tokenUri: 'https://token-cdn.domain/{id}.json',
        start: BigNumber.from(Date.now()),
        end: BigNumber.from(Date.now() + 1000 * 60 * 60 * 24 * 7),
        destructionType: 1,
      })
    ).to.be.revertedWith('GK023');
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

    await goodKernelContract.createGoodServiceVoucher({
      from: users.client.address,
      goodId: 1,
      goodServiceId: 1,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      start: BigNumber.from(Date.now()),
      end: BigNumber.from(Date.now() + 1000 * 60 * 60 * 24 * 7),
      destructionType: 1,
    });
  });

  it('Should increment the vouchersCount in the good service struct', async () => {
    const goodsMappingAddress = getStorageMappingStructAddress(
      5,
      users.client.address.substring(2, users.client.address.length)
    );

    const goodServicesAddress = getStorageMappingStructPropertyAddress(
      goodsMappingAddress.substring(2, goodsMappingAddress.length),
      1,
      4
    );

    const goodServiceVouchersCount = BigNumber.from(
      await getStorageMappingStructProperty(
        goodKernelContract.address,
        goodServicesAddress.substring(2, goodServicesAddress.length),
        1,
        3
      )
    );

    expect(goodServiceVouchersCount).to.be.equal(1);
  });
}
