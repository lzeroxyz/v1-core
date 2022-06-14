import hre from 'hardhat';

import { computeDeploymentAddresses } from '../helpers/contract-address';

import { deployGoodContracts } from './helpers/goods_deployer_helper';

async function deploy() {
  const deploymentAddress = (await hre.ethers.getSigners())[0].address;

  const globalPreComputedAddresses = await computeDeploymentAddresses(
    deploymentAddress,
    ['LZeroRouter']
  );

  await deployGoodContracts(deploymentAddress, globalPreComputedAddresses);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
