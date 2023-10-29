const mongoose = require("mongoose");

const dealerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please Enter Your Name"],
        maxlength:[30, "Can not exceeed 30 characters"]
    },
    email:String,
    mobileno:{
        type:Number,
        unique:true,
        required:[true, "Please Enter Mobile Number"]
    },
    address:String,
    area:{
        type:String,
        default:""
    },
    companyName:String,
    birthdate:Date,
    marriagedate:Date,
    date:Date,
    remarks:String,
    bankname:String,
    IFSCcode:String,
    branchname:String,
    adharcard:Number,
    pancard:String,  
    // salesMan:String,
    branches:[
        {branchname:String}
    ],
    salesmen:[{name:String}]

});



module.exports = mongoose.model("Dealer", dealerSchema)

