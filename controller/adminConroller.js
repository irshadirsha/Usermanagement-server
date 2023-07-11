const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userdata =require ('../model/userModel')
const admindata = require ('../model/adminModel')
const bcrypt =require ('bcrypt')

const adminlogin=async(req,res,next)=>{
  try {
    const { username, password } = req.body

    let admin = await admindata.findOne({ username })
    if (!username) {
        const errors = {}
        errors.username = "Username required"
        res.json({ errors, admin: false })
    }
    else if (!password) {
        const errors = {}
        errors.username = "Password required"
        res.json({ errors, admin: false })
    }
    else if (admin) {
        if (admin.password === password) {
            const token = jwt.sign({ sub: admin._id }, 'Key', { expiresIn: '3d' })
            res.json({ admin: true, token })
        } else {
            const errors = {}
            errors.username = "Incorrect Password"
            res.json({ errors, admin: false })
        }
    } else {
        const errors = {}
        errors.username = "Username is not registered"
        res.json({ errors, admin: false })
    }
} catch (err) {
    console.log(err);
}
}
   
const auth = (req, res, next) => {
  try {
      let { token } = req.body
      token = token ? JSON.parse(token) : null
      if (token) {
          const auth = jwt.verify(token.token, 'Key')
          const currentTimestamp = Math.floor(Date.now() / 1000);
          if (auth.exp < currentTimestamp) {
              res.json({ token: 'expired' })
          } else {
              res.json({ token: 'valid' })
          }
      } else {
          res.json({ token: false })
      }

  } catch (err) {
      console.log(err);
  }

}

const deleteuser=async(req,res,next)=>{
    const {userId}=req.body
    
    userdata.deleteOne({_id:userId}).then(()=>{
      userdata.find().then(users=>{
        res.json({delete:true,users})
        console.log("deleteet",userId)
      })
    })
}

const editUser=async(req,res,next)=>{
  const {username,id}=req.body
  console.log("lastttttt",id,username)
  userdata.updateOne({_id:id},{$set:{username:username}}).then((result)=>{
    console.log(result)
    res.json({update:true})
  })
}


  const addUser =async(req,res,next)=>{
    console.log(req.body);
    let {username,password}=req.body
    console.log('adddd',username,password)
    password =  password ?  await bcrypt.hash(password, 10) :null
    console.log(password);
    userdata.insertMany([{username,password}]).then(()=>{
      res.json({status:true})
    })

}




module.exports ={adminlogin,auth,deleteuser,editUser,addUser}