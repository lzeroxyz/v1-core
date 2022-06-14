import hre from 'hardhat';

import { computeDeploymentAddresses } from '../../helpers/contract-address';

export async function deployGoodContracts(
  deploymentAddress: string,
  globalPreComputedAddresses: { [key: string]: string }
) {
  const goodPreComputedAddresses = Object.assign(
    globalPreComputedAddresses,
    await computeDeploymentAddresses(
      deploymentAddress,
      [
        'GoodKernel',
        'GoodTokenFactory',
        'GoodServiceTokenFactory',
        'GoodServiceVoucherTokenFactory',
      ],
      Object.keys(globalPreComputedAddresses).length
    )
  );

  const GoodTokenFactory = await hre.ethers.getContractFactory(
    'GoodTokenFactory'
  );

  const goodTokenContract = await GoodTokenFactory.deploy(
    goodPreComputedAddresses['GoodKernel'],
    goodPreComputedAddresses['LZeroRouter']
  );

  console.log(goodTokenContract.address);
}
