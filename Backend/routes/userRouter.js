const express = require("express")
const router = express.Router()
const {registerUser,loginUser,updateAdmin,getUser,changePassword} = require("../controllers/userController")
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/update/admin",updateAdmin)
router.get("/get/user/:userId",getUser)
router.post("/change/password",changePassword)
module.exports = router