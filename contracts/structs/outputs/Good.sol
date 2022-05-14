// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../Good.sol";

struct GetGoodsOutput {
  uint256[] ids;
  GoodState[] states;
  address[][] acceptedTokens;
}

struct GetGoodOutput {
  GoodState state;
  address[] acceptedTokens;
}

struct GetGoodServicesOutput {
  GoodState goodState;
  address[] goodAcceptedTokens;
  uint256[] goodServiceIds;
  uint256[] goodServiceCapacities;
  GoodServiceState[] goodServiceStates;
}

struct GetGoodServiceOutput {
  GoodState goodState;
  address[] goodAcceptedTokens;
  uint256 goodServiceCapacity;
  GoodServiceState goodServiceState;
}

struct GetGoodServiceVouchersOutput {
  GoodState goodState;
  address[] goodAcceptedTokens;
  uint256 goodServiceCapacity;
  GoodServiceState goodServiceState;
  uint256[] goodServiceVoucherIds;
  uint128[] goodServiceVoucherStarts;
  uint128[] goodServiceVoucherEnds;
  uint256[] goodServiceVoucherAmounts;
  GoodServiceVoucherState[] goodServiceVoucherStates;
  GoodServiceVoucherDestructionType[] goodServiceVoucherDestructionTypes;
}

struct GetArrayGoodServiceVouchersOutput {
  GoodState goodState;
  address[] goodAcceptedTokens;
  uint256 goodServiceCapacity;
  GoodServiceState goodServiceState;
  uint128[] goodServiceVoucherStarts;
  uint128[] goodServiceVoucherEnds;
  uint256[] goodServiceVoucherAmounts;
  GoodServiceVoucherState[] goodServiceVoucherStates;
  GoodServiceVoucherDestructionType[] goodServiceVoucherDestructionTypes;
}
