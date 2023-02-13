const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose")
const socket = require("socket.io");

const userRoutes=require("./routes/userRoutes");
const messageRoutes=require("./routes/messageRoutes.js");


const app=express();
require("dotenv").config();
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use("/auth",userRoutes);
app.use("/messages",messageRoutes);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
   
  })
  .then(()=>
   {console.log('db connected');}
  )
const server= app.listen(process.env.PORT,()=>{
  console.log(`server running ${process.env.PORT}`)
  })

  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });
