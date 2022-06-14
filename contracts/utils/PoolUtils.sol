// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "../interfaces/globals/IPaymentPool.sol";

library PoolUtils {
  using Address for address;

  function isValidPool(address poolAddress) internal view returns (bool) {
    return
      poolAddress != address(0) &&
      poolAddress.isContract() &&
      IERC165(poolAddress).supportsInterface(type(IPaymentPool).interfaceId);
  }
}
