// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Sender.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";

interface IPaymentPool is IERC165, IERC777Sender, IERC777Recipient {
  function lockLiquidity(address from, uint256 amount) external;

  function unlockLiquidity(address from, uint256 amount) external;
}
