// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../../good/GoodServiceTokenFactory.sol";

contract GoodServiceTokenFactoryMock is GoodServiceTokenFactory {
  constructor(string memory globalUri, address kernelAddress) GoodServiceTokenFactory(globalUri, kernelAddress) {}

  function mint(address to, string calldata tokenUri) external override returns (uint256) {
    return _doMint(to, tokenUri);
  }

  function burn(address from, uint256 tokenId) external override {
    _doBurn(from, tokenId);
  }

  function burnBatch(address from, uint256[] calldata ids) external override {
    _doBurnBatch(from, ids);
  }
}
