import { ethers } from 'hardhat';

import { keccak256, RLP } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import internal from 'stream';

export async function computeDeploymentAddresses(
  deployer: string,
  contractNames: string[],
  startingIndex: number = 0
): Promise<{ [key: string]: string }> {
  const resultingAddresses: { [key: string]: string } = {};
  const startingNonce = await ethers.provider.getTransactionCount(deployer);

  for (let [contractIndex, contractName] of contractNames.entries()) {
    const contractNonce = BigNumber.from(startingNonce).add(
      startingIndex + contractIndex
    );
    const contractNonceHex = contractNonce.eq(0)
      ? '0x'
      : contractNonce.toHexString();

    const encodedRlp = RLP.encode([deployer, contractNonceHex]);

    resultingAddresses[contractName] = `0x${keccak256(encodedRlp).substring(
      26
    )}`;
  }

  return resultingAddresses;
}
