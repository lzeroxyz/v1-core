// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "../interfaces/globals/ITokenFactory.sol";

library TokenFactoryUtils {
  using Address for address;

  function isValidTokenFactory(address tokenFactoryAddress) internal view returns (bool) {
    return
      tokenFactoryAddress != address(0) &&
      tokenFactoryAddress.isContract() &&
      IERC165(tokenFactoryAddress).supportsInterface(type(ITokenFactory).interfaceId);
  }
}
