// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

enum GoodState {
  Paused,
  Unpaused
}

struct Good {
  uint256 id;
  GoodState state;
  address[] acceptedTokens;
  uint256 servicesCount;
  mapping(uint256 => GoodService) services;
  mapping(uint256 => uint256) servicesIds;
}

enum GoodServiceState {
  Paused,
  Unpaused
}

struct GoodService {
  uint256 id;
  uint256 capacity;
  GoodServiceState state;
  uint256 vouchersCount;
  mapping(uint256 => GoodServiceVoucher) vouchers;
  mapping(uint256 => uint256) vouchersIds;
}

enum GoodServiceVoucherState {
  Available,
  Unavailable
}

struct GoodServiceVoucher {
  uint256 id;
  uint128 start;
  uint128 end;
  uint256 amount;
  GoodServiceVoucherState state;
}
