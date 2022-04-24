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

interface user{
 
    img:string
    latitude:number,
    longitude:number,
    userName:string
    age:number
    hobby:string
  
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
}
type setToken={
  token:tokenInfos
  setToken:React.Dispatch<React.SetStateAction<tokenInfos>>
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
const [ info, setInfo] = useState<user>({} as user)
const [ token, setToken] = useState<tokenInfos>({} as tokenInfos)
const [ img, setImg] = useState("")
const [userInfos, setUserInfos] = useState<InterFaceInfos[]>([])
 
console.log();




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
            <Route path="/registerInfos" element={<RegisterInfos/>}/>
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

// import React, { useState } from 'react';
// import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={styles.centeredView}>
//       <Modal
     
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}>
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//       <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
    
//   },
//   modalView: {
//     height:"100%",
//     width:"100%",
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

// export default App;