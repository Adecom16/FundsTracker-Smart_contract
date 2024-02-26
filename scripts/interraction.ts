import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying funds contract...");
    const Funds = await ethers.getContractFactory("funds");
    const funds = await Funds.deploy();
    // await funds.deployed();

    console.log("Funds contract deployed to:", funds.address); // Corrected line

    console.log("Depositing funds into the contract...");
    const depositAmount = ethers.parseEther("1"); // Deposit 1 ether
    const depositTx = await funds.deposit({
        value: depositAmount,
        gasLimit: 300000 // Adjust gas limit as needed
    });
    await depositTx.wait();

    console.log("Funds deposited successfully.");
    const depositorBalance = await funds.getDepositedBalance(deployer.address);
    console.log("Depositor balance:", ethers.formatEther(depositorBalance));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
