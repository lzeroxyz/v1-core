// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../../good/GoodServiceVoucherTokenFactory.sol";

contract GoodServiceVoucherTokenFactoryMock is GoodServiceVoucherTokenFactory {
  constructor(string memory globalUri, address kernelAddress)
    GoodServiceVoucherTokenFactory(globalUri, kernelAddress)
  {}

  function mint(
    address to,
    uint256 amount,
    string memory tokenUri
  ) external override returns (uint256) {
    return _doMint(to, amount, tokenUri);
  }

  function mintBatch(
    address to,
    uint256[] memory amounts,
    string[] memory tokenUris
  ) external override returns (uint256[] memory) {
    return _doMintBatch(to, amounts, tokenUris);
  }

  function burn(
    address from,
    uint256 id,
    uint256 amount
  ) external override {
    _doBurn(from, id, amount);
  }

  function burnBatch(
    address from,
    uint256[] memory ids,
    uint256[] memory amounts
  ) external override {
    _doBurnBatch(from, ids, amounts);
  }
}
