import { ethers } from "hardhat";

async function main() {

  const XCallTestContract = await ethers.getContractFactory("XCallTestContract");
  const xCallTestContract = await XCallTestContract.deploy();

  await xCallTestContract.deployed();

  console.log(`XCallTestContract deployed to ${xCallTestContract.address}\n`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
