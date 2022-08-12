const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Dealer = require("../models/dealerModel")


exports.totalDealer = catchAsyncErrors(async(req, res, next)=>{
   
    const dealers = await Dealer.find();

    res.status(200).json({
        dealerlength:dealers.length,
        success:true
       })
})


exports.createDealer = catchAsyncErrors(async(req, res, next)=>{
    const t = req.body;
    console.log(req.body);

    const d = await Dealer.create(t)

    res.status(200).json({
        d,
        success:true
       })
})

exports.getDealer = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const dealer = await Dealer.findById(t)

    res.status(200).json({
        dealer,
        success:true
       })
})

exports.updateDealer = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;
    let body = req.body

    const dealer = await Dealer.findByIdAndUpdate(t,body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
 
    });
    await dealer.save();

    res.status(200).json({
        dealer,
        success:true
       })
})

exports.deleteDealer = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const dealer = await Dealer.findByIdAndDelete(t);

    res.status(200).json({
        dealer,
        success:true
       })
})

exports.getAllDealer = catchAsyncErrors(async(req, res, next)=>{

    const dealers = await Dealer.find()

    res.status(200).json({
        dealers,
        success:true
       })
})