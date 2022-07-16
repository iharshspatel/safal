const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Architect = require("../models/architectModel")


exports.createArchitect = catchAsyncErrors(async(req, res, next)=>{
    const t = req.body;
    console.log(req.body);

    const architect = await Architect.create(t)

    res.status(200).json({
        architect,
        success:true
       })
})

exports.getArchitect = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const architect = await Architect.findById(t)

    res.status(200).json({
        architect,
        success:true
       })
})

exports.updateArchitect = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;
    let body = req.body

    const architect = await Architect.findByIdAndUpdate(t,body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
 
    });
    await architect.save();

    res.status(200).json({
        architect,
        success:true
       })
})

exports.deleteArchitect = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const architect = await Architect.findByIdAndDelete(t);

    res.status(200).json({
        architect,
        success:true
       })
})