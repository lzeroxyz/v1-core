// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../utils/ERC1155/ERC1155.sol";
import "../utils/access/Ownable.sol";
import "../utils/security/Pausable.sol";

import "../utils/access/Kernable.sol";
import "../utils/access/Routable.sol";
import "../utils/TokenFactoryUtils.sol";

import "../interfaces/reservation/IReservationTokenFactory.sol";

contract ReservationTokenFactory is ERC1155, Pausable, Ownable, Kernable, IReservationTokenFactory {
  uint256 public totalTokens = 0;

  mapping(uint256 => string) private _tokenUris;

  constructor(string memory globalUri, address kernelAddress) ERC1155(globalUri) Kernable(kernelAddress) {}

  modifier onlyFromKernelOrOwner() {
    require(
      _msgSender() == owner() || _msgSender() == kernel(),
      "GoodTokenFactory: Caller is not the owner or the Kernel contract"
    );
    _;
  }

  function uri(uint256 tokenId) public view override(ERC1155, IERC1155MetadataURI) returns (string memory) {
    string storage tokenUri = _tokenUris[tokenId];

    if (bytes(tokenUri).length == 0) {
      return super.uri(tokenId);
    } else {
      return tokenUri;
    }
  }

  /**
        Kernel-based methods
     */
  function setTokenUri(uint256 tokenId, string memory tokenUri) external override onlyFromKernel {
    _tokenUris[tokenId] = tokenUri;
  }

  /// @notice Creates a Reservation NFT
  /// @dev This function is called by the kernel to create a new Reservation NFT with a certain amount once a Reservation has been created
  /// @param to The address of the owner of the new NFT (the Good owner/the Host)
  function mint(
    address to,
    uint256 amount,
    string memory tokenUri
  ) external virtual override onlyFromKernel whenNotPaused returns (uint256 tokenId) {
    return _doMint(to, amount, tokenUri);
  }

  function _doMint(
    address to,
    uint256 amount,
    string memory tokenUri
  ) internal returns (uint256 tokenId) {
    unchecked {
      tokenId = ++totalTokens;
    }

    _mint(to, tokenId, amount, _msgData());

    if (bytes(tokenUri).length != 0) {
      _tokenUris[tokenId] = tokenUri;
    }

    return tokenId;
  }

  /// @notice Burns a single Reservation NFT
  /// @dev This function is called by the kernel to burn a single Reservation NFT with a certain amount once a Reservation has been finished/cancelled
  /// @param from The address of the owner of the new NFT (the Good owner/the Host)
  /// @param id The id of the Reservation NFT to burn
  /// @param amount The amount of the Reservation NFT to burn
  function burn(
    address from,
    uint256 id,
    uint256 amount
  ) external virtual override onlyFromKernel whenNotPaused {
    _doBurn(from, id, amount);
  }

  function _doBurn(
    address from,
    uint256 id,
    uint256 amount
  ) internal {
    _burn(from, id, amount);

    if (bytes(_tokenUris[id]).length != 0) {
      delete _tokenUris[id];
    }
  }

  /// @notice Burns many Reservation NFTs at once
  /// @dev This function is used to burn many Reservation NFTs once a automatic mechanism has been triggered
  /// @param from The address of the owner of the new NFT (the Good owner/the Host)
  /// @param ids The array of tokenIds to burn
  /// @param amounts The array of amounts to burn
  function burnBatch(
    address from,
    uint256[] memory ids,
    uint256[] memory amounts
  ) external virtual override onlyFromKernel whenNotPaused {
    _doBurnBatch(from, ids, amounts);
  }

  function _doBurnBatch(
    address from,
    uint256[] memory ids,
    uint256[] memory amounts
  ) internal {
    for (uint256 i = 0; i < ids.length; i++) {
      if (bytes(_tokenUris[ids[i]]).length != 0) {
        delete _tokenUris[ids[i]];
      }
    }

    _burnBatch(from, ids, amounts);
  }

  /// @notice Transfers the Reservation NFT to another address
  /// @dev This function is used to transfer the ownership of the Reservation NFT to a Payer in the ReservationKernel
  /// @param from The address of the owner of this NFT (which can be either the Payer or the Good owner/Host)
  /// @param to The address to transfer the Reservation NFT to (the Payer)
  /// @param id The id of the Reservation NFT
  /// @param amount The amount of the Reservation NFT to transfer
  function safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) public override(ERC1155, IERC1155) onlyFromKernel whenNotPaused {
    _safeTransferFrom(from, to, id, amount, data);
  }

  /**
        Kernel and Owner-based methods
     */
  function paused() public view override(Pausable, IReservationTokenFactory) returns (bool) {
    return super.paused();
  }

  function pause() public virtual override onlyFromKernelOrOwner {
    _pause();
  }

  function unpause() public virtual override onlyFromKernelOrOwner {
    _unpause();
  }

  function setUri(string memory newuri) external override onlyFromKernelOrOwner {
    _setURI(newuri);
  }

  function setKernel(address newKernel) external onlyOwner whenPaused {
    _setKernel(newKernel);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC1155, IERC165) returns (bool) {
    return
      interfaceId == type(ITokenFactory).interfaceId ||
      interfaceId == type(IReservationTokenFactory).interfaceId ||
      super.supportsInterface(interfaceId);
  }
}
