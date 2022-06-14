import { expect } from 'chai';
import {
  whenTheConditionsAreMet as createGoodWhenTheConditionsAreMet,
  whenTheContractIsPaused as createGoodWhenTheContractIsPaused,
} from './good_kernel/create_good';
import {
  whenTheConditionsAreMet as getGoodWhenTheConditionsAreMet,
  whenTheGoodDoesntExist as getGoodWhenTheGoodDoesntExist,
} from './good_kernel/get_good';
import {
  whenTheAddressHasNoGoods as getGoodsWhenTheAddressHasNoGoods,
  whenTheConditionsAreMet as getGoodsWhenTheConditionsAreMet,
} from './good_kernel/get_goods';
import {
  whenTheConditionsAreMet as pauseGoodWhenTheConditionsAreMet,
  whenTheContractIsPaused as pauseGoodWhenTheContractIsPaused,
  whenTheGoodDoesntExists as pauseGoodWhenTheGoodDoesntExists,
  whenTheGoodIsNotInTheRightState as pauseGoodWhenTheGoodIsNotInTheRightState,
} from './good_kernel/pause_good';
import {
  whenTheConditionsAreMet as removeGoodWhenTheConditionsAreMet,
  whenTheContractIsPaused as removeGoodWhenTheContractIsPaused,
} from './good_kernel/remove_good';
import {
  whenTheConditionsAreMet as createGoodServiceWhenTheConditionsAreMet,
  whenTheGoodDoesntExists as createGoodServiceWhenTheGoodDoesntExists,
  whenTheGoodIsPaused as createGoodServiceWhenTheGoodIsPaused,
} from './good_kernel/service/create_good_service';
import {
  whenTheConditionsAreMet as pauseGoodServiceWhenTheConditionsAreMet,
  whenTheContractIsPaused as pauseGoodServiceWhenTheContractIsPaused,
  whenTheGoodDoesntExists as pauseGoodServiceWhenTheGoodDoesntExists,
  whenTheGoodServiceDoesntExists as pauseGoodServiceWhenTheGoodServiceDoesntExists,
  whenTheGoodServiceIsNotInTheRightState as pauseGoodServiceWhenTheGoodServiceIsNotInTheRightState,
} from './good_kernel/service/pause_good_service';
import {
  whenTheConditionsAreMet as removeGoodServiceWhenTheConditionsAreMet,
  whenTheContractIsPaused as removeGoodServiceWhenTheContractIsPaused,
  whenTheGoodDoesntExists as removeGoodServiceWhenTheGoodDoesntExists,
  whenTheGoodServiceIdIsNotFound as removeGoodServiceWhenTheGoodServiceIdIsNotFound,
  whenTheGoodServiceIsNotInTheRightState as removeGoodServiceWhenTheGoodServiceIsNotInTheRightState,
  whenTheGoodServiceTokenFactoryIsPaused as removeGoodServiceWhenTheGoodServiceTokenFactoryIsPaused,
} from './good_kernel/service/remove_good_service';
import {
  whenTheConditionsAreMet as unpauseGoodServiceWhenTheConditionsAreMet,
  whenTheContractIsPaused as unpauseGoodServiceWhenTheContractIsPaused,
  whenTheGoodDoesntExists as unpauseGoodServiceWhenTheGoodDoesntExists,
  whenTheGoodServiceDoesntExists as unpauseGoodServiceWhenTheGoodServiceDoesntExists,
  whenTheGoodServiceIsNotInTheRightState as unpauseGoodServiceWhenTheGoodServiceIsNotInTheRightState,
} from './good_kernel/service/unpause_good_service';
import {
  whenTheContractIsPaused as createGoodServiceVoucherWhenTheContractIsPaused,
  whenTheGoodDoesntExist as createGoodServiceVoucherWhenTheGoodDoesntExist,
  whenTheGoodIsNotInTheRightState as createGoodServiceVoucherWhenTheGoodIsNotInTheRightState,
  whenTheGoodServiceDoesntExist as createGoodServiceVoucherWhenTheGoodServiceDoesntExist,
  whenTheGoodServiceIsNotInTheRightState as createGoodServiceVoucherWhenTheGoodServiceIsNotInTheRightState,
} from './good_kernel/service/voucher/create_good_service_voucher';
import {
  whenTheConditionsAreMet as removeGoodServiceVoucherWhenTheConditionsAreMet,
  whenTheContractIsPaused as removeGoodServiceVoucherWhenTheContractIsPaused,
  whenTheGoodDoesntExist as removeGoodServiceVoucherWhenTheGoodDoesntExist,
  whenTheGoodIsNotInTheRightState as removeGoodServiceVoucherWhenTheGoodIsNotInTheRightState,
  whenTheGoodServiceDoesntExist as removeGoodServiceVoucherWhenTheGoodServiceDoesntExist,
  whenTheGoodServiceIsNotInTheRightState as removeGoodServiceVoucherWhenTheGoodServiceIsNotInTheRightState,
  whenTheGoodServiceVoucherDoesntExist as removeGoodServiceVoucherWhenTheGoodServiceVoucherDoesntExist,
} from './good_kernel/service/voucher/remove_good_service_voucher';
import {
  whenTheConditionsAreMet as unpauseGoodWhenTheConditionsAreMet,
  whenTheContractIsPaused as unpauseGoodWhenTheContractIsPaused,
  whenTheGoodDoesntExists as unpauseGoodWhenTheGoodDoesntExists,
  whenTheGoodIsNotInTheRightState as unpauseGoodWhenTheGoodIsNotInTheRightState,
} from './good_kernel/unpause_good';
import {
  deployContracts,
  goodKernelContract,
  prepareContracts,
} from './good_kernel/utils';
import { createUsers } from './utils';

describe('GoodKernel', async () => {
  beforeEach(async () => {
    await createUsers();

    await prepareContracts();

    await deployContracts();
  });

  describe('When the contract constructs', async () => {
    it('Should be unpaused', async () => {
      const currentPauseState = await goodKernelContract.paused();

      expect(currentPauseState).to.be.false;
    });
  });

  describe('getGood', async () => {
    describe('When the good doesnt exist', async () => {
      await getGoodWhenTheGoodDoesntExist();
    });

    describe('When the conditions are met', async () => {
      await getGoodWhenTheConditionsAreMet();
    });
  });

  describe('getGoods', async () => {
    describe('When the address has no goods', async () => {
      await getGoodsWhenTheAddressHasNoGoods();
    });

    describe('When the conditions are met', async () => {
      await getGoodsWhenTheConditionsAreMet();
    });
  });

  describe('createGood', async () => {
    describe('When the contract is paused', async () => {
      await createGoodWhenTheContractIsPaused();
    });

    describe('When the conditions are met', async () => {
      await createGoodWhenTheConditionsAreMet();
    });
  });

  describe('removeGood', async () => {
    describe('When the contract is paused', async () => {
      await removeGoodWhenTheContractIsPaused();
    });

    describe('When the conditions are met', async () => {
      await removeGoodWhenTheConditionsAreMet();
    });
  });

  describe('pauseGood', async () => {
    describe('When the contract is paused', async () => {
      await pauseGoodWhenTheContractIsPaused();
    });

    describe("When the good doesn't exists", async () => {
      await pauseGoodWhenTheGoodDoesntExists();
    });

    describe('When the good state is not in the right state', async () => {
      await pauseGoodWhenTheGoodIsNotInTheRightState();
    });

    describe('When the conditions are met', async () => {
      await pauseGoodWhenTheConditionsAreMet();
    });
  });

  describe('unpauseGood', async () => {
    describe('When the contract is paused', async () => {
      await unpauseGoodWhenTheContractIsPaused();
    });

    describe("When the good doesn't exists", async () => {
      await unpauseGoodWhenTheGoodDoesntExists();
    });

    describe('When the good is not in the right state', async () => {
      await unpauseGoodWhenTheGoodIsNotInTheRightState();
    });

    describe('When the conditions are met', async () => {
      await unpauseGoodWhenTheConditionsAreMet();
    });
  });

  describe('createGoodService', async () => {
    describe('When the contract is paused', async () => {
      await createGoodServiceWhenTheConditionsAreMet();
    });

    describe("When the good doesn't exists", async () => {
      await createGoodServiceWhenTheGoodDoesntExists();
    });

    describe('When the good is paused', async () => {
      await createGoodServiceWhenTheGoodIsPaused();
    });

    describe('When the conditions are met', async () => {
      await createGoodServiceWhenTheConditionsAreMet();
    });
  });

  describe('removeGoodService', async () => {
    describe('When the contract is paused', async () => {
      await removeGoodServiceWhenTheContractIsPaused();
    });

    describe("When the good doesn't exists", async () => {
      await removeGoodServiceWhenTheGoodDoesntExists();
    });

    describe('When the good service is not found in the goodsServicesIds', async () => {
      await removeGoodServiceWhenTheGoodServiceIdIsNotFound();
    });

    describe('When the good service is not in the right state', async () => {
      await removeGoodServiceWhenTheGoodServiceIsNotInTheRightState();
    });

    describe('When the goodServiceTokenFactory is paused', async () => {
      await removeGoodServiceWhenTheGoodServiceTokenFactoryIsPaused();
    });

    describe('When the conditions are met', async () => {
      await removeGoodServiceWhenTheConditionsAreMet();
    });
  });

  describe('pauseGoodService', async () => {
    describe('When the contract is paused', async () => {
      await pauseGoodServiceWhenTheContractIsPaused();
    });

    describe("When the good doesn't exists", async () => {
      await pauseGoodServiceWhenTheGoodDoesntExists();
    });

    describe("When the good service doesn't exists", async () => {
      await pauseGoodServiceWhenTheGoodServiceDoesntExists();
    });

    describe('When the good service is not in the right state', async () => {
      await pauseGoodServiceWhenTheGoodServiceIsNotInTheRightState();
    });

    describe('When the conditions are met', async () => {
      await pauseGoodServiceWhenTheConditionsAreMet();
    });
  });

  describe('unpauseGoodService', async () => {
    describe('When the contract is paused', async () => {
      await unpauseGoodServiceWhenTheContractIsPaused();
    });

    describe("When the good doesn't exists", async () => {
      await unpauseGoodServiceWhenTheGoodDoesntExists();
    });

    describe("When the good service doesn't exists", async () => {
      await unpauseGoodServiceWhenTheGoodServiceDoesntExists();
    });

    describe('When the good service is unpaused', async () => {
      await unpauseGoodServiceWhenTheGoodServiceIsNotInTheRightState();
    });

    describe('When the conditions are met', async () => {
      await unpauseGoodServiceWhenTheConditionsAreMet();
    });
  });

  describe('createGoodServiceVoucher', async () => {
    beforeEach(async () => {
      await deployContracts();
    });

    describe('When the contract is paused', async () => {
      await createGoodServiceVoucherWhenTheContractIsPaused();
    });

    describe('When the good does not exists', async () => {
      await createGoodServiceVoucherWhenTheGoodDoesntExist();
    });

    describe('When the good is not in the right state', async () => {
      await createGoodServiceVoucherWhenTheGoodIsNotInTheRightState();
    });

    describe('When the good service does not exists', async () => {
      await createGoodServiceVoucherWhenTheGoodServiceDoesntExist();
    });

    describe('When the good service is not in the right state', async () => {
      await createGoodServiceVoucherWhenTheGoodServiceIsNotInTheRightState();
    });
  });

  describe('removeGoodServiceVoucher', async () => {
    beforeEach(async () => {
      await deployContracts();
    });

    describe('When the contract is paused', async () => {
      await removeGoodServiceVoucherWhenTheContractIsPaused();
    });

    describe('When the good does not exists', async () => {
      await removeGoodServiceVoucherWhenTheGoodDoesntExist();
    });

    describe('When the good is not in the right state', async () => {
      await removeGoodServiceVoucherWhenTheGoodIsNotInTheRightState();
    });

    describe('When the good service does not exists', async () => {
      await removeGoodServiceVoucherWhenTheGoodServiceDoesntExist();
    });

    describe('When the good service is not in the right state', async () => {
      await removeGoodServiceVoucherWhenTheGoodServiceIsNotInTheRightState();
    });

    describe('When the good service voucher does not exists', async () => {
      await removeGoodServiceVoucherWhenTheGoodServiceVoucherDoesntExist();
    });

    describe('When the conditions are met', async () => {
      await removeGoodServiceVoucherWhenTheConditionsAreMet();
    });
  });
});
