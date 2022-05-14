// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import '../globals/IKernel.sol';

import '../../structs/Good.sol';
import '../../structs/inputs/Good.sol';

/// @title The interface for the GoodKernel contract
/// @notice The GoodKernel is responsible for managing the Good structs with the services and the vouchers
interface IGoodKernel is IKernel {
  /// @notice Creates a new Good struct into the contract
  /// @param createGoodInput The input struct for the creation of the Good
  /// @return The newly created Good id with his state
  function createGood(CreateGoodInput calldata createGoodInput)
    external
    returns (uint256, GoodState state);

  /// @notice Removes a Good struct from the contract
  /// @param removeGoodInput The input struct for the removal of the Good
  function removeGood(RemoveGoodInput calldata removeGoodInput) external;

  /// @notice Updates the state of a Good struct to Pause
  /// @param from The address of the goodOwner (which should be also the caller)
  /// @param goodId The id of the Good
  function pauseGood(address from, uint256 goodId) external;

  /// @notice Updates the state of a Good struct to Unpause
  /// @param from The address of the goodOwner (which should be also the caller)
  /// @param goodId The id of the Good
  function unpauseGood(address from, uint256 goodId) external;

  /// @notice Creates a new GoodService struct into the specified Good struct
  /// @param createGoodServiceInput The input struct for the creation of the GoodService
  /// @return The newly created GoodService id with his state
  function createGoodService(
    CreateGoodServiceInput calldata createGoodServiceInput
  ) external returns (uint256, GoodServiceState);

  /// @notice Removes a GoodService struct from the contract
  /// @param removeGoodServiceInput The input struct for the removal of the GoodService
  function removeGoodService(
    RemoveGoodServiceInput calldata removeGoodServiceInput
  ) external;

  /// @notice Updates the state of a GoodService struct to Paused
  /// @param pauseGoodServiceInput The input struct for the pause of the GoodService&
  function pauseGoodService(
    PauseGoodServiceInput calldata pauseGoodServiceInput
  ) external;

  /// @notice Updates the state of a GoodService struct to Unpaused
  /// @param unpauseGoodServiceInput The input struct for the unpause of the GoodService
  function unpauseGoodService(
    UnPauseGoodServiceInput calldata unpauseGoodServiceInput
  ) external;

  /// @notice Creates a new GoodServiceVoucher struct into the specified GoodService struct
  /// @param createGoodServiceVoucherInput The input struct for the creation of the GoodServiceVoucher
  function createGoodServiceVoucher(
    CreateGoodServiceVoucherInput calldata createGoodServiceVoucherInput
  ) external returns (uint256);

  /// @notice Removes a GoodServiceVoucher struct from the contract
  /// @param removeGoodServiceVoucherInput The input struct for the removal of the GoodServiceVoucher
  function removeGoodServiceVoucher(
    RemoveGoodServiceVoucherInput calldata removeGoodServiceVoucherInput
  ) external;

  function getGoods(address goodsOwner)
    external
    view
    returns (
      uint256[] memory ids,
      GoodState[] memory states,
      address[][] memory acceptedTokens
    );

  function getGood(address goodOwner, uint256 goodId)
    external
    view
    returns (GoodState state, address[] memory acceptedTokens);

  function getGoodServices(address goodOwner, uint256 goodId)
    external
    view
    returns (
      uint256[] memory ids,
      uint256[] memory capacities,
      GoodServiceState[] memory states
    );

  function getGoodService(
    address goodOwner,
    uint256 goodId,
    uint256 goodServiceId
  ) external view returns (uint256 capacity, GoodServiceState state);

  function getGoodServiceVouchers(
    address goodOwner,
    uint256 goodId,
    uint256 goodServiceId
  )
    external
    view
    returns (
      uint256[] memory ids,
      uint128[] memory starts,
      uint128[] memory ends,
      uint256[] memory amounts,
      GoodServiceVoucherState[] memory states,
      GoodServiceVoucherDestructionType[] memory destructionTypes
    );

  function getGoodServiceVouchers(
    GetGoodServiceVouchers calldata getGoodServiceVouchersInput
  )
    external
    view
    returns (
      uint128[] memory starts,
      uint128[] memory ends,
      uint256[] memory amounts,
      GoodServiceVoucherState[] memory states,
      GoodServiceVoucherDestructionType[] memory destructionTypes
    );

  function pause() external;

  function unpause() external;
}
