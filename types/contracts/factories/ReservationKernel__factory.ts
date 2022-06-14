/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ReservationKernel,
  ReservationKernelInterface,
} from "../ReservationKernel";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "routerAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "goodKernel",
        type: "address",
      },
      {
        internalType: "address",
        name: "reservationTokenFactory",
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
    inputs: [],
    name: "ReservationCreated",
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
        ],
        internalType: "struct AcceptReservationInput",
        name: "acceptReservationInput",
        type: "tuple",
      },
    ],
    name: "acceptReservation",
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
            name: "tokenAmounts",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "guests",
            type: "address[]",
          },
        ],
        internalType: "struct AcceptReservationInviteInput",
        name: "acceptReservationInviteInput",
        type: "tuple",
      },
    ],
    name: "acceptReservationInvite",
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
            name: "reservationId",
            type: "uint256",
          },
        ],
        internalType: "struct CancelReservationInput",
        name: "cancelReservationInput",
        type: "tuple",
      },
    ],
    name: "cancelReservation",
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
    outputs: [
      {
        internalType: "uint256",
        name: "mintedReservationId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mintedReservationAmount",
        type: "uint256",
      },
      {
        internalType: "enum ReservationState",
        name: "mintedReservationState",
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
            name: "reservationId",
            type: "uint256",
          },
        ],
        internalType: "struct DenyReservationInput",
        name: "denyReservationInput",
        type: "tuple",
      },
    ],
    name: "denyReservation",
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
            name: "reservationId",
            type: "uint256",
          },
        ],
        internalType: "struct DenyReservationInviteInput",
        name: "denyReservationInviteInput",
        type: "tuple",
      },
    ],
    name: "denyReservationInvite",
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
    inputs: [],
    name: "router",
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
    stateMutability: "pure",
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
  "0x608060405234801561001057600080fd5b50604051610efd380380610efd83398101604081905261002f916100f3565b8261003933610087565b6000805460ff60a01b19169055600180546001600160a01b03199081166001600160a01b03938416179091556002805482169483169490941790935560048054909316911617905550610136565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146100ee57600080fd5b919050565b60008060006060848603121561010857600080fd5b610111846100d7565b925061011f602085016100d7565b915061012d604085016100d7565b90509250925092565b610db8806101456000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063aedc7a151161008c578063c72d0fef11610066578063c72d0fef146101f0578063e90135f514610203578063f2fde38b14610216578063f887ea401461022957600080fd5b8063aedc7a15146101bb578063bd873bb914610185578063c5c2c342146101ce57600080fd5b8063715018a6116100c8578063715018a6146101755780638456cb591461017d5780638d87e093146101855780638da5cb5b1461019657600080fd5b806301ffc9a7146100ef5780633f4ba83a146101595780635c975abb14610163575b600080fd5b6101446100fd3660046108e7565b7fffffffff00000000000000000000000000000000000000000000000000000000167fce2f3b04000000000000000000000000000000000000000000000000000000001490565b60405190151581526020015b60405180910390f35b61016161023a565b005b600054600160a01b900460ff16610144565b6101616102de565b610161610342565b610161610193366004610929565b50565b6000546001600160a01b03165b6040516001600160a01b039091168152602001610150565b6101616101c9366004610929565b6103df565b6101e16101dc366004610980565b61047a565b60405161015093929190610cdf565b6101616101fe366004610945565b610544565b610161610211366004610929565b6105ac565b6101616102243660046108c5565b6105ff565b6001546001600160a01b03166101a3565b6000546001600160a01b031633148061025d57506001546001600160a01b031633145b6102d45760405162461bcd60e51b815260206004820152603a60248201527f476f6f644b65726e656c3a2043616c6c6572206973206e6f7420746865206f7760448201527f6e6572206f722074686520526f7574657220636f6e747261637400000000000060648201526084015b60405180910390fd5b6102dc6106de565b565b6000546001600160a01b031633146103385760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102cb565b6102dc60006106e6565b6000546001600160a01b031633148061036557506001546001600160a01b031633145b6103d75760405162461bcd60e51b815260206004820152603a60248201527f476f6f644b65726e656c3a2043616c6c6572206973206e6f7420746865206f7760448201527f6e6572206f722074686520526f7574657220636f6e747261637400000000000060648201526084016102cb565b6102dc61074e565b600480546003546040517f90306f7500000000000000000000000000000000000000000000000000000000815273__$3ef455e4585acf92b886fe7a401e81d617$__936390306f75936104479360059388936001600160a01b03938416939092169101610b69565b60006040518083038186803b15801561045f57600080fd5b505af4158015610473573d6000803e3d6000fd5b5050505050565b6002546003546040517f2a9c12bf0000000000000000000000000000000000000000000000000000000081526000928392839273__$3ef455e4585acf92b886fe7a401e81d617$__92632a9c12bf926104e9926005928a926001600160a01b0391821692911690600401610b9f565b604080518083038186803b15801561050057600080fd5b505af4158015610514573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053891906109bc565b90959094509092509050565b6002546003546040517f65d1c4d300000000000000000000000000000000000000000000000000000000815273__$3ef455e4585acf92b886fe7a401e81d617$__926365d1c4d3926104479260059287926001600160a01b0391821692911690600401610a95565b6040517fca75f77f00000000000000000000000000000000000000000000000000000000815273__$3ef455e4585acf92b886fe7a401e81d617$__9063ca75f77f90610447906005908590600401610ccb565b6000546001600160a01b031633146106595760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102cb565b6001600160a01b0381166106d55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016102cb565b610193816106e6565b6102dc610756565b600080546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6102dc6107fc565b600054600160a01b900460ff166107af5760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016102cb565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600054600160a01b900460ff16156108565760405162461bcd60e51b815260206004820152601060248201527f5061757361626c653a207061757365640000000000000000000000000000000060448201526064016102cb565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586107df3390565b80356001600160a01b03811681146108a857600080fd5b919050565b6000604082840312156108bf57600080fd5b50919050565b6000602082840312156108d757600080fd5b6108e082610891565b9392505050565b6000602082840312156108f957600080fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146108e057600080fd5b60006040828403121561093b57600080fd5b6108e083836108ad565b60006020828403121561095757600080fd5b813567ffffffffffffffff81111561096e57600080fd5b820160a081850312156108e057600080fd5b60006020828403121561099257600080fd5b813567ffffffffffffffff8111156109a957600080fd5b820161012081850312156108e057600080fd5b600080604083850312156109cf57600080fd5b505080516020909101519092909150565b8183526000602080850194508260005b85811015610a1c576001600160a01b03610a0983610891565b16875295820195908201906001016109f0565b509495945050505050565b81835260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff831115610a5957600080fd5b8260051b8083602087013760009401602001938452509192915050565b6001600160a01b03610a8782610891565b168252602090810135910152565b848152608060208201526001600160a01b03610ab085610891565b166080820152602084013560a08201526000610acf6040860186610d32565b60a060c0850152610ae5610120850182846109e0565b915050610af56060870187610d32565b607f19808685030160e0870152610b0d848385610a27565b9350610b1c60808a018a610d32565b93509150808685030161010087015250610b378383836109e0565b9350505050610b5160408301856001600160a01b03169052565b6001600160a01b038316606083015295945050505050565b84815260a08101610b7d6020830186610a76565b6001600160a01b03808516606084015280841660808401525095945050505050565b84815260806020820152610bc660808201610bb986610891565b6001600160a01b03169052565b602084013560a0820152604084013560c08201526000610be96060860186610d32565b6101208060e0860152610c016101a086018385610a27565b9250610c0f60808901610891565b9150610100610c28818701846001600160a01b03169052565b610c3560a08a018a610d32565b9350607f19808887030184890152610c4e8686846109e0565b9550610c5d60c08c018c610d32565b955093508088870301610140890152610c77868686610a27565b9550610c8660e08c018c610d32565b955093508088870301610160890152610ca08686866109e0565b9550610cae838c018c610d32565b955093508088870301610180890152505050610b378383836109e0565b828152606081016108e06020830184610a76565b838152602081018390526060810160058310610d24577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826040830152949350505050565b6000808335601e19843603018112610d4957600080fd5b830160208101925035905067ffffffffffffffff811115610d6957600080fd5b8060051b3603831315610d7b57600080fd5b925092905056fea26469706673582212204ff1330ddedf8d58dee96c36c4adf5e7be6c55f9d8361bf4e157890889fc43e664736f6c63430008050033";

type ReservationKernelConstructorParams =
  | [linkLibraryAddresses: ReservationKernelLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ReservationKernelConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class ReservationKernel__factory extends ContractFactory {
  constructor(...args: ReservationKernelConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        ReservationKernel__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
    this.contractName = "ReservationKernel";
  }

  static linkBytecode(
    linkLibraryAddresses: ReservationKernelLibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$3ef455e4585acf92b886fe7a401e81d617\\$__", "g"),
      linkLibraryAddresses[
        "contracts/libraries/reservation/ReservationHelper.sol:ReservationHelper"
      ]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  deploy(
    routerAddress: string,
    goodKernel: string,
    reservationTokenFactory: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ReservationKernel> {
    return super.deploy(
      routerAddress,
      goodKernel,
      reservationTokenFactory,
      overrides || {}
    ) as Promise<ReservationKernel>;
  }
  getDeployTransaction(
    routerAddress: string,
    goodKernel: string,
    reservationTokenFactory: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      routerAddress,
      goodKernel,
      reservationTokenFactory,
      overrides || {}
    );
  }
  attach(address: string): ReservationKernel {
    return super.attach(address) as ReservationKernel;
  }
  connect(signer: Signer): ReservationKernel__factory {
    return super.connect(signer) as ReservationKernel__factory;
  }
  static readonly contractName: "ReservationKernel";
  public readonly contractName: "ReservationKernel";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReservationKernelInterface {
    return new utils.Interface(_abi) as ReservationKernelInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReservationKernel {
    return new Contract(address, _abi, signerOrProvider) as ReservationKernel;
  }
}

export interface ReservationKernelLibraryAddresses {
  ["contracts/libraries/reservation/ReservationHelper.sol:ReservationHelper"]: string;
}
