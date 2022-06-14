/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { LZeroRouter, LZeroRouterInterface } from "../LZeroRouter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "goodKernelAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "burnGood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "createGood",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "createGoods",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "goodOwner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goodId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "goodServiceId",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "goodServiceVoucherIds",
            type: "uint256[]",
          },
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "tokenAddresses",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "tokenAmounts",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "payers",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "guests",
            type: "address[]",
          },
        ],
        internalType: "struct CreateReservationInput",
        name: "createReservationInput",
        type: "tuple",
      },
    ],
    name: "createReservation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "goodKernelAddress",
        type: "address",
      },
    ],
    name: "setGoodKernel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610a83380380610a8383398101604081905261002f916100ba565b6100383361006a565b6000805460ff60a01b19169055600180546001600160a01b0319166001600160a01b03929092169190911790556100ea565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100cc57600080fd5b81516001600160a01b03811681146100e357600080fd5b9392505050565b61098a806100f96000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c80638da5cb5b11610081578063c5c2c3421161005b578063c5c2c34214610158578063c793bf9714610166578063f2fde38b1461017557600080fd5b80638da5cb5b1461011b5780639f41872b14610136578063b6ae61141461014557600080fd5b80635c975abb116100b25780635c975abb146100e9578063715018a61461010b5780638456cb591461011357600080fd5b806301f51b50146100ce5780633f4ba83a146100e1575b600080fd5b6100df6100dc3660046108f7565b50565b005b6100df610188565b600054600160a01b900460ff1660405190151581526020015b60405180910390f35b6100df610259565b6100df6102bd565b6000546040516001600160a01b039091168152602001610102565b60606040516101029190610910565b6100df610153366004610869565b610387565b6100df6100dc3660046108bb565b60405160008152602001610102565b6100df610183366004610869565b610531565b6000546001600160a01b031633146101e75760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b600160009054906101000a90046001600160a01b03166001600160a01b0316633f4ba83a6040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561023757600080fd5b505af115801561024b573d6000803e3d6000fd5b50505050610257610610565b565b6000546001600160a01b031633146102b35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101de565b61025760006106b6565b6000546001600160a01b031633146103175760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101de565b600160009054906101000a90046001600160a01b03166001600160a01b0316638456cb596040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561036757600080fd5b505af115801561037b573d6000803e3d6000fd5b50505050610257610713565b6000546001600160a01b031633146103e15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101de565b6103f3816001600160a01b03166107a8565b61048c5760405162461bcd60e51b8152602060048201526044602482018190527f4c5a65726f526f757465723a204e6577204b65726e656c206164647265737320908201527f6973206e6f7420612076616c6964204b65726e656c20696d706c656d656e746160648201527f74696f6e00000000000000000000000000000000000000000000000000000000608482015260a4016101de565b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b038316179055600054600160a01b900460ff16156100dc57600160009054906101000a90046001600160a01b03166001600160a01b0316638456cb596040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561051657600080fd5b505af115801561052a573d6000803e3d6000fd5b5050505050565b6000546001600160a01b0316331461058b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101de565b6001600160a01b0381166106075760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016101de565b6100dc816106b6565b600054600160a01b900460ff166106695760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016101de565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600054600160a01b900460ff161561076d5760405162461bcd60e51b815260206004820152601060248201527f5061757361626c653a207061757365640000000000000000000000000000000060448201526064016101de565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586106993390565b60006001600160a01b038216158015906107cb57506001600160a01b0382163b15155b801561086357506040517f01ffc9a7000000000000000000000000000000000000000000000000000000008152600060048201526001600160a01b038316906301ffc9a79060240160206040518083038186803b15801561082b57600080fd5b505afa15801561083f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108639190610899565b92915050565b60006020828403121561087b57600080fd5b81356001600160a01b038116811461089257600080fd5b9392505050565b6000602082840312156108ab57600080fd5b8151801515811461089257600080fd5b6000602082840312156108cd57600080fd5b813567ffffffffffffffff8111156108e457600080fd5b8201610120818503121561089257600080fd5b60006020828403121561090957600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156109485783518352928401929184019160010161092c565b5090969550505050505056fea2646970667358221220a538d23d23f9e6d46f7435acac5fc400b7350fc2629445c7d0fb7eb01c6680e864736f6c63430008050033";

type LZeroRouterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LZeroRouterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LZeroRouter__factory extends ContractFactory {
  constructor(...args: LZeroRouterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "LZeroRouter";
  }

  deploy(
    goodKernelAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LZeroRouter> {
    return super.deploy(
      goodKernelAddress,
      overrides || {}
    ) as Promise<LZeroRouter>;
  }
  getDeployTransaction(
    goodKernelAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(goodKernelAddress, overrides || {});
  }
  attach(address: string): LZeroRouter {
    return super.attach(address) as LZeroRouter;
  }
  connect(signer: Signer): LZeroRouter__factory {
    return super.connect(signer) as LZeroRouter__factory;
  }
  static readonly contractName: "LZeroRouter";
  public readonly contractName: "LZeroRouter";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LZeroRouterInterface {
    return new utils.Interface(_abi) as LZeroRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LZeroRouter {
    return new Contract(address, _abi, signerOrProvider) as LZeroRouter;
  }
}