const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please Enter Your Name"],
        maxlength:[30, "Can not exceeed 30 characters"]
    },
    email:{
        type:String,
        required:[true, "Please Enter Your Email"],
        unique:true,
    },
    mobileno:{
        type:Number,
        unique:true,
        required:[true, "Please Enter Mobile Number"]
    },
    address:String,
    birthdate:String,
    marriagedate:String,
    date:Date,
    remarks:String,
    orderValue:String,
    salesPerson:String,
    // mistryTag:String,
    // architectTag:String,
    // dealerTag:String,
    // pmcTag:String
    mistryTag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"mistry"
    },
    mistryName:String,
    architectTag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"architect"
    },
    architectName:String,
    dealerTag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"dealer"
    },
    dealerName:String,
    pmcTag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"pmc"
    },
    pmcName:String,
});



module.exports = mongoose.model("Customers", customerSchema)

