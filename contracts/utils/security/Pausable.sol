// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @dev Contract module that allows inheritant contracts to implement an emergency stop system
contract Pausable {
  /**
   * @dev Emitted when the pause is triggered
   * @param account The account that triggered the pause
   */
  event Paused(address indexed account);

  /**
   * @dev Emitted when the unpause is triggered
   * @param account The account that triggered the unpause
   */
  event Unpaused(address indexed account);

  bool public _paused = false;

  /// @dev Returns true if the contract is paused
  function paused() public view virtual returns (bool) {
    return _paused;
  }

  /// @dev Modifier to make a function callable only when the contract is not paused.
  modifier whenNotPaused() {
    require(!_paused, "Pausable: paused");
    _;
  }

  /// @dev Modifier to make a function callable only when the contract is paused.
  modifier whenPaused() {
    require(_paused, "Pausable: not paused");
    _;
  }

  /// @dev Pauses the contract
  function pause() public whenNotPaused {
    _paused = true;
    emit Paused(msg.sender);
  }

  /// Unpauses the contract
  function unpause() public whenPaused {
    _paused = false;
    emit Unpaused(msg.sender);
  }
}
