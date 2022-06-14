import { Signer } from 'ethers';
import fs from 'fs';

interface User {
  address: string;
  privateKey: string;
  signer: Signer;
}

const loadPrivateKeys = (accountKeysFile: string) => {
  const accountKeysRaw = fs.readFileSync(accountKeysFile, 'utf8');
  const accountKeysJs = JSON.parse(accountKeysRaw);

  return Object.fromEntries(
    Object.entries(accountKeysJs).map((entry) => [entry[0], `0x${entry[1]}`])
  );
};

export class Users {
  users: Array<User> = [];

  constructor(signers: Array<Signer>) {
    this._constructUsers(signers).then(
      (constructedUsers) => (this.users = constructedUsers)
    );
  }

  private async _constructUsers(signers: Array<Signer>) {
    const resultingUsers: Array<User> = [];

    const loadedPrivateKeys = loadPrivateKeys(
      process.env.ACCOUNT_KEYS_FILE || 'config/accounts.json'
    );

    for (let [signerIndex, signer] of signers.entries()) {
      const signerAddress = await signer.getAddress();

      resultingUsers.push({
        address: await signer.getAddress(),
        privateKey: loadedPrivateKeys[signerAddress],
        signer: signer,
      });
    }

    return resultingUsers;
  }

  get deployer(): User {
    return this.users[0];
  }

  get host(): User {
    return this.users[1];
  }

  get client(): User {
    return this.users[2];
  }

  get attacker(): User {
    return this.users[3];
  }

  get other1(): User {
    return this.users[4];
  }

  get other2(): User {
    return this.users[5];
  }

  get token1(): User {
    return this.users[6];
  }

  get token2(): User {
    return this.users[7];
  }
}
