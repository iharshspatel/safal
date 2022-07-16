const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const PMC = require("../models/pmcModel")


exports.createPMC = catchAsyncErrors(async(req, res, next)=>{
    const t = req.body;
    console.log(req.body);

    const pmc = await PMC.create(t)

    res.status(200).json({
        pmc,
        success:true
       })
})

exports.getPMC = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const pmc = await PMC.findById(t)

    res.status(200).json({
        pmc,
        success:true
       })
})


exports.updatePMC = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;
    let body = req.body

    const pmc = await PMC.findByIdAndUpdate(t,body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
 
    });
    await pmc.save();

    res.status(200).json({
        pmc,
        success:true
       })
})

exports.deletePMC = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const pmc = await PMC.findByIdAndDelete(t);

    res.status(200).json({
        pmc,
        success:true
       })
})