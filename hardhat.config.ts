import { task } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-solhint';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import 'solidity-coverage';
import { users } from './test/utils';

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    version: '0.8.5',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  typechain: {
    outDir: 'types/contracts',
    target: 'ethers-v5',
    alwaysGenerateOverloads: true,
    externalArtifacts: ['externalArtifacts/*.json'],
  },
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/937deb213a614a39b1cf4ffe87cd5693`,
      accounts: [
        `59aa10d7b37f3959dfe9e87dcb08a34e380aced0ef40a45c9d91b98fa7c7c8ac`,
      ],
    },
  },
  gasReporter: {
    currency: 'USD',
    coinmarketcap: 'e683a94e-2e0b-4975-aa87-4051e68c5ffe',
    token: 'MATIC',
    gasPriceApi:
      'https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice',
  },
};
