const app = require("./app");

const dotenv = require("dotenv");

const port = process.env.PORT || 5000;

const database = require("./config/dbConnection");

//config
dotenv.config({ path: "./config/config.env" });
// console.log(process.env.STRIPE_SECRET_KEY)
// connect with database 
database();
//handler uncaught type error
process.on("uncaughtException", err => {
    console.log(`Err: ${err.message}`);

    console.log(`Shutting down the server due to uncaught Exception `);
    process.exit(1);
});


// listen app when anyone hit on api from client or any browser 
const server = app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
});

// handle Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Err: ${err.message}`)
    console.log(`Shutting down the server due to Unhandled Promise Rejection`)

    server.close(() => {
        process.exit(1);
    });
});