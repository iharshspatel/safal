const ErrorHander = require("../utils/errorhander")
const catchAsyncErrors = require("../middleware/catchAsyncError")
exports.test = catchAsyncErrors(async(req,res,next) =>{

    // return next(new ErrorHander("Product not found", 404));
    console.log("Controller is reaching")
    res.status(200).json({
        message:"User Route is working fine"
    })
})