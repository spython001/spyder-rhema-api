const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


app.use(cors());
dotenv.config();


mongoose.connect(process.env.MONGO_URL, { 
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {console.error(err);});



app.listen("6000", () =>{
    console.log('Backend server is running');
});
