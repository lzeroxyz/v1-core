// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "../interfaces/globals/IKernel.sol";

library KernelUtils {
  using Address for address;

  function isValidKernel(address kernelAddress) internal view returns (bool) {
    return
      kernelAddress != address(0) &&
      kernelAddress.isContract() &&
      IERC165(kernelAddress).supportsInterface(type(IKernel).interfaceId);
  }
}
