const asyncHandlerWrapper = require("express-async-handler");
const {createInvoice} = require("../helpers/invoice/createInvocie")
const path = require("path")
const getInvoice = asyncHandlerWrapper(async (req,res,next) => {
    const {id} = req.params
    const doc = createInvoice(id)
    const options = {
        root: path.resolve("./")+"/public/invoices"
    };
 
    const fileName = `${id}.pdf`;
    if(doc){
        setTimeout(() => {
            res.status(200).sendFile(fileName, options);

        }, 1000);
    }
          
})

module.exports = {
    getInvoice
}