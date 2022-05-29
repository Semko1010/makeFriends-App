import React, { SetStateAction, useCallback, useContext, useState } from "react"
import { Modal, View , Button,StyleSheet, ScrollView, Image,Text, TextInput, Dimensions} from "react-native"
import { Link } from "react-router-native"
import uuid from 'react-native-uuid';
//imports
import Chat from "./Chat"
import {userInfo,Token} from "../../App"
import { GiftedChat } from 'react-native-gifted-chat'

type chattMsg={
    
    message:string
  }

   interface IMessage {
    _id: string | number
    text: string
    createdAt: Date | number
    user: any
    image?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean
    quickReplies?: any
  }

type ModalFC={
    chatModalValue:{
        chatModalVisible:boolean,
        setChatModalVissible:React.Dispatch<React.SetStateAction<boolean>>
    }
    allChat:{
      allChat: IMessage[],
        setAllChat:React.Dispatch<React.SetStateAction<IMessage[]>>  
    }
        
   
    socket:{
        emit:any
    }
   
        socketId:string
    
}

const ChatModal = (props:ModalFC) =>{
    const [chatModalVisible, setChatModalVissible] = useState(false);
    const {info,setInfo} = useContext(userInfo)
    const { token, setToken} = useContext(Token)
    const [msg, setMsg] = useState("")
    const [allChat,setAllChat] = useState([])
    const [room,setRoom] = useState("")




 
    // const send = (messages) =>{
    //     props.allChat.setAllChat(previousMessages => GiftedChat.append(previousMessages, messages))
    //     props.socket.emit("chat",messages,info.userObjId)
    //     console.log(info.userObjId);
        
    // }

    const onSend = useCallback((messages = [],info) => {
        
        
        
        props.allChat.setAllChat(previousMessages => GiftedChat.append(previousMessages, messages))
        props.socket.emit("chat",messages,info)
        
      }, [])

       
   
    
    console.log("unsort",props.allChat.allChat);
    
    console.log("sort",props.allChat.allChat.sort((a:any,b:any)=>b.createdAt - a.createdAt));
    
    return(

 
  

<Modal
     
     animationType="slide"
     transparent={true}
     visible={props.chatModalValue.chatModalVisible}
     onRequestClose={() => {
        props.chatModalValue.setChatModalVissible
       
     }}>
    
    
<View style={styles.container}>


<GiftedChat
      messages={props.allChat.allChat}
      onSend={messages => onSend(messages,info.userObjId)}
    //   inverted={false}
      user={{
        _id: token.userObjId,
      }}
    />


                <View style={{backgroundColor:"#1e90ff"}}>
                <Button color="white" title="Zurück" onPress={() =>props.chatModalValue.setChatModalVissible(false)}/>
                </View>
    </View>
   </Modal>
     
    )
}
const styles = StyleSheet.create({
    container:{
        
        height: '100%',
        backgroundColor:"rgba(0, 0, 0,0.4)"
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