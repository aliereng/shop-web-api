const express = require("express");

const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const Order = require("../models/Order");
const Transaction = require("../models/Transaction");
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/auth");
const { getAllProducts, getAllProductsBySupplier, deleteAllProduct, deleteProductById, updateProductById} = require("../controllers/product")
const { deleteAllAdmins, deleteAdminById, updateAdminById, getAllAdmins} = require("../controllers/admin");
const { getAllCustomers, getCustomer, deleteAllCustomer, deleteCustomerById, updateCustomerById } = require("../controllers/customer");
const { getAllSuppliers, getSupplierById, getShippersByMerchant, getTransactionsBySupplier, deleteAllMerchant, deleteMerchantById } = require("../controllers/merchant");
const { getTransactionById, deleteAllTransactions, deleteTransactionById } = require("../controllers/transaction");
const { getAllOrders, getOrderById, getOrdersByCustomer, deleteAllOrders, deleteOrderById, updateOrderById } = require("../controllers/order");
const { customerQueryMiddleware } = require("../middlewares/query/customerQueryMiddleware");
const { productQueryMiddleware } = require("../middlewares/query/productQueryMiddleware");
const { supplierQueryMiddleware } = require("../middlewares/query/supplierQueryMiddleware");
const { orderQueryMiddleware}  = require("../middlewares/query/orderQueryMiddleware");
const { transactionQueryMiddleware } = require("../middlewares/query/transactionQueryMiddleware");
const { deleteAllCategory, deleteCategoryById } = require("../controllers/category");
const { deleteAllShippers, deleteShipperById } = require("../controllers/shipper");
const { deleteAllAddresses , deleteAddressById} = require("../controllers/address");
const { deleteAllAnswers, deleteAnswersByQuestion, deleteAnswer } = require("../controllers/answer");
const { deleteAllBrands, deleteBrandById } = require("../controllers/brand");
const { deleteAllComments,deleteCommentById } = require("../controllers/comments");
const { deleteAllQuestions , deleteQuestionById} = require("../controllers/question");
const { adminQueryMiddleware } = require("../middlewares/query/adminQueryMiddleware");
const Admin = require("../models/Admin");

const router = express.Router();

//! GENERAL MIDDLEWARES
router.use([getAccessToRoute, getAdminAccess])

//! GET REQUESTS
router.get("/", adminQueryMiddleware(Admin, {}) ,getAllAdmins)

// router.get("/",getAllAdmins)
router.get("/products", productQueryMiddleware(Product, {
    population: [
        {path:"supplier", select:"name surname shopName email phone taxNumber"},
        {path:"stocks", select:"size color piece price type status"}
    ]
}), getAllProducts);
router.get("/customers", customerQueryMiddleware(Customer,{}), getAllCustomers);
router.get("/customer/:customerId", customerQueryMiddleware(Customer,{}), getCustomer);
router.get("/customer/:customerId/orders",orderQueryMiddleware(Order,{
    population: [
        {path:"product", select:"name slug"},
        {path:"stock", select:"image size color price"},
        {path:"supplier", select:"shopName slug"},
    ]
}), getOrdersByCustomer);
router.get("/suppliers", supplierQueryMiddleware(Supplier,{}), getAllSuppliers);
router.get('/supplier/:supplierId',  supplierQueryMiddleware(Supplier, {}), getSupplierById)
router.get('/supplier/:supplierId/products',productQueryMiddleware(Product, {}), getAllProductsBySupplier)
router.get('/supplier/:supplierId/shippers', getShippersByMerchant)
router.get('/supplier/:supplierId/transactions', transactionQueryMiddleware(Transaction, {
    population:[
        {path:"order", populate:[
            {path:"product", select:"name"},
            {path:"stock", select:"size color piece price"}

        ]}
    ]
}), getTransactionsBySupplier)
router.get('/transaction/:transactionId', transactionQueryMiddleware(Transaction, {
    population:[
        {path:"order", populate:[
            {path:"product", select:"name"},
            {path:"stock", select:"size color piece price"},
            {path:"supplier", select:"shopName email phone"},
            {path:"shipper", select:"name"},
            {path:"deliveredAddress", select:"title info"},
            {path:"invoiceAddress", select:"title info"},
        ]}
    ]
}), getTransactionById)
router.get("/orders", orderQueryMiddleware(Order,{
    population: [
        {path:"customer", select:"name surname"},
        {path: "product", select: "name"},
        {path: "supplier", select: "shopName"}
    ]
}), getAllOrders);
router.get("/order/:orderId", orderQueryMiddleware(Order, {
    population: [
        {path:"customer", select:"name surname email phone"},
        {path:"product", select: "name"},
        {path:"stock", select:"size color piece price image"},
        {path:"supplier" ,select:"shopName email phone"},
        {path:"deliveredAddress", select:"info"},
        {path:"invoiceAddress", select:"info"},
        {path:"shipper", select:"name"}
]}), getOrderById);

//! DELETE REQUESTS 

router.delete("/", deleteAllAdmins);
router.delete("/:adminId", deleteAdminById);
router.delete("/addresses", deleteAllAddresses);
router.delete("/address/:addressId", deleteAddressById)
router.delete("/answers", deleteAllAnswers);
router.delete("/answer/:answerId", deleteAnswer);
router.delete("/bradns", deleteAllBrands); 
router.delete('brand/:brandId', deleteBrandById);
router.delete("/categories", deleteAllCategory);
router.delete("/category/:categoryId", deleteCategoryById)
router.delete("/comments", deleteAllComments);
router.delete("/comment/:commentId", deleteCommentById);
router.delete("/customers", deleteAllCustomer);
router.delete("/customer/:customerId", deleteCustomerById)
router.delete("/orders", deleteAllOrders);
router.delete("/order/:orderId", deleteOrderById);
router.delete("/products", deleteAllProduct);
router.delete("/product/:productId", deleteProductById)
// router.delete("/properties", );
router.delete("/questions", deleteAllQuestions);
router.delete("/question/:questionId", deleteQuestionById)
router.delete("/shippers", deleteAllShippers);
router.delete("/shippers/shipperId", deleteShipperById)
router.delete("/suppliers", deleteAllMerchant);
router.delete("/supplier/:supplierId", deleteMerchantById);
router.delete("/transactions", deleteAllTransactions);
router.delete("/transaction/:transactionId", deleteTransactionById);
router.delete("/question/:questionId/delete-all-answers", deleteAnswersByQuestion)


//! UPDATES REQUESTS
router.put("/:adminId?", updateAdminById);
router.put("/customer/:customerId", updateCustomerById);
router.put("/order/:orderId", updateOrderById);
router.put("/product/:productId", updateProductById);

module.exports = router;
