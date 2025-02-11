import express from "express"
import { getemployeesController , insertemployeesController,deleteemployeeController,updateemployeeController } from "../controller/employeesController.js"
import { authenticate } from "../controller/authController.js"


const router = express.Router() //EXTENSION OF THE express IN EXCERCIS5.js and manages path from different as i cant use app.get/app.post../
router.get("/", getemployeesController )
router.post("/", insertemployeesController)
router.patch("/:employee_id",updateemployeeController
 )
router.delete("/:employee_id", deleteemployeeController )
router.get("/", authenticate)





//allows to be used outside of the file 
export default router

