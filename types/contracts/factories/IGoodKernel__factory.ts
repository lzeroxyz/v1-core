/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IGoodKernel, IGoodKernelInterface } from "../IGoodKernel";

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
            internalType: "string",
            name: "tokenUri",
            type: "string",
          },
          {
            internalType: "address[]",
            name: "acceptedTokens",
            type: "address[]",
          },
        ],
        internalType: "struct CreateGoodInput",
        name: "createGoodInput",
        type: "tuple",
      },
    ],
    name: "createGood",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "enum GoodState",
        name: "state",
        type: "uint8",
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
            name: "from",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goodId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "capacity",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "tokenUri",
            type: "string",
          },
        ],
        internalType: "struct CreateGoodServiceInput",
        name: "createGoodServiceInput",
        type: "tuple",
      },
    ],
    name: "createGoodService",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "enum GoodServiceState",
        name: "",
        type: "uint8",
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
            name: "from",
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
            internalType: "string",
            name: "tokenUri",
            type: "string",
          },
          {
            internalType: "uint128",
            name: "start",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "end",
            type: "uint128",
          },
          {
            internalType: "enum GoodServiceVoucherDestructionType",
            name: "destructionType",
            type: "uint8",
          },
        ],
        internalType: "struct CreateGoodServiceVoucherInput",
        name: "createGoodServiceVoucherInput",
        type: "tuple",
      },
    ],
    name: "createGoodServiceVoucher",
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
        ],
        internalType: "struct GetGoodInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "getGood",
    outputs: [
      {
        components: [
          {
            internalType: "enum GoodState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "address[]",
            name: "acceptedTokens",
            type: "address[]",
          },
        ],
        internalType: "struct GetGoodOutput",
        name: "output",
        type: "tuple",
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
        ],
        internalType: "struct GetGoodServiceInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "getGoodService",
    outputs: [
      {
        components: [
          {
            internalType: "enum GoodState",
            name: "goodState",
            type: "uint8",
          },
          {
            internalType: "address[]",
            name: "goodAcceptedTokens",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "goodServiceCapacity",
            type: "uint256",
          },
          {
            internalType: "enum GoodServiceState",
            name: "goodServiceState",
            type: "uint8",
          },
        ],
        internalType: "struct GetGoodServiceOutput",
        name: "output",
        type: "tuple",
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
        ],
        internalType: "struct GetArrayGoodServiceVouchersInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "getGoodServiceVouchers",
    outputs: [
      {
        components: [
          {
            internalType: "enum GoodState",
            name: "goodState",
            type: "uint8",
          },
          {
            internalType: "address[]",
            name: "goodAcceptedTokens",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "goodServiceCapacity",
            type: "uint256",
          },
          {
            internalType: "enum GoodServiceState",
            name: "goodServiceState",
            type: "uint8",
          },
          {
            internalType: "uint128[]",
            name: "goodServiceVoucherStarts",
            type: "uint128[]",
          },
          {
            internalType: "uint128[]",
            name: "goodServiceVoucherEnds",
            type: "uint128[]",
          },
          {
            internalType: "uint256[]",
            name: "goodServiceVoucherAmounts",
            type: "uint256[]",
          },
          {
            internalType: "enum GoodServiceVoucherState[]",
            name: "goodServiceVoucherStates",
            type: "uint8[]",
          },
          {
            internalType: "enum GoodServiceVoucherDestructionType[]",
            name: "goodServiceVoucherDestructionTypes",
            type: "uint8[]",
          },
        ],
        internalType: "struct GetArrayGoodServiceVouchersOutput",
        name: "output",
        type: "tuple",
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
        ],
        internalType: "struct GetGoodServiceVouchersInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "getGoodServiceVouchers",
    outputs: [
      {
        components: [
          {
            internalType: "enum GoodState",
            name: "goodState",
            type: "uint8",
          },
          {
            internalType: "address[]",
            name: "goodAcceptedTokens",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "goodServiceCapacity",
            type: "uint256",
          },
          {
            internalType: "enum GoodServiceState",
            name: "goodServiceState",
            type: "uint8",
          },
          {
            internalType: "uint256[]",
            name: "goodServiceVoucherIds",
            type: "uint256[]",
          },
          {
            internalType: "uint128[]",
            name: "goodServiceVoucherStarts",
            type: "uint128[]",
          },
          {
            internalType: "uint128[]",
            name: "goodServiceVoucherEnds",
            type: "uint128[]",
          },
          {
            internalType: "uint256[]",
            name: "goodServiceVoucherAmounts",
            type: "uint256[]",
          },
          {
            internalType: "enum GoodServiceVoucherState[]",
            name: "goodServiceVoucherStates",
            type: "uint8[]",
          },
          {
            internalType: "enum GoodServiceVoucherDestructionType[]",
            name: "goodServiceVoucherDestructionTypes",
            type: "uint8[]",
          },
        ],
        internalType: "struct GetGoodServiceVouchersOutput",
        name: "output",
        type: "tuple",
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
            name: "goodOwner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goodId",
            type: "uint256",
          },
        ],
        internalType: "struct GetGoodServicesInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "getGoodServices",
    outputs: [
      {
        components: [
          {
            internalType: "enum GoodState",
            name: "goodState",
            type: "uint8",
          },
          {
            internalType: "address[]",
            name: "goodAcceptedTokens",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "goodServiceIds",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "goodServiceCapacities",
            type: "uint256[]",
          },
          {
            internalType: "enum GoodServiceState[]",
            name: "goodServiceStates",
            type: "uint8[]",
          },
        ],
        internalType: "struct GetGoodServicesOutput",
        name: "output",
        type: "tuple",
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
            name: "goodsOwner",
            type: "address",
          },
        ],
        internalType: "struct GetGoodsInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "getGoods",
    outputs: [
      {
        components: [
          {
            internalType: "uint256[]",
            name: "ids",
            type: "uint256[]",
          },
          {
            internalType: "enum GoodState[]",
            name: "states",
            type: "uint8[]",
          },
          {
            internalType: "address[][]",
            name: "acceptedTokens",
            type: "address[][]",
          },
        ],
        internalType: "struct GetGoodsOutput",
        name: "output",
        type: "tuple",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "goodId",
        type: "uint256",
      },
    ],
    name: "pauseGood",
    outputs: [],
    stateMutability: "nonpayable",
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
            name: "goodId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "goodServiceId",
            type: "uint256",
          },
        ],
        internalType: "struct PauseGoodServiceInput",
        name: "pauseGoodServiceInput",
        type: "tuple",
      },
    ],
    name: "pauseGoodService",
    outputs: [],
    stateMutability: "nonpayable",
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
            name: "goodId",
            type: "uint256",
          },
        ],
        internalType: "struct RemoveGoodInput",
        name: "removeGoodInput",
        type: "tuple",
      },
    ],
    name: "removeGood",
    outputs: [],
    stateMutability: "nonpayable",
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
            name: "goodId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "goodServiceId",
            type: "uint256",
          },
        ],
        internalType: "struct RemoveGoodServiceInput",
        name: "removeGoodServiceInput",
        type: "tuple",
      },
    ],
    name: "removeGoodService",
    outputs: [],
    stateMutability: "nonpayable",
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
            name: "goodId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "goodServiceId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "goodServiceVoucherId",
            type: "uint256",
          },
        ],
        internalType: "struct RemoveGoodServiceVoucherInput",
        name: "removeGoodServiceVoucherInput",
        type: "tuple",
      },
    ],
    name: "removeGoodServiceVoucher",
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
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "goodId",
        type: "uint256",
      },
    ],
    name: "unpauseGood",
    outputs: [],
    stateMutability: "nonpayable",
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
            name: "goodId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "goodServiceId",
            type: "uint256",
          },
        ],
        internalType: "struct UnPauseGoodServiceInput",
        name: "unpauseGoodServiceInput",
        type: "tuple",
      },
    ],
    name: "unpauseGoodService",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IGoodKernel__factory {
  static readonly abi = _abi;
  static createInterface(): IGoodKernelInterface {
    return new utils.Interface(_abi) as IGoodKernelInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGoodKernel {
    return new Contract(address, _abi, signerOrProvider) as IGoodKernel;
  }
}