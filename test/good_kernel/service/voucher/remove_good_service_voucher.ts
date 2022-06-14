import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { users } from '../../../utils';
import { goodKernelContract } from '../../utils';

export async function whenTheContractIsPaused() {
  beforeEach(async () => {
    await goodKernelContract.pause();
  });

  it('Should revert', async () => {
    expect(
      goodKernelContract.removeGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        goodServiceVoucherId: 1,
      })
    ).to.be.revertedWith('Pausable: paused');
  });
}

export async function whenTheGoodDoesntExist() {
  beforeEach(async () => {});

  it('Should revert', async () => {
    expect(
      goodKernelContract.removeGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        goodServiceVoucherId: 1,
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
      goodKernelContract.removeGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        goodServiceVoucherId: 1,
      })
    ).to.be.revertedWith('GK012');
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
      goodKernelContract.removeGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        goodServiceVoucherId: 1,
      })
    ).to.be.revertedWith('GK013');
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
      goodKernelContract.removeGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        goodServiceVoucherId: 1,
      })
    ).to.be.revertedWith('GK023');
  });
}

export async function whenTheGoodServiceVoucherDoesntExist() {
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
      goodKernelContract.removeGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        goodServiceVoucherId: 1,
      })
    ).to.be.revertedWith('GK013');
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

    await goodKernelContract.removeGoodServiceVoucher({
      from: users.client.address,
      goodId: 1,
      goodServiceId: 1,
      goodServiceVoucherId: 1,
    });
  });

  it('Should remove the good service voucher', async () => {});

  it('Should emit a GoodServiceVoucherRemoved event', async () => {
    expect(
      await goodKernelContract.removeGoodServiceVoucher({
        from: users.client.address,
        goodId: 1,
        goodServiceId: 1,
        goodServiceVoucherId: 1,
      })
    ).to.emit(goodKernelContract, 'GoodServiceVoucherBurned');
  });
}
