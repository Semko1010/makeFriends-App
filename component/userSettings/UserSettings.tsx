//Modules
import React, { useContext, useEffect, useState } from "react"
import { View, Text ,StyleSheet,Image, TouchableOpacity, Dimensions, Button} from "react-native"
import { Link } from "react-router-native"
import Axios from "axios" 

//imports

import {Token} from "../../App"
import ModalMenu from "../modalMenu/ModalMenu"
import ButtonChangeInfos from "./ChangeInfos"
interface user{
 
    img:string
    latitude:number,
    longitude:number,
    userName:string
    age:number
    hobby:string
    desc:string
  
}

const UserSettings = ()  =>{
    const { token, setToken} = useContext(Token)
    const [userData,setUserData] = useState<user | undefined>()
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const userToken = token.token
    const userObjId = token.userObjId
    
    
    useEffect(() => {
        (async () => {
        // const URL = "http://10.0.2.2:2020/api/friend/users/loggedUserInfo"
        const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/loggedUserInfo"
        const fetchLoggedUser = await Axios.get(URL,{headers:{userToken,userObjId}})  
        const setUsr = await setUserData(fetchLoggedUser.data)  
        
           
            
            
          })();
    },[])



    return (
    <View style={styles.container}>
        <View style={styles.menuButton}>
      
      <TouchableOpacity
          onPress={() => setModalVisible(true)}
              >
          <Image
          style={{width:35, height:35,marginLeft:15}}
          source={require("../../assets/img/menu.png")}
          />
      </TouchableOpacity>
      </View>
        <ModalMenu 
        modalValue={{modalVisible,setModalVisible}}
        />
        <Image
        style={styles.userImg}
        source={{uri: `data:image/png;base64,${userData?.img}`,
        }}
        />
        <View style={styles.infoView}>
        <View>
        <Text>Email:{userData?.userName}</Text>
        
        </View>
        <View>
        <Text>Alter: {userData?.age}</Text>
        
        </View>
        <View>
        <Text>Username: {userData?.userName}</Text>
        
        </View>
        <View>
        <Text>Hobbys: {userData?.hobby}</Text>
        
        </View>
        </View>
        
        <Link to="/changeInfos">
        <Text>Infos bearbeiten</Text>
        </Link>
        <Link to="/map">
        <Text>Back to Map</Text>
        </Link>
    </View>
    
    )
}

const styles = StyleSheet.create({
   
    userImg:{
      width: 110,
      height: 100,
      borderRadius:80
    },
    container:{
        
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoView:{
        alignItems: "center",
        justifyContent: 'space-evenly',
        height: "50%"
    },
    menuButton:{
        height:50,
        width:50,
      },
  });
  
export default UserSettings