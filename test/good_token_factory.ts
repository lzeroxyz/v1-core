import { expect } from 'chai';
import { Contract, ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { computeDeploymentAddresses } from '../helpers/contract-address';
import { Users } from '../helpers/users';
import {
  GoodKernel,
  GoodKernelMock,
  GoodServiceTokenFactory,
  GoodServiceTokenFactoryMock,
  GoodServiceVoucherTokenFactory,
  GoodTokenFactory,
  GoodTokenFactoryMock,
  LZeroRouter,
} from '../types/contracts';

let users: Users;

let contractAddresses: { [key: string]: string };

let goodHelperLibraryFactory: ContractFactory,
  goodServiceHelperLibraryFactory: ContractFactory;

let goodTokenFactory: ContractFactory,
  goodServiceTokenFactory: ContractFactory,
  goodServiceVoucherTokenFactory: ContractFactory,
  goodKernelFactory: ContractFactory,
  lZeroRouterFactory: ContractFactory;

let goodHelperLibrary: Contract, goodServiceHelperLibrary: Contract;

let goodTokenFactoryContract: GoodTokenFactory,
  goodServiceTokenFactoryContract: GoodServiceTokenFactory,
  goodServiceVoucherTokenFactoryContract: GoodServiceVoucherTokenFactory,
  goodKernelContract: GoodKernel,
  lZeroRouterContract: LZeroRouter;

async function deployContracts() {
  contractAddresses = await computeDeploymentAddresses(users.deployer.address, [
    'GoodTokenFactory',
    'GoodServiceTokenFactory',
    'GoodServiceVoucherTokenFactory',
    'GoodKernel',
    'LZeroRouter',
  ]);

  goodTokenFactoryContract = (await goodTokenFactory.deploy(
    contractAddresses.GoodKernel
  )) as Contract & GoodTokenFactory;
  goodServiceTokenFactoryContract = (await goodServiceTokenFactory.deploy(
    'https://token-cdn.domain/{id}.json',
    contractAddresses.GoodKernel
  )) as Contract & GoodServiceTokenFactory;
  goodServiceVoucherTokenFactoryContract =
    (await goodServiceVoucherTokenFactory.deploy(
      'https://token-cdn.domain/{id}.json',
      contractAddresses.GoodKernel
    )) as Contract & GoodServiceVoucherTokenFactory;
  goodKernelContract = (await goodKernelFactory.deploy(
    contractAddresses.LZeroRouter,
    contractAddresses.GoodTokenFactory,
    contractAddresses.GoodServiceTokenFactory,
    contractAddresses.GoodServiceVoucherTokenFactory
  )) as Contract & GoodKernel;
  lZeroRouterContract = (await lZeroRouterFactory.deploy(
    contractAddresses.GoodKernel
  )) as Contract & LZeroRouter;

  await goodTokenFactoryContract.deployed();
  await goodServiceTokenFactoryContract.deployed();
  await goodServiceVoucherTokenFactoryContract.deployed();
  await goodKernelContract.deployed();
  await lZeroRouterContract.deployed();
}

describe('GoodTokenFactory', async function () {
  let goodTokenMockFactory: ContractFactory;
  let goodTokenFactoryMockContract: Contract;

  beforeEach(async function () {
    const signers: Signer[] = await ethers.getSigners();
    users = new Users(signers);

    goodHelperLibraryFactory = await ethers.getContractFactory('GoodHelper');
    goodServiceHelperLibraryFactory = await ethers.getContractFactory(
      'GoodServiceHelper'
    );
    goodHelperLibrary = await goodHelperLibraryFactory.deploy();
    goodServiceHelperLibrary = await goodServiceHelperLibraryFactory.deploy();

    goodTokenFactory = await ethers.getContractFactory('GoodTokenFactory');
    goodServiceTokenFactory = await ethers.getContractFactory(
      'GoodServiceTokenFactory'
    );
    goodServiceVoucherTokenFactory = await ethers.getContractFactory(
      'GoodServiceVoucherTokenFactory'
    );
    goodKernelFactory = await ethers.getContractFactory('GoodKernel', {
      libraries: {
        GoodHelper: goodHelperLibrary.address,
        GoodServiceHelper: goodServiceHelperLibrary.address,
      },
    });
    lZeroRouterFactory = await ethers.getContractFactory('LZeroRouter');

    goodTokenMockFactory = await ethers.getContractFactory(
      'GoodTokenFactoryMock'
    );
  });

  async function deployGoodTokenFactoryMockedContract() {
    goodTokenFactoryMockContract = (await goodTokenMockFactory.deploy(
      contractAddresses.GoodKernel
    )) as Contract & GoodTokenFactoryMock;

    await goodTokenFactoryMockContract.deployed();
  }

  describe('When the contract constructs', async function () {
    beforeEach(async () => {
      await deployContracts();
    });

    it('Should be unpaused', async function () {
      const currentPauseState = await goodTokenFactoryContract.paused();

      expect(currentPauseState).to.be.false;
    });
  });

  describe('mint', async function () {
    beforeEach(async () => {
      await deployContracts();
    });

    describe('When the caller is not the kernel', async function () {
      it('Should revert', async function () {
        expect(
          goodTokenFactoryContract.mint(
            users.client.address,
            'https://token-cdn.domain/{id}.json'
          )
        ).to.be.revertedWith('Kernable: call from outside the Kernel');
      });
    });

    describe('When the contract is paused', async function () {
      beforeEach(async function () {
        await goodTokenFactoryContract.pause();
      });

      it('Should revert', async function () {
        expect(
          goodKernelContract.createGood({
            from: users.client.address,
            tokenUri: 'https://token-cdn.domain/{id}.json',
            acceptedTokens: [users.token1.address, users.token2.address],
          })
        ).to.be.revertedWith('Pausable: paused');
      });
    });

    describe('When the conditions are met', async function () {
      beforeEach(async function () {
        await deployGoodTokenFactoryMockedContract();
      });

      it('Should issue a new Good NFT', async function () {
        expect(
          goodTokenFactoryMockContract.mint(
            users.client.address,
            'https://token-cdn.domain/{id}.json'
          )
        ).to.not.be.reverted;
      });

      it('Should emit a Transfer event', async function () {
        expect(
          goodTokenFactoryMockContract.mint(
            users.client.address,
            'https://token-cdn.domain/{id}.json'
          )
        ).to.emit(goodTokenFactoryMockContract, 'Transfer');
      });
    });
  });

  describe('burn', async function () {
    beforeEach(async function () {
      await deployContracts();
    });

    describe('When the caller is not the kernel', async function () {
      it('Should revert', async function () {
        expect(
          goodTokenFactoryContract.burn(users.client.address, 0)
        ).to.be.revertedWith('Kernable: call from outside the Kernel');
      });
    });

    describe('When the contract is paused', async function () {
      let goodKernelMockContract: Contract;

      beforeEach(async function () {
        goodKernelMockContract = await (
          await ethers.getContractFactory('GoodKernelMock', {
            libraries: {
              GoodHelper: goodHelperLibrary.address,
            },
          })
        ).deploy(
          contractAddresses.LZeroRouter,
          contractAddresses.GoodTokenFactory,
          contractAddresses.GoodServiceTokenFactory,
          contractAddresses.GoodServiceVoucherTokenFactory
        );

        await goodTokenFactoryContract.pause();

        await goodTokenFactoryContract.setKernel(
          goodKernelMockContract.address
        );
      });

      it('Should revert', async function () {
        expect(
          goodKernelMockContract.removeGood(users.client.address, 0)
        ).to.be.revertedWith('Pausable: paused');
      });
    });

    describe('When the conditions are met', async function () {
      beforeEach(async function () {
        await deployGoodTokenFactoryMockedContract();

        const mintTransaction = await goodTokenFactoryMockContract.mint(
          users.client.address,
          'https://token-cdn.domain/{id}.json'
        );

        await mintTransaction.wait();
      });

      describe('When the the caller is not the owner or approved', async function () {
        it('Sould revert', async function () {
          expect(
            goodTokenFactoryMockContract.burn(users.attacker.address, 1)
          ).to.be.revertedWith(
            'GoodServiceTokenFactory: caller is not owner or approved to burn this token'
          );
        });
      });

      it('Should burn an existing Good NFT', async function () {
        expect(goodTokenFactoryMockContract.burn(users.client.address, 1)).to
          .not.be.reverted;
      });

      it('Should emit a Transfer event', async function () {
        expect(
          goodTokenFactoryMockContract.burn(users.client.address, 1)
        ).to.emit(goodTokenFactoryMockContract, 'Transfer');
      });
    });
  });

  describe('setKernel', async function () {
    beforeEach(async function () {
      await deployContracts();
    });

    describe('When the caller is not the owner', async function () {
      it('Should revert', async function () {
        expect(
          goodTokenFactoryContract
            .connect(users.attacker.signer)
            .setKernel(users.other1.address)
        ).to.be.revertedWith('Ownable: caller is not the owner');
      });
    });

    describe('When the contract is not paused', async function () {
      it('Should revert', async function () {
        expect(
          goodTokenFactoryContract.setKernel(users.other1.address)
        ).to.be.revertedWith('Pausable: not paused');
      });
    });

    describe('When the conditions are met', async function () {
      beforeEach(async function () {
        await deployGoodTokenFactoryMockedContract();

        await goodTokenFactoryMockContract.pause();
      });

      it('Should change the kernel address', async function () {
        const goodKernelMockContract: Contract = await (
          await ethers.getContractFactory('GoodKernelMock', {
            libraries: {
              GoodHelper: goodHelperLibrary.address,
            },
          })
        ).deploy(
          contractAddresses.LZeroRouter,
          contractAddresses.GoodTokenFactory,
          contractAddresses.GoodServiceTokenFactory,
          contractAddresses.GoodServiceVoucherTokenFactory
        );

        const setKernelTransaction =
          await goodTokenFactoryMockContract.setKernel(
            goodKernelMockContract.address
          );

        await setKernelTransaction.wait();

        expect(await goodTokenFactoryMockContract.kernel()).to.be.equal(
          goodKernelMockContract.address
        );
      });
    });
  });

  describe('pause', async function () {
    beforeEach(async function () {
      await deployContracts();
    });

    describe('When the caller is not the owner or the kernel', async function () {
      it('Should revert', async function () {
        expect(
          goodTokenFactoryContract.connect(users.attacker.signer).pause()
        ).to.be.revertedWith(
          'GoodTokenFactory: Caller is not the owner or the Kernel contract'
        );
      });
    });

    describe('When the contract is already paused', async function () {
      beforeEach(async function () {
        await goodTokenFactoryContract.pause();
      });

      it('Should revert', async function () {
        expect(goodTokenFactoryContract.pause()).to.be.revertedWith(
          'Pausable: paused'
        );
      });
    });

    describe('When the conditions are met', async function () {
      it('Should pause the contract', async function () {
        await goodTokenFactoryContract.pause();

        expect(await goodTokenFactoryContract.paused()).to.be.true;
      });
    });
  });

  describe('unpause', async function () {
    beforeEach(async function () {
      await deployContracts();
    });

    describe('When the caller is not the owner or the kernel', async function () {
      it('Should revert', async function () {
        expect(
          goodTokenFactoryContract.connect(users.attacker.signer).unpause()
        ).to.be.revertedWith(
          'GoodTokenFactory: Caller is not the owner or the Kernel contract'
        );
      });
    });

    describe('When the contract is not paused', async function () {
      it('Should revert', async function () {
        expect(goodTokenFactoryContract.unpause()).to.be.revertedWith(
          'Pausable: not paused'
        );
      });
    });

    describe('When the conditions are met', async function () {
      beforeEach(async function () {
        await goodTokenFactoryContract.pause();
      });

      it('Should pause the contract', async function () {
        await goodTokenFactoryContract.unpause();

        expect(await goodTokenFactoryContract.paused()).to.be.false;
      });
    });
  });
});
