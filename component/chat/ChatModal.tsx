import React, { SetStateAction } from "react"
import { Modal, View , Button,StyleSheet} from "react-native"

//imports
import Chat from "./Chat"

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

const ChatModal = (props:ModalFC) =>{

    return(

        <View style={styles.container}>

<Modal
     
     animationType="slide"
     transparent={true}
     visible={props.chatModalValue.chatModalVisible}
     onRequestClose={() => {
    props.chatModalValue.setChatModalVissible
       
     }}>
     <Chat chatMsgState={{
                    allChat: [],
                    setAllChat: function (value: SetStateAction<chattMsg[]>): void {
                        throw new Error("Function not implemented.")
                    }
                }} socket={undefined} socketId={""}/>
                <Button title="Zurück" onPress={() =>props.chatModalValue.setChatModalVissible(false)}/>
    
    
   </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
	
	container:{
        

    }
	
});
export default ChatModal