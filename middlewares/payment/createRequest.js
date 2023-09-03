const Iyzipay = require("iyzipay");

const createRequest = (req, res, next)=> {
    const basketItems = [];
    req.body.basketItems.map((basketItem) => {
        basketItems.push({
        ...basketItem,
        itemType:
            basketItem.itemType === "physical"
            ? Iyzipay.BASKET_ITEM_TYPE.PHYSICAL
            : Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        });
    });
    const request = {
        locale: req.body.locale === "tr" ? Iyzipay.LOCALE.TR : Iyzipay.LOCALE.EN,
        conversationId: req.body.conversationId,
        price: req.body.price,
        paidPrice: req.body.paidPrice,
        currency:
        req.body.locale === "tr" ? Iyzipay.CURRENCY.TRY : Iyzipay.CURRENCY.USD,
        installment: "1",
        basketId: "B67832",
        paymentChannel:
        req.body.paymentChannel === "web"
            ? Iyzipay.PAYMENT_CHANNEL.WEB
            : Iyzipay.PAYMENT_CHANNEL.MOBILE,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        // callbackUrl: 'https://www.merchant.com/callback',

        paymentCard: req.body.paymentCard,
        buyer: req.body.buyer,
        shippingAddress: req.body.shippingAddress,
        billingAddress: req.body.billingAddress,
        basketItems,
    };
    req.request = request;
    next() 
}

module.exports = {
    createRequest
}
