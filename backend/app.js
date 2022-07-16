const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleware = require("./middleware/error")

app.use(express.json())
app.use(cookieParser())

//  Route Imports
const test = require("./routes/testRoute")
const user = require("./routes/userRoute") 
const branch = require("./routes/branchRoute")
const architect = require("./routes/architectRoute")
const mistry = require("./routes/mistryRoute")
const dealer = require("./routes/dealerRoute")
const pmc = require("./routes/pmcRoute")
const customer = require("./routes/customerRoute")

app.use("/api/v1", test)
app.use("/api/v1", user)
app.use("/api/v1/architect", architect)
app.use("/api/v1/branch", branch)
app.use("/api/v1/mistry", mistry)
app.use("/api/v1/dealer", dealer)
app.use("/api/v1/pmc", pmc)
app.use("/api/v1/customer", customer)

// Middleware for Errors
app.use(errorMiddleware)


module.exports = app