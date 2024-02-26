const { expect } = require("chai");

describe("Funds Contract", function () {
  let funds;
  let owner;

  beforeEach(async function () {
    const Funds = await ethers.getContractFactory("funds");
    funds = await Funds.deploy();

    [owner] = await ethers.getSigners();
  });

  it("Should deposit funds into the contract", async function () {
    const depositAmount = ethers.parseEther("1");

    await expect(() =>
      funds.deposit({ value: depositAmount })
    ).to.changeEtherBalance(funds, depositAmount);
  });

  it("Should retrieve the deposited balance of an address", async function () {
    const depositAmount = ethers.parseEther("1");
    await funds.deposit({ value: depositAmount });

    const balance = await funds.getDepositedBalance(owner.address);
    expect(balance).to.equal(depositAmount);
  });
});
