import { useEffect } from "react";
import {io} from "socket.io-client"

const socketIoConnection = () =>{
    const socket =io("http://192.168.178.33:2020/")
useEffect(() => {
  
    socket.on("connect", () => {
      socket.emit("username", "semir");
    
  })



    socket.on("recieved_message",(data)=>{
           
            
       console.log(data);
       
        })

  socket.on("users", users => {
    console.log(users);
    
  });

  socket.on("connected", user => {
   console.log(user);
   
  });

  socket.on("disconnected", id => {
    console.log("DC",id);
    
  });
}, [socket]);

}



export default socketIoConnection