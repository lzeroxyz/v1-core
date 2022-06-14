import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { Users } from '../helpers/users';

export let users: Users;

export async function createUsers() {
  const signers: Signer[] = await ethers.getSigners();
  users = new Users(signers);
}
