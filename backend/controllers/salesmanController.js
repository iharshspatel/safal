const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Salesman = require("../models/salesmanModel")
const Architect=require("../models/architectModel")
const Customer=require("../models/customerModel")
const Dealer=require("../models/dealerModel")
const Mistry=require("../models/mistryModel")
const Inquiry=require("../models/inquiryModel")
const PMC=require("../models/pmcModel")
exports.createSalesman = catchAsyncErrors(async (req, res, next) => {
    const t = req.body;
    

    const salesman = await Salesman.create(t);
    console.log(salesman);
    res.status(200).json({
        salesman,
        success: true
    })
})

exports.getSalesman = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;

    const salesman = await Salesman.findById(t)

    res.status(200).json({
        salesman,
        success: true
    })
})

exports.updateSalesman = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;
    let body = req.body
    console.log(t)
    const salesman = await Salesman.findByIdAndUpdate(t, body, {
        new: true,
        runValidators: true,
        useFindAndModify: false

    });
    await salesman.save();

    res.status(200).json({
        salesman,
        success: true
    })
})

exports.deleteSalesman = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;

    const salesman = await Salesman.findByIdAndDelete(t);

    res.status(200).json({
        salesman,
        success: true
    })
})

exports.getAllSalesman = catchAsyncErrors(async (req, res, next) => {

    const salesmans = await Salesman.find()

    res.status(200).json({
        salesmans,
        success: true
    })
})
exports.getCustomerofSalesman = catchAsyncErrors(async (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        return next(new ErrorHander("Please Provide name", 400))

    }
    const customers = await Customer.find({ "salesmen.name": name })
    res.status(200).json({
        customers,
        success: true
    })
})
exports.getInquiriesofSalesman = catchAsyncErrors(async (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        return next(new ErrorHander("Please Provide name", 400))

    }
    const inquiries = await Inquiry.find({ "salesmen.name": name })
    res.status(200).json({
        inquiries,
        success: true
    })
})


exports.getArchitectsofSalesman = catchAsyncErrors(async (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        return next(new ErrorHander("Please Provide name", 400))

    }
    const architects = await Architect.find({ "salesmen.name": name })
    res.status(200).json({
        architects,
        success: true
    })
})
exports.getDealersofSalesman = catchAsyncErrors(async (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        return next(new ErrorHander("Please Provide name", 400))

    }
    const dealer = await Dealer.find({ "salesmen.name": name })
    res.status(200).json({
        dealer,
        success: true
    })
})
exports.getMistryofSalesman = catchAsyncErrors(async (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        return next(new ErrorHander("Please Provide name", 400))

    }
    const mistry = await Mistry.find({ "salesmen.name": name })
    res.status(200).json({
        mistry,
        success: true
    })
})
exports.getPMCofSalesman = catchAsyncErrors(async (req, res, next) => {
    const name= req.body.name;
    if (!name) {
        return next(new ErrorHander("Please Provide name", 400))

    }
    const pmc = await PMC.find({ "salesmen.name": name })
    res.status(200).json({
        pmc,
        success: true
    })
})