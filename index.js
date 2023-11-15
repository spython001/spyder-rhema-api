const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");


app.use(cors());
dotenv.config();


mongoose.connect(process.env.MONGO_URL, { 
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {console.error(err);});


//MIDDLEWARES
app.use(express.json());
app.use(morgan("common"));


//ROUTERS
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen("6000", () =>{
    console.log('Backend server is running');
});
