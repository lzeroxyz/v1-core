import hre from 'hardhat';

import { computeDeploymentAddresses } from '../helpers/contract-address';

import { deployGoodContracts } from './helpers/goods_deployer_helper';

async function deploy() {}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
