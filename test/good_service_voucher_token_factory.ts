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
  GoodServiceVoucherTokenFactoryMock,
  GoodTokenFactory,
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

describe('GoodServiceVoucherTokenFactory', async function () {
  let goodServiceVoucherTokenMockFactory: ContractFactory;
  let goodServiceVoucherTokenFactoryMockContract: Contract &
    GoodServiceVoucherTokenFactoryMock;

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

    goodServiceVoucherTokenMockFactory = await ethers.getContractFactory(
      'GoodServiceVoucherTokenFactoryMock'
    );
  });

  async function deployGoodServiceVoucherTokenFactoryMockedContract() {
    goodServiceVoucherTokenFactoryMockContract =
      (await goodServiceVoucherTokenMockFactory.deploy(
        'https://token-cdn.domain/{id}.json',
        contractAddresses.GoodKernel
      )) as Contract & GoodServiceVoucherTokenFactoryMock;

    await goodServiceVoucherTokenFactoryMockContract.deployed();
  }

  describe('When the contract constructs', async function () {
    beforeEach(async () => {
      await deployContracts();
    });

    it('Should be unpaused', async function () {
      const currentPauseState =
        await goodServiceVoucherTokenFactoryContract.paused();

      expect(currentPauseState).to.be.false;
    });

    it('Should set the global uri', async function () {
      const currentGlobalUri = await goodServiceVoucherTokenFactoryContract.uri(
        1
      );

      expect(currentGlobalUri).to.be.equal(
        'https://token-cdn.domain/{id}.json'
      );
    });
  });

  describe('mint', async function () {
    beforeEach(async () => {
      await deployContracts();
    });

    describe('When the caller is not the kernel', async function () {
      it('Should revert', async function () {
        expect(
          goodServiceVoucherTokenFactoryContract.mint(
            users.client.address,
            1,
            'https://token-cdn.domain/{id}.json'
          )
        ).to.be.revertedWith('Kernable: call from outside the Kernel');
      });
    });

    describe('When the contract is paused', async function () {
      let goodKernelMockContract: GoodKernelMock & Contract;

      beforeEach(async function () {
        goodKernelMockContract = (await (
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
        )) as GoodKernelMock & Contract;

        await goodServiceVoucherTokenFactoryContract.pause();

        await goodServiceVoucherTokenFactoryContract.setKernel(
          goodKernelMockContract.address
        );
      });

      it('Should revert', async function () {
        expect(
          goodKernelMockContract.createGoodServiceVoucher({
            from: users.client.address,
            goodId: 1,
            goodServiceId: 1,
            tokenUri: 'https://token-cdn.domain/{id}.json',
            start: 1,
            end: 1,
            destructionType: 1,
          })
        ).to.be.revertedWith('Pausable: paused');
      });
    });

    describe('When the conditions are met', async function () {
      beforeEach(async function () {
        await deployGoodServiceVoucherTokenFactoryMockedContract();
      });

      it('Should issue a new Good Service Voucher', async function () {
        expect(
          goodServiceVoucherTokenFactoryMockContract.mint(
            users.client.address,
            1,
            'https://token-cdn.domain/{id}.json'
          )
        ).to.not.be.reverted;

        expect(
          await goodServiceVoucherTokenFactoryMockContract.balanceOf(
            users.client.address,
            1
          )
        ).to.be.equal(1);
      });

      it('Should issue multiple Good Service Vouchers', async function () {
        expect(
          goodServiceVoucherTokenFactoryMockContract.mint(
            users.client.address,
            10,
            'https://token-cdn.domain/{id}.json'
          )
        ).to.not.be.reverted;

        expect(
          await goodServiceVoucherTokenFactoryMockContract.balanceOf(
            users.client.address,
            1
          )
        ).to.be.equal(10);
      });

      it('Should set an URL with this new Good Service Voucher', async function () {
        const mintTransaction =
          await goodServiceVoucherTokenFactoryMockContract.mint(
            users.client.address,
            1,
            'https://token-cdn-2.domain/{id}.json'
          );

        await mintTransaction.wait();

        expect(
          await goodServiceVoucherTokenFactoryMockContract.uri(1)
        ).to.be.equal('https://token-cdn-2.domain/{id}.json');
      });

      it('Should emit a Transfer event', async function () {
        expect(
          goodServiceVoucherTokenFactoryMockContract.mint(
            users.client.address,
            1,
            'https://token-cdn.domain/{id}.json'
          )
        ).to.emit(goodServiceVoucherTokenFactoryMockContract, 'TransferSingle');
      });
    });
  });

  describe('mintBatch', async function () {
    beforeEach(async () => {
      await deployContracts();
    });

    describe('When the caller is not the kernel', async function () {
      it('Should revert', async function () {
        expect(
          goodServiceVoucherTokenFactoryContract.mintBatch(
            users.client.address,
            [1, 1, 1],
            [
              'https://token-cdn.domain/{id}.json',
              'https://token-cdn.domain/{id}.json',
              'https://token-cdn.domain/{id}.json',
            ]
          )
        ).to.be.revertedWith('Kernable: call from outside the Kernel');
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
          goodServiceVoucherTokenFactoryContract.burn(
            users.client.address,
            1,
            1
          )
        ).to.be.revertedWith('Kernable: call from outside the Kernel');
      });
    });

    describe('When the contract is paused', async function () {
      let goodKernelMockContract: GoodKernelMock & Contract;

      beforeEach(async function () {
        goodKernelMockContract = (await (
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
        )) as GoodKernelMock & Contract;

        await goodServiceVoucherTokenFactoryContract.pause();

        await goodServiceVoucherTokenFactoryContract.setKernel(
          goodKernelMockContract.address
        );
      });

      it('Should revert', async function () {
        expect(
          goodKernelMockContract.removeGoodServiceVoucher({
            from: users.client.address,
            goodId: 0,
            goodServiceId: 0,
            goodServiceVoucherId: 0,
          })
        ).to.be.revertedWith('Pausable: paused');
      });
    });

    describe('When the conditions are met', async function () {
      beforeEach(async function () {
        await deployGoodServiceVoucherTokenFactoryMockedContract();

        const mintTransaction =
          await goodServiceVoucherTokenFactoryMockContract.mint(
            users.client.address,
            1,
            'https://token-cdn.domain/{id}.json'
          );

        await mintTransaction.wait();
      });

      describe('When the the caller is not the owner or approved', async function () {
        it('Sould revert', async function () {
          expect(
            goodServiceVoucherTokenFactoryMockContract.burn(
              users.attacker.address,
              1,
              1
            )
          ).to.be.revertedWith('ERC1155: burn amount exceeds balance');
        });
      });

      it('Should burn an existing Good NFT', async function () {
        expect(
          goodServiceVoucherTokenFactoryMockContract.burn(
            users.client.address,
            1,
            1
          )
        ).to.not.be.reverted;

        expect(
          await goodServiceVoucherTokenFactoryMockContract.balanceOf(
            users.client.address,
            1
          )
        ).to.be.equal(0);
      });

      it('Should emit a Transfer event', async function () {
        expect(
          goodServiceVoucherTokenFactoryMockContract.burn(
            users.client.address,
            1,
            1
          )
        ).to.emit(goodServiceVoucherTokenFactoryContract, 'TransferSingle');
      });
    });
  });

  /**
     * describe('burnBatch', async function() {
        beforeEach(async function() {
            await deployContracts();
        });

        describe('When the caller is not the kernel', async function() 
        {
            it('Should revert', async function() 
            {
                expect(goodServiceTokenFactoryContract.burnBatch(users.client.address, [1, 2])).to.be.revertedWith('Kernable: call from outside the Kernel');
            });
        });

        describe('When the contract is paused', async function() 
        {
            let goodKernelMockContract: GoodKernelMock;

            beforeEach(async function() {
                goodKernelMockContract = await (await ethers.getContractFactory('GoodKernelMock')).deploy(contractAddresses.LZeroRouter, 
                    contractAddresses.GoodTokenFactory, 
                    contractAddresses.GoodServiceTokenFactory, 
                    contractAddresses.GoodServiceVoucherTokenFactory) as Contract & GoodKernelMock;

                await goodKernelMockContract.deployed();

                await goodServiceTokenFactoryContract.pause();

                await goodServiceTokenFactoryContract.setKernel(goodKernelMockContract.address);
            });

            it('Should revert', async function()
            {
                expect(goodKernelMockContract.removeGoodServices(users.client.address, 0, [1, 2])).to.be.revertedWith('Pausable: paused');
            });
        });

        describe('When the conditions are met', async function() {
            beforeEach(async function() {
                await deployGoodServiceTokenFactoryMockedContract();

                const firstMintTransaction = await goodServiceTokenFactoryMockContract.mint(users.client.address, 'https://token-cdn.domain/{id}.json');

                const secondMintTransaction = await goodServiceTokenFactoryMockContract.mint(users.client.address, 'https://token-cdn.domain/{id}.json');
                
                await firstMintTransaction.wait();
                await secondMintTransaction.wait();
            });

            describe('When the the caller is not the owner or approved', async function()
            {
                it('Sould revert', async function()
                {
                    expect(goodServiceTokenFactoryMockContract.burnBatch(users.attacker.address, [1, 2])).to.be.revertedWith('ERC1155: burn amount exceeds balance');
                });
            });

            it('Should burn an existing Good NFT', async function() {
                expect(goodServiceTokenFactoryMockContract.burnBatch(users.client.address, [1, 2])).to.not.be.reverted;
            });

            it('Should emit a TransferBatch event', async function() {
                expect(goodServiceTokenFactoryMockContract.burnBatch(users.client.address, [1, 2])).to.emit(goodServiceTokenFactoryMockContract, 'TransferBatch');
            });
        });
    });

    describe('setKernel', async function()
    {
        beforeEach(async function() {
            await deployContracts();
        });

        describe('When the caller is not the owner', async function() 
        {
            it('Should revert', async function() 
            {
                expect(goodServiceTokenFactoryContract.connect(users.attacker.signer).setKernel(users.other1.address)).to.be.revertedWith('Ownable: caller is not the owner');
            });
        });

        
        describe('When the contract is not paused', async function() 
        {
            it('Should revert', async function()
            {
                expect(goodServiceTokenFactoryContract.setKernel(users.other1.address)).to.be.revertedWith('Pausable: not paused');
            });
        });

        describe('When the conditions are met', async function() {
            beforeEach(async function() {
                await deployGoodServiceTokenFactoryMockedContract();

                await goodServiceTokenFactoryMockContract.pause();
            });

            it('Should change the kernel address', async function() {
                const goodKernelMockContract: Contract = await (await ethers.getContractFactory('GoodKernelMock')).deploy(contractAddresses.LZeroRouter, 
                    contractAddresses.GoodTokenFactory, 
                    contractAddresses.GoodServiceTokenFactory, 
                    contractAddresses.GoodServiceVoucherTokenFactory);

                const setKernelTransaction = await goodServiceTokenFactoryMockContract.setKernel(goodKernelMockContract.address);

                await setKernelTransaction.wait();

                expect(await goodServiceTokenFactoryMockContract.kernel()).to.be.equal(goodKernelMockContract.address);
            });
        });
    });

    describe('pause', async function() {
        beforeEach(async function() {
            await deployContracts();
        });

        describe('When the caller is not the owner or the kernel', async function() {
            it('Should revert', async function() {
                expect(goodServiceTokenFactoryContract.connect(users.attacker.signer).pause()).to.be.revertedWith('GoodTokenFactory: Caller is not the owner or the Kernel contract')
            });
        });

        describe('When the contract is already paused', async function() {
            beforeEach(async function() {
                await goodServiceTokenFactoryContract.pause();
            });

            it('Should revert', async function() {
                expect(goodServiceTokenFactoryContract.pause()).to.be.revertedWith('Pausable: paused');
            });
        });

        describe('When the conditions are met', async function() {
            it('Should pause the contract', async function() {
                await goodServiceTokenFactoryContract.pause();

                expect(await goodServiceTokenFactoryContract.paused()).to.be.true;
            })
        });
    });

    describe('unpause', async function() {
        beforeEach(async function() {
            await deployContracts();
        });

        describe('When the caller is not the owner or the kernel', async function() {
            it('Should revert', async function() {
                expect(goodServiceTokenFactoryContract.connect(users.attacker.signer).unpause()).to.be.revertedWith('GoodTokenFactory: Caller is not the owner or the Kernel contract')
            });
        });

        describe('When the contract is not paused', async function() {
            it('Should revert', async function() {
                expect(goodServiceTokenFactoryContract.unpause()).to.be.revertedWith('Pausable: not paused');
            });
        });

        describe('When the conditions are met', async function() {
            beforeEach(async function() {
                await goodServiceTokenFactoryContract.pause();
            });

            it('Should pause the contract', async function() {
                await goodServiceTokenFactoryContract.unpause();

                expect(await goodServiceTokenFactoryContract.paused()).to.be.false;
            })
        });
    });
     */
});
