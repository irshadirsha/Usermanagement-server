
const mongoose = require('mongoose')

const userSignupSchema=new mongoose.Schema({
     
     username:{
        type:String,
        require:true
     },
     password:{
        type:String,
        require:true
     },
     image: {
      type: String
  }
    
     
})
const userSignup_details=new mongoose.model("userdata",userSignupSchema)
module.exports=userSignup_details;