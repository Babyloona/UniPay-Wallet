// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TuitionPayment {
    address private universityAddress = address(0x36e39f137bA88c6DDa27b6cce3ba5B2B26309Da8);  
    uint256 private requiredPrice = 0.001 ether ;
    uint256 private contractID=0 ;
    address private  owner;
    struct Tuition {
        uint256 contract_id;
        address  student_address;
        uint256 student_barcode;
        string full_name;
        string comments;
        uint256 requiredPrice;
        uint256 timestamp;
        bool paid;
    }
    

     mapping(address => Tuition[]) private  tuitionPayments;
     Tuition[] private allTuitionTransactions;
    constructor() payable {
        owner = msg.sender;
    }

    function setUniversityAddress(address uni_address) external {
        require(msg.sender==owner,"Sorry, you don't have permission for implementing this action.");
        universityAddress = uni_address;
    }

    function setRequiredPrice(uint256 required_price) external {
        require(msg.sender==owner,"Sorry, you don't have permission for implementing this action.");
        requiredPrice = required_price ; 
    }

    function makePayment(uint256 student_barcode, string memory comments , string memory _full_name) external payable {
      
   
        require(msg.value >= requiredPrice, "Not enough cryptocurrency to make the payment");

        Tuition memory newTuition = Tuition(contractID, msg.sender, student_barcode, _full_name, comments, requiredPrice ,block.timestamp,true);
        tuitionPayments[msg.sender].push(newTuition);
        allTuitionTransactions.push(newTuition);

        
        if (msg.value >=requiredPrice) {
            payable(universityAddress).transfer(requiredPrice); 
        }

        //payable(owner).transfer(address(this).balance); 
        contractID++;
    }

    function getCommission()external  payable {
        require(msg.sender==owner,"Sorry, you don't have permission for implementing this action."); 
        payable(owner).transfer(address(this).balance); 
        
    }
    function checkMyBalance() external view returns (uint256) {
        return address(msg.sender).balance;
    }

    function checkBalanceofContract() external view returns (uint256) {
        require(msg.sender==owner,"Sorry, you don't have permission for implementing this action."); 
        return address(this).balance;
    }
    function getMyTransactions() external view returns (Tuition[] memory) {
        return tuitionPayments[msg.sender];
    }
    function getAllTransactions() external view returns (Tuition[] memory) {
        require(msg.sender==owner,"Sorry, you don't have permission for implementing this action."); 
        return allTuitionTransactions;
    }
}