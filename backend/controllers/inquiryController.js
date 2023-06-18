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

    // const inquiry = await Inquiry.findByIdAndDelete(t);
    const inquiry = await Inquiry.findOneAndDelete({mobileno:t});

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

exports.getFilteredInquiry = catchAsyncErrors(async (req, res, next) => {

    // let body = req.body;
    // const salesman = req.query.salesman;
    // const branch = req.query.branch;
    // let startDate = req.query.startdate;
    // let endDate = req.query.enddate;
    // let s=new Date(startDate);
    // // s=startDate.toISOString();
    // let e=new Date(endDate);
    // e=endDate.toISOString();

    // console.log(req.query.enddate)
    // let s=new Date(startDate);
    // let e=new Date(endDate);

// s=
    // s=startDate.parse()
    // startDate=new Date(startDate);
    // endDate=new Date(endDate);
    const salesman = req.params.salesman;
    const branch = req.params.branch;
    const startdate = req.params.startdate;
    const endDate = req.params.enddate;

    const inquiries = await Inquiry.find({ "date": { "$gte": startdate, "$lt": endDate }, "salesmen.name": salesman, "branches.branchname": branch })
    res.status(200).json({
        inquiries,
        success: true
    })
})