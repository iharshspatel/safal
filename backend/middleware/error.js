const ErrorHander = require("../utils/errorhander")

module.exports = (err, req, res, next) => {
    err.statusCode =err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongodb ID  Error
    if(err.name === "CastError"){
        console.log(err);
        const message = `Resource not found. Invalid : ${err.path} `;
        err = new ErrorHander(message,400)
    }

    // mongoose duplicate key error

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue) } Entered` 
        err = new ErrorHander(message,400)
    }

    //Wrong JWT Error
    if(err.name === "JsonwebTokenError"){
        const message = ` JsonwebToken is invalid `;
        err = new ErrorHander(message,400)
    }

    // JWT Expire Error

    if(err.name === "TokenExpireError"){
        const message = ` JsonwebToken is Expired`
        err = new ErrorHander(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
