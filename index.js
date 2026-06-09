import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import userRouter from './Routes/UserRoute.js';
import adminRouter from './Routes/AdminRoute.js';
import hostRouter from './Routes/HostRoute.js';
import chatRouter from './Routes/ChatRoute.js';
import jwt from 'jsonwebtoken'
import { Server, Socket } from 'socket.io';
import messageRoute from './Routes/messageRoute.js';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = 3000;
const dbUrl = process.env.MONGO_URI


app.use(cors({
   origin: ["http://localhost:4000","http://localhost:4000/","http://13.53.61.210"],
  methods: ["GET", "POST","PATCH","PUT" ,"DELETE"],
  credentials: true,
}));
app.use(express.json());  


app.use('/api', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/host', hostRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRoute);

console.log(process.env.MONGO_URI,'kkkkkkkk');

mongoose.connect(dbUrl).then(result=>{
  console.log('mongo db connected');
}).catch(err=>{
  console.log(err);
});



// Start the server
const server=app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io=new Server(server,{
  pingTimeout:60000,
  cors:{
    origin: ["http://localhost:4000", "http://13.53.61.210"],
    methods:['GET','POST','PATCH']
  }
})


io.on("connection",(socket)=>{
  console.log("conncted to socket.io");


  socket.on('setup',(userId)=>{

    socket.join(userId)
    console.log("conncted to socket.io");
    socket.emit("connected")
  })
  

  socket.on('join chat',(room)=>{
    socket.join(room)
    console.log("user joined room...........................................",room);
  })

  socket.on('new message',(newMessageRecieved)=>{
    
      
    var chat=newMessageRecieved?.chatId
  
    if(!chat?.User) return console.log("chat not found");
    chat.User.forEach((user)=>{
      
      if(user._id==newMessageRecieved.sender._id) return
      socket.in(user._id).emit("message received",newMessageRecieved)
      
    })
  })
})

