import express from "express"
import { gettimeawayController, inserttimeawayController, deletetimeawayController, updatereviewController} from "../controller/reviewsController.js"

const router = express.Router() //EXTENSION OF THE express IN EXCERCIS5.js and manages path from different as i cant use app.get/app.post../
router.get("/",gettimeawayController )
router.post("/",inserttimeawayController )
router.patch("/:record_id", updatereviewController)
router.delete("/:record_id", deletetimeawayController)

 
 
//allows to be used outside of the file 
export default router
  