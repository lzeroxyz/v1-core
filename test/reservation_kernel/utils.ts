import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';
import { computeDeploymentAddresses } from '../../helpers/contract-address';
import {
  GoodKernel,
  GoodServiceTokenFactory,
  GoodServiceVoucherTokenFactory,
  GoodTokenFactory,
  LZeroRouter,
  ReservationKernel,
  ReservationTokenFactory,
} from '../../types/contracts';
import { users } from '../utils';

export let contractAddresses: { [key: string]: string };

export let goodHelperLibraryFactory: ContractFactory;
export let goodServiceHelperLibraryFactory: ContractFactory;
export let reservationHelperLibraryFactory: ContractFactory;

export let goodTokenFactory: ContractFactory;
export let goodServiceTokenFactory: ContractFactory;
export let goodServiceVoucherTokenFactory: ContractFactory;
export let goodKernelFactory: ContractFactory;
export let reservationTokenFactory: ContractFactory;
export let reservationKernelFactory: ContractFactory;
export let lZeroRouterFactory: ContractFactory;

export let goodTokenFactoryContract: GoodTokenFactory;
export let goodServiceTokenFactoryContract: GoodServiceTokenFactory;
export let goodServiceVoucherTokenFactoryContract: GoodServiceVoucherTokenFactory;
export let goodKernelContract: GoodKernel;
export let reservationTokenFactoryContract: ReservationTokenFactory;
export let reservationKernelContract: ReservationKernel;
export let lZeroRouterContract: LZeroRouter;

export async function prepareContracts() {
  goodHelperLibraryFactory = await ethers.getContractFactory('GoodHelper');
  goodServiceHelperLibraryFactory = await ethers.getContractFactory(
    'GoodServiceHelper'
  );
  reservationHelperLibraryFactory = await ethers.getContractFactory(
    'ReservationHelper'
  );
  const goodHelperLibrary = await goodHelperLibraryFactory.deploy();
  const goodServiceHelperLibrary =
    await goodServiceHelperLibraryFactory.deploy();
  const reservationHelperLibrary =
    await reservationHelperLibraryFactory.deploy();

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
  reservationTokenFactory = await ethers.getContractFactory(
    'ReservationTokenFactory'
  );
  reservationKernelFactory = await ethers.getContractFactory(
    'ReservationKernel',
    {
      /**
         * libraries: {
            'ReservationHelper': reservationHelperLibrary.address
        }
         */
    }
  );
  lZeroRouterFactory = await ethers.getContractFactory('LZeroRouter');
}

export async function deployContracts() {
  contractAddresses = await computeDeploymentAddresses(users.deployer.address, [
    'GoodTokenFactory',
    'GoodServiceTokenFactory',
    'GoodServiceVoucherTokenFactory',
    'GoodKernel',
    'ReservationTokenFactory',
    'ReservationKernel',
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

  /**
   * Instanciate reservation-specific contracts
   */
  reservationTokenFactoryContract = (await reservationTokenFactory.deploy(
    contractAddresses.LZeroRouter,
    contractAddresses.GoodKernel
  )) as Contract & ReservationTokenFactory;
  reservationKernel = (await reservationKernelFactory.deploy(
    contractAddresses.LZeroRouter,
    contractAddresses.GoodKernel,
    contractAddresses.ReservationTokenFactory
  )) as Contract & ReservationKernel;

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
