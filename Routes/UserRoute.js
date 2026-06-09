import express, { Router } from "express";
const userRouter = express.Router();
import { ClientRegister, userGlogin } from "../Controller/UserController/UserController.js";
import { verifyMail } from "../Controller/UserController/UserController.js";
import { login } from '../Controller/UserController/UserController.js'
// import { verifyUserToken } from "../middlewares/auth.js";
import { resendMail } from '../Controller/UserController/UserController.js'
import { getBanner } from "../Controller/UserController/BannerController.js";
import { getCategory } from "../Controller/UserController/CategoryController.js";
import { getFeature } from "../Controller/UserController/FeatureController.js";
import { getData, getDetails, latestProperties } from "../Controller/UserController/DataController.js";
import { createCheckoutSession, paymentSuccess, booking, cancelBooking, getBookingNum, latestBookings } from "../Controller/UserController/BookingController.js";
// import { getPage } from "../Controller/PaginationController.js";
import { loadProfile } from "../Controller/UserController/UserController.js";
import { editProfile } from "../Controller/UserController/UserController.js";
import { verifyUserToken } from '../middlewares/auth.js';
import { users } from "../Controller/UserController/UserController.js";
import { getUserNum, latestUsers } from '../Controller/UserController/UserController.js'
import { forgotPassword } from "../Controller/UserController/UserController.js";
import { restPassword } from '../Controller/UserController/UserController.js'
import { postReview, getReviews } from "../Controller/UserController/ReviewController.js";


userRouter.post('/api/register', ClientRegister)
userRouter.get('/api/verifyMail/:userId', verifyMail)
userRouter.post('/api/userLogin', login)
userRouter.post('/api/resendVerificationEmail', resendMail)
userRouter.post('/api/forgotPassword', forgotPassword)
userRouter.post('/api/resetPassword', restPassword)
userRouter.get('/api/banners', getBanner)
userRouter.get('/api/getCategory', getCategory)
userRouter.get('/api/getFeature', getFeature)
userRouter.get('/api/getData', getData)
userRouter.get('/api/getDetails/:id', getDetails)
userRouter.post('/api/create-checkout-session', createCheckoutSession)
userRouter.get('/api/paymentSuccess', paymentSuccess)
userRouter.get('/api/paymentFail', paymentSuccess);
userRouter.get('/api/booking/:userId', booking)
userRouter.post('/api/cancel-booking/:bookingId', cancelBooking);
userRouter.get('/api/userProfile', verifyUserToken, loadProfile);
userRouter.patch('/api/editProfile', verifyUserToken, editProfile);
userRouter.get('/api/latestProperties', latestProperties)
userRouter.get('/api/getUser/:userId', users)
userRouter.get('/api/userNum', getUserNum)
userRouter.get('/api/newUsers', latestUsers)
userRouter.get('/api/bookingNum', getBookingNum)
userRouter.get('/api/newBooking', latestBookings)
userRouter.get('/api/latestUsers', latestUsers)
userRouter.post('/api/userGlogin', userGlogin)
userRouter.post('/api/reviews', postReview)
userRouter.get('/api/reviews/:id', getReviews)





export default userRouter;
