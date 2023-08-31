const express = require("express")
const router = express.Router()
const {uploadBook,getAllBook,deleteFunc,updateFunc} = require("../controllers/createController")
router.post("/upload",uploadBook) 
router.post("/update",updateFunc)
router.get("/get-all/book",getAllBook)
router.get("/delete/:deleteId",deleteFunc)
module.exports = router