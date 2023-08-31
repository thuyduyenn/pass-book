const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
      name: {
           type:String,
           required:true,
           minlength:3,
           maxlength:50
      },
      email: {
        type:String,
        required:true,
        minlength:3,
        maxlength:50
     },
     password: {
       type:String,
       required:true,
       minlength:3,
       maxlength:1024
    },
    image: {
      type:Object,
      required:false
    }
},{
    timestamps:true
})
const userModel = mongoose.model("users",userSchema)
module.exports = userModel