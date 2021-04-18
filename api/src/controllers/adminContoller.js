const jwt = require("jsonwebtoken");
const config = require("../config");
const LoginModel = require("../models/adminloginModel");
const productModel = require("../models/productModel");
const userModel = require("../models/RegisterModel");
const message = require("../Common/constants");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const handleErrors = (err) =>{
    let error_msg = {}
    Object.values(err.errors).forEach(({properties})=>{
        error_msg[properties.path] = properties.message
    })
    return error_msg;
}
exports.login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        let failure = "";
        let details = await LoginModel.findOne({ userName });    
        if(!userName){
            failure = {...failure,"emailFailure":"Please enter user name"}
        }else if(details === "" || details === null){
            failure = {...failure,"emailFailure":"Please enter valid user name"}
        }
        if(!password){
            failure = {...failure,"passFailure":"Please enter password"}
        }
        if(failure){
            res.status(200).json({
                failure: failure,
            });
        }else{
            let token = jwt.sign({ id: details._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).json({
                success: "Login Successfully",
                auth: true,
                token: token
            });
        }
    } catch (err) {
        return res.status(500).json({
            failure: "Invalid Details"
        });
    }
};
exports.createlogin = async (req, res, next) => {
    try {
        let List = {};
        List.userName = "Admin";
        List.password = "admin123";
        let loginModel = new LoginModel(List)
        loginModel.save()
            .then(function (data) {
                res.status(200).json({
                    success: "Created Successfully"
                });
            })
            .catch(function (error) {
                res.status(500).json({
                    failure: "Not Added"
                });
            });
    } catch (err) {
        return res.status(500).json({
            failure: "Invalid Details"
        });
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { category,status,category_id } = req.body;
        let List = {};
        List.category = category;
        if(id){
            if(status === "Add"){
                let categoryDetails = new productModel.category(List);
                categoryDetails.save()
                    .then(function (data) {
                        res.status(200).json({
                            list:data,
                            success: "Created Successfully"
                        });
                    })
                    .catch(function (error) {
                        res.status(500).json({
                            failure: "Not Added"
                        });
                    });
            }else{
                productModel.category.findOneAndDelete({"_id":category_id})
                .then(function(data){
                    res.status(200).json({
                        success:"List deleted Successfully"
                    })     
                })
                .catch(function(error){
                    res.status(500).json({
                        success:"Not deleted"
                    });
                })
            }
        }else{
            return res.status(500).json({
                message:message.Token_Invalid
            });    
        }
    } catch (err) {
        return res.status(500).json({
            failure: "Invalid Details"
        });
    }
};

exports.getCategories = async (req, res, next) => {
    try {
        const { id } = req.user;
        if(id){
            let details = await productModel.category.find();
            if(details && details.length !== 0){
                res.status(200).json({
                    list:details
                });
            }else{
                res.status(200).json({
                    message:"No lists are available"
                });
            }
        }else{
            return res.status(500).json({
                message:message.Token_Invalid
            });    
        }
    } catch (err) {
        return res.status(500).json({
            message:"No lists are available"
        });
    }
};

exports.createProductDetails = async (req, res, next) => {
    try {
        let List = req.body;
        const { id } = req.user;
        if(id){
            if(List.addStatus === "Add"){
                const category = await productModel.category.find({category:List.category});
                List.category_id = category && category.length !== 0 ? category.map(itme=>itme._id):"";
                let productDetails = new productModel.product(List);
                productDetails.save()
                    .then(function (data) {
                        res.status(200).json({
                            list:data,
                            success: "Created Successfully"
                        });
                    })
                    .catch(function (error) {
                        res.status(200).json({
                            failure: handleErrors(error)
                        });
                    });   
            }else{
                productModel.product.findOneAndDelete({"_id":List.product_id})
                .then(function(data){
                    res.status(200).json({
                        success:"List deleted Successfully"
                    })     
                })
                .catch(function(error){
                    res.status(500).json({
                        success:"Not deleted"
                    });
                })
            }
        }else{
            return res.status(500).json({
                message:message.Token_Invalid
            });    
        }
    } catch (err) {
        return res.status(500).json({
            failure: "Invalid Details"
        });
    }
};

exports.getproductDetails = async (req, res, next) => {
    try {
        const { id } = req.user;
        if(id){
            let details = await productModel.product.find();
            if(details && details.length !== 0){
                res.status(200).json({
                    list:details
                });
            }else{
                res.status(200).json({
                    message:"No lists are available"
                });
            }
        }else{
            return res.status(500).json({
                message:message.Token_Invalid
            });    
        }
    } catch (err) {
        return res.status(500).json({
            message:"No lists are available"
        });
    }
};
exports.getUserList = async (req, res, next) => {
    try {
        const { id } = req.user;
        if(id){
            let details = await userModel.find();
            if(details && details.length !== 0){
                res.status(200).json({
                    list:details
                });
            }else{
                res.status(200).json({
                    message:"No lists are available"
                });
            }
        }else{
            return res.status(500).json({
                message:message.Token_Invalid
            });    
        }
    } catch (err) {
        return res.status(500).json({
            message:"No lists are available"
        });
    }
};
exports.getproduct = async (req, res, next) => {
    try {
        const { id } = req.user;
        const {productId} = req.query;
        if(id){
            let details = await productModel.product.findOne({"_id":productId});
            if(details){
                res.status(200).json({
                    product:details
                });
            }else{
                res.status(200).json({
                    message:"No product are available"
                });
            }
        }else{
            return res.status(500).json({
                message:message.Token_Invalid
            });    
        }
    } catch (err) {
        return res.status(500).json({
            message:"No lists are available"
        });
    }
};

exports.updateUserDetails = async (req, res, next) => {
    try {
        let {id} = req.user;
        if(id){
            let {name,userId,userName, mobile,email,dob,gender,pincode} = req.body;

            let List = {name,userName, mobile,email,dob,gender,pincode};
            userModel.findOneAndUpdate({_id : userId},List)
            .then(function(data){
                res.status(200).json({
                    success:"User edited Successfully",
                    data
                })     
             })
             .catch(function (error) {
                res.status(200).json({
                    failure: handleErrors(error)
                });
            });
        }else{
            return res.status(500).json({
                message:message.Token_Invalid
            });    
        }
    } catch (err) {
        return res.status(500).json({
            failure:{
                message:"something went wrong"
            }
        });
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.user;
        if(id){
            const {userId} = req.query;
            userModel.findOneAndDelete({"_id":ObjectId(userId)})
            .then(function(data){
                res.status(200).json({
                    success:"User deleted Successfully",
                    
                })     
             })
             .catch(function(error){
                res.status(500).json({
                    success:"Not deleted"
                });
             })
        }else{
            return res.status(500).json({
                message:message.Token_Invalid
            });    
        }
        
    } catch (err) {
        return res.status(500).json({
            failure:{
                message:"something went wrong"
            }
        });
    }
};

exports.getUsersOrders = async (req, res, next) => {
    try {
        //const { id } = req.user;
        let orders = await productModel.orders.aggregate([
            { "$addFields": { "userId": { "$toObjectId": "$userId" }}},
            { 
                "$lookup": { 
                    "from": 'userRegistration', 
                     "localField": 'userId', 
                    "foreignField": "_id",
                    "as": 'User' 
                } 
            },
            {
                $unwind: '$products'
            },
            { "$addFields": { "addressId": { "$toObjectId": "$addressId" }}},
            { 
                "$lookup": { 
                    "from": 'userAddress', 
                     "localField": 'addressId', 
                    "foreignField": "_id",
                    "as": 'Address' 
                } 
            },
            { "$addFields": { "productId": { "$toObjectId": "$products.productId" }}},
            {
                $lookup: {
                    from: 'productDetails',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productsDetails'
                }
            },
             { "$addFields": { "productsDetails.count": "$products.count"}}, 
             { "$addFields": { "product": "$productsDetails"}},
             { $unwind: '$productsDetails' },
             { $unwind: '$Address' },
             { $unwind: '$User' },
             { "$group": {
                "_id": {orderStatus:"$status",orderId:"$_id",address:"$Address",user:"$User"},products:{$addToSet : "$productsDetails"},
              }},
        ])
        return res.status(200).json({
            orders
        });
        
        
    } catch (err) {
        return res.status(500).json({
            failure:{
                message:err
            }
        });
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.user;
        const {userId} = req.body;
        if(id){
            let details = await userModel.findOne({"_id":userId});
            let address = await productModel.userAddress.find({userId})
            if(details){
                res.status(200).json({
                    userDetails:{
                        profile:details,
                        address
                    }
                    });
            }else{
                res.status(200).json({
                    message:"No user are available"
                });
            }
        }else{
            return res.status(500).json({
                message:message.Token_Invalid
            });    
        }
    } catch (err) {
        return res.status(500).json({
            message:"No lists are available"
        });
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        let {id} = req.user;
        if(id){
            let {orderId,status} = req.body;
            productModel.orders.findOneAndUpdate({_id : orderId},{ $set:{status:status}},{new: true})
            .then(function(data){
                res.status(200).json({
                    success:"User edited Successfully",
                    data
                })
             })
             .catch(function (error) {
                res.status(200).json({
                    failure: handleErrors(error)
                });
            });
        }else{
            return res.status(500).json({
                message:message.Token_Invalid
            });    
        }
    } catch (err) {
        return res.status(500).json({
            failure:{
                message:"something went wrong"
            }
        });
    }
};


exports.getOrderById = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { orderId } = req.query;
        let orders = await productModel.orders.aggregate([
            {
                "$match": {"_id":ObjectId(orderId)}
            },
            {
                $unwind: '$products'
            },
            { "$addFields": { "addressId": { "$toObjectId": "$addressId" }}},
            { "$addFields": { "userId": { "$toObjectId": "$userId" }}},
            { 
                "$lookup": { 
                    "from": 'userAddress', 
                     "localField": 'addressId', 
                    "foreignField": "_id",
                    "as": 'Address' 
                } 
            },
            { 
                "$lookup": { 
                    "from": 'userRegistration', 
                     "localField": 'userId', 
                    "foreignField": "_id",
                    "as": 'User' 
                } 
            },
            { "$addFields": { "productId": { "$toObjectId": "$products.productId" }}},
            {
                $lookup: {
                    from: 'productDetails',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productsDetails'
                }
            },
             { "$addFields": { "productsDetails.count": "$products.count"}}, 
             { "$addFields": { "product": "$productsDetails"}},
             { $unwind: '$productsDetails' },
             { $unwind: '$Address' },
             { $unwind: '$User' },
              { "$group": {
                "_id": {orderStatus:"$status",orderId:"$_id",address:"$Address",user:"$User"},products:{$addToSet : "$productsDetails"},
              }},
        ])
        return res.status(200).json({
            orders
        });
    } catch (err) {
        return res.status(500).json({
            failure:{
                message:err
            }
        });
    }
};