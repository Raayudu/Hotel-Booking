//SPDX-License-Identifier:MIT

pragma solidity ^0.8.6;

import "./Owner.sol";//import contract
    contract Web3Booking is Owner{

        enum roomStatus{//enum
            OCCUPIED,//0
            VACANT//1
        }
          //defines the properties of the room
        struct Rooms{// list of room
            uint beds;
            bool aircondition;
            uint price;
            //roomStatus status;
        }
        uint[] roomList;
        mapping (uint => Rooms) roomNumber;//roomnumber => rooms struct
        mapping(uint => roomStatus)statusOfRoom;//room is vacant or not
        mapping(uint => address)public mapBooking;// roomNumber => address

         //hotel to add new room details
        function addRoomDetails(
        uint _roomNumber,
        uint _beds,
        bool _aircondition,
        uint _price
        )
        public isOwner {
            roomNumber[_roomNumber] = Rooms(_beds,_aircondition,_price);
            statusOfRoom[_roomNumber] = roomStatus.VACANT;
            roomList.push(_roomNumber);
        }
        //gets the list of room numbers
        function getRoomList()public view returns(uint[]memory){
            return roomList;
        }
         //see if room is vacant or not
        function checkAvailability(uint _roomNumber)public view returns(roomStatus) {
            return statusOfRoom[_roomNumber];
        }
        //book a room
        function bookRoom(uint _roomNumber)public payable isVacant(_roomNumber) {
            (bool success,) = Owner_Address.call{value:msg.value}("");
            require(success == true,"Transaction not successfull");
            mapBooking[_roomNumber]= msg.sender;
            statusOfRoom[_roomNumber]= roomStatus.OCCUPIED;
        }

        function checkout(uint _roomNumber) public isRoomOwner(_roomNumber) {
            delete mapBooking[_roomNumber];
            statusOfRoom[_roomNumber]= roomStatus.VACANT;
        }
          //get the details of the room
        function viewRoomDetails(uint _roomNumber)public view returns(Rooms memory) {
            return roomNumber[_roomNumber];
        }

        modifier isVacant(uint _roomNumber){
            require(statusOfRoom[_roomNumber]== roomStatus.VACANT,"can't book room");
            _;
        }
        modifier isRoomOwner(uint _roomNumber){
            require (mapBooking[_roomNumber]== msg.sender,"Can't checkout, not the owner");
            _;
        }
        function getOwnerBalance() public view returns(uint){
            return OWNER_ADDRESS.balance;
        }

      
         
    
    }