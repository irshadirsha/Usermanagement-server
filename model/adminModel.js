
const mongoose = require('mongoose')

const adminSignupSchema=new mongoose.Schema({
     
     username:{
        type:String,
        require:true
     },
     password:{
        type:String,
        require:true
     }, 
})
const adminSignup_details=new mongoose.model("admindata",adminSignupSchema)
module.exports=adminSignup_details;