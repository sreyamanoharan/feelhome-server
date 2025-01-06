import express ,{Router} from "express"
import { allMessages, sendMessage } from "../Controller/MessageController.js"
const messageRoute=express.Router()

messageRoute.post('/',sendMessage)
messageRoute.get('/:chatId',allMessages)
export default messageRoute
