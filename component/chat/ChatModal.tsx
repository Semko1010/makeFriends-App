import React, { SetStateAction, useCallback, useContext, useState } from "react"
import { Modal, View , Button,StyleSheet, ScrollView, Image,Text, TextInput, Dimensions} from "react-native"
import { Link } from "react-router-native"

//imports
import Chat from "./Chat"
import {userInfo,Token} from "../../App"
import { GiftedChat } from 'react-native-gifted-chat'

type chattMsg={
    
    message:string
  }

type chatMessage={
    chatMsgState:{
        allChat: chattMsg[],
        setAllChat:React.Dispatch<React.SetStateAction<chattMsg[]>>
    }
    socket:any,
    socketId:string,
    
}

type ModalFC={
    chatModalValue:{
        chatModalVisible:boolean,
        setChatModalVissible:React.Dispatch<React.SetStateAction<boolean>>
    }
    
}
export interface IMessage {
    _id: string | number
    text: string
    createdAt: Date | number
    user: string
    image?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean
    
  }
const ChatModal = (props:ModalFC) =>{
    const [chatModalVisible, setChatModalVissible] = useState(false);
    const {info,setInfo} = useContext(userInfo)
    const { token, setToken} = useContext(Token)
    const [msg, setMsg] = useState("")
    const [allChat,setAllChat] = useState([])
    const [room,setRoom] = useState("")




    // const sendMesage = async(message: []) =>{
    //     const userInfosMessage:IMessage={
    //         _id:token.userObjId,
    //         text:msg,
    //         createdAt:new Date(),
    //         user:token.userName,
        
    //         // userName:token.userName ,
    //         // img:token.img,
    //         // userObjId:token.userObjId ,
    //         // message:msg,
    //         // room:info.userObjId,
    //         // socketId:props.socketId
    //     }
      
      
        
       
    //     props.socket.emit("chat",message)
       
    //    setMsg("")
       
    // }


    const onSend = useCallback((messages = []) => {
        props.allChat.setAllChat(previousMessages => GiftedChat.append(previousMessages, messages))
        props.socket.emit("chat",messages,info.userObjId)
        console.log("MSG",messages);
        console.log("Semko",props.allChat.allChat);
      }, [])

       
    
    console.log(info);
    
    
    return(

 
  

<Modal
     
     animationType="slide"
     transparent={true}
     visible={props.chatModalValue.chatModalVisible}
     onRequestClose={() => {
        props.chatModalValue.setChatModalVissible
       
     }}>
    
    {/* <View style={styles.container}>
        
        <View style={styles.headline}>
        <Text>Live Chat</Text>

        </View>
       
        
        <ScrollView style={styles.scroll}>
           
           
        

       {props.allChat.allChat.map((chat,index) => 
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
        
      
        </ScrollView>
       
        <TextInput 
        value={msg}
        style={styles.textInput} onChangeText={e => setMsg(e)} placeholder="Nachricht"/>
        <Button title="senden" onPress={sendMesage}></Button>
        <Button title="Zurück" onPress={() =>props.chatModalValue.setChatModalVissible(false)}/>
      
    </View> */}




<GiftedChat
      messages={props.allChat.allChat}
      onSend={messages => onSend(messages)}
      user={{
        _id: token.userObjId,
      }}
    />


                
                <Button title="Zurück" onPress={() =>props.chatModalValue.setChatModalVissible(false)}/>
    
   </Modal>
     
    )
}
const styles = StyleSheet.create({
    container:{
        width: '100%',
        height:"100%",
        textAlign: 'center',
        alignItems: "center",
        justifyContent: 'space-evenly',
        backgroundColor:"white"
    },
    headline:{
        textAlign: 'center',
        alignItems: "center",
        marginTop:50,
        borderBottomWidth:1,
        width: Dimensions.get('window').width,
    },
    textInput:{
        borderWidth:1,
        width:"70%",
        height:"5%"
    },
    chatMsg:{
        textAlign: 'center',
        
        width:"70%",
        height:25
    },
    scroll:{
       
        marginTop:10,
        width:300,
    },
    scrollView:{
        alignItems: "center",
    },
    msgView:{
        
        justifyContent:"space-evenly",
        alignItems: "baseline",
    }
})
export default ChatModal