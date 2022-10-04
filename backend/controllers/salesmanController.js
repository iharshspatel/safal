const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Salesman = require("../models/salesmanModel")

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