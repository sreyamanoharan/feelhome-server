import express ,{Router} from "express"
const hostRouter = express.Router()
import {postData,getData,getDetails } from "../Controller/HostController/HostController.js";
import { verifyUserToken } from "../middlewares/auth.js";



hostRouter.post('/postData',postData)
hostRouter.get('/getData/:userId',getData)
hostRouter.get('/getDetails/:id',getDetails)


export default hostRouter;

















