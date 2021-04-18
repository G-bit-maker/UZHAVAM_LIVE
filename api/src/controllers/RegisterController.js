const jwt = require("jsonwebtoken");
const config = require("../config");
const registerModel = require("../models/RegisterModel");
const TeleSignSDK = require('telesignsdk');

const customerId = "7F9493DC-04BA-4BF5-AD9B-09035659941E";
const apiKey = "TRgvfxYroxquPpJF6+N0oz4RCWDg39eecWqywklSOLrlvZ1sFrvD5x+ajsTSiP8AUFsE2F8o03DdNNkSXi44sQ==";
const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10*1000; // 10 secs
const handleErrors = (err) =>{
    let error_msg = {}
    Object.values(err.errors).forEach(({properties})=>{
        error_msg[properties.path] = properties.message
    })
    return error_msg;
}
exports.Registration = async (req, res, next) => {
    try {
        /* const client = new TeleSignSDK( customerId,
            apiKey,
            rest_endpoint,
            timeout // optional
            // userAgent
        );
        const phoneNumber = "918270925532";
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
        client.sms.message(messageCallback, phoneNumber, message, messageType);
 */
        const {name, userName, mobile,email,dob,gender,pincode} = req.body;
        let List = {};
        List.name = name;
        List.userName = userName;
        List.mobile = mobile;
        List.email = email;
        List.dob = dob;
        List.gender = gender;
        List.pincode = pincode;
        let userDetails = new registerModel(List);
        let users =  await registerModel.findOne({userName});
        if(users !== null){
            res.status(200).json({
                failure: {userName:"User name already taken"}
            });
        }else{
            userDetails.save()
            .then(function (data) {
                let token = jwt.sign({ id: data._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).json({
                    list:data,
                    success: "Created Successfully",
                    auth: true,
                    token: token
                });
            })
            .catch(function (error) {
                res.status(200).json({
                    failure: handleErrors(error)
                });
            });
        }
        
    } catch (err) {
        return res.status(500).json({
            failure: "Invalid Details"
        });
    }
};