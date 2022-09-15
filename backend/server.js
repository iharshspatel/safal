const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

// Handling Uncaught Exception

process.on("uncaughtException", (err) => {
   console.log(`Error: ${err.message}`);
   console.log(`Shutting down the server due to Unhandled UnCaught Exception`)
   process.exit(1);
})
const port = process.env.PORT || 4000;


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
   dotenv.config({ path: "backend/config/config.env" });
}
//Database Connection
connectDatabase();

const server = app.listen(port, () => {
   console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
   console.log(`Error:${err.message}`);
   console.log(`Shutting down the server due to Unhandled Promise Rejection`)

   server.close(() => {
      process.exit(1);
   })
})