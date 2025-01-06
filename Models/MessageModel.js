import mongoose from 'mongoose';

const MessageSchma = new mongoose.Schema({
    sender:{
        type:String,
        ref:'User'
    },
    content:{
        type:String,
        trim:true
    },
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chats'
    }
},
{
    timestamps:true
}
)


const Message = mongoose.model('Messages', MessageSchma);

export default Message;
