// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../Good.sol";

struct CreateGoodInput {
  address from;
  string tokenUri;
  address[] acceptedTokens;
}

struct RemoveGoodInput {
  address from;
  uint256 goodId;
}

struct PauseGoodInput {
  address from;
  uint256 goodId;
}

struct UnpauseGoodInput {
  address from;
  uint256 goodId;
}

struct AddGoodAcceptedTokenInput {
  address from;
  uint256 goodId;
  address acceptedToken;
}

struct RemoveGoodAcceptedTokenInput {
  address from;
  uint256 goodId;
  address acceptedToken;
}

struct CreateGoodServiceInput {
  address from;
  uint256 goodId;
  uint256 capacity;
  string tokenUri;
}

struct RemoveGoodServiceInput {
  address from;
  uint256 goodId;
  uint256 goodServiceId;
}

struct PauseGoodServicesInput {
  address from;
  uint256 goodId;
}

struct UnPauseGoodServicesInput {
  address from;
  uint256 goodId;
}

struct PauseGoodServiceInput {
  address from;
  uint256 goodId;
  uint256 goodServiceId;
}

struct UnPauseGoodServiceInput {
  address from;
  uint256 goodId;
  uint256 goodServiceId;
}

struct CreateGoodServiceVoucherInput {
  address from;
  uint256 goodId;
  uint256 goodServiceId;
  string tokenUri;
  uint128 start;
  uint128 end;
  GoodServiceVoucherDestructionType destructionType;
}

struct CreateGoodServiceVouchersInput {
  address from;
  uint256 goodId;
  uint256 goodServiceId;
  string[] tokenUris;
  uint128[] starts;
  uint128[] ends;
  GoodServiceVoucherDestructionType[] destructionTypes;
}

struct RemoveGoodServiceVoucherInput {
  address from;
  uint256 goodId;
  uint256 goodServiceId;
  uint256 goodServiceVoucherId;
}

struct RemoveGoodServiceVouchersInput {
  address from;
  uint256 goodId;
  uint256 goodServiceId;
  uint256[] goodServiceVoucherIds;
}

struct GetGoodsInput {
  address goodsOwner;
}

struct GetGoodInput {
  address goodOwner;
  uint256 goodId;
}

struct GetGoodServicesInput {
  address goodOwner;
  uint256 goodId;
}

struct GetGoodServiceInput {
  address goodOwner;
  uint256 goodId;
  uint256 goodServiceId;
}

struct GetGoodServiceVouchersInput {
  address goodOwner;
  uint256 goodId;
  uint256 goodServiceId;
}

struct GetArrayGoodServiceVouchersInput {
  address goodOwner;
  uint256 goodId;
  uint256 goodServiceId;
  uint256[] goodServiceVoucherIds;
}
