//Modules
import React, {useState,useEffect,createContext} from 'react'
import { StyleSheet, View ,Dimensions,Text} from 'react-native'
import { NativeRouter, Route, Link, Routes } from "react-router-native";
//Components
import MapViews from "./component/mapViews/MapViews"
import Home from "./component/home/Home"
import RegisterA from "./component/register/RegisterA"
import RegisterB from "./component/register/RegisterB"
import Login from "./component/login/Login"

interface user{
 
    img:string
    latitude:number,
    longitude:number,
    userName:string
    age:number
    hobby:string
  
}

type settName = {
  info: user[],
  setInfo:React.Dispatch<React.SetStateAction<user[]>>
}
interface tokenInfos{
 age:number,
 hobby:string,
 img:string,
 token:string,
 userName:string,
 userObjId:string,
 verifyUser:boolean
}
type setToken={
  token:tokenInfos[]
  setToken:React.Dispatch<React.SetStateAction<tokenInfos[]>>
}

type userImg={
  img:string;
  setImg:React.Dispatch<React.SetStateAction<string>>
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
  }

  type setAllUserinfo={
    userInfos:InterFaceInfos[]
    setUserInfos:React.Dispatch<React.SetStateAction<InterFaceInfos[]>>
  }


const userInfo = createContext<settName>({} as settName)
const Token = createContext<setToken>({} as setToken)
const userImage = createContext<userImg>({} as userImg)
const allInfosUser = createContext({} as setAllUserinfo)

export default function App() {
const [ info, setInfo] = useState<user[]>([])
const [ token, setToken] = useState<tokenInfos[]>([])
const [ img, setImg] = useState("")
const [userInfos, setUserInfos] = useState<InterFaceInfos[]>([])
 
console.log(token.img);



  return (
    <View style={styles.container}>
      <Token.Provider value={{token,setToken}}>
        <allInfosUser.Provider value={{userInfos,setUserInfos}}>
      <userInfo.Provider value={{info,setInfo}}>
        <userImage.Provider value={{img,setImg}}>
          
        <NativeRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/map" element={<MapViews/>}/>
            <Route path="/registerA" element={<RegisterA/>}/>
            <Route path="/registerB" element={<RegisterB/>}/>
            <Route path="/login" element={<Login/>}/>


          </Routes>

        </NativeRouter>
        
      </userImage.Provider>
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

export {userInfo,userImage,Token,allInfosUser}