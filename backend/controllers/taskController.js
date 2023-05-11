const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Task = require("../models/taskModel")

exports.totalTask = catchAsyncErrors(async (req, res, next) => {
    const tasks = await Task.find().populate("salesmanId mistryTag architectTag dealerTag pmcTag");

    res.status(200).json({
        tasks,
        taskslength: tasks.length,
        success: true
    })
})
exports.createTask = async (req, res) => {
    try {
        const { date, remarks, salesmanId, mistryTag, architectTag, dealerTag, pmcTag } = req.body;
        if (!date || !remarks || !salesmanId) {
            return res.status(500).json({ success: false, message: "Please fill all the fields" });
        }
        if (!pmcTag && !mistryTag && !architectTag && !dealerTag)
            return res.status(500).json({ success: false, message: "Please select a tag" });
        let task = await Task.create({ date, remarks, salesmanId, mistryTag, architectTag, dealerTag, pmcTag })
        task = await task.populate("salesmanId");
        console.log(task);
        res.status(200).json({
            task,
            success: true
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getTask = catchAsyncErrors(async (req, res, next) => {
    let t = req.params.id;
    const task = await Task.findById(t)

    res.status(200).json({
        task,
        success: true
    })
})

exports.updateTask = catchAsyncErrors(async (req, res, next) => {
    let t = req.params.id;
    let body = req.body
    // console.log(t)
    const task = await Task.findByIdAndUpdate(t, body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    await task.save();
    // console.log(task);
    res.status(200).json({
        task,
        success: true
    })
})

exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
    let t = req.params.id;
    const task = await Task.findByIdAndDelete(t);
    res.status(200).json({
        message: "Task Deleted",
        success: true
    })
})