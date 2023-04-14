const {ethers} = require("hardhat") // import the Hardhat library

const contractAddress = "0x0BA8D108F8f408dB27e3c26a3bcDD7baaa146F38" // set the address of the deployed contract

var web3BookingArtifact;
var contract;

// define a function to attach to the deployed contract
async function attachContract(){
	 web3BookingArtifact = await ethers.getContractFactory("Web3Booking") // get the contract factory for the Web3Booking smart contract
	 contract = await web3BookingArtifact.attach(contractAddress) // attach to the deployed contract using the contract address
}

// define a function to add room details to the contract
async function addRoomDetails(_roomNumber,_beds,_ac,_price) {
	await attachContract() // attach to the deployed contract
	var txn = await contract.addRoomDetails(_roomNumber,_beds,_ac,_price); // call the addRoomDetails function in the contract to add the room details
	await txn.wait() // wait for the transaction to be mined
	console.log(`Transaction Receipt : ${JSON.stringify(txn)}`) // log the transaction receipt to the console
	return txn; // return the transaction receipt
}

// define a function to get the details of a room from the contract
async function getRoomDetails(_roomNumber){
	await attachContract() // attach to the deployed contract
	var details ={} // initialize an object to store the room details
	const roomDetails = await contract.viewRoomDetails(_roomNumber) // call the viewRoomDetails function in the contract to get the room details
	console.log(`Room Details : ${roomDetails}`); // log the room details to the console
	details["beds"] = Number(roomDetails[0]) // parse the number of beds from the room details
	details["Air Conditioned"] = roomDetails[1] // parse the air conditioning status from the room details
	details["price"] = Number(roomDetails[2]) // parse the price from the room details
	return details; // return the room details
}

// define a function to book a room in the contract
async function bookRoom(_roomNumber){
	await attachContract() // attach to the deployed contract
	var txn = await contract.bookRoom(_roomNumber); // call the bookRoom function in the contract to book the room
	await txn.wait() // wait for the transaction to be mined
	console.log(`Transaction Receipt : ${JSON.stringify(txn)}`) // log the transaction receipt to the console
	return txn;	// return the transaction receipt
}

// define a function to check the availability of a room in the contract
async function checkAvailability(_roomNumber){
	await attachContract() // attach to the deployed contract
	const status = {
		0:"Occupied",
		1:"Vacant"
	}
	const roomstatus = await contract.checkAvailability(_roomNumber); // call the checkAvailability function in the contract to get the room availability
	console.log(`Room Valiability : ${status[roomstatus]}`) // log the room availability to the console
	return status[roomstatus] // return the room availability
}

// define a function to check out of a room in the contract

async function checkout(_roomNumber){
	await attachContract()
	var txn = await contract.checkout(_roomNumber);
	await txn.wait()
	console.log(`Transaction Receipt : ${JSON.stringify(txn)}`)
	return txn;	
}


module.exports={
	addRoomDetails,
	bookRoom,
	checkout,
	checkAvailability,
	getRoomDetails
}