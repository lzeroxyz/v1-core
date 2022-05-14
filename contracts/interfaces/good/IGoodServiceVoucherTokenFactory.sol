// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol';

import '../globals/ITokenFactory.sol';

interface IGoodServiceVoucherTokenFactory is
  IERC1155,
  IERC1155MetadataURI,
  ITokenFactory
{
  function setUri(string memory newUri) external;

  function setTokenUri(uint256 tokenId, string memory tokenUri) external;

  function mint(
    address to,
    uint256 amount,
    string memory tokenUri
  ) external returns (uint256 tokenId);

  function mintBatch(
    address to,
    uint256[] memory amounts,
    string[] memory tokenUris
  ) external returns (uint256[] memory tokenIds);

  function burn(
    address from,
    uint256 id,
    uint256 amount
  ) external;

  function burnBatch(
    address from,
    uint256[] memory ids,
    uint256[] memory amounts
  ) external;

  function paused() external view returns (bool);

  function pause() external;

  function unpause() external;
}
