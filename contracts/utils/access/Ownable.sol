// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Ownable {
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  address private _owner;

  constructor(address owner) {
    _owner = owner;

    emit OwnershipTransferred(address(0), owner);
  }

  modifier onlyOwner() virtual {
    require(msg.sender == _owner);
    _;
  }

  function transferOwnership(address newOwner) public virtual onlyOwner {
    _owner = newOwner;

    emit OwnershipTransferred(_owner, newOwner);
  }
}
