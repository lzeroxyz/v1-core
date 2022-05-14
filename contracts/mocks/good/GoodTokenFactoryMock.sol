// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../../good/GoodTokenFactory.sol";

contract GoodTokenFactoryMock is GoodTokenFactory {
  constructor(address kernelAddress) GoodTokenFactory(kernelAddress) {}

  function mint(address to, string calldata tokenUri) external override returns (uint256) {
    return _doMint(to, tokenUri);
  }

  function burn(address from, uint256 tokenId) external override {
    return _doBurn(from, tokenId);
  }
}
