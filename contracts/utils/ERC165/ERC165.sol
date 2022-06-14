// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC165.sol";

// @dev See https://eips.ethereum.org/EIPS/eip-165
abstract contract ERC165 is IERC165 {
  /// @inheritdoc IERC165
  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(IERC165).interfaceId;
  }
}
