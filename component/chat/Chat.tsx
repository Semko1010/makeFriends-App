import React, { useContext, useEffect, useState } from "react"
import { View , Text, Button, TextInput,StyleSheet,Dimensions,ScrollView, Image} from "react-native"
import { Link } from "react-router-native"
import {io} from "socket.io-client"

import {userInfo,Token,allInfosUser} from "../../App"

type chattMsg={
    
    message:string
  }

type chatMessage={
    chatMsgState:{
        allChat: chattMsg[],
        setAllChat:React.Dispatch<React.SetStateAction<chattMsg[]>>
    }
}

const Chat = (props:chatMessage) =>{

    const { token, setToken} = useContext(Token)
    const [msg, setMsg] = useState("")
    const [allChat,setAllChat] = useState([])
    const [room,setRoom] = useState("")
    const socket =io("http://192.168.178.33:2020/")
    // const socket =io("https://makefriendsapp.herokuapp.com/")
    
    
    useEffect(() => {
        
       
        socket.on("chat",(data)=>{
      
        
        
        props.chatMsgState.setAllChat((list) =>[...list,data])
        
        
       
        
        })
      },[socket])
        


console.log(props.chatMsgState.allChat);




const joinRoom = () => {
    if(room !== ""){
        socket.emit("join_room",room)
    }
    
}

const sendMesage = async() =>{
    const userInfosMessage={
        userName:token.userName ,
        img:token.img,
        userObjId:"626c485c9eb1548fef1972c5" ,
        message:msg,
        room:room
    }
    
   
    socket.emit("chat",userInfosMessage)
   setMsg("")
   
}





    return (

    <View style={styles.container}>
        
        <View style={styles.headline}>
        <Text>Chat</Text>

        </View>
        <TextInput style={styles.textInput} onChangeText={e => setRoom(e)} placeholder="Room"/>

        <Button title="Raum beitreten" onPress={joinRoom}></Button>
        <ScrollView style={styles.scroll}>
            <View style={styles.scrollView}>
        <Text>Live Chat</Text>

       {props.chatMsgState.allChat.map((chat,index) => 
    <View style={[styles.msgView,{flexDirection: token.userObjId ==chat.userObjId ?"row-reverse":"row"}]}>
         <Image
         
					style={{width:50, height:50}}
							source={{
								uri: `data:image/png;base64,${chat.img}`,
							}}
					    />
       <Text 
       key={index}
       style={styles.chatMsg}>{chat.message}</Text>
    </View>
        )}
        
        </View>
        </ScrollView>
        <Link to="/map">

        <Text>Map</Text>
        </Link>
        <TextInput 
        value={msg}
        style={styles.textInput} onChangeText={e => setMsg(e)} placeholder="Nachricht"/>
        <Button title="senden" onPress={sendMesage}></Button>
      
    </View>
    )
 
}


const styles = StyleSheet.create({
    container:{
        width: '100%',
        height:"80%",
      textAlign: 'center',
        alignItems: "center",
        justifyContent: 'space-evenly'
    },
    headline:{
        borderBottomWidth:1,
        width: Dimensions.get('window').width,
    },
    textInput:{
        borderWidth:1,
        width:"70%",
        height:"10%"
    },
    chatMsg:{
        textAlign: 'center',
        
        width:"70%",
        height:25
    },
    scroll:{
        borderWidth:1,
        marginTop:10,
        width:300,
    },
    scrollView:{
        alignItems: "center",
    },
    msgView:{
        justifyContent:"space-around",
        alignItems: "baseline",
    }
})

export default Chat

