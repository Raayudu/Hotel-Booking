//SPDX-License-Identifier:MIT

pragma solidity ^0.8.6;

    contract Owner{
        address public immutable OWNER_ADDRESS;

        constructor(){
            OWNER_ADDRESS = msg.sender;//OWNER_ADDRESS = payable(msg.sender);
        }
        modifier isOwner(){
            require (msg.sender == OWNER_ADDRESS,"Only owner can invoke the function");
            _;
        }
        //   modifier isCorrectAmount(){
        //     require(msg.value == 1 ether,"Insufficient amount");
        //     _;
        // }
    }