const express = require("express");
const router = express.Router();
const auth = require("../Common/auth");
const {login,createlogin,createProductDetails,getproduct,getproductDetails,getUserList,createCategory,getCategories,
    updateUserDetails,deleteUser,getUsersOrders,getUserById,
    updateOrderStatus,getOrderById} = require('../controllers/adminContoller');

//login
router.route('/login').post(login);
 
//create admin
router.route('/signUp').get(createlogin);

//category details-
router.route('/createCategory').post(auth,createCategory);

//create Product details
router.route('/createProductDetails').post(auth,createProductDetails);

//get Category lists
router.route("/getCategories").get(auth,getCategories);

//get Product lists
router.route("/getProductList").get(auth,getproductDetails);

//get Product lists
router.route("/getProduct").get(auth,getproduct);

//get user list
router.route("/getUserList").get(auth,getUserList);

//get user
router.route("/getUserById").get(auth,getUserById);

//update user
router.route("/updateUserDetails").put(auth,updateUserDetails);

//remove user
router.route("/deleteUser").delete(auth,deleteUser);

//get orders
router.route("/getUsersOrder").get(auth,getUsersOrders);

//get orders id
router.route("/getOrderById").get(auth,getOrderById);

//update orders status
router.route("/updateOrderStatus").put(auth,updateOrderStatus);

module.exports = router;