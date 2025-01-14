import express , {Router} from "express"
import { adminRevenue, adminlogin, allCategories, getGraphCategory } from "../Controller/AdminController/AdminController.js";
const adminRouter = express.Router()
import {addBanner,getBanner,disableBanner, deleteBanner} from "./../Controller/AdminController/BannerController.js";
import {addCategory ,getCategory} from './../Controller/AdminController/CategoryManagement.js'
import { addFeature, getFeature} from "../Controller/AdminController/FeatureManagement.js";
import { getUser,getUserNum,latestUsers,latestUsersnum,userStatus } from "../Controller/AdminController/UserController.js";
import { graphData } from "../Controller/AdminController/AdminController.js";
import { getBookingNum, latestBookings } from "../Controller/UserController/BookingController.js";
import { addedProperty } from "../Controller/AdminController/PropertyController.js";





adminRouter.post('/adminlogin',adminlogin)
adminRouter.route('/banner').get(getBanner).post(addBanner).patch(disableBanner).delete(deleteBanner)
adminRouter.post('/postCategory',addCategory)
adminRouter.get('/getCategory',getCategory)
adminRouter.post('/postFeature',addFeature)
adminRouter.get('/getFeature',getFeature)
adminRouter.get('/getUser',getUser)
adminRouter.patch('/userStatus', userStatus);
adminRouter.get('/adminRevenue',adminRevenue)
adminRouter.get('/graphData',graphData)
adminRouter.get('/allcat',allCategories)
adminRouter.get('/graphCategory',getGraphCategory)
adminRouter.get('/latestUsers',latestUsers)
adminRouter.get('/userNum',getUserNum)
adminRouter.get('/newUsers',latestUsersnum)
adminRouter.get('/bookingNum',getBookingNum)
adminRouter.get('/newBooking',latestBookings)
adminRouter.get('/addedProp',addedProperty)

// adminRouter.post('/postBanner',BannerController.postBanner)


export default adminRouter;