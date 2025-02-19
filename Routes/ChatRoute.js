import express ,{Router} from "express"
import { createChat, getChats } from "../Controller/ChatController/ChatController.js";

const chatRouter = express.Router()

chatRouter.post('/create-chat',createChat)
chatRouter.get('/userChat/:userId',getChats)


export default chatRouter;