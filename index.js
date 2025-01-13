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

const app = express();
const port = 3000;
const dbUrl = 'mongodb://127.0.0.1:27017/feelHome';


app.use(cors({
   origin: ["http://localhost:4000", "feelhome-client-iitd.vercel.app/","feelhome-client-iitd.vercel.app"],
  methods: ["GET", "POST","PATCH","PUT" ,"DELETE"],
  credentials: true,
}));
app.use(express.json());  


app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/host', hostRouter);
app.use('/chat',chatRouter)
app.use('/message',messageRoute)


mongoose.connect(process.env.MONGO_URI).then(result=>{
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
    origin: ["http://localhost:4000", "https://feelhome-client.vercel.app"],
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
      console.log('new message....///////////////////.....//////////////');
      
    var chat=newMessageRecieved?.chatId
    console.log(chat,"==========")
    if(!chat?.User) return console.log("chat not found");
    chat.User.forEach((user)=>{
      
      if(user._id==newMessageRecieved.sender._id) return
      socket.in(user._id).emit("message received",newMessageRecieved)
      
    })
  })
})

