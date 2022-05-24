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

interface user{
 
    img:string
    latitude:number,
    longitude:number,
    userName:string
    age:number
    hobby:string
    desc:string
  
}

const SetCoordsButton = (props:coordinates) =>{
    const { token, setToken} = useContext(Token)
    const [gpsButton, setGpsButton] = useState<boolean>(true)
    const {userInfos, setUserInfos} = useContext(allInfosUser)
    const [userData,setUserData] = useState<user | undefined>()
    const userToken = token.token
    const userObjId = token.userObjId

    const userLocationinfos={
        latitude:props.location.latitude,
        longitude:props.location.longitude,
        userName:userData?.userName,
        age:userData?.age,
        hobby:userData?.hobby,
        img:userData?.img,
        desc:userData?.desc,
        token:token.token,
        userObjId:token.userObjId,
        
    }



    useEffect(() => {
        
        
        (async () => {

        const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/loggedUserInfo"
        const fetchLoggedUser = await Axios.get(URL,{headers:{userToken,userObjId}})  
        const setUsr = await setUserData(fetchLoggedUser.data)  
        })();
    },[])

    useEffect(() => {
        
        
        (async () => {
    
        const refreshMap = await props.call.mapRefresh()        
            
        })();
        
    },[gpsButton])

    useEffect(() => {
        userInfos.find(item =>{
        if(item.userObjId == token.userObjId){
        setGpsButton(false)
        
        }
        
        
    })
    },[userInfos])
    

async function setLocationUser () {
    const wa = await props.call.currentGps()
    const URLPost = "https://makefriendsapp.herokuapp.com/api/friend/users/userLocation";
    const setPosition = await axios.post(URLPost, userLocationinfos)
    const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/gpsLocation"
    const fetchInfos = await axios.get(URL,{headers:{userToken}})
    const setInfosUsers = await setUserInfos(fetchInfos.data)

    if(setPosition.data.locationSet){
        
        
 
        setGpsButton(false)
        
    }
    
    
    
}
async function deleteLocationUser () {
    const URLRemove = "https://makefriendsapp.herokuapp.com/api/friend/users/deleteLocation";
    const setPosition = await axios.post(URLRemove,token)
    const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/gpsLocation"
    const fetchInfos = await axios.get(URL,{headers:{userToken}})
    const setInfosUsers = await setUserInfos(fetchInfos.data)

    if(setPosition.data.locationRemoved){
        props.socket.on("connect", () => {
            props.socket.emit("username", "dd");
                })
        setGpsButton(true)
        
    }
    
}



    return(
        <View>
            {gpsButton ?(
                <TouchableOpacity
                onPress={setLocationUser}>
                <Image
                style={{width:60, height:60,marginRight:10}}
                source={require("../../assets/img/gps.png")}
            />
             </TouchableOpacity>
           ):(
           
            <TouchableOpacity
            onPress={deleteLocationUser}
                >
            <Image
            style={{width:60, height:60}}
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

