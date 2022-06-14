import { ContractFactory, Contract } from 'ethers';
import { computeDeploymentAddresses } from '../helpers/contract-address';
import { Users } from '../helpers/users';
import {
  GoodKernel,
  GoodServiceTokenFactory,
  GoodServiceVoucherTokenFactory,
  GoodTokenFactory,
  LZeroRouter,
  PaymentKernel,
  ReservationKernel,
} from '../types/contracts';

let users: Users;

let contractAddresses: { [key: string]: string };

let lZeroRouterFactory: ContractFactory,
  goodTokenFactory: ContractFactory,
  goodServiceTokenFactory: ContractFactory,
  goodServiceVoucherTokenFactory: ContractFactory,
  goodKernelFactory: ContractFactory,
  reservationKernelFactory: ContractFactory,
  paymentKernelFactory: ContractFactory;

let lZeroRouterContract: LZeroRouter,
  goodTokenFactoryContract: GoodTokenFactory,
  goodServiceTokenFactoryContract: GoodServiceTokenFactory,
  goodServiceVoucherTokenFactoryContract: GoodServiceVoucherTokenFactory,
  goodKernelContract: GoodKernel,
  reservationKernelContract: ReservationKernel,
  paymentKernelContract: PaymentKernel;

async function deployContracts() {
  contractAddresses = await computeDeploymentAddresses(users.deployer.address, [
    'LZeroRouter',
    'GoodTokenFactory',
    'GoodServiceTokenFactory',
    'GoodServiceVoucherTokenFactory',
    'GoodKernel',
    'ReservationKernel',
    'PaymentKernel',
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
  reservationKernelContract =
    (await reservationKernelFactory.deploy()) as Contract & ReservationKernel;
  paymentKernelContract = (await paymentKernelFactory.deploy()) as Contract &
    PaymentKernel;
  lZeroRouterContract = (await lZeroRouterFactory.deploy(
    contractAddresses.GoodKernel
  )) as Contract & LZeroRouter;

  await goodTokenFactoryContract.deployed();
  await goodServiceTokenFactoryContract.deployed();
  await goodServiceVoucherTokenFactoryContract.deployed();
  await goodKernelContract.deployed();
  await reservationKernelContract.deployed();
  await paymentKernelContract.deployed();
  await lZeroRouterContract.deployed();
}

describe('LZeroRouter', async () => {});
