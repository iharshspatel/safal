const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Branch = require("../models/branchModel")


exports.createbranch= catchAsyncErrors(async(req, res, next)=>{
    const t = req.body;
    console.log(req.body);

    const branch = await Branch.create(t)

   res.status(200).json({
    branch,
    success:true
   })
})
exports.totalbranch = catchAsyncErrors(async(req, res, next)=>{
   
    const branches = await Branch.find();

    res.status(200).json({
        branchsize:branches.length,
        success:true
       })
})
exports.getBranch = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const branch = await Branch.findById(t)

    res.status(200).json({
        branch,
        success:true
       })
})

exports.updateBranch = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;
    let body = req.body

    const branch = await Branch.findByIdAndUpdate(t,body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
 
    });
    await branch.save();

    res.status(200).json({
        branch,
        success:true
       })
})

exports.deleteBranch = catchAsyncErrors(async(req, res, next)=>{
    
    let t = req.params.id;

    const branch = await Branch.findByIdAndDelete(t);

    res.status(200).json({
        branch,
        success:true
       })
})

exports.getAllBranches = catchAsyncErrors(async(req, res, next)=>{

    const branches = await Branch.find();

    res.status(200).json({
        branches,
        success:true
       })
})