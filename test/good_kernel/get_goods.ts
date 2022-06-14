import { expect } from 'chai';
import { users } from '../utils';
import { goodKernelContract } from './utils';

export async function whenTheAddressHasNoGoods() {
  it('Should revert', async () => {
    expect(
      goodKernelContract.getGoods({
        goodsOwner: users.host.address,
      })
    ).to.be.revertedWith('GK014');
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

  it('Should return the goods', async () => {
    const goods = await goodKernelContract.getGoods({
      goodsOwner: users.client.address,
    });

    expect(goods.ids.length).to.be.equal(1);
    expect(goods.ids[0]).to.be.equal(1);
    expect(goods.states[0]).to.be.equal(0);
    expect(goods.acceptedTokens[0][0]).to.be.equal(users.token1.address);
    expect(goods.acceptedTokens[0][1]).to.be.equal(users.token1.address);
  });
}
