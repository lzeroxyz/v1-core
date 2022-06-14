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
      goodKernelContract.createGoodService({
        from: users.client.address,
        goodId: 1,
        capacity: 10,
        tokenUri: 'https://token-cdn.domain/{id}.json',
      })
    ).to.be.revertedWith('Pausable: paused');
  });
}

export async function whenTheGoodDoesntExists() {
  it('Should revert', async () => {
    expect(
      goodKernelContract.createGoodService({
        from: users.client.address,
        goodId: 1,
        capacity: 10,
        tokenUri: 'https://token-cdn.domain/{id}.json',
      })
    ).to.be.revertedWith(
      'GoodKernel: Call on a non existing or non owned good'
    );
  });
}

export async function whenTheGoodIsPaused() {
  beforeEach(async () => {
    await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });
  });

  it('Should revert', async () => {
    expect(
      goodKernelContract.createGoodService({
        from: users.client.address,
        goodId: 1,
        capacity: 10,
        tokenUri: 'https://token-cdn.domain/{id}.json',
      })
    ).to.be.revertedWith(
      'GoodKernel: Unable to create a service on a paused good'
    );
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
  });

  it('Should increment the servicesCount in the good struct', async () => {
    const goodsMappingAddress = getStorageMappingStructAddress(
      5,
      users.client.address.substring(2, users.client.address.length)
    );

    const goodServicesCount = BigNumber.from(
      await getStorageMappingStructProperty(
        goodKernelContract.address,
        goodsMappingAddress.substring(2, goodsMappingAddress.length),
        1,
        3
      )
    );

    expect(goodServicesCount.toNumber()).to.be.equal(1);
  });

  it('Should add a new GoodService struct in the good struct', async function () {
    const goodsMappingAddress = getStorageMappingStructAddress(
      5,
      users.client.address.substring(2, users.client.address.length)
    );

    const goodServicesAddress = getStorageMappingStructPropertyAddress(
      goodsMappingAddress.substring(2, goodsMappingAddress.length),
      1,
      4
    );

    const goodServiceId = BigNumber.from(
      await getStorageMappingStructProperty(
        goodKernelContract.address,
        goodServicesAddress.substring(2, goodServicesAddress.length),
        1
      )
    );

    expect(goodServiceId.toNumber()).to.be.equal(1);
  });

  it('Should set the Capacity of the new GoodService to 10', async function () {
    const goodsMappingAddress = getStorageMappingStructAddress(
      5,
      users.client.address.substring(2, users.client.address.length)
    );

    const goodServicesAddress = getStorageMappingStructPropertyAddress(
      goodsMappingAddress.substring(2, goodsMappingAddress.length),
      1,
      4
    );

    const goodServiceCapacity = BigNumber.from(
      await getStorageMappingStructProperty(
        goodKernelContract.address,
        goodServicesAddress.substring(2, goodServicesAddress.length),
        1,
        1
      )
    );

    expect(goodServiceCapacity.toNumber()).to.be.equal(10);
  });

  it('Should set the GoodServiceState of the new GoodService to Unpaused', async () => {
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

    expect(goodServiceState.toNumber()).to.be.equal(1);
  });

  it('Should add a new goodServiceId in the good struct', async () => {
    const goodsMappingAddress = getStorageMappingStructAddress(
      5,
      users.client.address.substring(2, users.client.address.length)
    );

    const goodServicesIdsAddress = getStorageMappingStructPropertyAddress(
      goodsMappingAddress.substring(2, goodsMappingAddress.length),
      1,
      4
    );

    const goodServiceId = BigNumber.from(
      await getStorageMappingStructProperty(
        goodKernelContract.address,
        goodServicesIdsAddress.substring(2, goodServicesIdsAddress.length),
        1
      )
    );

    expect(goodServiceId.toNumber()).to.be.equal(1);
  });

  it('Should emit a GoodServiceCreated event', async () => {
    expect(
      goodKernelContract.createGoodService({
        from: users.client.address,
        goodId: 1,
        capacity: 10,
        tokenUri: 'https://token-cdn.domain/{id}.json',
      })
    ).to.emit(goodKernelContract, 'GoodServiceCreated');
  });
}
