const mongoose = require("mongoose");

const salesmanSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please Enter Your Name"],
        maxlength:[30, "Can not exceeed 30 characters"]
    },
    email:{
        type:String,
    },
    mobileno:{
        type:Number,
        unique:true,
        required:[true, "Please Enter Mobile Number"]
    },
    remarks:String,
    address:String,
    birthdate:String,
    date:String,
    // marriagedate:String,
    // date:Date,
    // orderValue:Number,
    // salesPerson:String,
    // mistryTag:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"mistry"
    // },
    // mistryName:String,
    // mistryNumber:Number,
    // architectTag:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"architect"
    // },
    // architectName:String,
    // architectNumber:Number,
    // dealerTag:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"dealer"
    // },
    // dealerName:String,
    // dealerNumber:Number,
    // pmcTag:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"pmc"
    // },
    // pmcName:String,
    // pmcNumber:Number,
    branches:[
        {branchname:String}
    ]
});



module.exports = mongoose.model("Salesman", salesmanSchema)

