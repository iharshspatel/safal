const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Inquiry = require("../models/inquiryModel")


exports.totalInquiry = catchAsyncErrors(async (req, res, next) => {

    const Inquiries = await Inquiry.find();

    res.status(200).json({
        custlength: Inquiries.length,
        success: true
    })
})

exports.totalOrderValue = catchAsyncErrors(async (req, res, next) => {
    const Inquiries = await Inquiry.find();
    var total = 0
    Inquiries.map((item) => {
        total = total + item.orderValue
    })
    total = total / 1000;
    res.status(200).json({
        orderValue: total,
        success: true
    })
})

exports.createInquiry = catchAsyncErrors(async (req, res, next) => {
    const t = req.body;
    // console.log(req.body);

    const cust = await Inquiry.create(t);
    console.log(cust);
    res.status(200).json({
        cust,
        success: true
    })
})

exports.getInquiry = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;

    const Inquiry = await Inquiry.findById(t)

    res.status(200).json({
        Inquiry,
        success: true
    })
})

exports.updateInquiry = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;
    let body = req.body
    console.log(t)
    const Inquiry = await Inquiry.findByIdAndUpdate(t, body, {
        new: true,
        runValidators: true,
        useFindAndModify: false

    });
    await Inquiry.save();

    res.status(200).json({
        Inquiry,
        success: true
    })
})

exports.deleteInquiry = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;

    const Inquiry = await Inquiry.findByIdAndDelete(t);

    res.status(200).json({
        Inquiry,
        success: true
    })
})

exports.getAllInquiry = catchAsyncErrors(async (req, res, next) => {

    const Inquiries = await Inquiry.find()

    res.status(200).json({
        Inquiries,
        success: true
    })
})