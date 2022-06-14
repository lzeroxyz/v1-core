// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Context.sol";

contract Routable is Context {
  address private _router;

  constructor(address router) {
    _router = router;
  }

  modifier onlyFromRouter() {
    require(_msgSender() == _router, "Routable: call from outside the router");
    _;
  }

  modifier notFromRouter() {
    require(_msgSender() != _router, "Routable: call from the router");
    _;
  }

  function router() public view virtual returns (address) {
    return _router;
  }

  function _setRouter(address newRouter) internal virtual {
    _router = newRouter;
  }
}
