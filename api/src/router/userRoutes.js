const express = require("express");
const router = express.Router();
const {Registration} = require('../controllers/RegisterController');
const {getProducts,login,updateCart,getCartProducts,getAddress,addressSave,updateProfileDetails,ordersSave,getOrders,
    getOrderById,getUserById} = require('../controllers/UserController');
const auth = require("../Common/auth");

//SignUp
router.route('/signUp').post(Registration);

//Login
router.route('/signin').post(login);

//Login
router.route('/updateCart').post(auth,updateCart);

//products
router.route('/getProducts').get(auth,getProducts);

//get cart
router.route('/getCartDetails').get(auth,getCartProducts);

//address save
router.route('/addressSave').post(auth,addressSave);

//address get
router.route('/getAddress').get(auth,getAddress);

//update user
router.route("/updateProfileDetails").put(auth,updateProfileDetails);

//place order
router.route("/placeOrder").post(auth,ordersSave);

//get order history
router.route("/getOrderHistory").get(auth,getOrders);

//get order details
router.route("/getOrderById").get(auth,getOrderById);

//get user details
router.route("/getUserById").get(auth,getUserById)

module.exports = router;