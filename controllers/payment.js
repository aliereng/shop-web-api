const Iyzipay = require("iyzipay");
const asyncHandlerWrapper = require("express-async-handler");
const CustomError = require("../helpers/error/CustomError");
const Order = require("../models/Order");

const iyzipay = new Iyzipay({
  apiKey: "api key",
  secretKey: "secret key",
  uri: "https://sandbox-api.iyzipay.com",
});


const pay = asyncHandlerWrapper(async (req, res, next) => {
  iyzipay.payment.create(req.request, function (err, result) {
  
    if(result.status === "success"){
      res.status(200).json({
        success: true,
        data: result,

    })}else{
      return next(new CustomError(`*i${result.errorMessage}*i`, 400))
    }
  });
})
const pay3D = asyncHandlerWrapper(async (req, res, next) => {
  
  iyzipay.threedsInitialize.create(req.request, function (err, result) {
    if(result.status === "success"){
      res.status(200).json({
        success: true,
        data: result,

    })}else{
      return next(new CustomError(`*i${result.errorMessage}*i`, 400))
    }
  });
})
const checkCreditCard = asyncHandlerWrapper(async (req, res, next) => {
  iyzipay.installmentInfo.retrieve(
    {
      locale: req.body.locale === "tr" ? Iyzipay.LOCALE.TR : Iyzipay.LOCALE.EN,
      conversationId: req.body.conversationId,
      binNumber: req.body.binNumber,
      price: req.body.price,
    },
    function (err, result) {
      if (err) return new CustomError("kart hatası: " + err.message, 400);
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );
});
const refund = asyncHandlerWrapper(async(req, res, next)=> {
  iyzipay.refund.create({
    locale: req.body.locale === "tr" ? Iyzipay.LOCALE.TR : Iyzipay.LOCALE.EN,
    conversationId: req.body.conversationId,
    paymentTransactionId: req.body.paymentTransactionId,
    price: req.body.price,
    currency: req.body.locale === "tr" ? Iyzipay.CURRENCY.TRY : Iyzipay.CURRENCY.USD,
    ip: req.body.ip
  },function(err,result) {
   
    res.status(200).json({
      success: true,
      data: result,
    });
  })
})
module.exports = {
  pay,
  pay3D,
  checkCreditCard,
  refund
}
