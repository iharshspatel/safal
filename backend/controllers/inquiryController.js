const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Inquiry = require("../models/inquiryModel")


// exports.totalInquiry = catchAsyncErrors(async (req, res, next) => {

//     const Inquiries = await Inquiry.find();

//     res.status(200).json({
//         custlength: Inquiries.length,
//         success: true
//     })
// })



exports.createInquiry = catchAsyncErrors(async (req, res, next) => {
    const t = req.body;
    // console.log(req.body);

    const inquiry = await Inquiry.create(t);
    // console.log(cust);/
    res.status(200).json({
        inquiry,
        success: true
    })
})

exports.getInquiry = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;

    const inquiry = await Inquiry.findById(t)

    res.status(200).json({
        inquiry,
        success: true
    })
})

exports.updateInquiry = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;
    let body = req.body
    console.log(t)
    const inquiry = await Inquiry.findByIdAndUpdate(t, body, {
        new: true,
        runValidators: true,
        useFindAndModify: false

    });
    await inquiry.save();

    res.status(200).json({
        inquiry,
        success: true
    })
})

exports.deleteInquiry = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;

    const inquiry = await Inquiry.findByIdAndDelete(t);

    res.status(200).json({
        inquiry,
        success: true
    })
})

exports.getAllInquiry = catchAsyncErrors(async (req, res, next) => {

    const inquiries = await Inquiry.find()

    res.status(200).json({
        inquiries,
        success: true
    })
})