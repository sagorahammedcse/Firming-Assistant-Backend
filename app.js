const express = require('express');

const app = express();

const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorMiddleware = require("./middleware/error");

// import somethings from controller
const user = require("./routes/userRoute");
// import product 
const product = require("./routes/productRoute");
// order route 
const order = require("./routes/orderRoute");
// post 
const post = require("./routes/postRoute");
// payment 
const payment = require("./routes/paymentRoute");

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    'Content-Type': 'Authorization',
    "Content-type": "application/json",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
//config
dotenv.config({ path: "./config/config.env" });

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// user api 
app.use("/api/v1", user);
// product api 
app.use("/api/v1", product)
// order router 
app.use("/api/v1", order);
// post router 
app.use("/api/v1", post)

// payment 
app.use("/api/v1", payment)

// apply error middleware 
app.use(errorMiddleware);

module.exports = app;