// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "../KernelUtils.sol";

contract Kernable is Context {
  using KernelUtils for address;

  address private _kernel;

  constructor(address kernel) {
    _kernel = kernel;
  }

  modifier onlyFromKernel() {
    require(_msgSender() == _kernel, "Kernable: call from outside the Kernel");
    _;
  }

  modifier notFromKernel() {
    require(_msgSender() != _kernel, "Kernable: call from the Kernel");
    _;
  }

  function kernel() public view virtual returns (address) {
    return _kernel;
  }

  function _setKernel(address newKernel) internal virtual {
    require(newKernel.isValidKernel(), "Kernable: New Kernel address is not a valid Kernel implementation");
    _kernel = newKernel;
  }
}
