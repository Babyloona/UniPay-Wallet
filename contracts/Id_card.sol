// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdCardPayment {
    address private universityAddress = address(0x86bcA1c3Ab1ccACeADC296Ccd051707b399e5455);  
    uint256 private requiredPrice = 0.001 ether ;
    uint256 private contractID=0 ;
    address private  owner;
    struct IdCard {
        uint256 contract_id;
        address  student_address;
        uint256 student_barcode;
        string full_name;
        string comments;
        string photo; //URL of photo
        uint256 requiredPrice;
        uint256 timestamp;
        bool paid;
    }
    

     mapping(address => IdCard[]) private  IdCardPayments;
     IdCard[] private allIdCardTransactions;
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

    function makePayment(uint256 student_barcode, string memory comments , string memory _photo, string memory _full_name) external payable {
      
   
        require(msg.value >= requiredPrice, "Not enough cryptocurrency to make the payment");

        IdCard memory newIdCard = IdCard(contractID, msg.sender, student_barcode, _full_name, comments, _photo, requiredPrice ,block.timestamp,true);
        IdCardPayments[msg.sender].push(newIdCard);
        allIdCardTransactions.push(newIdCard);

        
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
    function getMyTransactions() external view returns (IdCard[] memory) {
        return IdCardPayments[msg.sender];
    }
    function getAllTransactions() external view returns (IdCard[] memory) {
        require(msg.sender==owner,"Sorry, you don't have permission for implementing this action."); 
        return allIdCardTransactions;
    }
}