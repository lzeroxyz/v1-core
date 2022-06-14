import { BigNumber, Contract } from 'ethers';
import { ethers } from 'hardhat';

export function getStorageMappingStructAddress(
  mappingIndex: number | string,
  mappingStructIndex: number | string
): string {
  mappingIndex = mappingIndex.toString();
  mappingStructIndex = mappingStructIndex.toString();

  const completedMappingIndex =
    ''.padStart(64 - mappingIndex.length, '0') + mappingIndex;

  const completedMappingStructIndex =
    ''.padStart(64 - mappingStructIndex.length, '0') + mappingStructIndex;

  const x = completedMappingStructIndex + completedMappingIndex;

  return ethers.utils.keccak256(
    `0x${completedMappingStructIndex + completedMappingIndex}`
  );
}

export function getStorageMappingStructPropertyAddress(
  mappingIndex: number | string,
  mappingStructIndex: number | string,
  structPropertyIndex: number
): string {
  const mappingStructAddress = getStorageMappingStructAddress(
    mappingIndex,
    mappingStructIndex
  );

  const mappingStruct =
    BigNumber.from(mappingStructAddress).add(structPropertyIndex);

  return mappingStruct.toHexString();
}

export async function getStorageMappingStructProperty(
  contractAddress: string,
  mappingIndex: number | string,
  mappingStructIndex: number | string,
  mappingStructPropertyIndex: number = 0
) {
  const mappinStructPropertyAddress = getStorageMappingStructPropertyAddress(
    mappingIndex,
    mappingStructIndex,
    mappingStructPropertyIndex
  );

  return await ethers.provider.getStorageAt(
    contractAddress,
    mappinStructPropertyAddress
  );
}

export async function getStorageMappingStructProperties(
  contractAddress: string,
  mappingIndex: number,
  mappingStructIndex: string,
  scanPropertiesDepth: number
): Promise<{ [key: number]: string }> {
  const scanResult: { [key: number]: string } = {};

  for (
    let scanLevel: number = 0;
    scanLevel < scanPropertiesDepth;
    scanLevel++
  ) {
    scanResult[scanLevel] = await getStorageMappingStructProperty(
      contractAddress,
      mappingIndex,
      mappingStructIndex,
      scanLevel
    );
  }

  return scanResult;
}
