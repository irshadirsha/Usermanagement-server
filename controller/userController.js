const  mongoose = require ('mongoose')
const userdata = require ('../model/userModel')
 const bcrypt = require('bcrypt')
 const jwt = require('jsonwebtoken');
 
//

const register=async(req,res,next)=>{
    try {
        let { username, password } = req.body
        console.log(username,password);
        const namereg = /^[^\s][\w\W]+$/gm;
        const passreg = /^[^\s][\w\W]+$/gm;
        if(namereg.test(username)==false){
            const errors={}
            errors.username='enter a valid username'
            res.json({ errors, created: false })
        }else if(passreg.test(password)==false){
            const errors={}
            errors.username='enter a valid password'
            res.json({ errors, created: false })
        }
        else{
            password =  password ?  await bcrypt.hash(password, 10) :null
            userdata.insertMany([{ username, password }]).then((data) => {
                res.status(201).json({ user: data.insertedId, created: true })
            }).catch((err)=>{
                console.log("a",handleErrors(err));
                const errors=handleErrors(err)
                res.json({ errors, created: false })
            })
        }
    
            
        }
        catch (error) {
           
        }
}

const login=async(req,res,next)=>{
   const {username,password}=req.body
   console.log(username,password)
   const user=await userdata.findOne({username:username})
    console.log('check',username)
    if(username===undefined) {
        const errors={username:'username required'}
        res.json({ errors, created: false })
    }else if(password===undefined){
        const error={password:'password required'}
        res.json({ error, created: false })
    }else if (user){
        let auth= password ? await bcrypt.compare(password,user.password) : null;
        if(auth){
            const token=jwt.sign({sub:user._id},'Key',{expiresIn:'3d'})
            res.json({login:true,token,user})
        }else{
            const errors=handleErrors({message:"incorrect password"})
            res.json({ errors, created: false })
        }
    }

  }

  

  const auth=async(req,res,next)=>{
      let {token}=req.body
      token=token ? JSON.parse(token):null
      if(token){
        console.log(token)
        console.log('jj');
        const auth=jwt.verify(token.token,'Key')
        console.log('dddd');
        console.log("Authentication",auth);
        const currentTimestamp=Math.floor(Date.now()/1000);
        // console.log(auth.exp);
        // console.log(currentTimestamp);
        if(auth.exp<currentTimestamp){

            res.json({token:'expired'})
        }else{
            res.json({token:'valid'})
        }
       }else{
        res.json({token:false})
       }
       
    }

    const prof =async(req,res,next)=>{
        console.log("profilllllllllllllllllleeeeeeeeeeeee");
        
        const {userId}=req.body
        const imgUrl=req.file.filename
        console.log(req.body)
        console.log(imgUrl);
        userdata.updateOne({_id:userId},{$set:{
            image:imgUrl
            
        }}).then(()=>{
            res.json({status:true,imageurl:imgUrl})
        })
    }
   
    const getUsers=async(req,res,next)=>{
        try{
            const users=await userdata.find()
            res.json(users)
        }catch(err){
            console.log(err);
        }
    }

module.exports={
register,
login,auth,prof,getUsers
}   
 
