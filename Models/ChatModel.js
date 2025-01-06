import mongoose from 'mongoose'
const ChatSchema= new mongoose.Schema({

    chatName:{
        type:String,
        required:true
    },
    User:[{
        type:String,
        ref:'User'

    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Messages'
    }

},
{
    timestamps:true
}
)

const Chat= mongoose.model('chats',ChatSchema)
export default Chat