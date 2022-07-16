const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const branch = require("../models/branchModel")


exports.createbranch= catchAsyncErrors(async(req, res, next)=>{
    const t = req.body;
    console.log(req.body);

    const branc = await branch.create(t)

   res.status(200).json({
    branc,
    success:true
   })
})