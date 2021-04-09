const jwt = require("jsonwebtoken");
const config = require("../config");
const productModel = require("../models/productModel");
const userModel = require("../models/RegisterModel");
const message = require("../Common/constants");
var TeleSignSDK = require('telesignsdk');
const handleErrors = (err) =>{
    let error_msg = {}
    Object.values(err.errors).forEach(({properties})=>{
        error_msg[properties.path] = properties.message
    })
    return error_msg;
}
/* let plivo = require('plivo');
let client = new plivo.Client(); */



exports.login = async (req, res, next) => {
    try {
        /* client.messages.create(
            '8270925532',
            '9597172065',
            'Hello, world!'
          ).then(function(message_created) {
            console.log(message_created)
          }); */
          
        /* const { userName, password } = req.body;
        let details = await userModel.findOne({ userName });
        const customerId = "13902ABF-3126-4A03-A4DC-7C5CAC8E2F74";
        const apiKey = "d8oMo5HVQkhN2GzkKf/lpCyXU+VWXuw/4VnwbqlavJhYC+5NEO3Of/DCpj6zUepIMVhqWXxDi2h0PmxAqYReRQ==";
        const rest_endpoint = "https://rest-api.telesign.com";
        const timeout = 10*1000; // 10 secs

        const client = new TeleSignSDK( customerId,
            apiKey,
            rest_endpoint,
            timeout // optional
            // userAgent
        );
        const phoneNumber = "9597172065";
        const message = "You're scheduled for a dentist appointment at 2:30PM.";
        const messageType = "ARN";
      
        console.log("## MessagingClient.message ##");
      
        function messageCallback(error, responseBody) {
            if (error === null) {
                console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
                    ` => code: ${responseBody['status']['code']}` +
                    `, description: ${responseBody['status']['description']}`);
            } else {
                console.error("Unable to send message. " + error);
            }
        }
        client.sms.message(messageCallback, phoneNumber, message, messageType); */
        const { userName, password } = req.body;
        let failure = "";
        let details = await userModel.findOne({ userName });    
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
exports.getProducts = async (req, res, next) => {
    try {
        const { id } = req.user;
        if(id){
            let userCart = await productModel.userCart.find({userId:id});
            let details = await productModel.product.find();
            let newarr=[];
            userCart && userCart.length !== 0 ? userCart.map(x=>
                x && x.products.length !== 0 ? x.products.map(item=>{
                    let i = details.findIndex(y=>y._id == item.productId)
                    if(i != -1){
                        let obj = details[i]
                        obj.count = item.count
                        newarr.push(obj)
                    }
                }):""
            ):""
            console.log(newarr)
            res.status(200).json({
                list:details,
                userCart:newarr
            });
            //console.log(userCart,details)
            /* if(details && details.length !== 0){
                if(userCart && userCart.length !==0){
                    userCart.map((data)=>{
                        let i = details.findIndex(x=>x._id.toString() === data.productId)
                        if(i !== -1 ){
                            console.log(data.productId,i)
                            let obj = {}
                            obj.count = data.count
                            console.log(obj)
                            details[i] = obj
                        }
                    })
                }
                res.status(200).json({
                    list:details,
                    userCart
                });
            }else{
                res.status(200).json({
                    message:"No lists are available"
                });
            } */
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
exports.getCartProducts = async (req, res, next) => {
    try {
        const { id } = req.user;
        if(id){

            let userCart = await productModel.userCart.find({userId:id});
            let details = await productModel.product.find()
            let newarr=[];
            userCart && userCart.length !== 0 ? userCart.map(x=>
                x && x.products.length !== 0 ? x.products.map(item=>{
                    let i = details.findIndex(y=>y._id == item.productId)
                    if(i != -1){
                        console.log(item.productId)
                        let obj = details[i]
                        obj.count = item.count
                        newarr.push(obj)
                    }
                }):""
            ):""
            res.status(200).json({
                list:newarr
            });
            

           /*  let userCart = await productModel.userCart.find({});
            let iddd=userCart.map(x=>x.productId)
            console.log(iddd)
            let details = await productModel.product.find({_id:iddd})
            res.status(200).json({
                list:details,
                userCart
            });
             */
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
exports.updateCart = async (req, res, next) => {
    let obj = req.body;
        const { id } = req.user;
         if(id){
            obj.userId = id;
            obj.products = {productId: obj.productId,count:obj.count};
            let cartDetails = await productModel.userCart.find({userId:id});
            let userCartDetails = new productModel.userCart(obj)
            let oldProduct = cartDetails && cartDetails.length !== 0 ?
             cartDetails.map(item=>item.products).flat():[];
            let result = cartDetails && cartDetails !== 0 ? cartDetails.map(item=>item.products.filter(subItem=>
                subItem.productId === obj.productId)).flat():[];
            let userResult = cartDetails && cartDetails !== 0 ? cartDetails.map(item=>item.userId === obj.userId).flat():[];
            if((userResult && userResult.length !== 0)){
                if(result && result.length !== 0){
                        oldProduct.push(obj.products)//.filter(item=>item.productId !== obj.productId).flat()
                        oldProduct =  [...new Map(oldProduct.map(item => [item["productId"], item])).values()]
                        productModel.userCart.findOneAndUpdate({userId:id,"products.productId":obj.productId},
                        {$set:{userId:id,products:oldProduct}})
                        .then(function(data){
                            res.status(200).json({
                                data
                            })
                         })
                         .catch(function(error){
                            res.status(500).json({
                                success:"Not edited"
                            });
                         })
                }else{
                    oldProduct.push(obj.products)
                    productModel.userCart.findOneAndUpdate({userId:id},
                    {$set:{userId:id,products:oldProduct}})
                    .then(function(data){
                        res.status(200).json({
                            data
                        })
                     })
                     .catch(function(error){
                        res.status(500).json({
                            success:"Not edited"
                        });
                     })
                }
                 
            }else{
                userCartDetails.save()
                .then((data)=>{
                    res.status(200).json({
                        data
                    });
                })
             }
            /* if(obj.count == "0"){
                productModel.userCart.findOneAndDelete({userId:id,products:obj.productId})
                .then((data)=>{
                    res.status(200).json({
                        data
                    });
                })
            } */
            /* //let cartDetails = new productModel.userCart()
            else{
                productModel.userCart.findOneAndUpdate({userId:id},
                    {$set:{userId:id,products:obj}}, 
                    {new: true},(err, doc)=>{
                        if(err) {
                            res.status(200).json({
                                err
                            });
                        }else{
                            if(doc === null){ */
                                
                           /*  }else{
                                res.status(200).json({
                                    doc
                                });
                            }
                        } */
                   // })
           // }
            }
};

exports.updateProfileDetails = async (req, res, next) => {
    try {
        let {userName, mobile,email,dob,gender,address1,address2} = req.body;
        const { id } = req.user;
        if(id){
            let List = {userName, mobile,email,dob,gender,address1,address2};
            userModel.findOneAndUpdate({_id : id},List)
            .then(function(data){
                res.status(200).json({
                    success:"User edited Successfully"
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

exports.getAddress = async (req, res, next) => {
    try {
        const { id } = req.user;
        if(id){
            productModel.userAddress.find({userId : id})
            .then(function(data){
                res.status(200).json({
                    success:"address fetched successfully",
                    list:data
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

exports.addressSave = async (req, res, next) => {
    try {
        let body = req.body;
        const { id } = req.user;
        if(id){
            let saveData = {
                userId:id,
                name: body.name,
                flatno: body.flatno,
                street: body.street,
                city: body.city,
                state: body.state,
                pincode:body.pincode,
                mobile: body.mobile,
                gst:body.gst
            }
            let pd = null
            if(body.addressId){
                pd = await productModel.userAddress.findOne({_id : body.addressId})
            }
            if(pd != null && body.addressId){
                productModel.userAddress.findOneAndUpdate({_id : body.addressId},saveData)
                .then(function(data){
                    if(data != null){
                        res.status(200).json({
                            success:"Address Edited Successfully",
                            data
                        })    
                    }
                }) .catch(function (error) {
                    res.status(200).json({
                        failure: handleErrors(error)
                    });
                });   
            }else{
                productModel.userAddress(saveData).save()
                    .then(function(data){
                            res.status(200).json({
                                success:"Address added Successfully",
                                data
                            })    
                     }).catch(function (error) {
                        res.status(200).json({
                            failure: handleErrors(error)
                        });
                    });   
            }
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

exports.ordersSave = async (req, res, next) => {
    try {
        let body = req.body;
        const { id } = req.user;
        if(id){
            let  List = await productModel.userCart.findOne({userId:id});
            let saveData = {
                userId:id,
                products:List.products,
                addressId:body.addressId
            }
           let orderPlaced = await productModel.orders(saveData).save();
           if(orderPlaced){
                productModel.userCart.findOneAndDelete({_id:List._id})
                .then(function(data){
                    res.status(200).json({
                        success:"order placed Successfully"
                    })    
                }).catch(function (error) {
                    res.status(200).json({
                        failure: "Please enter valid details"
                    });
               });
           }else{
            res.status(200).json({
                failure: "Please enter valid details"
            });
           }
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


exports.getOrders = async (req, res, next) => {
    try {
        const { id } = req.user;
        let orders = await productModel.orders.aggregate([
            {
                "$match": { "userId": id }
            },
            { "$addFields": { "addressId": { "$toObjectId": "$addressId" }}},
            { 
                "$lookup": { 
                    "from": 'userAddress', 
                     "localField": 'addressId', 
                    "foreignField": "_id",  
                    //"let": { "_id": "addressId" },
                    "as": 'Address' 
                } 
            },

            { "$addFields": { "productList": "$products"}},
            {"$map":{
                "input":{
                    "$filter": {
                      "input": "$productList",
                      "as": "hobbyf",
                      "cond": "$$hobbyf.productId"
                    }
                  },
                  "as": "hobbym",
                  /* "in": {
                    "name": "$$hobbym.count"
                  } */
            }},
           
            /* {
                "pipeline":[
                    {
                        $match: {
                          "$expr": {
                            $eq: [
                              "$_id",
                              "$$child_id"
                            ]
                          }
                        }
                      }
                ]
            } */
        ])

        console.log(orders)
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


exports.getOrdersById = async (req, res, next) => {
    try {
        const { id } = req.user;
        let orders = await productModel.orders.findOne({userId:id});
        
        let productId = orders.products.map(item=>item.productId);

        let productsList = await productModel.product.find().where('_id').in(productId).exec();
        let productsListDetails =  productsList;
         if(orders.products && orders.products.length !== 0){
            orders.products.map((data)=>{
                let i = productsListDetails.findIndex(x=>x._id == data.productId);
                if(i !== -1 ){
                    productsListDetails[i].count = data.count;
                }
            });
            if(productsListDetails && productsListDetails.length !== 0){
                res.status(200).json({
                    orders:productsListDetails
                })  
            }else{
                res.status(200).json({
                    orders:[]
                }) 
            }
        } 
        
        /* if(id){
            productModel.orders.find()
            .then(function(data){
                    res.status(200).json({
                        List:data
                    })    
                }).catch(function (error) {
                res.status(200).json({
                    failure: "No data found"
                });
            });
        }else{
            return res.status(500).json({
                message:message.Token_Invalid
            });    
        } */
    } catch (err) {
        return res.status(500).json({
            failure:{
                message:"something went wrong"
            }
        });
    }
};