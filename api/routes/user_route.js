const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const multer = require('multer');
const upload = multer();


router.post("/register",upload.single('profilePhoto'),userController.registerUser);
router.get("/getalluser",userController.getAllUsers);


module.exports = router;