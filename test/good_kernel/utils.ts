import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';
import { computeDeploymentAddresses } from '../../helpers/contract-address';
import {
  GoodKernel,
  GoodServiceTokenFactory,
  GoodServiceVoucherTokenFactory,
  GoodTokenFactory,
  LZeroRouter,
} from '../../types/contracts';
import { users } from '../utils';

export let contractAddresses: { [key: string]: string };

export let goodHelperLibraryFactory: ContractFactory;
export let goodServiceHelperLibraryFactory: ContractFactory;

export let goodTokenFactory: ContractFactory;
export let goodServiceTokenFactory: ContractFactory;
export let goodServiceVoucherTokenFactory: ContractFactory;
export let goodKernelFactory: ContractFactory;
export let lZeroRouterFactory: ContractFactory;

export let goodTokenFactoryContract: GoodTokenFactory;
export let goodServiceTokenFactoryContract: GoodServiceTokenFactory;
export let goodServiceVoucherTokenFactoryContract: GoodServiceVoucherTokenFactory;
export let goodKernelContract: GoodKernel;
export let lZeroRouterContract: LZeroRouter;

export async function prepareContracts() {
  goodHelperLibraryFactory = await ethers.getContractFactory('GoodHelper');
  goodServiceHelperLibraryFactory = await ethers.getContractFactory(
    'GoodServiceHelper'
  );
  const goodHelperLibrary = await goodHelperLibraryFactory.deploy();
  const goodServiceHelperLibrary =
    await goodServiceHelperLibraryFactory.deploy();

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
}

export async function deployContracts() {
  contractAddresses = await computeDeploymentAddresses(users.deployer.address, [
    'GoodTokenFactory',
    'GoodServiceTokenFactory',
    'GoodServiceVoucherTokenFactory',
    'GoodKernel',
    'LZeroRouter',
  ]);

  /**
   * Instanciate good-specific contracts
   */
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

  /** */
  lZeroRouterContract = (await lZeroRouterFactory.deploy(
    contractAddresses.GoodKernel
  )) as Contract & LZeroRouter;

  /**
   * Verify if contracts where deployed successfully
   */
  await goodTokenFactoryContract.deployed();
  await goodServiceTokenFactoryContract.deployed();
  await goodServiceVoucherTokenFactoryContract.deployed();
  await goodKernelContract.deployed();
  await lZeroRouterContract.deployed();
}
