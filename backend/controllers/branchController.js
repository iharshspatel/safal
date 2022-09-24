const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Branch = require("../models/branchModel");
const Customer=require("../models/customerModel");
const Architect=require("../models/architectModel");
const Dealer=require("../models/dealerModel")
const Mistry=require("../models/mistryModel")
const PMC=require("../models/pmcModel")


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

exports.getCustomerofBranch=catchAsyncErrors(async(req,res,next)=>{
    const branchname=req.body.branchname;
    if(!branchname){
        return next(new ErrorHander("Please Provide branchname",400))
        // res.status(400).json({ })
    }
    const customers=await Customer.find({"branches.branchname":branchname})
    res.status(200).json({
        customers,
        success:true
    })
})

exports.getArchitectsofBranch=catchAsyncErrors(async(req,res,next)=>{
    const branchname=req.body.branchname;
    if(!branchname){
        return next(new ErrorHander("Please Provide branchname",400))
        // res.status(400).json({ })
    }
    const architects=await Architect.find({"branches.branchname":branchname})
    res.status(200).json({
        architects,
        success:true
    })
})
exports.getDealersofBranch=catchAsyncErrors(async(req,res,next)=>{
    const branchname=req.body.branchname;
    if(!branchname){
        return next(new ErrorHander("Please Provide branchname",400))
        // res.status(400).json({ })
    }
    const dealer=await Dealer.find({"branches.branchname":branchname})
    res.status(200).json({
        dealer,
        success:true
    })
})
exports.getMistryofBranch=catchAsyncErrors(async(req,res,next)=>{
    const branchname=req.body.branchname;
    if(!branchname){
        return next(new ErrorHander("Please Provide branchname",400))
        // res.status(400).json({ })
    }
    const mistry=await Mistry.find({"branches.branchname":branchname})
    res.status(200).json({
        mistry,
        success:true
    })
})
exports.getPMCofBranch=catchAsyncErrors(async(req,res,next)=>{
    const branchname=req.body.branchname;
    if(!branchname){
        return next(new ErrorHander("Please Provide branchname",400))
        // res.status(400).json({ })
    }
    const pmc=await PMC.find({"branches.branchname":branchname})
    res.status(200).json({
        pmc,
        success:true
    })
})