const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Architect = require("../models/architectModel")

exports.totalarchitect = catchAsyncErrors(async(req, res, next)=>{
   
    const architects = await Architect.find();

    res.status(200).json({
        archlength:architects.length,
        success:true
       })
})


exports.createArchitect = catchAsyncErrors(async(req, res, next)=>{
    let t = req.body;
    t = {
        ...t,
        date : t.date.substr(0,10)
    }
    console.log(t);
    const architect = await Architect.create(t)
    console.log(architect);
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

exports.getAllArchitect = catchAsyncErrors(async(req, res, next)=>{

    const architects = await Architect.find();

    res.status(200).json({
        architects,
        success:true
       })
})
