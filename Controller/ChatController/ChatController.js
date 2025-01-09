import Chat from "../../Models/ChatModel.js";


export const createChat= async(req,res)=>{
    const {userId,hostId}=req.body
    console.log(userId,"userid");
    console.log(hostId,"hostId");

    if(!userId||!hostId){
        res.json({error:"something went wrong"})
    }else{
        const isChat= await Chat.findOne({
            $and:[{User:{$elemMatch:{$eq:userId}}},{User:{$elemMatch:{$eq:hostId}}}]
         }).populate("User","-password")
console.log(isChat,'issschat..;;;;;;;;');


         if(isChat){
            res.json({chat:isChat})
         }else{
            const chatData={
                chatName:'sender',
                User:[userId,hostId]
            }
            const createChat=await Chat.create(chatData)
            console.log(createChat);
            
            const fullChat=await Chat.findOne({_id:createChat._id}).populate('User','-password')
            console.log(fullChat);
            
            res.json({chat:fullChat})
         }
    }
}

export const getChats=async(req,res)=>{
   try{
    const userId=req.params.userId
    const fullChat= await Chat.find({User:{$in:[userId]}}).populate("User","-password").populate("latestMessage").sort({updatedAt:-1})
    res.json({status:true,fullchat:fullChat})
   }catch(err){
     console.log(err);
   }
}