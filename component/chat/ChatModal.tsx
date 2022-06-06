import React, { SetStateAction, useCallback, useContext, useEffect, useState } from "react"
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
    chatModalVisible:{
        chatModalVisible:boolean
        setChatModalVisible:React.Dispatch<React.SetStateAction<boolean>>
      }
    allChat:{
      allChat: IMessage[],
        setAllChat:React.Dispatch<React.SetStateAction<IMessage[]>>  
    }
        
   allUsers:{
    allUsers: [],
    setAllUsers:React.Dispatch<React.SetStateAction<[]>>
   }
    socket:{
        emit:any
        close:any
        on:any
    }
   
        socketId:string
    
}

const ChatModal = (props:ModalFC) =>{
   
    const {info,setInfo} = useContext(userInfo)
    const { token, setToken} = useContext(Token)
    const [prv,setPrv] = useState("")



 useEffect(() => {

     
props.allUsers.allUsers.find(user => {

if(user.userObjId == info.userObjId){
setPrv(user.id)


}

})

    
 },[props.socket])
    const send = (messages,info) =>{
       
        
        
        props.allChat.setAllChat(previousMessages => GiftedChat.append(previousMessages, messages))
        props.socket.emit("chat",messages,prv,token)
        
        
    }




    // const onSend = useCallback((messages = [],info) => {
        
        
        
    //     props.allChat.setAllChat(previousMessages => GiftedChat.append(previousMessages, messages))
    //     props.socket.emit("chat",messages,info)
        
    //   }, [])

       
   
  
    
    
   props.allChat.allChat.sort((a:any,b:any)=>b.createdAt - a.createdAt)
    return(

 
  

<Modal
     
     animationType="slide"
     transparent={true}
     visible={props.chatModalVisible.chatModalVisible}
     onRequestClose={() => {
        props.chatModalVisible.setChatModalVisible
       
     }}>
    
    
<View style={styles.container}>

    <View style={{width: '100%',height:"15%",alignItems: "center",backgroundColor:"white", paddingTop:30}}>
        <Text> Du Chatest mit:</Text>
        <Image
        style={{width:50,height:50}}
        source={{
        uri: `data:image/png;base64,${info.img}`,
        }}
        />
    </View>
    <View style={{height:"80%",backgroundColor:"rgba(0, 0, 0,0.5)"}}>
    <GiftedChat
      messages={props.allChat.allChat}
      onSend={messages => send(messages,info.userObjId)}
    //   inverted={false}
      user={{
        _id: token.userObjId,
      }}
    />
    </View>


                <View style={{backgroundColor:"#1e90ff",height:"5%"}}>
                <Button color="black" title="Zurück" onPress={() =>props.chatModalVisible.setChatModalVisible(false)}/>
                </View>
    </View>
   </Modal>
     
    )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:"space-between",
       width:Dimensions.get('window').width,
        height: '100%',
        
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