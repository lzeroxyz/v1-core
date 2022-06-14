/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IPaymentKernel,
  IPaymentKernelInterface,
} from "../IPaymentKernel";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "reservationId",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "tokenAddresses",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        internalType: "struct LockFundsInput",
        name: "lockFundsInput",
        type: "tuple",
      },
    ],
    name: "lockFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "reservationId",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "tokenAddress",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "amount",
            type: "uint256[]",
          },
        ],
        internalType: "struct UnlockFundsInput",
        name: "unlockFundsInput",
        type: "tuple",
      },
    ],
    name: "unlockFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IPaymentKernel__factory {
  static readonly abi = _abi;
  static createInterface(): IPaymentKernelInterface {
    return new utils.Interface(_abi) as IPaymentKernelInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPaymentKernel {
    return new Contract(address, _abi, signerOrProvider) as IPaymentKernel;
  }
}