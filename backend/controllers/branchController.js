const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Branch = require("../models/branchModel");
const Customer = require("../models/customerModel");
const Architect = require("../models/architectModel");
const Dealer = require("../models/dealerModel")
const Mistry = require("../models/mistryModel")
const PMC = require("../models/pmcModel")

const Inquiry=require("../models/inquiryModel")
const Salesman=require("../models/salesmanModel")
exports.createbranch = catchAsyncErrors(async (req, res, next) => {
    const t = req.body;
    console.log(req.body);

    const branch = await Branch.create(t)

    res.status(200).json({
        branch,
        success: true
    })
})
exports.totalbranch = catchAsyncErrors(async (req, res, next) => {

    const branches = await Branch.find();

    res.status(200).json({
        branchsize: branches.length,
        success: true
    })
})
exports.getBranch = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;

    const branch = await Branch.findById(t)

    res.status(200).json({
        branch,
        success: true
    })
})

exports.updateBranch = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;
    let body = req.body

    const branch = await Branch.findByIdAndUpdate(t, body, {
        new: true,
        runValidators: true,
        useFindAndModify: false

    });
    await branch.save();

    res.status(200).json({
        branch,
        success: true
    })
})

exports.deleteBranch = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.id;

    const branch = await Branch.findByIdAndDelete(t);

    res.status(200).json({
        branch,
        success: true
    })
})

exports.getAllBranches = catchAsyncErrors(async (req, res, next) => {

    let branches = await Branch.find();
    const lengths = await getarc(branches);
    res.status(200).json({
        branches,
        lengths,
        success: true
    })
})
async function getarc(br) {
    let branhes = [];
    for (let i = 0; i < br.length; i++) {
        const architects = await Architect.find({ "branches.branchname": br[i].branchname })
        const customers = await Customer.find({ "branches.branchname": br[i].branchname })
        const pmc = await PMC.find({ "branches.branchname": br[i].branchname })
        const mistry = await Mistry.find({ "branches.branchname": br[i].branchname })
        const dealer = await Dealer.find({ "branches.branchname": br[i].branchname })
        const n = {
            ...br[i],
            arclen: architects.length,
            custlen: customers.length,
            deallen: dealer.length,
            mistlen: mistry.length,
            pmclen: pmc.length
        }
        branhes.push(n)
    }
    return branhes;
}
exports.getCustomerofBranch = catchAsyncErrors(async (req, res, next) => {
    const branchname = req.body.branchname;
    if (!branchname) {
        return next(new ErrorHander("Please Provide branchname", 400))

    }
    const customers = await Customer.find({ "branches.branchname": branchname })
    res.status(200).json({
        customers,
        success: true
    })
})
exports.getInquiriesofBranch = catchAsyncErrors(async (req, res, next) => {
    const branchname = req.body.branchname;
    if (!branchname) {
        return next(new ErrorHander("Please Provide branchname", 400))

    }
    const inquiries = await Inquiry.find({ "branches.branchname": branchname })
    res.status(200).json({
        inquiries,
        success: true
    })
})
exports.getSalesmenofBranch = catchAsyncErrors(async (req, res, next) => {
    const branchname = req.body.branchname;
    if (!branchname) {
        return next(new ErrorHander("Please Provide branchname", 400))

    }
    const salesmen = await Salesman.find({ "branches.branchname": branchname })
    res.status(200).json({
        salesmen,
        success: true
    })
})

exports.getArchitectsofBranch = catchAsyncErrors(async (req, res, next) => {
    const branchname = req.body.branchname;
    if (!branchname) {
        return next(new ErrorHander("Please Provide branchname", 400))

    }
    const architects = await Architect.find({ "branches.branchname": branchname })
    res.status(200).json({
        architects,
        success: true
    })
})
exports.getDealersofBranch = catchAsyncErrors(async (req, res, next) => {
    const branchname = req.body.branchname;
    if (!branchname) {
        return next(new ErrorHander("Please Provide branchname", 400))

    }
    const dealer = await Dealer.find({ "branches.branchname": branchname })
    res.status(200).json({
        dealer,
        success: true
    })
})
exports.getMistryofBranch = catchAsyncErrors(async (req, res, next) => {
    const branchname = req.body.branchname;
    if (!branchname) {
        return next(new ErrorHander("Please Provide branchname", 400))

    }
    const mistry = await Mistry.find({ "branches.branchname": branchname })
    res.status(200).json({
        mistry,
        success: true
    })
})
exports.getPMCofBranch = catchAsyncErrors(async (req, res, next) => {
    const branchname = req.body.branchname;
    if (!branchname) {
        return next(new ErrorHander("Please Provide branchname", 400))

    }
    const pmc = await PMC.find({ "branches.branchname": branchname })
    res.status(200).json({
        pmc,
        success: true
    })
})
exports.deleteBranch = catchAsyncErrors(async (req, res, next) => {

    let t = req.params.branchname;

    const branch= await Branch.findOneAndDelete({branchname:t});

    res.status(200).json({
        branch,
        success: true
    })
})