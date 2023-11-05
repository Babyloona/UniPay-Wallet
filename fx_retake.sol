// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Fx_Retake {
    address private universityAddress = address(0x36e39f137bA88c6DDa27b6cce3ba5B2B26309Da8);
      
    uint256 private requiredPrice1 = 0.002 ether ;
    uint256 private requiredPrice2 = 0.001 ether ;
// 00000000000000000 - 17(0)
    uint256 private contractID=0 ;
    address private  owner;
    struct FxRetake {
        uint256 contract_id;
        address  student_address;
        uint256 student_barcode;
        string full_name;
        string subject;
        string ed_program;
        uint256 number_of_credits;
        uint256 requiredPrice;
        uint256 timestamp;
        bool paid;
    }
    

     mapping(address => FxRetake[]) private  fx_retakePayments;
     FxRetake[] private allFxRetakeTransactions;
     event LogMessage(string message);
    constructor() payable {
        owner = msg.sender;
    }

    function setUniversityAddress(address uni_address) external {
        require(msg.sender==owner,"Sorry, you don't have permission for implementing this action.");
        universityAddress = uni_address;
    }

    function setRequiredPriceof1IT(uint256 required_price) external {
        require(msg.sender==owner,"Sorry, you don't have permission for implementing this action.");
        requiredPrice1 = required_price ; 
    }
    function setRequiredPriceof2Other(uint256 required_price) external {
        require(msg.sender==owner,"Sorry, you don't have permission for implementing this action.");
        requiredPrice2 = required_price ; 
    }
     
    function makePaymentofRetake(uint256 student_barcode, string memory _full_name, string memory ed_program, string memory subject, uint256 number_of_credits) external payable {
    if (keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("IT")) || 
        keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("SE")) || 
        keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("MT")) ||
        keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("CS")) || 
        keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("TS")) 
    ) {
        require(msg.value >= requiredPrice1, "Not enough cryptocurrency to make the payment");
        FxRetake memory newpayment = FxRetake(contractID, msg.sender, student_barcode, _full_name, subject, ed_program, number_of_credits, (requiredPrice1 * number_of_credits), block.timestamp, true);
         fx_retakePayments[msg.sender].push(newpayment);
        allFxRetakeTransactions.push(newpayment);

        if (msg.value >= requiredPrice1) {
            payable(universityAddress).transfer(requiredPrice1 * number_of_credits);
        }

        //payable(owner).transfer(address(this).balance);
        contractID++;
    } else if (keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("DJ")) ||
               keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("ITE")) ||
               keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("ITM"))
    ) {
        require(msg.value >= requiredPrice2, "Not enough cryptocurrency to make the payment");
        FxRetake memory newpayment = FxRetake(contractID, msg.sender, student_barcode, _full_name, subject, ed_program, number_of_credits, (requiredPrice2 * number_of_credits), block.timestamp, true);
         fx_retakePayments[msg.sender].push(newpayment);
        allFxRetakeTransactions.push(newpayment);

        if (msg.value >= requiredPrice2) {
            payable(universityAddress).transfer(requiredPrice2 * number_of_credits);
        }

        //payable(owner).transfer(address(this).balance);
        contractID++;
    }
    else{
        emit LogMessage("Education program not correct writen!");
    }
}

       function makePaymentofFX(uint256 student_barcode, string memory _full_name, string memory ed_program, string memory subject) external payable {
    if (keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("IT")) || 
        keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("SE")) || 
        keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("MT")) ||
        keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("CS")) || 
        keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("TS")) 
    ) {
        require(msg.value >= requiredPrice1, "Not enough cryptocurrency to make the payment");
        FxRetake memory newpayment = FxRetake(contractID, msg.sender, student_barcode, _full_name, subject, ed_program, 0, requiredPrice1, block.timestamp, true);
         fx_retakePayments[msg.sender].push(newpayment);
        allFxRetakeTransactions.push(newpayment);

        if (msg.value >= requiredPrice1) {
            payable(universityAddress).transfer(requiredPrice1 );
        }

        //payable(owner).transfer(address(this).balance);
        contractID++;
    } else if (keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("DJ")) ||
               keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("ITE")) ||
               keccak256(abi.encodePacked(ed_program)) == keccak256(abi.encodePacked("ITM"))
    ) {
        require(msg.value >= requiredPrice2, "Not enough cryptocurrency to make the payment");
        FxRetake memory newpayment = FxRetake(contractID, msg.sender, student_barcode, _full_name, subject, ed_program, 0, requiredPrice2 , block.timestamp, true);
         fx_retakePayments[msg.sender].push(newpayment);
        allFxRetakeTransactions.push(newpayment);

        if (msg.value >= requiredPrice2) {
            payable(universityAddress).transfer(requiredPrice2);
        }

        //payable(owner).transfer(address(this).balance);
        contractID++;
    }
    else{
        emit LogMessage("Education program not correct writen!");
    }
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
    function getMyTransactions() external view returns (FxRetake[] memory) {
        return  fx_retakePayments[msg.sender];
    }
    function getAllTransactions() external view returns (FxRetake[] memory) {
        require(msg.sender==owner,"Sorry, you don't have permission for implementing this action."); 
        return allFxRetakeTransactions;
    }
}