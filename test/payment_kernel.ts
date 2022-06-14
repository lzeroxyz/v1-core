import { expect } from 'chai';
import { BigNumber, Contract, ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import { computeDeploymentAddresses } from '../helpers/contract-address';
import { Users } from '../helpers/users';
import {
  GoodKernel,
  GoodServiceTokenFactory,
  GoodServiceVoucherTokenFactory,
  GoodTokenFactory,
  ReservationTokenFactory,
  LZeroRouter,
  ReservationKernel,
} from '../types/contracts';

let users: Users;

let contractAddresses: { [key: string]: string };

let goodHelperLibraryFactory: ContractFactory,
  goodServiceHelperLibraryFactory: ContractFactory,
  reservationHelperLibraryFactory: ContractFactory;

let goodTokenFactory: ContractFactory,
  goodServiceTokenFactory: ContractFactory,
  goodServiceVoucherTokenFactory: ContractFactory,
  goodKernelFactory: ContractFactory,
  reservationTokenFactory: ContractFactory,
  reservationKernelFactory: ContractFactory,
  lZeroRouterFactory: ContractFactory;

let goodTokenFactoryContract: GoodTokenFactory,
  goodServiceTokenFactoryContract: GoodServiceTokenFactory,
  goodServiceVoucherTokenFactoryContract: GoodServiceVoucherTokenFactory,
  goodKernelContract: GoodKernel,
  reservationTokenFactoryContract: ReservationTokenFactory,
  reservationKernel: ReservationKernel,
  lZeroRouterContract: LZeroRouter;

async function deployContracts() {
  contractAddresses = await computeDeploymentAddresses(users.deployer.address, [
    'GoodTokenFactory',
    'GoodServiceTokenFactory',
    'GoodServiceVoucherTokenFactory',
    'GoodKernel',
    'ReservationTokenFactory',
    'ReservationKernel',
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
  reservationTokenFactoryContract = (await reservationTokenFactory.deploy(
    contractAddresses.LZeroRouter,
    contractAddresses.GoodKernel
  )) as Contract & ReservationTokenFactory;
  reservationKernel = (await reservationKernelFactory.deploy(
    contractAddresses.LZeroRouter,
    contractAddresses.ReservationTokenFactory
  )) as Contract & ReservationKernel;
  lZeroRouterContract = (await lZeroRouterFactory.deploy(
    contractAddresses.GoodKernel
  )) as Contract & LZeroRouter;

  await goodTokenFactoryContract.deployed();
  await goodServiceTokenFactoryContract.deployed();
  await goodServiceVoucherTokenFactoryContract.deployed();
  await goodKernelContract.deployed();
  await lZeroRouterContract.deployed();
}
