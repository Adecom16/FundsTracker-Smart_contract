// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract funds {
    // Mapping to store the balances deposited by each address
    mapping(address => uint256) public depositedFunds;
    
    // Variable to store the total funds transferred directly to the contract
    uint256 public totalFundsTransferred;

    // Event emitted when funds are deposited into the contract
    event Deposit(address indexed from, uint256 amount);
    
    // Event emitted when funds are transferred directly to the contract
    event FundTransferred(address indexed from, uint256 amount);

    // Function to allow users to deposit funds into the contract
    function deposit() external payable {
        // Increase the deposited funds for the sender
        depositedFunds[msg.sender] += msg.value;
        
        // Emit an event to log the deposit
        emit Deposit(msg.sender, msg.value);
    }

    // Function to allow direct transfer of funds to the contract
    function transferToContract() external payable {
        // Increase the total funds transferred to the contract
        totalFundsTransferred += msg.value;
        
        // Emit an event to log the transfer
        emit FundTransferred(msg.sender, msg.value);
    }

    // Function to retrieve the deposited balance of an address
    function getDepositedBalance(address account) external view returns (uint256) {
        return depositedFunds[account];
    }
}