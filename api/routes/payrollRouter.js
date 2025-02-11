import express from "express"
import { getpayrollController , insertpayrollController , deletepayrollController,updatepayrollController } from "../controller/payrollController.js"



const router = express.Router() //EXTENSION OF THE express IN EXCERCIS5.js and manages path from different as i cant use app.get/app.post../
router.get("/", getpayrollController)
router.post("/", insertpayrollController)
router.patch("/:payroll_id", updatepayrollController)
router.delete("/:payroll_id", deletepayrollController )
 




//allows to be used outside of the file 
export default router