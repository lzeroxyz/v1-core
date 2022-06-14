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
      goodKernelContract.createGood({
        from: users.client.address,
        tokenUri: 'https://token-cdn.domain/{id}.json',
        acceptedTokens: [users.token1.address, users.token2.address],
      })
    ).to.be.revertedWith('Pausable: paused');
  });
}

export async function whenTheConditionsAreMet() {
  it('Should increment the goodsCount in the contract state', async () => {
    const createGoodTransaction = await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });

    await createGoodTransaction.wait();

    const goodCount = BigNumber.from(
      await getStorageMappingStructProperty(
        goodKernelContract.address,
        7,
        users.client.address.substring(2, users.client.address.length)
      )
    );

    expect(goodCount.toNumber()).to.be.equal(1);
  });

  it('Should add a new Good struct in the contract state', async () => {
    const createGoodTransaction = await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });

    await createGoodTransaction.wait();

    const goodsMappingAddress = getStorageMappingStructAddress(
      5,
      users.client.address.substring(2, users.client.address.length)
    );

    const goodId = BigNumber.from(
      await getStorageMappingStructProperty(
        goodKernelContract.address,
        goodsMappingAddress.substring(2, goodsMappingAddress.length),
        1
      )
    );

    expect(goodId.toNumber()).to.not.be.equal(0);
  });

  it('Should set the GoodState of the new Good to Unpaused', async () => {
    const createGoodTransaction = await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });

    await createGoodTransaction.wait();

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
    expect(goodState).to.be.equal(1);
  });

  it('Should add a new goodId in the contract state', async () => {
    const createGoodTransaction = await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });

    await createGoodTransaction.wait();

    const goodsIdsMappingAddress = getStorageMappingStructAddress(
      6,
      users.client.address.substring(2, users.client.address.length)
    );
    const goodId = BigNumber.from(
      await getStorageMappingStructProperty(
        goodKernelContract.address,
        goodsIdsMappingAddress.substring(2, goodsIdsMappingAddress.length),
        1
      )
    );

    // The goodId must be the one created by the GoodTokenFactory - 1 in this case
    expect(goodId).to.be.equal(1);
  });

  it('Should emit a GoodCreated event', async () => {
    expect(
      goodKernelContract.createGood({
        from: users.client.address,
        tokenUri: 'https://token-cdn.domain/{id}.json',
        acceptedTokens: [users.token1.address, users.token2.address],
      })
    ).to.emit(goodKernelContract, 'GoodCreated');
  });
}
