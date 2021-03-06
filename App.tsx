//Modules
import React, {useState,useEffect,createContext} from 'react'
import { StyleSheet, View ,Dimensions,Text} from 'react-native'
import { NativeRouter, Route, Link, Routes } from "react-router-native";
//Components
import MapViews from "./component/mapViews/MapViews"
import Home from "./component/home/Home"
import RegisterA from "./component/register/RegisterA"
import RegisterInfos from "./component/register/RegisterInfos"
import RegisterB from "./component/register/RegisterB"
import Login from "./component/login/Login"
import UsersSettings from "./component/userSettings/UserSettings"
import ChangeInfos from './component/userSettings/ChangeInfos';

import {io} from "socket.io-client"
import uuid from 'react-native-uuid';
interface user{
 
    img:string
    latitude:number,
    longitude:number,
    userName:string
    age:number
    hobby:string
    desc:string
    userObjId:string
}

type settName = {
  info: user,
  setInfo:React.Dispatch<React.SetStateAction<user>>
}
interface tokenInfos{
 age:number,
 hobby:string,
 img:string,
 token:string,
 userName:string,
 userObjId:string,
 verifyUser:boolean
 desc:string
 
}
type setToken={
  token:tokenInfos
  setToken:React.Dispatch<React.SetStateAction<tokenInfos>>
}

interface InterFaceInfos{
  age:number,
  img:string,
  latitude: number,
  longitude: number,
  userName:string
  hobby:string,
  verifyUser:boolean,
  userObjId:string
  desc:string
  }

  type setAllUserinfo={
    userInfos:InterFaceInfos[]
    setUserInfos:React.Dispatch<React.SetStateAction<InterFaceInfos[]>>
  }

  type chattMsg={
  
      message:string
   
    
  }
type chatMessage={
  
  allChat:chattMsg[]
  setAllChat:React.Dispatch<React.SetStateAction<chattMsg[]>>
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

const userInfo = createContext<settName>({} as settName)
const Token = createContext<setToken>({} as setToken)
const allInfosUser = createContext({} as setAllUserinfo)

export default function App() {

const [ info, setInfo] = useState<user>({} as user)
const [ token, setToken] = useState<tokenInfos>({} as tokenInfos)
const [ img, setImg] = useState<string | undefined>("")
const [age,  setAge] =   useState<string>()
const [hobby, setHobby] = useState<string>()
const [desc, setDesc] = useState<string>()
const [userInfos, setUserInfos] = useState<InterFaceInfos[]>([])
const [allChat,setAllChat] = useState<IMessage[]>([])
const [socketId, setSocketId] = useState<string>("")
const [allUsers,setAllUsers] = useState<[]>([])
const [chatModalVisible, setChatModalVisible] = useState<boolean>(false);
const [notification,setNotification] = useState(false)
const [showChat,setShowChat] = useState(false)
const [bugNotification,setBugNotification] = useState(false)
const [lastMessage,setLastMessage] = useState("")


const socket =io("http://192.168.178.33:2020/")
// const socket =io("https://makefriendsapp.herokuapp.com/")

// async function notificationMessage  () {
//  const sing = await setChatModalVisible(true)
//   if(!chatModalVisible){
//     console.log("test",chatModalVisible);
    
//    setNotification(true)
//   }
// }

useEffect(() => {

  
 if(bugNotification){
  if(!chatModalVisible){
   setNotification(true)
  }
 }
},[allChat])
console.log("last",lastMessage);
useEffect(() => {

  
    
 console.log("chatModalVisible:",chatModalVisible);
 
    
    socket.on("recieved_message",(data)=>{
      
      
        
           const msg={
            _id: uuid.v4(),
             text: data.message[0].text,
             createdAt: new Date(),
             user: {
               _id: 2,
               name: data.token.userName,
               avatar: `data:image/png;base64,${data.token.img}`,
             },
           }
          
           
            console.log(data);
            
          
      setLastMessage(data.token.userObjId)
      setAllChat((list) =>[...list,msg])
      allChat.sort((a:any,b:any)=>b.createdAt - a.createdAt)
      setBugNotification(true)
      
      
        })

  socket.off("users").on("users", users => {
     console.log("User",users);
    setAllUsers(users)
    
  });

  socket.on("connected", user => {
  setSocketId(user)
   
   
  });

  socket.on("disconnected", id => {
    console.log("DC",id);
    
  });
}, [socket]);






  return (
    <View style={styles.container}>
      <Token.Provider value={{token,setToken}}>
      <allInfosUser.Provider value={{userInfos,setUserInfos}}>
      <userInfo.Provider value={{info,setInfo}}>
       
          
        <NativeRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/map" element={<MapViews
            lastMessage={{lastMessage,setLastMessage}}
            chatModalVisible={{chatModalVisible, setChatModalVisible}}
            showChat={{showChat,setShowChat}}
            notification={{notification,setNotification}} chatMsgState={{allChat,setAllChat}} socket={socket} socketId={socketId} allUsers={{allUsers,setAllUsers}}/>}/>
            <Route path="/userSettings" element={<UsersSettings/>}/>
            <Route path="/registerA" element={<RegisterA Image={{img,setImg}}/>}/>
            <Route path="/registerInfos" element={<RegisterInfos infos={{age,setAge,hobby,setHobby,desc,setDesc}}/>}/>
            <Route path="/registerB" element={<RegisterB infos={{age,setAge,hobby,setHobby,desc,setDesc, img,setImg}}/>}/>
            <Route path="/login" element={<Login socket={socket}/>}/>
            <Route path="/changeInfos" element={<ChangeInfos/>}/>
            


          </Routes>

        </NativeRouter>
        
     
      </userInfo.Provider>
      </allInfosUser.Provider>
      </Token.Provider>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  infos:{
    width: "100%",
    height: 150,
    backgroundColor: 'white',
    textAlign: 'center',
    flexDirection:"row"
  },
  infosText:{
    flexDirection:"column"
  },
  userImg:{
    width: 80,
    height: 80,
    borderRadius:80
  },
  button:{width: 150, height: 50}
});

export {userInfo,Token,allInfosUser}

