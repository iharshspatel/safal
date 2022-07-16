const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    branchname:String
});



module.exports = mongoose.model("Branch", branchSchema)

