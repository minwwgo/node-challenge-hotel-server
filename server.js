const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here
app.get("/bookings",(req,res)=>{
  res.json(bookings)
})

app.get("/bookings/search/byterm/",(req,res)=>{
  
  const searchTerm = (req.query.term).toLowerCase();
  
  res.json(bookings.filter(booking=>(
    booking.firstName.toLowerCase() 
    || booking.surname.toLowerCase()
    || booking.email.toLowerCase())
    .includes(searchTerm)
    ))
  })
app.get("/bookings/search",(req,res)=>{
  
  const searchDate = new Date(req.query.date);
  res.json(bookings.filter(booking=>
    new Date(booking.checkInDate) > searchDate
  ))
})

app.get("/bookings/:id",(req,res)=>{
  const bookingId = Number(req.params.id)
  bookings.find(booking=>booking.id=== bookingId)
})

app.delete("/bookings/:id",(req,res)=>{
  const bookingId = req.params.id
  bookings.filter(booking=>booking.id !== bookingId)
})
app.post("/bookings",(req,res)=>{
  bookings.push(req.body)
  
})

const port =process.env.PORT || 3000
const listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
