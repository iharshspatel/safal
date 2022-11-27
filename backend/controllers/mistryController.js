const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Mistry = require("../models/mistryModel")


exports.totalMistry = catchAsyncErrors(async(req, res, next)=>{
   
    const mistry = await Mistry.find();

    res.status(200).json({
        mistrylength:mistry.length,
        success:true
       })
})


exports.createMistry = catchAsyncErrors(async(req, res, next)=>{
    const t = req.body;
    console.log(req.body);

    const mistry = await Mistry.create(t)

    res.status(200).json({
        mistry,
        success:true
       })
})

exports.getMistry = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const mistry = await Mistry.findById(t)

    res.status(200).json({
        mistry,
        success:true
       })
})


exports.updateMistry = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;
    let body = req.body

    const mistry = await Mistry.findByIdAndUpdate(t,body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
 
    });
    await mistry.save();

    res.status(200).json({
        mistry,
        success:true
       })
})

exports.deleteMistry = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const mistery = await Mistry.findOneAndDelete({mobileno:t});

    res.status(200).json({
        mistery,
        success:true
       })
})

exports.getAllMistry = catchAsyncErrors(async(req, res, next)=>{

    const mistries = await Mistry.find()

    res.status(200).json({
        mistries,
        success:true
       })
})