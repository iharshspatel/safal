const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [30, "Can not exceeed 30 characters"]
    },
    mobileno: {
        type: Number,
        unique: true,
        required: [true, "Please Enter Mobile Number"]
    },
    address: String,
    date: Date,
    followupDate: Date,
    requirement: {
        type: String,
        // enum: ["Plywood", "Veneer","Laminate",""]
    },
    stage:String,
    architectTag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "architect"
    },
    architectName: String,
    architectNumber: Number,
    pmcTag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pmc"
    },
    pmcName: String,
    pmcNumber: Number,
    branches: [
        { branchname: String }
    ],
    salesmen: [{ name: String }]

});



module.exports = mongoose.model("Inquiry", inquirySchema)

