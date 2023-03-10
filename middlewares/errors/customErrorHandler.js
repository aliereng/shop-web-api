const CustomError = require("../../helpers/error/CustomError")

const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    if( err.name == "SyntaxError" ) {
        customError = new CustomError("Yazım Hatası", 400);
    }

    res.status(customError.status || 500)
    .json({
        success: false,
        message: customError.message
    })
}

module.exports = customErrorHandler;