const express = require('express') // import the Express framework
const {addRoomDetails, getRoomDetails, bookRoom} = require('../scripts/interact.js') // import the functions to interact with the smart contract

const app = express() // create a new Express app

app.use(express.urlencoded({extended:true})) // set up middleware to parse incoming requests with URL-encoded payloads

const port = 3000; // set the port number to listen to

// define a route to serve the home page
app.get(`/`, async function(req,res){
	res.sendFile(__dirname+'/src/home.html')
})

// define a route to add a room to the system
app.post('/add-room', async (req,res)=>{
	var roomNumber = Number(req.body.roomNumber)
	var numberOfBeds = Number(req.body.numberOfBeds);
	var airConditioned = (req.body.isAirConditioned == 'true')
	var price = Number(req.body.price)
	var txn = await addRoomDetails(roomNumber,numberOfBeds,airConditioned,price) // call the addRoomDetails function to add the room to the smart contract
	console.log(txn) // log the transaction receipt to the console
	res.send(JSON.stringify(txn)) // send the transaction receipt as a JSON string in the response
})

// define a route to view the details of a room
app.post('/view-room', async(req,res)=>{
	var roomNumber = Number(req.body.viewroomNumber)
	var roomDetails = await getRoomDetails(roomNumber) // call the getRoomDetails function to retrieve the room details from the smart contract
	res.send(JSON.stringify(roomDetails)) // send the room details as a JSON string in the response
})

// define a route to book a room
app.post('/book-room', async(req,res)=>{
	var roomNumber = Number(req.body.bookroomNumber)
	var txn = await bookRoom(roomNumber) // call the bookRoom function to book the room in the smart contract
	res.send('Room Booked Successfully') // send a success message in the response
})

// start the web server
app.listen(port,()=>{
	console.log(`App is running on https://localhost:${port}`)
})