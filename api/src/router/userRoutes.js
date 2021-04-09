const express = require("express");
const router = express.Router();
const {Registration} = require('../controllers/RegisterController');
const {getProducts,login,updateCart,getCartProducts,getAddress,addressSave,updateProfileDetails,ordersSave,getOrders} = require('../controllers/UserController');
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

module.exports = router;