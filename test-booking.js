const { ethers } = require("hardhat");
const { expect } = require("chai");

// A test suite for the Web3Booking contract
describe('Test Web3booking contract', function () {
  let web3BookingArtifact;
  let contractDeploy;
  let owner;
  let addr1;
  
  // Setting up the test environment before each test
  beforeEach(async function () {
    // Getting the addresses of the owner and two other accounts
    [owner, addr1, addr2] = await ethers.getSigners();

    // Getting the contract factory and deploying the contract
    web3BookingArtifact = await ethers.getContractFactory("Web3Booking");
    contractDeploy = await web3BookingArtifact.connect(owner).deploy();
    await contractDeploy.deployed();
  });

  // A test to check if the addRoomDetails function works properly
  it('Test the addRoomDetails function', async function () {
    // Adding a room with room number 101, 2 beds, air conditioning, and a price of 1000
    await contractDeploy.addRoomDetails(101, 2, true, 1000);
    // Asserting that the room number exists in the list of rooms returned by getRoomList
    expect(await contractDeploy.getRoomList()).to.deep.equal([ethers.BigNumber.from(101)]);
  });

  // A test to check if the bookRoom function works properly
  it('test bookroom function', async function () {
    // Adding a room with room number 101, 2 beds, air conditioning, and a price of 1000
    await contractDeploy.addRoomDetails(101, 2, true, 1000);
    // Booking the room with room number 101 using addr1 account
    await contractDeploy.connect(addr1).bookRoom(101);
    // Asserting that the address of the booker matches the address of the account that booked the room
    expect(await contractDeploy.mapBooking(101)).to.equal(addr1.address);
    // Asserting that the status of the room changes from vacant to occupied
    expect(await contractDeploy.checkAvailability(101)).to.equal(0);
  });

  // A test to check if the checkout function works properly
  it('test checkout function', async function () {
    // Adding a room with room number 101, 2 beds, air conditioning, and a price of 1000
    await contractDeploy.addRoomDetails(101, 2, true, 1000);
    // Booking the room with room number 101 using addr1 account
    await contractDeploy.connect(addr1).bookRoom(101);
    // Checking out of the room with room number 101 using addr1 account
    await contractDeploy.connect(addr1).checkout(101);
    // Asserting that the address of the booker becomes zero after checkout
    expect(await contractDeploy.mapBooking(101)).to.equal(ethers.constants.AddressZero);
    // Asserting that the status of the room changes from occupied to vacant after checkout
    expect(await contractDeploy.checkAvailability(101)).to.equal(1);
  });
});