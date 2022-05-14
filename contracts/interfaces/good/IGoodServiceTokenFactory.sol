// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";

import "../globals/ITokenFactory.sol";

interface IGoodServiceTokenFactory is IERC1155, IERC1155MetadataURI, ITokenFactory {
  function setUri(string memory newUri) external;

  function setTokenUri(uint256 tokenId, string memory tokenUri) external;

  function mint(address to, string memory tokenUri) external returns (uint256 tokenId);

  function burn(address from, uint256 id) external;

  function burnBatch(address from, uint256[] memory ids) external;

  function paused() external view returns (bool);

  function pause() external;

  function unpause() external;
}
