import { ethers } from "hardhat";

async function main() {

  const Funds = await ethers.deployContract("funds");

  await Funds.waitForDeployment();

  console.log(
    `Funds deployed to ${Funds.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
