// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../globals/IKernel.sol";

import "../../structs/Good.sol";
import "../../structs/inputs/Good.sol";
import "../../structs/outputs/Good.sol";

/// @title The interface for the GoodKernel contract
/// @notice The GoodKernel is responsible for managing the Good structs with the services and the vouchers
interface IGoodKernel is IKernel {
  /// @notice Creates a new Good struct into the contract
  /// @param createGoodInput The input struct for the creation of the Good
  /// @return The newly created Good id with his state
  function createGood(CreateGoodInput calldata createGoodInput) external returns (uint256, GoodState state);

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
  function createGoodService(CreateGoodServiceInput calldata createGoodServiceInput)
    external
    returns (uint256, GoodServiceState);

  /// @notice Removes a GoodService struct from the contract
  /// @param removeGoodServiceInput The input struct for the removal of the GoodService
  function removeGoodService(RemoveGoodServiceInput calldata removeGoodServiceInput) external;

  /// @notice Updates the state of a GoodService struct to Paused
  /// @param pauseGoodServiceInput The input struct for the pause of the GoodService&
  function pauseGoodService(PauseGoodServiceInput calldata pauseGoodServiceInput) external;

  /// @notice Updates the state of a GoodService struct to Unpaused
  /// @param unpauseGoodServiceInput The input struct for the unpause of the GoodService
  function unpauseGoodService(UnPauseGoodServiceInput calldata unpauseGoodServiceInput) external;

  /// @notice Creates a new GoodServiceVoucher struct into the specified GoodService struct
  /// @param createGoodServiceVoucherInput The input struct for the creation of the GoodServiceVoucher
  function createGoodServiceVoucher(CreateGoodServiceVoucherInput calldata createGoodServiceVoucherInput)
    external
    returns (uint256);

  /// @notice Removes a GoodServiceVoucher struct from the contract
  /// @param removeGoodServiceVoucherInput The input struct for the removal of the GoodServiceVoucher
  function removeGoodServiceVoucher(RemoveGoodServiceVoucherInput calldata removeGoodServiceVoucherInput) external;

  function getGoods(GetGoodsInput input)
    external
    view
    returns (
      GetGoodsOutput output
    );

  function getGood(GetGoodInput input)
    external
    view
    returns (GetGoodOutput output);

  function getGoodServices(GetGoodServicesInput input)
    external
    view
    returns (
      GetGoodServicesOutput memory output
    );

  function getGoodService(
    GetGoodServiceInput input
  ) external view returns (GetGoodServiceOutput memory output);

  function getGoodServiceVouchers(
    GetGoodServiceVouchersInput getGoodServiceVouchersInput
  )
    external
    view
    returns (
      GetGoodServiceVouchersOutput memory getGoodServiceVouchersOutput
    );

  function getGoodServiceVouchers(GetArrayGoodServiceVouchersInput calldata input)
    external
    view
    returns (
      GetArrayGoodServiceVouchersOutput memory output
    );

  function pause() external;

  function unpause() external;
}
