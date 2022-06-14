/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC1155, ERC1155Interface } from "../ERC1155";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
        type: "string",
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
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200179b3803806200179b833981016040819052620000349162000105565b6200003f8162000046565b5062000234565b80516200005b9060029060208401906200005f565b5050565b8280546200006d90620001e1565b90600052602060002090601f016020900481019282620000915760008555620000dc565b82601f10620000ac57805160ff1916838001178555620000dc565b82800160010185558215620000dc579182015b82811115620000dc578251825591602001919060010190620000bf565b50620000ea929150620000ee565b5090565b5b80821115620000ea5760008155600101620000ef565b600060208083850312156200011957600080fd5b82516001600160401b03808211156200013157600080fd5b818501915085601f8301126200014657600080fd5b8151818111156200015b576200015b6200021e565b604051601f8201601f19908116603f011681019083821181831017156200018657620001866200021e565b8160405282815288868487010111156200019f57600080fd5b600093505b82841015620001c35784840186015181850187015292850192620001a4565b82841115620001d55760008684830101525b98975050505050505050565b600181811c90821680620001f657607f821691505b602082108114156200021857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b61155780620002446000396000f3fe608060405234801561001057600080fd5b50600436106100875760003560e01c80634e1273f41161005b5780634e1273f41461010a578063a22cb4651461012a578063e985e9c51461013d578063f242432a1461017957600080fd5b8062fdd58e1461008c57806301ffc9a7146100b25780630e89341c146100d55780632eb2c2d6146100f5575b600080fd5b61009f61009a36600461108f565b61018c565b6040519081526020015b60405180910390f35b6100c56100c036600461118a565b610235565b60405190151581526020016100a9565b6100e86100e33660046111cb565b6102d2565b6040516100a9919061134e565b610108610103366004610f44565b610366565b005b61011d6101183660046110b9565b610408565b6040516100a9919061130d565b610108610138366004611053565b610546565b6100c561014b366004610f11565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b610108610187366004610fee565b610555565b60006001600160a01b03831661020f5760405162461bcd60e51b815260206004820152602b60248201527f455243313135353a2062616c616e636520717565727920666f7220746865207a60448201527f65726f206164647265737300000000000000000000000000000000000000000060648201526084015b60405180910390fd5b506000908152602081815260408083206001600160a01b03949094168352929052205490565b60006001600160e01b031982167fd9b67a2600000000000000000000000000000000000000000000000000000000148061029857506001600160e01b031982167f0e89341c00000000000000000000000000000000000000000000000000000000145b806102cc57507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b6060600280546102e19061139d565b80601f016020809104026020016040519081016040528092919081815260200182805461030d9061139d565b801561035a5780601f1061032f5761010080835404028352916020019161035a565b820191906000526020600020905b81548152906001019060200180831161033d57829003601f168201915b50505050509050919050565b6001600160a01b0385163314806103825750610382853361014b565b6103f45760405162461bcd60e51b815260206004820152603260248201527f455243313135353a207472616e736665722063616c6c6572206973206e6f742060448201527f6f776e6572206e6f7220617070726f76656400000000000000000000000000006064820152608401610206565b61040185858585856105f0565b5050505050565b606081518351146104815760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e67746860448201527f206d69736d6174636800000000000000000000000000000000000000000000006064820152608401610206565b6000835167ffffffffffffffff81111561049d5761049d61144c565b6040519080825280602002602001820160405280156104c6578160200160208202803683370190505b50905060005b845181101561053e576105118582815181106104ea576104ea611436565b602002602001015185838151811061050457610504611436565b602002602001015161018c565b82828151811061052357610523611436565b602090810291909101015261053781611405565b90506104cc565b509392505050565b610551338383610863565b5050565b6001600160a01b0385163314806105715750610571853361014b565b6105e35760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260448201527f20617070726f76656400000000000000000000000000000000000000000000006064820152608401610206565b6104018585858585610958565b81518351146106675760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060448201527f6d69736d617463680000000000000000000000000000000000000000000000006064820152608401610206565b6001600160a01b0384166106cb5760405162461bcd60e51b815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604482015264647265737360d81b6064820152608401610206565b3360005b84518110156107f55760008582815181106106ec576106ec611436565b60200260200101519050600085838151811061070a5761070a611436565b602090810291909101810151600084815280835260408082206001600160a01b038e16835290935291909120549091508181101561079d5760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201526939103a3930b739b332b960b11b6064820152608401610206565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b168252812080548492906107da908490611385565b92505081905550505050806107ee90611405565b90506106cf565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610845929190611320565b60405180910390a461085b818787878787610aff565b505050505050565b816001600160a01b0316836001600160a01b031614156108eb5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c2073746174757360448201527f20666f722073656c6600000000000000000000000000000000000000000000006064820152608401610206565b6001600160a01b03838116600081815260016020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0384166109bc5760405162461bcd60e51b815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604482015264647265737360d81b6064820152608401610206565b336109d58187876109cc88610cb4565b61040188610cb4565b6000848152602081815260408083206001600160a01b038a16845290915290205483811015610a595760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201526939103a3930b739b332b960b11b6064820152608401610206565b6000858152602081815260408083206001600160a01b038b8116855292528083208785039055908816825281208054869290610a96908490611385565b909155505060408051868152602081018690526001600160a01b03808916928a821692918616917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4610af6828888888888610cff565b50505050505050565b6001600160a01b0384163b1561085b5760405163bc197c8160e01b81526001600160a01b0385169063bc197c8190610b43908990899088908890889060040161126c565b602060405180830381600087803b158015610b5d57600080fd5b505af1925050508015610b8d575060408051601f3d908101601f19168201909252610b8a918101906111ae565b60015b610c4357610b99611462565b806308c379a01415610bd35750610bae61147e565b80610bb95750610bd5565b8060405162461bcd60e51b8152600401610206919061134e565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e204552433131353560448201527f526563656976657220696d706c656d656e7465720000000000000000000000006064820152608401610206565b6001600160e01b0319811663bc197c8160e01b14610af65760405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a656374656044820152676420746f6b656e7360c01b6064820152608401610206565b60408051600180825281830190925260609160009190602080830190803683370190505090508281600081518110610cee57610cee611436565b602090810291909101015292915050565b6001600160a01b0384163b1561085b5760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190610d4390899089908890889088906004016112ca565b602060405180830381600087803b158015610d5d57600080fd5b505af1925050508015610d8d575060408051601f3d908101601f19168201909252610d8a918101906111ae565b60015b610d9957610b99611462565b6001600160e01b0319811663f23a6e6160e01b14610af65760405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a656374656044820152676420746f6b656e7360c01b6064820152608401610206565b80356001600160a01b0381168114610e2157600080fd5b919050565b600082601f830112610e3757600080fd5b81356020610e4482611361565b604051610e5182826113d8565b8381528281019150858301600585901b87018401881015610e7157600080fd5b60005b85811015610e9057813584529284019290840190600101610e74565b5090979650505050505050565b600082601f830112610eae57600080fd5b813567ffffffffffffffff811115610ec857610ec861144c565b604051610edf601f8301601f1916602001826113d8565b818152846020838601011115610ef457600080fd5b816020850160208301376000918101602001919091529392505050565b60008060408385031215610f2457600080fd5b610f2d83610e0a565b9150610f3b60208401610e0a565b90509250929050565b600080600080600060a08688031215610f5c57600080fd5b610f6586610e0a565b9450610f7360208701610e0a565b9350604086013567ffffffffffffffff80821115610f9057600080fd5b610f9c89838a01610e26565b94506060880135915080821115610fb257600080fd5b610fbe89838a01610e26565b93506080880135915080821115610fd457600080fd5b50610fe188828901610e9d565b9150509295509295909350565b600080600080600060a0868803121561100657600080fd5b61100f86610e0a565b945061101d60208701610e0a565b93506040860135925060608601359150608086013567ffffffffffffffff81111561104757600080fd5b610fe188828901610e9d565b6000806040838503121561106657600080fd5b61106f83610e0a565b91506020830135801515811461108457600080fd5b809150509250929050565b600080604083850312156110a257600080fd5b6110ab83610e0a565b946020939093013593505050565b600080604083850312156110cc57600080fd5b823567ffffffffffffffff808211156110e457600080fd5b818501915085601f8301126110f857600080fd5b8135602061110582611361565b60405161111282826113d8565b8381528281019150858301600585901b870184018b101561113257600080fd5b600096505b8487101561115c5761114881610e0a565b835260019690960195918301918301611137565b509650508601359250508082111561117357600080fd5b5061118085828601610e26565b9150509250929050565b60006020828403121561119c57600080fd5b81356111a781611508565b9392505050565b6000602082840312156111c057600080fd5b81516111a781611508565b6000602082840312156111dd57600080fd5b5035919050565b600081518084526020808501945080840160005b83811015611214578151875295820195908201906001016111f8565b509495945050505050565b6000815180845260005b8181101561124557602081850181015186830182015201611229565b81811115611257576000602083870101525b50601f01601f19169290920160200192915050565b60006001600160a01b03808816835280871660208401525060a0604083015261129860a08301866111e4565b82810360608401526112aa81866111e4565b905082810360808401526112be818561121f565b98975050505050505050565b60006001600160a01b03808816835280871660208401525084604083015283606083015260a0608083015261130260a083018461121f565b979650505050505050565b6020815260006111a760208301846111e4565b60408152600061133360408301856111e4565b828103602084015261134581856111e4565b95945050505050565b6020815260006111a7602083018461121f565b600067ffffffffffffffff82111561137b5761137b61144c565b5060051b60200190565b6000821982111561139857611398611420565b500190565b600181811c908216806113b157607f821691505b602082108114156113d257634e487b7160e01b600052602260045260246000fd5b50919050565b601f8201601f1916810167ffffffffffffffff811182821017156113fe576113fe61144c565b6040525050565b600060001982141561141957611419611420565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b600060033d111561147b5760046000803e5060005160e01c5b90565b600060443d101561148c5790565b6040516003193d81016004833e81513d67ffffffffffffffff81602484011181841117156114bc57505050505090565b82850191508151818111156114d45750505050505090565b843d87010160208285010111156114ee5750505050505090565b6114fd602082860101876113d8565b509095945050505050565b6001600160e01b03198116811461151e57600080fd5b5056fea26469706673582212200ccd135def4a1bfc8e605cc52d7a03fb81c97b792f0afed265fe443e3ccf991e64736f6c63430008050033";

type ERC1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155__factory extends ContractFactory {
  constructor(...args: ERC1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC1155";
  }

  deploy(
    uri_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC1155> {
    return super.deploy(uri_, overrides || {}) as Promise<ERC1155>;
  }
  getDeployTransaction(
    uri_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(uri_, overrides || {});
  }
  attach(address: string): ERC1155 {
    return super.attach(address) as ERC1155;
  }
  connect(signer: Signer): ERC1155__factory {
    return super.connect(signer) as ERC1155__factory;
  }
  static readonly contractName: "ERC1155";
  public readonly contractName: "ERC1155";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155Interface {
    return new utils.Interface(_abi) as ERC1155Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155 {
    return new Contract(address, _abi, signerOrProvider) as ERC1155;
  }
}