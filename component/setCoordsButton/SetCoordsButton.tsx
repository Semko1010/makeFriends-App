import {useContext, useEffect, useState} from "react"
import { Button, View ,Image,TouchableOpacity,StyleSheet,Text} from "react-native"
import Axios from "axios"
//Imports
import {Token,allInfosUser} from "../../App"
import axios from "axios"

type coordinates ={
    location:{
        longitude: number,
        latitude: number,
            
       
    }
    call:{
        mapRefresh:() =>{}
        currentGps:() =>{}
    }
   
} 








const SetCoordsButton = (props:coordinates) =>{
    const { token, setToken} = useContext(Token)
    const [gpsButton, setGpsButton] = useState<boolean>(true)
    const {userInfos, setUserInfos} = useContext(allInfosUser)
    const [location, setLocation] = useState<coordinates | undefined>();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const userToken = token.token

const userLocationinfos={
    latitude:props.location.latitude,
    longitude:props.location.longitude,
    userName:token.userName,
    age:token.age,
    hobby:token.hobby,
    img:token.img,
    token:token.token,
    userObjId:token.userObjId
    
}



  useEffect(() => {
      
      
      userInfos.find(item =>{
        if(item.userObjId==token.userObjId){
            setGpsButton(false)

        }else{
            setGpsButton(true)
            
        }
        
    })
  },[userInfos])

async function setLocationUser () {


    const wa = await props.call.currentGps()
    const URLPost = "https://makefriendsapp.herokuapp.com/api/friend/users/userLocation";
    const setPosition = await axios.post(URLPost, userLocationinfos)
    if(setPosition.data.locationSet){
        setGpsButton(false)
  
    }
    
    
    
}
async function deleteLocationUser () {
    const URLRemove = "https://makefriendsapp.herokuapp.com/api/friend/users/deleteLocation";
    const setPosition = await axios.post(URLRemove,token)
    if(setPosition.data.locationRemoved){
        setGpsButton(true)
        
    }
    
}

useEffect(() => {
   
   
    (async () => {

        const refreshMap = await props.call.mapRefresh()        
        const refreshMapa = await props.call.mapRefresh()        
        
        
      })();
    
},[gpsButton])


    return(
        <View>
            {gpsButton ?(
                <TouchableOpacity
                onPress={setLocationUser}>
                <Image
                style={{width:50, height:50}}
                source={require("../../assets/img/gps.png")}
            />
             </TouchableOpacity>
           ):(
           
            <TouchableOpacity
            onPress={deleteLocationUser}
                >
            <Image
            style={{width:50, height:50}}
            source={require("../../assets/img/location.png")}
            />
             </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    setLocationButton:{
        width:50,
        height:50, 
        backgroundColor:"green",
        borderRadius:50,
        justifyContent: 'center',
        alignItems: 'center',
        color:"white"
    },
    RemoveLocationButton:{
        width:50,
        height:50, 
        backgroundColor:"red",
        borderRadius:50,
        justifyContent: 'center',
        alignItems: 'center',
        color:"white"
    }

})
export default  SetCoordsButton

