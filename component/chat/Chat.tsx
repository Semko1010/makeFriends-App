import React, { useContext, useEffect, useState } from "react"
import { View , Text, Button, TextInput,StyleSheet,Dimensions,ScrollView} from "react-native"
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
        
        props.chatMsgState.setAllChat([...props.chatMsgState.allChat,data])
        console.log(data);
        
        socket.close()
        
        })
      },[socket])




const joinRoom = () => {
    if(room !== ""){
        socket.emit("join_room",room)
    }
    
}

const sendMesage = () =>{
    
    
    socket.emit("chat",{message:msg,room:room})
    
    
}



    return (

    <View style={styles.container}>
        
        <View style={styles.headline}>
        <Text>Chat</Text>

        </View>
        <TextInput style={styles.textInput} onChangeText={e => setRoom(e)} placeholder="Room"/>
        <Button title="Join Room" onPress={joinRoom}></Button>
        <ScrollView style={styles.scroll}>
       {props.chatMsgState.allChat.map(chat => 
       <Text style={styles.chatMsg}>{chat.message}</Text>
        )}
        </ScrollView>
        <Link to="/map">

        <Text>Map</Text>
        </Link>
        <TextInput style={styles.textInput} onChangeText={e => setMsg(e)} placeholder="Nachricht"/>
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
        borderWidth:1,
        width:"70%",
        height:25
    },
    scroll:{
        marginTop:100,
        width:350,
        
        
    }
})

export default Chat

