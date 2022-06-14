// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "../utils/access/Ownable.sol";
import "../utils/access/Routable.sol";

import "../libraries/good/GoodHelper.sol";
import "../libraries/good/GoodServiceHelper.sol";
import "../utils/TokenFactoryUtils.sol";

import "../interfaces/good/IGoodKernel.sol";
import "../interfaces/good/IGoodTokenFactory.sol";
import "../interfaces/good/IGoodServiceTokenFactory.sol";
import "../interfaces/good/IGoodServiceVoucherTokenFactory.sol";

import "../structs/Good.sol";
import "../structs/inputs/Good.sol";
import "../structs/outputs/Good.sol";

contract GoodKernel is Ownable, Pausable, Routable, IGoodKernel {
  using TokenFactoryUtils for address;
  using GoodHelper for Good;
  using GoodServiceHelper for GoodService;

  address internal _goodTokenFactory;

  address internal _goodServiceTokenFactory;

  address internal _goodServiceVoucherTokenFactory;

  /// @dev address:mintedId:Good
  mapping(address => mapping(uint256 => Good)) private _goods;
  /// @dev address:goodsId:mintedId
  mapping(address => mapping(uint256 => uint256)) private _goodsIds;
  /// @dev address:goodsCount
  mapping(address => uint256) private _goodsCount;

  event GoodCreated(address from, uint256 goodId, GoodState goodState, string goodUri);
  event GoodBurned(address from, uint256 goodId);
  event GoodPaused(address from, uint256 goodId);
  event GoodUnpaused(address from, uint256 goodId);

  event GoodServiceCreated(
    address from,
    uint256 goodId,
    uint256 goodServiceId,
    GoodServiceState goodServiceState,
    string goodServiceUri
  );
  event GoodServiceBurned(address from, uint256 goodId, uint256 goodServiceId);
  event GoodServicePaused(address from, uint256 goodId, uint256 goodServiceId);
  event GoodServiceUnpaused(address from, uint256 goodId, uint256 goodServiceId);

  event GoodServiceVoucherCreated(
    address from,
    uint256 goodId,
    uint256 goodServiceId,
    uint256 goodServiceVoucherId,
    uint256 goodServiceVoucherStart,
    uint256 goodServiceVoucherEnd,
    uint256 goodServiceVoucherAmount,
    GoodServiceVoucherState goodServiceVoucherState,
    GoodServiceVoucherDestructionType goodServiceVoucherDestructionType,
    uint256 goodServiceVoucherUri
  );
  event GoodServiceVoucherBurned(address from, uint256 goodId, uint256 goodServiceId, uint256 goodServiceVoucherId);
  event GoodServiceVoucherPaused();

  constructor(
    address routerAddress,
    address goodTokenFactory,
    address goodServiceTokenFactory,
    address goodServiceVoucherTokenFactory
  ) Routable(routerAddress) {
    // Good Token factory address is not valid
    require(goodTokenFactory.isValidTokenFactory(), "GK001");
    // Good Service Token factory address is not valid
    require(goodServiceTokenFactory.isValidTokenFactory(), "GK002");
    // Good Service Voucher token factory is not valid
    require(goodServiceVoucherTokenFactory.isValidTokenFactory(), "GK003");

    _goodTokenFactory = goodTokenFactory;

    _goodServiceTokenFactory = goodServiceTokenFactory;

    _goodServiceVoucherTokenFactory = goodServiceVoucherTokenFactory;
  }

  modifier onlyFromRouterOrOwner() {
    require(_msgSender() == owner() || _msgSender() == router(), "GK1");
    _;
  }

  /// @inheritdoc IGoodKernel
  function createGood(CreateGoodInput calldata createGoodInput)
    external
    virtual
    override
    whenNotPaused
    returns (uint256 mintedGoodId, GoodState mintedGoodState)
  {
    GoodHelper.create(
      _goodsCount,
      _goods[createGoodInput.from],
      _goodsIds[createGoodInput.from],
      createGoodInput,
      _goodTokenFactory
    );

    emit GoodCreated(createGoodInput.from, mintedGoodId, mintedGoodState, createGoodInput.tokenUri);
  }

  /// @inheritdoc IGoodKernel
  function removeGood(RemoveGoodInput calldata removeGoodInput) external virtual override {
    Good storage good = _goods[removeGoodInput.from][removeGoodInput.goodId];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    GoodHelper.remove(
      _goods[removeGoodInput.from],
      _goodsIds[removeGoodInput.from],
      good,
      removeGoodInput,
      _goodTokenFactory,
      _goodServiceTokenFactory,
      _goodServiceVoucherTokenFactory
    );

    emit GoodBurned(removeGoodInput.from, removeGoodInput.goodId);
  }

  /// @inheritdoc IGoodKernel
  function pauseGood(address from, uint256 goodId) external virtual override whenNotPaused {
    Good storage good = _goods[from][_goodsIds[from][goodId]];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    good.pause();

    emit GoodPaused(from, goodId);
  }

  /// @inheritdoc IGoodKernel
  function unpauseGood(address from, uint256 goodId) external virtual override whenNotPaused {
    Good storage good = _goods[from][_goodsIds[from][goodId]];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    good.unpause();

    emit GoodUnpaused(from, goodId);
  }

  /// @inheritdoc IGoodKernel
  function createGoodService(CreateGoodServiceInput calldata createGoodServiceInput)
    external
    virtual
    override
    whenNotPaused
    returns (uint256 mintedGoodServiceId, GoodServiceState mintedGoodServiceState)
  {
    Good storage good = _goods[createGoodServiceInput.from][
      _goodsIds[createGoodServiceInput.from][createGoodServiceInput.goodId]
    ];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    (mintedGoodServiceId, mintedGoodServiceState) = good.addService(createGoodServiceInput, _goodServiceTokenFactory);

    emit GoodServiceCreated(
      createGoodServiceInput.from,
      good.id,
      mintedGoodServiceId,
      mintedGoodServiceState,
      createGoodServiceInput.tokenUri
    );
  }

  /// @inheritdoc IGoodKernel
  function removeGoodService(RemoveGoodServiceInput calldata input) external virtual override whenNotPaused {
    uint256 goodId = _goodsIds[input.from][input.goodId];

    require(goodId != 0, "GK011");

    Good storage good = _goods[input.from][goodId];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    uint256 goodServiceId = good.servicesIds[input.goodServiceId];

    require(goodServiceId != 0, "GK012");

    GoodService storage goodService = good.services[goodServiceId];

    // Call on a non existing good service
    require(goodService.id != 0, "GK012");

    // Unable to burn an unpaused good service
    require(goodService.state == GoodServiceState.Paused, "GK024");

    good.removeService(goodService, goodServiceId, _goodServiceTokenFactory);

    emit GoodServiceBurned(input.from, good.id, goodService.id);
  }

  /// @inheritdoc IGoodKernel
  function pauseGoodService(PauseGoodServiceInput calldata input) external virtual override whenNotPaused {
    uint256 goodId = _goodsIds[input.from][input.goodId];

    require(goodId != 0, "GK011");

    Good storage good = _goods[input.from][goodId];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    uint256 goodServiceId = good.servicesIds[input.goodServiceId];

    require(goodServiceId != 0, "GK012");

    GoodService storage goodService = good.services[goodServiceId];

    // Call on a non existing good service
    require(goodService.id != 0, "GK012");

    // The good service is already paused
    require(goodService.state == GoodServiceState.Unpaused, "GK023");

    goodService.state = GoodServiceState.Paused;

    emit GoodServicePaused(input.from, good.id, goodService.id);
  }

  /// @inheritdoc IGoodKernel
  function unpauseGoodService(UnPauseGoodServiceInput calldata input) external virtual override whenNotPaused {
    uint256 goodId = _goodsIds[input.from][input.goodId];

    require(goodId != 0, "GK011");

    Good storage good = _goods[input.from][goodId];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    uint256 goodServiceId = good.servicesIds[input.goodServiceId];

    require(goodServiceId != 0, "GK012");

    GoodService storage goodService = good.services[goodServiceId];

    // The good service is already unpaused
    require(goodService.state == GoodServiceState.Paused, "GK024");

    goodService.state = GoodServiceState.Unpaused;

    emit GoodServiceUnpaused(input.from, good.id, goodService.id);
  }

  /// @inheritdoc IGoodKernel
  function createGoodServiceVoucher(CreateGoodServiceVoucherInput calldata createGoodServiceVoucherInput)
    external
    virtual
    override
    returns (uint256 mintedGoodServiceVoucher)
  {
    Good storage good = _goods[createGoodServiceVoucherInput.from][
      _goodsIds[createGoodServiceVoucherInput.from][createGoodServiceVoucherInput.goodId]
    ];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    // Unable to burn a voucher on a paused good
    require(good.state == GoodState.Unpaused, "GK021");

    GoodService storage goodService = good.services[good.servicesIds[createGoodServiceVoucherInput.goodServiceId]];

    // Call on a non existing good service
    require(goodService.id != 0, "GK012");

    // The good service is already paused
    require(goodService.state == GoodServiceState.Unpaused, "GK023");

    mintedGoodServiceVoucher = goodService.addVoucher(createGoodServiceVoucherInput, _goodServiceVoucherTokenFactory);

    emit GoodServiceVoucherCreated(
      createGoodServiceVoucherInput.from,
      createGoodServiceVoucherInput.goodId,
      createGoodServiceVoucherInput.goodServiceId,
      goodServiceVoucherId,
      goodServiceVoucherStart,
      goodServiceVoucherEnd,
      goodServiceVoucherAmount,
      goodServiceVoucherState,
      goodServiceVoucherDestructionType,
      goodServiceVoucherUri
    );
  }

  /// @inheritdoc IGoodKernel
  function removeGoodServiceVoucher(RemoveGoodServiceVoucherInput calldata removeGoodServiceVoucherInput)
    external
    virtual
    override
  {
    Good storage good = _goods[removeGoodServiceVoucherInput.from][removeGoodServiceVoucherInput.goodId];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    // Unable to burn a voucher on a paused good
    require(good.state != GoodState.Unpaused, "GK021");

    GoodService storage goodService = good.services[good.servicesIds[removeGoodServiceVoucherInput.goodServiceId]];

    // Call on a non existing good service
    require(goodService.id != 0, "GK012");

    require(goodService.state == GoodServiceState.Unpaused, "GK023");

    GoodServiceVoucher storage goodVoucher = goodService.vouchers[
      goodService.vouchersIds[removeGoodServiceVoucherInput.goodServiceVoucherId]
    ];

    // Call on a non existing good service voucher
    require(goodVoucher.id != 0, "GK013");

    goodService.removeVoucher(goodVoucher, removeGoodServiceVoucherInput.from, _goodServiceVoucherTokenFactory);

    emit GoodServiceVoucherBurned(
      removeGoodServiceVoucherInput.from,
      removeGoodServiceVoucherInput.goodId,
      removeGoodServiceVoucherInput.goodServiceId,
      removeGoodServiceVoucherInput.goodServiceVoucherId
    );
  }

  /// @inheritdoc IGoodKernel
  function getGoods(GetGoodsInput calldata input)
    external
    view
    virtual
    override
    returns (GetGoodsOutput memory output)
  {
    uint256 goodsCount = _goodsCount[input.goodsOwner];

    require(goodsCount != 0, "GK014");

    for (uint256 i = 0; i < goodsCount - 1; i++) {
      Good storage good = _goods[input.goodsOwner][_goodsIds[input.goodsOwner][i]];

      if (good.id == 0) continue;
      output.ids[i] = good.id;
      output.states[i] = good.state;
      output.acceptedTokens[i] = good.acceptedTokens;
    }
  }

  /// @inheritdoc IGoodKernel
  function getGood(GetGoodInput calldata input) external view virtual override returns (GetGoodOutput memory output) {
    Good storage good = _goods[input.goodOwner][_goodsIds[input.goodOwner][input.goodId]];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    output.state = good.state;
    output.acceptedTokens = good.acceptedTokens;
  }

  /// @inheritdoc IGoodKernel
  function getGoodServices(GetGoodServicesInput calldata input)
    external
    view
    virtual
    override
    returns (GetGoodServicesOutput memory output)
  {
    Good storage good = _goods[input.goodOwner][_goodsIds[input.goodOwner][input.goodId]];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    output.goodState = good.state;
    output.goodAcceptedTokens = good.acceptedTokens;

    uint256 goodServicesCount = good.servicesCount;

    require(goodServicesCount != 0, "GK015");

    for (uint256 i = 0; i < goodServicesCount - 1; i++) {
      uint256 goodServiceId = good.servicesIds[i];

      GoodService storage goodService = good.services[goodServiceId];

      if (goodServiceId == 0) continue;
      output.goodServiceIds[i] = goodServiceId;
      output.goodServiceCapacities[i] = goodService.capacity;
      output.goodServiceStates[i] = goodService.state;
    }
  }

  /// @inheritdoc IGoodKernel
  function getGoodService(GetGoodServiceInput calldata input)
    external
    view
    virtual
    override
    returns (GetGoodServiceOutput memory output)
  {
    Good storage good = _goods[input.goodOwner][_goodsIds[input.goodOwner][input.goodId]];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    output.goodState = good.state;
    output.goodAcceptedTokens = good.acceptedTokens;

    GoodService storage goodService = good.services[good.servicesIds[input.goodServiceId]];

    // Call on a non existing or non owned good service
    require(goodService.id != 0, "GK012");

    output.goodServiceCapacity = goodService.capacity;
    output.goodServiceState = goodService.state;
  }

  /// @inheritdoc IGoodKernel
  function getGoodServiceVouchers(GetGoodServiceVouchersInput calldata input)
    external
    view
    virtual
    override
    returns (GetGoodServiceVouchersOutput memory output)
  {
    Good storage good = _goods[input.goodOwner][_goodsIds[input.goodOwner][input.goodId]];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    output.goodState = good.state;
    output.goodAcceptedTokens = good.acceptedTokens;

    GoodService storage goodService = good.services[good.servicesIds[input.goodServiceId]];

    // Call on a non existing or non owned good service
    require(goodService.id != 0, "GK012");

    output.goodServiceCapacity = goodService.capacity;
    output.goodServiceState = goodService.state;

    mapping(uint256 => GoodServiceVoucher) storage goodVouchers = goodService.vouchers;

    uint256 goodVouchersCount = goodService.vouchersCount;

    for (uint256 i = 0; i < goodVouchersCount - 1; i++) {
      if (goodVouchers[i].id == 0) continue;
      output.goodServiceVoucherIds[i] = goodVouchers[i].id;
      output.goodServiceVoucherStarts[i] = goodVouchers[i].start;
      output.goodServiceVoucherEnds[i] = goodVouchers[i].end;
      output.goodServiceVoucherAmounts[i] = goodVouchers[i].amount;
      output.goodServiceVoucherStates[i] = goodVouchers[i].state;
    }
  }

  /// @inheritdoc IGoodKernel
  function getGoodServiceVouchers(GetArrayGoodServiceVouchersInput calldata input)
    external
    view
    virtual
    override
    returns (GetArrayGoodServiceVouchersOutput memory output)
  {
    Good storage good = _goods[input.goodOwner][_goodsIds[input.goodOwner][input.goodId]];

    // Call on a non existing or non owned good
    require(good.id != 0, "GK011");

    GoodService storage goodService = good.services[good.servicesIds[input.goodServiceId]];

    output.goodState = good.state;
    output.goodAcceptedTokens = good.acceptedTokens;

    // Call on a non existing good service
    require(goodService.id != 0, "GK012");

    output.goodServiceCapacity = goodService.capacity;
    output.goodServiceState = goodService.state;

    for (uint256 i = 0; i < goodService.vouchersCount - 1; i++) {
      GoodServiceVoucher storage goodServiceVoucher = goodService.vouchers[goodService.vouchersIds[i]];

      // Call on a non existing good service voucher
      require(goodServiceVoucher.id != 0, "GK013");

      output.goodServiceVoucherStarts[i] = goodServiceVoucher.start;
      output.goodServiceVoucherEnds[i] = goodServiceVoucher.end;
      output.goodServiceVoucherAmounts[i] = goodServiceVoucher.amount;
      output.goodServiceVoucherStates[i] = goodServiceVoucher.state;
    }
  }

  /// @inheritdoc IGoodKernel
  function pause() public virtual override onlyFromRouterOrOwner {
    _pause();
  }

  function _pause() internal override {
    IGoodTokenFactory goodTokenFactory = IGoodTokenFactory(_goodTokenFactory);

    IGoodServiceTokenFactory goodServiceTokenFactory = IGoodServiceTokenFactory(_goodServiceTokenFactory);

    IGoodServiceVoucherTokenFactory goodServiceVoucherTokenFactory = IGoodServiceVoucherTokenFactory(
      _goodServiceVoucherTokenFactory
    );

    if (!goodTokenFactory.paused()) {
      IGoodTokenFactory(_goodTokenFactory).pause();
    }

    if (!goodServiceTokenFactory.paused()) {
      IGoodServiceTokenFactory(_goodServiceTokenFactory).pause();
    }

    if (!goodServiceVoucherTokenFactory.paused()) {
      IGoodServiceVoucherTokenFactory(_goodServiceVoucherTokenFactory).pause();
    }

    super._pause();
  }

  /// @inheritdoc IGoodKernel
  function unpause() public virtual override onlyFromRouterOrOwner {
    _unpause();
  }

  function _unpause() internal override {
    IGoodTokenFactory goodTokenFactory = IGoodTokenFactory(_goodTokenFactory);

    IGoodServiceTokenFactory goodServiceTokenFactory = IGoodServiceTokenFactory(_goodServiceTokenFactory);

    IGoodServiceVoucherTokenFactory goodServiceVoucherTokenFactory = IGoodServiceVoucherTokenFactory(
      _goodServiceVoucherTokenFactory
    );

    if (goodTokenFactory.paused()) {
      IGoodTokenFactory(_goodTokenFactory).unpause();
    }

    if (goodServiceTokenFactory.paused()) {
      IGoodServiceTokenFactory(_goodServiceTokenFactory).unpause();
    }

    if (goodServiceVoucherTokenFactory.paused()) {
      IGoodServiceVoucherTokenFactory(_goodServiceVoucherTokenFactory).unpause();
    }

    super._unpause();
  }

  function setRouter(address newRouter) external virtual onlyOwner whenPaused {
    _setRouter(newRouter);
  }

  function supportsInterface(bytes4 interfaceId) public pure override(IERC165) returns (bool) {
    return interfaceId == type(IGoodKernel).interfaceId || interfaceId == type(IKernel).interfaceId;
  }
}
