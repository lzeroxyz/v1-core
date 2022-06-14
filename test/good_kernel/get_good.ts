import { expect } from 'chai';
import { users } from '../utils';
import { goodKernelContract } from './utils';

export async function whenTheGoodDoesntExist() {
  it('Should revert', async () => {
    expect(
      goodKernelContract.getGood({
        goodOwner: users.host.address,
        goodId: 1,
      })
    ).to.be.revertedWith('GK011');
  });
}

export async function whenTheConditionsAreMet() {
  beforeEach(async () => {
    await goodKernelContract.createGood({
      from: users.client.address,
      tokenUri: 'https://token-cdn.domain/{id}.json',
      acceptedTokens: [users.token1.address, users.token2.address],
    });
  });

  it('Should return the good', async () => {
    const good = await goodKernelContract.getGood({
      goodOwner: users.client.address,
      goodId: 1,
    });

    expect(good.state).to.be.equal(1);
    expect(good.acceptedTokens[0]).to.be.equal(users.token1.address);
    expect(good.acceptedTokens[1]).to.be.equal(users.token2.address);
  });
}
