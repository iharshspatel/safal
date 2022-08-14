const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Customer = require("../models/customerModel")


exports.totalCustomer = catchAsyncErrors(async(req, res, next)=>{
   
    const customers = await Customer.find();

    res.status(200).json({
        custlength:customers.length,
        success:true
       })
})

exports.totalOrderValue = catchAsyncErrors(async(req,res,next)=>{
    const customers = await Customer.find();
    var total=0
    customers.map((item)=>{
        total = total + item.orderValue
    })
    total = total/1000;
    res.status(200).json({
        orderValue:total,
        success:true
    })
})

exports.createCustomer = catchAsyncErrors(async(req, res, next)=>{
    const t = req.body;
    console.log(req.body);

    const cust = await Customer.create(t)

    res.status(200).json({
        cust,
        success:true
       })
})

exports.getCustomer = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const customer = await Customer.findById(t)

    res.status(200).json({
        customer,
        success:true
       })
})

exports.updateCustomer = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;
    let body = req.body
    console.log(t)
    const customer = await Customer.findByIdAndUpdate(t,body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
 
    });
    await customer.save();

    res.status(200).json({
        customer,
        success:true
       })
})

exports.deleteCustomer = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const customer = await Customer.findByIdAndDelete(t);

    res.status(200).json({
        customer,
        success:true
       })
})

exports.getAllCustomer = catchAsyncErrors(async(req, res, next)=>{

    const customers = await Customer.find()

    res.status(200).json({
        customers,
        success:true
       })
})