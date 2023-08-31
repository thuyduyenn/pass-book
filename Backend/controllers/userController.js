const userModel = require("../models/users")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")
const createToken = (_id) => {
       const jwtkey = process.env.JWT_SECRET_KEY
       return jwt.sign({_id},jwtkey,{expiresIn: "3d"})       
}
const registerUser = async (req,res) => {
       try{
           const {name,email,password,image} = req.body
           let user = await userModel.findOne({email})
           if(user) return res.status(400).json("user with the riven email already exist...")
           if(!email || !name || !password) return res.status(400).json("All field are required")
           if(!validator.isEmail(email)) return res.status(400).json("Email must be a valid email.. ")
           if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password...")
           if(image){
              const uploadRes = await cloudinary.uploader.upload(image,{
                  upload_preset:"pass-book"
               })
               user = new userModel({
                  name,
                  email,
                  password,
                  image:uploadRes
               })

           }else {
              user = new userModel({
                    name,
                    email,
                    password,

              })
           }
           const salt = await bcrypt.genSalt(10)
           user.password = await bcrypt.hash(user.password,salt)
           await user.save()
           const token = createToken(user._id)
           let imageUrl = await userModel.findOne({email})
           res.status(200).json({
                _id:user._id,
                name,
                email,
                image:imageUrl.image?.url ? imageUrl.image.url : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png",
                token
           })
       } catch(err){
           console.log(err)
           res.status(500).send(err)
       }
}
const loginUser = async(req,res)=> {
       const {email,password} = req.body
       try {
            let user = await userModel.findOne({email})
            if(!user) return res.status(400).json("Invalid email or password")
            const isValidPassword = await bcrypt.compare(password,user.password)
            if(!isValidPassword) return res.status(400).json("Invalid email or password")
            const token = createToken(user._id)
            res.status(200).json({
                   _id: user._id,
                   name:user.name,
                   email:user.email,
                   image:user.image ? user.image.url : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png",
                   token
            })
       }catch(err) {
          console.log(err)
          res.status(500).send(err)
       }
}
const updateAdmin = async(req,res) => {
     const {name,email,image,_id} = req.body
     try {
      if(!validator.isEmail(email)) return res.status(400).json("Email must be a valid email.. ")
          if(image){
            const uploadRes = await cloudinary.uploader.upload(image,{
               upload_preset:"pass-book"
            })
             const newDate = {
                   name,
                   email,
                   image:uploadRes
             }
             const response = await userModel.findByIdAndUpdate({_id},newDate)
             res.status(200).json(response)
          }else {
            if(!validator.isEmail(email)) return res.status(400).json("Email must be a valid email.. ")
            const newDate = {
               name,
               email  
             }
            const response = await userModel.findByIdAndUpdate({_id},newDate)
            res.status(200).json(response)
          }
     }catch(err){
      console.log(err)
      res.status(500).send(err)
     }
}
const getUser = async(req,res)=> {
  const _id = req.params.userId
  try {  
       const response = await userModel.findOne({_id})
       const token = createToken(response._id)
       res.status(200).json({
            _id:response._id,
            name:response.name,
            email:response.email,
            image:response.image ? response.image.url : "https://res.cloudinary.com/doquwihm4/image/upload/v1689860507/imageGallery/user_sfyjwb.png",
            token
       })

  }catch(err){
   console.log(err)
   res.status(500).send(err)
  }
}

const changePassword = async(req,res) => {
     const {passwordOld,passwordNew,_id} = req.body
      try {
          if(!passwordOld || !passwordNew) return res.status(400).json("All field is required")
         let user = await userModel.findOne({_id})
         const isValidPassword = await bcrypt.compare(passwordOld,user.password)
         if(!isValidPassword){
             return res.status(400).json("Invalid password")
         }else {
            if(!validator.isStrongPassword(passwordNew)) return res.status(400).json("Password must be a strong password...")
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(passwordNew,salt)
            const data = {
               password
            }
            if(password){
                 const response = await userModel.findByIdAndUpdate({_id},data)
                
            }
         }

      }catch(err){
         console.log(err)
         res.status(500).send(err)
      }
}
module.exports = {registerUser,loginUser,updateAdmin,getUser,changePassword}