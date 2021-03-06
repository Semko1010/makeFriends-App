//Modules
import React, {useState,useEffect,useContext} from 'react'
import {ImageBackground, StyleSheet, Text, View ,Dimensions,Image, Button,ActivityIndicator,Pressable,Modal,Alert, TouchableOpacity} from 'react-native'
import MapView, { Marker,Callout} from "react-native-maps";
import * as Location from 'expo-location';
import {io} from "socket.io-client"
import axios from 'axios';

//Imports
import Api from "../../component/api/Api.json"
import {userInfo,Token,allInfosUser} from "../../App"
import Markers from "../marker/Marker"
import SetCoordsButton from "../setCoordsButton/SetCoordsButton"
import ModalMenu from "../modalMenu/ModalMenu"
import ChatModal from "../chat/ChatModal"
import { Link } from 'react-router-native';


 interface InterFaceInfos{
    age:number,
    img:string,
    latitude: number,
    longitude: number,
    userName:string
    hobby:string,
    verifyUser:boolean,
    desc:string
    }

    type coordinates ={
        longitude: number,
        latitude: number,
       
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
type chattMsg={
    
  message:string
}
type chatMessage={
  chatMsgState:{
      allChat: IMessage[],
      setAllChat:React.Dispatch<React.SetStateAction<IMessage[]>>
  }
  socket:{
    emit:any
    close:any
    on:any
  }
  allUsers:{
    allUsers: [],
    setAllUsers:React.Dispatch<React.SetStateAction<[]>>
   }
    socketId:string
    showChat:{
      showChat:boolean
      setShowChat:React.Dispatch<React.SetStateAction<boolean>>
    }
    chatModalVisible:{
      chatModalVisible:boolean
      setChatModalVisible:React.Dispatch<React.SetStateAction<boolean>>
    }
    notification:{
      notification:boolean
      setNotification:React.Dispatch<React.SetStateAction<boolean>>
    }

}

const MapViews = (props:chatMessage) =>{

  
  
    // const socket =io("https://makefriendsapp.herokuapp.com/")
    const [location, setLocation] = useState<coordinates | undefined>();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [ infos, setInfos] = useState<boolean>(true)
    const {userInfos, setUserInfos} = useContext(allInfosUser)
    const {info,setInfo} = useContext(userInfo)
    const { token, setToken} = useContext(Token)
    const [modalVisible, setModalVisible] = useState(false);
    
    const [ loading, setLoading] = useState<boolean>(true)
    const [ calling, setCalling] = useState<boolean>(true)
   
    const userToken = token.token
    
  
   

async function currentGps (){
  
  
  
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  setLocation(location.coords);
 
  
}






useEffect(() => {

        (async () => {
         

          const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/gpsLocation"
          const fetchInfos = await axios.get(URL,{headers:{userToken}})
          const setInfosUsers = await setUserInfos(fetchInfos.data)
         

          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          const setLoc = await setLocation(location.coords);
          
          
          setLoading(false)
          
          
          
        })();
      }, []);

useEffect(() => {

        (async () => {
         
          const connectToChat = await props.socket.on("connect", () => {
           
            props.socket.emit("username",token.userName,token.userObjId)
          });

         
          
          

        })();
      }, []);

      
async function mapRefresh  () {
    // const leaveRoom = await props.socket.emit("leave_room", token.userObjId)
   
  //  const jo = await props.socket.emit("join_room",token.userObjId)
 

  
const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/gpsLocation"
const fetchInfos = await axios.get(URL,{headers:{userToken}})
const setInfosUsers = await setUserInfos(fetchInfos.data)
  
}



async function notificationMessage(){
  const recievedMessageuser = await props.allUsers.allUsers.map(user => {
    if(user.userObjId == props.lastMessage.lastMessage){
    userInfos.map(userInfo =>{
      if(props.lastMessage.lastMessage == userInfo.userObjId){
        setInfo(userInfo)
      }
    })

    }
    
  })
  
  const removeNotification = await props.notification.setNotification(false)
  const openChat = await props.
  chatModalVisible.setChatModalVisible(true)

}
console.log(userInfos);

    return(
        <View style={styles.container}>
          {loading&&(
            <ActivityIndicator size="large" color="#00ff00" />
          )}
     {location   &&(
       <View style={styles.container}>
         <View style={styles.menu}>
      
        
       
      
        <TouchableOpacity
            onPress={() => setModalVisible(true)}
                >
            <Image
            style={{width:35, height:35,marginLeft:15}}
            source={require("../../assets/img/menu.png")}
            />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={mapRefresh}
                >
            <Image
            style={{width:50, height:50}}
            source={require("../../assets/img/refresh.png")}
            />
        </TouchableOpacity>
        <SetCoordsButton
        location={location}
        call={{mapRefresh,currentGps}}
        
        />
       
        
    
    </View>
     {/* @ts-ignore  */}
     <MapView
				style={styles.map}
				initialRegion={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
        showsUserLocation={true}
        provider='google'>

		{userInfos.map((e,index) => 
    <Markers
    key={index}
    latitude={e.latitude}
    longitude={e.longitude}
    userName={e.userName}
    img={e.img}
    age={e.age}
    hobby={e.hobby}
    desc={e.desc}
    userObjId={e.userObjId}
    showChat={props.showChat}
    />
    
  )}
 
    </MapView>

    {/* INFO VIEW*/}
    
    <View style={styles.infos}>
      <View style={styles.infosText}> 
            <Text>Name: {info.userName}</Text>
            <Text>Alter: {info.age}</Text>
            <Text>Hobbys: {info.hobby}</Text>
            <Text>??ber mich: {info.desc}</Text>
            </View>

              {props.showChat.showChat  &&(
              <Button onPress={() =>  props.
                chatModalVisible.setChatModalVisible(true)} title='Chat'/>
             )}

              {props.notification.notification &&(
            <View>
              <Text>Neue Nachricht</Text>
              
            <Button title="OK" onPress={notificationMessage}/>
            
            </View>
            )}
            </View>
    
  </View>

  
     )}

     {/* Men?? */}
     <>
     <ModalMenu 
     modalValue={{modalVisible,setModalVisible}}
     socket={props.socket}
     />
      <ChatModal
      chatModalVisible={props.chatModalVisible}
      socket={props.socket}
      allChat={props.chatMsgState}
      socketId={props.socketId}
      allUsers={props.allUsers}
      />
     </>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-evenly',
    },
   
    map: {
      width: Dimensions.get('window').width,
      height: "75%",
    },
    infos:{
      width: "100%",
      
      backgroundColor: 'white',
      textAlign: 'center',
      flexDirection:"row",
      justifyContent: 'space-evenly',
    },
    infosText:{
      flexDirection:"column"
    },
    userImg:{
      width: 110,
      height: 100,
      borderRadius:80
    },
    userImgView:{
      width:Dimensions.get('window').width,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      
    },
    footerView:{
      borderTopWidth:1,
      width:Dimensions.get('window').width,
      justifyContent:"center",
      alignItems: "center",
    },
    date:{
      alignItems:"center",
      justifyContent:"center",
      
    },
    buttons:{
      justifyContent: 'center',
      alignItems: 'center',
      width: 150, 
      height: 50},

    modalView: {
      justifyContent:"space-between",
      height:Dimensions.get('window').height,
      width:"100%",
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      
    },
    button: {
      borderRadius: 20,
      padding: 10,
    },
    
    menu:{
      width: Dimensions.get('window').width,
      height: 100,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems: "center",
      borderBottomWidth:1,
      borderBottomColor:"gray"
    },
    buttonOpen: {
      backgroundColor: '#F194Fa',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    centeredView: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
          
        },
  });
  

export default MapViews