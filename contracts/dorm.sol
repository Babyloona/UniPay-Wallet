// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DormitoryPayment {
    address private universityAddress = address(0x2f3628AbC190883dF8E20670dfB9c53E5681E5e5);  
    uint256 private requiredPrice = 0.0015 ether ;
    uint256 private contractID=0 ;
    address private  owner;
    struct Dormitory {
        uint256 contract_id;
        address  student_address;
        uint256 student_barcode;
        string full_name;
        uint256 roomNumber;
        uint256 howmanymonths;
        string whichmonths;
        string comments;
        uint256 requiredPrice;
        uint256 timestamp;
        bool paid;
    }
    

     mapping(address => Dormitory[]) private  DormitoryPayments;
     Dormitory[] private allDormitoryTransactions;
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

    function makePayment(uint256 student_barcode, string memory comments , string memory _full_name, uint256 roomNumber, uint256 forHowManyMonths, string memory whichMonths) external payable {
      
   
        require(msg.value >= requiredPrice, "Not enough cryptocurrency to make the payment");

        Dormitory memory newDormitory = Dormitory(contractID, msg.sender, student_barcode, _full_name, roomNumber,forHowManyMonths,whichMonths, comments, requiredPrice ,block.timestamp,true);
        DormitoryPayments[msg.sender].push(newDormitory);
        allDormitoryTransactions.push(newDormitory);

        
        if (msg.value >=requiredPrice) {
            payable(universityAddress).transfer(requiredPrice*forHowManyMonths); 
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
    function getMyTransactions() external view returns (Dormitory[] memory) {
        return DormitoryPayments[msg.sender];
    }
    function getAllTransactions() external view returns (Dormitory[] memory) {
        require(msg.sender==owner,"Sorry, you don't have permission for implementing this action."); 
        return allDormitoryTransactions;
    }
}