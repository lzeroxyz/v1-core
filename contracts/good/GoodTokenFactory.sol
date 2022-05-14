// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';

import '../utils/Kernable.sol';

import '../interfaces/good/IGoodTokenFactory.sol';

contract GoodTokenFactory is
  ERC721URIStorage,
  Pausable,
  Ownable,
  Kernable,
  IGoodTokenFactory
{
  uint256 public totalTokens = 0;

  constructor(address kernelAddress)
    ERC721('Good', 'LZEROG')
    Kernable(kernelAddress)
  {}

  modifier onlyFromKernelOrOwner() {
    require(
      _msgSender() == owner() || _msgSender() == kernel(),
      'GoodTokenFactory: Caller is not the owner or the Kernel contract'
    );
    _;
  }

  /**
        Kernel-based methods
     */

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

  function _doMint(address to, string memory tokenUri)
    internal
    returns (uint256 tokenId)
  {
    unchecked {
      tokenId = ++totalTokens;
    }

    _safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenUri);
  }

  function burn(address from, uint256 tokenId)
    external
    virtual
    override
    onlyFromKernel
    whenNotPaused
  {
    _doBurn(from, tokenId);
  }

  function _doBurn(address from, uint256 tokenId) internal {
    require(
      _isApprovedOrOwner(from, tokenId),
      'GoodServiceTokenFactory: caller is not owner or approved to burn this token'
    );

    _burn(tokenId);
  }

  /**
        Owner-based methods 
    */
  function setKernel(address newKernel) external virtual onlyOwner whenPaused {
    _setKernel(newKernel);
  }

  /**
        Kernel and Owner-based methods
     */
  function paused()
    public
    view
    override(Pausable, IGoodTokenFactory)
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

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, IERC165)
    returns (bool)
  {
    return
      interfaceId == type(ITokenFactory).interfaceId ||
      interfaceId == type(IGoodTokenFactory).interfaceId ||
      super.supportsInterface(interfaceId);
  }
}
