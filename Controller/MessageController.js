import mongoose from "mongoose";
import Message from "../Models/MessageModel.js";
import Chat from "../Models/ChatModel.js";


export const sendMessage=async(req,res)=>{

    try{
        const {content,chatId,userId}=req.body
        console.log(content,"content");
        console.log(userId,"userId");
        console.log(chatId,"chatId");
    
        if(!content||!chatId){
            res.json("invalid data")
        }
    
        var newMessage={
            sender:userId,
            content:content,
            chatId:new mongoose.Types.ObjectId(chatId)
        }
        let message=await Message.create(newMessage)
        message=await message.populate("sender",'_id name')
        message=await message.populate("chatId")
        message=await message.populate("chatId.User")
    
        await Chat.updateOne({_id:new mongoose.Types.ObjectId(chatId)},{$set:{latestMessage:message}})
        res.json({message:message})
    }catch(err){
        console.log(err);
    }
   
}

export const allMessages = async (req, res) => {
    try {
    
        const chatId = req.params.chatId;
        const messages = await Message.find({ chatId: new mongoose.Types.ObjectId(chatId) })
            .populate("sender", 'name')
            .populate('chatId')
            
        res.json({ messages:messages });
    } catch (err) {
        console.log(err);
       
    }
}
