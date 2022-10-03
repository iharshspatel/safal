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

    const Salesman = await Salesman.findById(t)

    res.status(200).json({
        Salesman,
        success: true
    })
})

exports.updateSalesman = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;
    let body = req.body
    console.log(t)
    const Salesman = await Salesman.findByIdAndUpdate(t, body, {
        new: true,
        runValidators: true,
        useFindAndModify: false

    });
    await Salesman.save();

    res.status(200).json({
        Salesman,
        success: true
    })
})

exports.deleteSalesman = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;

    const Salesman = await Salesman.findByIdAndDelete(t);

    res.status(200).json({
        Salesman,
        success: true
    })
})

exports.getAllSalesman = catchAsyncErrors(async (req, res, next) => {

    const Salesmans = await Salesman.find()

    res.status(200).json({
        Salesmans,
        success: true
    })
})