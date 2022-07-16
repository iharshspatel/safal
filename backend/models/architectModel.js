const mongoose = require("mongoose");

const architectSchema = new mongoose.Schema({
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
    address:{
        AddressLine1:String,
        AddressLine2:String,
        AddressLine3:String
    }
    ,
    companyName:String,
    birthdate:Date,
    marriagedate:Date,
    remarks:String,
    bankname:String,
    IFSCcode:String,
    branchname:String,
    adharcard:Number,
    pancard:String,  
});



module.exports = mongoose.model("Architect", architectSchema)

