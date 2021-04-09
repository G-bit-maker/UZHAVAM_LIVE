const mongoose = require("mongoose");
let adminLoginSchema = mongoose.Schema({
   userName:{
       type:String,
       required:true
   },
   password:{
       type:String,
       required:true
   },
});

module.exports = mongoose.model("adminLogin",adminLoginSchema,"adminLogin")