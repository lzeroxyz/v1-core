// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "../utils/Kernable.sol";

import "../interfaces/good/IGoodServiceTokenFactory.sol";

contract GoodServiceTokenFactory is ERC1155, Pausable, Ownable, Kernable, IGoodServiceTokenFactory {
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

  function mint(address to, string calldata tokenUri)
    external
    virtual
    override
    onlyFromKernel
    whenNotPaused
    returns (uint256)
  {
    return _doMint(to, tokenUri);
  }

  function _doMint(address to, string memory tokenUri) internal returns (uint256 tokenId) {
    unchecked {
      tokenId = ++totalTokens;
    }

    _mint(to, tokenId, 1, _msgData());

    if (bytes(tokenUri).length != 0) {
      _tokenUris[tokenId] = tokenUri;
    }

    return tokenId;
  }

  function burn(address from, uint256 id) external virtual override onlyFromKernel whenNotPaused {
    _doBurn(from, id);
  }

  function _doBurn(address from, uint256 id) internal {
    _burn(from, id, 1);

    if (bytes(_tokenUris[id]).length != 0) {
      delete _tokenUris[id];
    }
  }

  function burnBatch(address from, uint256[] calldata ids) external virtual override onlyFromKernel whenNotPaused {
    _doBurnBatch(from, ids);
  }

  function _doBurnBatch(address from, uint256[] memory ids) internal {
    uint256[] memory amounts = new uint256[](ids.length);

    for (uint256 i = 0; i < ids.length; i++) {
      amounts[i] = 1;

      if (bytes(_tokenUris[ids[i]]).length != 0) {
        delete _tokenUris[ids[i]];
      }
    }

    _burnBatch(from, ids, amounts);
  }

  /**
        Kernel and Owner-based methods
     */
  function paused() public view override(Pausable, IGoodServiceTokenFactory) returns (bool) {
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
      interfaceId == type(IGoodServiceTokenFactory).interfaceId ||
      super.supportsInterface(interfaceId);
  }
}
