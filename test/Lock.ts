// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing Chai library for assertions
import { expect } from "chai";

// Importing Hardhat's testing utilities
import { ethers } from "hardhat";

// Define a test suite for the Funds contractdescribe("Funds", function () {
  let Funds;
  let fundsContract;
  let owner;
  let addr1;

  // Before each test, deploy the Funds contract and get test accounts
  beforeEach(async function () {
    Funds = await ethers.getContractFactory("Funds");
    [owner, addr1] = await ethers.getSigners();
    fundsContract = await Funds.deploy();
  });

  // Test case to check deposit function
  it("Should deposit funds", async function () {
    const initialBalance = await ethers.provider.getBalance(addr1.address);
    const depositAmount = ethers.parseEther("1");

    // Deposit funds from addr1
    await fundsContract.connect(addr1).deposit({ value: depositAmount });

    // Check if the deposited balance of addr1 matches the deposited amount
    expect(await fundsContract.getDepositedBalance(addr1.address)).to.equal(depositAmount);

    // Check if the contract received the deposited amount
    expect(await ethers.provider.getBalance(fundsContract.address)).to.equal(depositAmount);

    // Check if the balance of addr1 decreased by the deposited amount
    expect(await ethers.provider.getBalance(addr1.address)).to.equal(initialBalance.sub(depositAmount));
  });

  // Test case to check transferToContract function
  it("Should transfer funds to the contract", async function () {
    const initialBalance = await ethers.provider.getBalance(fundsContract.address);
    const transferAmount = ethers.parseEther("1");

    // Transfer funds to the contract
    await addr1.sendTransaction({ to: fundsContract.address, value: transferAmount });

    // Check if the total funds transferred to the contract matches the transferred amount
    expect(await fundsContract.totalFundsTransferred()).to.equal(transferAmount);

    // Check if the contract's balance increased by the transferred amount
    expect(await ethers.provider.getBalance(fundsContract.address)).to.equal(initialBalance.add(transferAmount));
  });
});
