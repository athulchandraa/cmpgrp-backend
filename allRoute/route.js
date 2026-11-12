const express=require('express')
const userController=require('../controllers/userController')
const grievanceController = require("../controllers/complaintController");
const upload = require("../middleware/upload");
const aiController=require('../controllers/aiController')

const route=new express.Router()

//Registration
route.post('/user-reg',userController.registerController)

//Login
route.post('/user-login',userController.loginController)

// Grievance Submission
route.post("/submit-grievance",upload.single("supportingDocument"),grievanceController.submitGrievance);

//Ai Evaluation ivde nadakkum
route.post("/analyze-grievance", aiController.analyzeGrievance);


module.exports=route