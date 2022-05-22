// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import "../globals/ITokenFactory.sol";

/// @title The interface for the GoodTokenFactory contract
/// @notice The GoodTokenFactory is responsible for managing the Goods NFTs with
interface IGoodTokenFactory is IERC721, IERC721Metadata, ITokenFactory {
  /// @notice Mints a new Good NFT
  /// @param to The address of the new owner of the Good NFT
  /// @param tokenUri The uri of the Good NFT
  /// @return tokenId The id of the new Good NFT
  function mint(address to, string memory tokenUri) external returns (uint256 tokenId);

  /// @notice Burns a Good NFT
  /// @param from The address of the owner of the Good NFT
  /// @param id The id of the Good NFT
  function burn(address from, uint256 id) external;

  /// @notice Pauses the contract
  function pause() external;

  /// @notice Unpauses the contract
  function unpause() external;

  /// @return The state of the contract
  function paused() external view returns (bool);
}
