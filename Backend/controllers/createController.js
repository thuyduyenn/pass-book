const createModel = require("../models/create")
const cloudinary = require("../utils/cloudinary")
const uploadBook = async(req,res)=> {
    const {userId,nameUser,emailUser,imageUser,year,semester,majors,face,zalo,name,price,image,description} = req.body
    try {
         if(!userId || !nameUser || !emailUser || !imageUser || !year || !semester || !majors || !face || !name || !price || !description) return res.status(400).json("All field is required")
        
         if(image){
            const uploadRes = await cloudinary.uploader.upload(image,{
               upload_preset:"pass-book"
            })
            if(zalo){
               create = new createModel({
                  userId,
                  nameUser,
                  emailUser,
                  imageUser,
                  year,
                  semester,
                  majors,
                  face,
                  zalo,
                  name,
                  price,
                  image:uploadRes,
                  description
               })
               await create.save()
               res.status(200).json({
                  userId,
                  nameUser,
                  emailUser,
                  imageUser,
                  year,
                  semester,
                  majors,
                  face,
                  zalo,
                  name,
                  price,
                  image:uploadRes,
                  description,
                  _id:create._id
               })
            }else {
               create = new createModel({
                  userId,
                  nameUser,
                  emailUser,
                  imageUser,
                  year,
                  semester,
                  majors,
                  face,
        
                  name,
                  price,
                  image:uploadRes,
                  description
               })
               await create.save()
               res.status(200).json({
                  userId,
                  nameUser,
                  emailUser,
                  imageUser,
                  year,
                  semester,
                  majors,
                  face,
              
                  name,
                  price,
                  image:uploadRes,
                  description,
                  _id:create._id
               })
            }
          
            
        }else {
             res.status(400).json("All field is required")
        }
         
         
         
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
const getAllBook = async(req,res) => {
       try {
           let response = await createModel.find()
           res.status(200).json(response)
       }catch(err){
           console.log(err)
           res.status(500).send(err)
       }
}
const deleteFunc = async(req,res) => {
       const deleteId = req.params.deleteId
       try {
             let response = await createModel.deleteOne({_id :deleteId})
             res.status(200).json("Xoá thành công")
       }catch(err){
           console.log(err)
           res.status(500).send(err)
       }
}
const updateFunc = async(req,res)=> {
   const {_id,year,semester,majors,face,zalo,name,price,description} = req.body
   try {
     
        if(zalo){
         create = {
            year,
            semester,
            majors,
            face,
            zalo,
            name,
            price,
            description
         }
         const response = await createModel.findOneAndUpdate({_id},create)
         res.status(200).json(response)
        }else {
         create = {
            year,
            semester,
            majors,
            face,
            zalo:"",
            name,
            price,
            description
         }
         const response = await createModel.findOneAndUpdate({_id},create)
         res.status(200).json(response)
        }
   }catch(err){
      console.log(err)
      res.status(500).send(err)
   }
}
module.exports = {uploadBook,getAllBook,deleteFunc,updateFunc}