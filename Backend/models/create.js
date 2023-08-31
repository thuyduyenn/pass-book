const mongoose = require("mongoose")
const createSchema = new mongoose.Schema({
       userId:{
        type:String,
        required:true,
        minlength:3,
        maxlength:1024
       },
       nameUser: {
        type:String,
        required:true,
        minlength:3,
        maxlength:1024
       },
        emailUser:{
            type:String,
            required:true,
            minlength:3,
            maxlength:1024
       },
       imageUser:{
        type:String,
        required:true,
        minlength:3,
        maxlength:1024
        },
        year:{
            type:String,
            required:true,
            minlength:3,
            maxlength:30
        },
        semester: {
            type:String,
            required:true,
            minlength:3,
            maxlength:30
        },
        majors: {
            type:String,
            required:true,
            minlength:3,
            maxlength:150
        },
        face: {
            type:String,
            required:true,
            minlength:3,
            maxlength:1024
        },
        zalo :{
            type:String,
            required:false,
            minlength:3,
            maxlength:1024
        },
        name: {
            type:String,
            required:false,
            minlength:3,
            maxlength:150
        },
        price : {
            type:String,
            required:true,
            minlength:1,
            maxlength:150
        },
        image:{
            type:Object,
            required:true

        },
        description: {
            type:String,
            required:true,
            minlength:3,
            maxlength:1024
        }


}, {
    timestamps:true
})
const createModel = mongoose.model("create",createSchema)
module.exports = createModel