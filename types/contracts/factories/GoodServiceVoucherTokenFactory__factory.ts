/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  GoodServiceVoucherTokenFactory,
  GoodServiceVoucherTokenFactoryInterface,
} from "../GoodServiceVoucherTokenFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "globalUri",
        type: "string",
      },
      {
        internalType: "address",
        name: "kernelAddress",
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
        name: "from",
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
    ],
    name: "burn",
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "burnBatch",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "kernel",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "tokenUri",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "tokenUris",
        type: "string[]",
      },
    ],
    name: "mintBatch",
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
        internalType: "address",
        name: "newKernel",
        type: "address",
      },
    ],
    name: "setKernel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "tokenUri",
        type: "string",
      },
    ],
    name: "setTokenUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newuri",
        type: "string",
      },
    ],
    name: "setUri",
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
    name: "totalTokens",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
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
  "0x608060405260006005553480156200001657600080fd5b50604051620033c9380380620033c98339810160408190526200003991620001bb565b8082620000468162000085565b506003805460ff191690556200005c336200009e565b600480546001600160a01b0319166001600160a01b039290921691909117905550620002ff9050565b80516200009a906002906020840190620000f8565b5050565b600380546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b8280546200010690620002ac565b90600052602060002090601f0160209004810192826200012a576000855562000175565b82601f106200014557805160ff191683800117855562000175565b8280016001018555821562000175579182015b828111156200017557825182559160200191906001019062000158565b506200018392915062000187565b5090565b5b8082111562000183576000815560010162000188565b80516001600160a01b0381168114620001b657600080fd5b919050565b60008060408385031215620001cf57600080fd5b82516001600160401b0380821115620001e757600080fd5b818501915085601f830112620001fc57600080fd5b815181811115620002115762000211620002e9565b604051601f8201601f19908116603f011681019083821181831017156200023c576200023c620002e9565b816040528281526020935088848487010111156200025957600080fd5b600091505b828210156200027d57848201840151818301850152908301906200025e565b828211156200028f5760008484830101525b9550620002a19150508582016200019e565b925050509250929050565b600181811c90821680620002c157607f821691505b60208210811415620002e357634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6130ba806200030f6000396000f3fe608060405234801561001057600080fd5b506004361061018c5760003560e01c80637e1c0c09116100e3578063d3fc98641161008c578063f242432a11610066578063f242432a14610354578063f2fde38b14610367578063f5298aca1461037a57600080fd5b8063d3fc9864146102f4578063d4aae0c414610307578063e985e9c51461031857600080fd5b80639b642de1116100bd5780639b642de1146102bb578063a22cb465146102ce578063cc81203c146102e157600080fd5b80637e1c0c09146102805780638456cb59146102895780638da5cb5b1461029157600080fd5b80633f4ba83a116101455780635c975abb1161011f5780635c975abb1461025d5780636b20c45414610265578063715018a61461027857600080fd5b80633f4ba83a1461022f5780634e1273f41461023757806357f7789e1461024a57600080fd5b80630e89341c116101765780630e89341c146101da578063146d9ddc146101fa5780632eb2c2d61461021a57600080fd5b8062fdd58e1461019157806301ffc9a7146101b7575b600080fd5b6101a461019f366004612ae5565b61038d565b6040519081526020015b60405180910390f35b6101ca6101c5366004612c7d565b610436565b60405190151581526020016101ae565b6101ed6101e8366004612cec565b61048d565b6040516101ae9190612eac565b61020d610208366004612942565b61055c565b6040516101ae9190612e6b565b61022d610228366004612833565b61062c565b005b61022d6106fa565b61020d610245366004612b8f565b6107b2565b61022d610258366004612d05565b6108f0565b6101ca610986565b61022d610273366004612a3a565b610999565b61022d610a5e565b6101a460055481565b61022d610ac8565b60035461010090046001600160a01b03165b6040516001600160a01b0390911681526020016101ae565b61022d6102c9366004612cb7565b610b7e565b61022d6102dc366004612aae565b610c38565b61022d6102ef3660046127e5565b610c47565b6101a4610302366004612b0f565b610d04565b6004546001600160a01b03166102a3565b6101ca610326366004612800565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b61022d6103623660046128dd565b610dcc565b61022d6103753660046127e5565b610e93565b61022d610388366004612b5c565b610f78565b60006001600160a01b0383166104105760405162461bcd60e51b815260206004820152602b60248201527f455243313135353a2062616c616e636520717565727920666f7220746865207a60448201527f65726f206164647265737300000000000000000000000000000000000000000060648201526084015b60405180910390fd5b506000908152602081815260408083206001600160a01b03949094168352929052205490565b60006001600160e01b03198216158061047857506001600160e01b031982167f7281278100000000000000000000000000000000000000000000000000000000145b8061048757506104878261103d565b92915050565b600081815260066020526040902080546060919081906104ac90612efb565b151590506104c4576104bd836110bf565b9392505050565b8080546104d090612efb565b80601f01602080910402602001604051908101604052809291908181526020018280546104fc90612efb565b80156105495780601f1061051e57610100808354040283529160200191610549565b820191906000526020600020905b81548152906001019060200180831161052c57829003601f168201915b5050505050915050919050565b50919050565b6004546060906001600160a01b0316336001600160a01b0316146105d15760405162461bcd60e51b815260206004820152602660248201527f4b65726e61626c653a2063616c6c2066726f6d206f757473696465207468652060448201526512d95c9b995b60d21b6064820152608401610407565b6105d9610986565b156106195760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610407565b610624848484611153565b949350505050565b6004546001600160a01b0316336001600160a01b03161461069e5760405162461bcd60e51b815260206004820152602660248201527f4b65726e61626c653a2063616c6c2066726f6d206f757473696465207468652060448201526512d95c9b995b60d21b6064820152608401610407565b6106a6610986565b156106e65760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610407565b6106f3858585858561131d565b5050505050565b60035461010090046001600160a01b03166001600160a01b0316336001600160a01b0316148061073457506004546001600160a01b031633145b6107a8576040805162461bcd60e51b81526020600482015260248101919091527f476f6f64546f6b656e466163746f72793a2043616c6c6572206973206e6f742060448201527f746865206f776e6572206f7220746865204b65726e656c20636f6e74726163746064820152608401610407565b6107b061157b565b565b6060815183511461082b5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e67746860448201527f206d69736d6174636800000000000000000000000000000000000000000000006064820152608401610407565b6000835167ffffffffffffffff81111561084757610847612fa4565b604051908082528060200260200182016040528015610870578160200160208202803683370190505b50905060005b84518110156108e8576108bb85828151811061089457610894612f8e565b60200260200101518583815181106108ae576108ae612f8e565b602002602001015161038d565b8282815181106108cd576108cd612f8e565b60209081029190910101526108e181612f5d565b9050610876565b509392505050565b6004546001600160a01b0316336001600160a01b0316146109625760405162461bcd60e51b815260206004820152602660248201527f4b65726e61626c653a2063616c6c2066726f6d206f757473696465207468652060448201526512d95c9b995b60d21b6064820152608401610407565b600082815260066020908152604090912082516109819284019061260f565b505050565b600061099460035460ff1690565b905090565b6004546001600160a01b0316336001600160a01b031614610a0b5760405162461bcd60e51b815260206004820152602660248201527f4b65726e61626c653a2063616c6c2066726f6d206f757473696465207468652060448201526512d95c9b995b60d21b6064820152608401610407565b610a13610986565b15610a535760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610407565b610981838383611619565b6003546001600160a01b03610100909104163314610abe5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610407565b6107b060006116b9565b60035461010090046001600160a01b03166001600160a01b0316336001600160a01b03161480610b0257506004546001600160a01b031633145b610b76576040805162461bcd60e51b81526020600482015260248101919091527f476f6f64546f6b656e466163746f72793a2043616c6c6572206973206e6f742060448201527f746865206f776e6572206f7220746865204b65726e656c20636f6e74726163746064820152608401610407565b6107b061172a565b60035461010090046001600160a01b03166001600160a01b0316336001600160a01b03161480610bb857506004546001600160a01b031633145b610c2c576040805162461bcd60e51b81526020600482015260248101919091527f476f6f64546f6b656e466163746f72793a2043616c6c6572206973206e6f742060448201527f746865206f776e6572206f7220746865204b65726e656c20636f6e74726163746064820152608401610407565b610c35816117a7565b50565b610c433383836117ba565b5050565b6003546001600160a01b03610100909104163314610ca75760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610407565b610caf610986565b610cfb5760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f74207061757365640000000000000000000000006044820152606401610407565b610c35816118af565b6004546000906001600160a01b0316336001600160a01b031614610d795760405162461bcd60e51b815260206004820152602660248201527f4b65726e61626c653a2063616c6c2066726f6d206f757473696465207468652060448201526512d95c9b995b60d21b6064820152608401610407565b610d81610986565b15610dc15760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610407565b610624848484611993565b6004546001600160a01b0316336001600160a01b031614610e3e5760405162461bcd60e51b815260206004820152602660248201527f4b65726e61626c653a2063616c6c2066726f6d206f757473696465207468652060448201526512d95c9b995b60d21b6064820152608401610407565b610e46610986565b15610e865760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610407565b6106f38585858585611a07565b6003546001600160a01b03610100909104163314610ef35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610407565b6001600160a01b038116610f6f5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610407565b610c35816116b9565b6004546001600160a01b0316336001600160a01b031614610fea5760405162461bcd60e51b815260206004820152602660248201527f4b65726e61626c653a2063616c6c2066726f6d206f757473696465207468652060448201526512d95c9b995b60d21b6064820152608401610407565b610ff2610986565b156110325760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610407565b610981838383611bae565b60006001600160e01b031982167fd9b67a260000000000000000000000000000000000000000000000000000000014806110a057506001600160e01b031982167f0e89341c00000000000000000000000000000000000000000000000000000000145b8061048757506301ffc9a760e01b6001600160e01b0319831614610487565b6060600280546110ce90612efb565b80601f01602080910402602001604051908101604052809291908181526020018280546110fa90612efb565b80156111475780601f1061111c57610100808354040283529160200191611147565b820191906000526020600020905b81548152906001019060200180831161112a57829003601f168201915b50505050509050919050565b606082518251146111cc5760405162461bcd60e51b815260206004820152603f60248201527f476f6f6453657276696365566f7563686572546f6b656e466163746f72793a2060448201527f55726973206c656e67746820616e6420616d6f756e74206d69736d61746368006064820152608401610407565b825167ffffffffffffffff8111156111e6576111e6612fa4565b60405190808252806020026020018201604052801561120f578160200160208202803683370190505b506005549091508060005b835181116112c55761122b83612f5d565b92508291508184828151811061124357611243612f8e565b60200260200101818152505084818151811061126157611261612f8e565b6020026020010151516000146112b35784818151811061128357611283612f8e565b60200260200101516006600084815260200190815260200160002090805190602001906112b192919061260f565b505b806112bd81612f5d565b91505061121a565b5084516005805490910190556113148684876000368080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611bf092505050565b50509392505050565b815183511461137f5760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206044820152670dad2e6dac2e8c6d60c31b6064820152608401610407565b6001600160a01b0384166113e35760405162461bcd60e51b815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604482015264647265737360d81b6064820152608401610407565b3360005b845181101561150d57600085828151811061140457611404612f8e565b60200260200101519050600085838151811061142257611422612f8e565b602090810291909101810151600084815280835260408082206001600160a01b038e1683529093529190912054909150818110156114b55760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201526939103a3930b739b332b960b11b6064820152608401610407565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b168252812080548492906114f2908490612ee3565b925050819055505050508061150690612f5d565b90506113e7565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb878760405161155d929190612e7e565b60405180910390a4611573818787878787611db2565b505050505050565b611583610986565b6115cf5760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f74207061757365640000000000000000000000006044820152606401610407565b6003805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b60005b82518110156116ad576006600084838151811061163b5761163b612f8e565b60200260200101518152602001908152602001600020805461165c90612efb565b15905061169b576006600084838151811061167957611679612f8e565b60200260200101518152602001908152602001600020600061169b9190612693565b806116a581612f5d565b91505061161c565b50610981838383611f67565b600380546001600160a01b038381166101008181027fffffffffffffffffffffff0000000000000000000000000000000000000000ff85161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b611732610986565b156117725760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610407565b6003805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586115fc3390565b8051610c4390600290602084019061260f565b816001600160a01b0316836001600160a01b031614156118425760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c2073746174757360448201527f20666f722073656c6600000000000000000000000000000000000000000000006064820152608401610407565b6001600160a01b03838116600081815260016020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6118c1816001600160a01b031661219c565b6119595760405162461bcd60e51b815260206004820152604160248201527f4b65726e61626c653a204e6577204b65726e656c20616464726573732069732060448201527f6e6f7420612076616c6964204b65726e656c20696d706c656d656e746174696f60648201527f6e00000000000000000000000000000000000000000000000000000000000000608482015260a401610407565b600480547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b60058054600101908190556119e18482856000368080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061223e92505050565b8151156104bd57600081815260066020908152604090912083516108e89285019061260f565b6001600160a01b038416611a6b5760405162461bcd60e51b815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604482015264647265737360d81b6064820152608401610407565b33611a84818787611a7b8861233f565b6106f38861233f565b6000848152602081815260408083206001600160a01b038a16845290915290205483811015611b085760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201526939103a3930b739b332b960b11b6064820152608401610407565b6000858152602081815260408083206001600160a01b038b8116855292528083208785039055908816825281208054869290611b45908490612ee3565b909155505060408051868152602081018690526001600160a01b03808916928a821692918616917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4611ba582888888888861238a565b50505050505050565b611bb9838383612495565b60008281526006602052604090208054611bd290612efb565b15905061098157600082815260066020526040812061098191612693565b6001600160a01b038416611c505760405162461bcd60e51b815260206004820152602160248201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736044820152607360f81b6064820152608401610407565b8151835114611cb25760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206044820152670dad2e6dac2e8c6d60c31b6064820152608401610407565b3360005b8451811015611d4e57838181518110611cd157611cd1612f8e565b6020026020010151600080878481518110611cee57611cee612f8e565b602002602001015181526020019081526020016000206000886001600160a01b03166001600160a01b031681526020019081526020016000206000828254611d369190612ee3565b90915550819050611d4681612f5d565b915050611cb6565b50846001600160a01b031660006001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051611d9f929190612e7e565b60405180910390a46106f3816000878787875b6001600160a01b0384163b156115735760405163bc197c8160e01b81526001600160a01b0385169063bc197c8190611df69089908990889088908890600401612dca565b602060405180830381600087803b158015611e1057600080fd5b505af1925050508015611e40575060408051601f3d908101601f19168201909252611e3d91810190612c9a565b60015b611ef657611e4c612fba565b806308c379a01415611e865750611e61612fd6565b80611e6c5750611e88565b8060405162461bcd60e51b81526004016104079190612eac565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e204552433131353560448201527f526563656976657220696d706c656d656e7465720000000000000000000000006064820152608401610407565b6001600160e01b0319811663bc197c8160e01b14611ba55760405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a656374656044820152676420746f6b656e7360c01b6064820152608401610407565b6001600160a01b038316611fc95760405162461bcd60e51b815260206004820152602360248201527f455243313135353a206275726e2066726f6d20746865207a65726f206164647260448201526265737360e81b6064820152608401610407565b805182511461202b5760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206044820152670dad2e6dac2e8c6d60c31b6064820152608401610407565b604080516020810190915260009081905233905b835181101561213d57600084828151811061205c5761205c612f8e565b60200260200101519050600084838151811061207a5761207a612f8e565b602090810291909101810151600084815280835260408082206001600160a01b038c1683529093529190912054909150818110156121065760405162461bcd60e51b8152602060048201526024808201527f455243313135353a206275726e20616d6f756e7420657863656564732062616c604482015263616e636560e01b6064820152608401610407565b6000928352602083815260408085206001600160a01b038b168652909152909220910390558061213581612f5d565b91505061203f565b5060006001600160a01b0316846001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb868660405161218e929190612e7e565b60405180910390a450505050565b60006001600160a01b038216158015906121bf57506001600160a01b0382163b15155b801561048757506040516301ffc9a760e01b8152600060048201526001600160a01b038316906301ffc9a79060240160206040518083038186803b15801561220657600080fd5b505afa15801561221a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104879190612c60565b6001600160a01b03841661229e5760405162461bcd60e51b815260206004820152602160248201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736044820152607360f81b6064820152608401610407565b336122af81600087611a7b8861233f565b6000848152602081815260408083206001600160a01b0389168452909152812080548592906122df908490612ee3565b909155505060408051858152602081018590526001600160a01b0380881692600092918516917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46106f38160008787878761238a565b6040805160018082528183019092526060916000919060208083019080368337019050509050828160008151811061237957612379612f8e565b602090810291909101015292915050565b6001600160a01b0384163b156115735760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e61906123ce9089908990889088908890600401612e28565b602060405180830381600087803b1580156123e857600080fd5b505af1925050508015612418575060408051601f3d908101601f1916820190925261241591810190612c9a565b60015b61242457611e4c612fba565b6001600160e01b0319811663f23a6e6160e01b14611ba55760405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a656374656044820152676420746f6b656e7360c01b6064820152608401610407565b6001600160a01b0383166124f75760405162461bcd60e51b815260206004820152602360248201527f455243313135353a206275726e2066726f6d20746865207a65726f206164647260448201526265737360e81b6064820152608401610407565b33612527818560006125088761233f565b6125118761233f565b5050604080516020810190915260009052505050565b6000838152602081815260408083206001600160a01b0388168452909152902054828110156125a45760405162461bcd60e51b8152602060048201526024808201527f455243313135353a206275726e20616d6f756e7420657863656564732062616c604482015263616e636560e01b6064820152608401610407565b6000848152602081815260408083206001600160a01b03898116808652918452828520888703905582518981529384018890529092908616917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a45050505050565b82805461261b90612efb565b90600052602060002090601f01602090048101928261263d5760008555612683565b82601f1061265657805160ff1916838001178555612683565b82800160010185558215612683579182015b82811115612683578251825591602001919060010190612668565b5061268f9291506126c9565b5090565b50805461269f90612efb565b6000825580601f106126af575050565b601f016020900490600052602060002090810190610c3591905b5b8082111561268f57600081556001016126ca565b80356001600160a01b03811681146126f557600080fd5b919050565b600082601f83011261270b57600080fd5b8135602061271882612ebf565b6040516127258282612f30565b8381528281019150858301600585901b8701840188101561274557600080fd5b60005b8581101561276457813584529284019290840190600101612748565b5090979650505050505050565b600082601f83011261278257600080fd5b813567ffffffffffffffff81111561279c5761279c612fa4565b6040516127b3601f8301601f191660200182612f30565b8181528460208386010111156127c857600080fd5b816020850160208301376000918101602001919091529392505050565b6000602082840312156127f757600080fd5b6104bd826126de565b6000806040838503121561281357600080fd5b61281c836126de565b915061282a602084016126de565b90509250929050565b600080600080600060a0868803121561284b57600080fd5b612854866126de565b9450612862602087016126de565b9350604086013567ffffffffffffffff8082111561287f57600080fd5b61288b89838a016126fa565b945060608801359150808211156128a157600080fd5b6128ad89838a016126fa565b935060808801359150808211156128c357600080fd5b506128d088828901612771565b9150509295509295909350565b600080600080600060a086880312156128f557600080fd5b6128fe866126de565b945061290c602087016126de565b93506040860135925060608601359150608086013567ffffffffffffffff81111561293657600080fd5b6128d088828901612771565b60008060006060848603121561295757600080fd5b612960846126de565b925060208085013567ffffffffffffffff8082111561297e57600080fd5b61298a888389016126fa565b945060408701359150808211156129a057600080fd5b818701915087601f8301126129b457600080fd5b81356129bf81612ebf565b6040516129cc8282612f30565b8281528581019150848601600584901b860187018c10156129ec57600080fd5b6000805b85811015612a2757823587811115612a06578283fd5b612a148f8b838c0101612771565b86525093880193918801916001016129f0565b5050508096505050505050509250925092565b600080600060608486031215612a4f57600080fd5b612a58846126de565b9250602084013567ffffffffffffffff80821115612a7557600080fd5b612a81878388016126fa565b93506040860135915080821115612a9757600080fd5b50612aa4868287016126fa565b9150509250925092565b60008060408385031215612ac157600080fd5b612aca836126de565b91506020830135612ada81613060565b809150509250929050565b60008060408385031215612af857600080fd5b612b01836126de565b946020939093013593505050565b600080600060608486031215612b2457600080fd5b612b2d846126de565b925060208401359150604084013567ffffffffffffffff811115612b5057600080fd5b612aa486828701612771565b600080600060608486031215612b7157600080fd5b612b7a846126de565b95602085013595506040909401359392505050565b60008060408385031215612ba257600080fd5b823567ffffffffffffffff80821115612bba57600080fd5b818501915085601f830112612bce57600080fd5b81356020612bdb82612ebf565b604051612be88282612f30565b8381528281019150858301600585901b870184018b1015612c0857600080fd5b600096505b84871015612c3257612c1e816126de565b835260019690960195918301918301612c0d565b5096505086013592505080821115612c4957600080fd5b50612c56858286016126fa565b9150509250929050565b600060208284031215612c7257600080fd5b81516104bd81613060565b600060208284031215612c8f57600080fd5b81356104bd8161306e565b600060208284031215612cac57600080fd5b81516104bd8161306e565b600060208284031215612cc957600080fd5b813567ffffffffffffffff811115612ce057600080fd5b61062484828501612771565b600060208284031215612cfe57600080fd5b5035919050565b60008060408385031215612d1857600080fd5b82359150602083013567ffffffffffffffff811115612d3657600080fd5b612c5685828601612771565b600081518084526020808501945080840160005b83811015612d7257815187529582019590820190600101612d56565b509495945050505050565b6000815180845260005b81811015612da357602081850181015186830182015201612d87565b81811115612db5576000602083870101525b50601f01601f19169290920160200192915050565b60006001600160a01b03808816835280871660208401525060a06040830152612df660a0830186612d42565b8281036060840152612e088186612d42565b90508281036080840152612e1c8185612d7d565b98975050505050505050565b60006001600160a01b03808816835280871660208401525084604083015283606083015260a06080830152612e6060a0830184612d7d565b979650505050505050565b6020815260006104bd6020830184612d42565b604081526000612e916040830185612d42565b8281036020840152612ea38185612d42565b95945050505050565b6020815260006104bd6020830184612d7d565b600067ffffffffffffffff821115612ed957612ed9612fa4565b5060051b60200190565b60008219821115612ef657612ef6612f78565b500190565b600181811c90821680612f0f57607f821691505b6020821081141561055657634e487b7160e01b600052602260045260246000fd5b601f8201601f1916810167ffffffffffffffff81118282101715612f5657612f56612fa4565b6040525050565b6000600019821415612f7157612f71612f78565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b600060033d1115612fd35760046000803e5060005160e01c5b90565b600060443d1015612fe45790565b6040516003193d81016004833e81513d67ffffffffffffffff816024840111818411171561301457505050505090565b828501915081518181111561302c5750505050505090565b843d87010160208285010111156130465750505050505090565b61305560208286010187612f30565b509095945050505050565b8015158114610c3557600080fd5b6001600160e01b031981168114610c3557600080fdfea2646970667358221220c630da87a65ac6937510cbe6776627285f9136060c39aaf00e734f65222a960664736f6c63430008050033";

type GoodServiceVoucherTokenFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GoodServiceVoucherTokenFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GoodServiceVoucherTokenFactory__factory extends ContractFactory {
  constructor(...args: GoodServiceVoucherTokenFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "GoodServiceVoucherTokenFactory";
  }

  deploy(
    globalUri: string,
    kernelAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<GoodServiceVoucherTokenFactory> {
    return super.deploy(
      globalUri,
      kernelAddress,
      overrides || {}
    ) as Promise<GoodServiceVoucherTokenFactory>;
  }
  getDeployTransaction(
    globalUri: string,
    kernelAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      globalUri,
      kernelAddress,
      overrides || {}
    );
  }
  attach(address: string): GoodServiceVoucherTokenFactory {
    return super.attach(address) as GoodServiceVoucherTokenFactory;
  }
  connect(signer: Signer): GoodServiceVoucherTokenFactory__factory {
    return super.connect(signer) as GoodServiceVoucherTokenFactory__factory;
  }
  static readonly contractName: "GoodServiceVoucherTokenFactory";
  public readonly contractName: "GoodServiceVoucherTokenFactory";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GoodServiceVoucherTokenFactoryInterface {
    return new utils.Interface(_abi) as GoodServiceVoucherTokenFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GoodServiceVoucherTokenFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as GoodServiceVoucherTokenFactory;
  }
}