// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';

import '../utils/Kernable.sol';
import '../utils/Routable.sol';
import '../utils/TokenFactoryUtils.sol';

import '../interfaces/good/IGoodServiceVoucherTokenFactory.sol';

contract GoodServiceVoucherTokenFactory is
  ERC1155,
  Pausable,
  Ownable,
  Kernable,
  IGoodServiceVoucherTokenFactory
{
  uint256 public totalTokens = 0;

  mapping(uint256 => string) private _tokenUris;

  constructor(string memory globalUri, address kernelAddress)
    ERC1155(globalUri)
    Kernable(kernelAddress)
  {}

  modifier onlyFromKernelOrOwner() {
    require(
      _msgSender() == owner() || _msgSender() == kernel(),
      'GoodTokenFactory: Caller is not the owner or the Kernel contract'
    );
    _;
  }

  function uri(uint256 tokenId)
    public
    view
    override(ERC1155, IERC1155MetadataURI)
    returns (string memory)
  {
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
  function setTokenUri(uint256 tokenId, string memory tokenUri)
    external
    override
    onlyFromKernel
  {
    _tokenUris[tokenId] = tokenUri;
  }

  function mint(
    address to,
    uint256 amount,
    string memory tokenUri
  )
    external
    virtual
    override
    onlyFromKernel
    whenNotPaused
    returns (uint256 tokenId)
  {
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

  function mintBatch(
    address to,
    uint256[] memory amounts,
    string[] memory tokenUris
  )
    external
    virtual
    override
    onlyFromKernel
    whenNotPaused
    returns (uint256[] memory)
  {
    return _doMintBatch(to, amounts, tokenUris);
  }

  function _doMintBatch(
    address to,
    uint256[] memory amounts,
    string[] memory tokenUris
  ) internal returns (uint256[] memory tokenIds) {
    require(
      tokenUris.length == amounts.length,
      'GoodServiceVoucherTokenFactory: Uris length and amount mismatch'
    );

    tokenIds = new uint256[](amounts.length);

    uint256 startTokenId = totalTokens;
    uint256 endTokenId = startTokenId;

    for (uint256 i = 0; i <= tokenIds.length; i++) {
      endTokenId = ++startTokenId;
      tokenIds[i] = endTokenId;
      if (bytes(tokenUris[i]).length != 0) {
        _tokenUris[endTokenId] = tokenUris[i];
      }
    }

    unchecked {
      totalTokens += amounts.length;
    }

    _mintBatch(to, tokenIds, amounts, _msgData());
  }

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

  function safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) public override(ERC1155, IERC1155) onlyFromKernel whenNotPaused {
    _safeTransferFrom(from, to, id, amount, data);
  }

  function safeBatchTransferFrom(
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public override(ERC1155, IERC1155) onlyFromKernel whenNotPaused {
    _safeBatchTransferFrom(from, to, ids, amounts, data);
  }

  /**
        Kernel and Owner-based methods
     */
  function paused()
    public
    view
    override(Pausable, IGoodServiceVoucherTokenFactory)
    returns (bool)
  {
    return super.paused();
  }

  function pause() public virtual override onlyFromKernelOrOwner {
    _pause();
  }

  function unpause() public virtual override onlyFromKernelOrOwner {
    _unpause();
  }

  function setUri(string memory newuri)
    external
    override
    onlyFromKernelOrOwner
  {
    _setURI(newuri);
  }

  function setKernel(address newKernel) external onlyOwner whenPaused {
    _setKernel(newKernel);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC1155, IERC165)
    returns (bool)
  {
    return
      interfaceId == type(ITokenFactory).interfaceId ||
      interfaceId == type(IGoodServiceVoucherTokenFactory).interfaceId ||
      super.supportsInterface(interfaceId);
  }
}
