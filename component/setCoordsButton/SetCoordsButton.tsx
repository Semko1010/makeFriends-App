import {useContext, useEffect, useState} from "react"
import { Button, View } from "react-native"
import Axios from "axios"
//Imports
import {Token,allInfosUser} from "../../App"
import axios from "axios"

type coordinates ={
    location:{
        longitude: number,
        latitude: number,
            // accuracy: number,
            // altitude: number
            // altitudeAccuracy: number
            // heading: number
            // speed: number
       
    }
    call:() =>{}
    
} 








const SetCoordsButton = (props:coordinates) =>{
    const { token, setToken} = useContext(Token)
    const [gpsButton, setGpsButton] = useState<boolean>(true)
    const {userInfos, setUserInfos} = useContext(allInfosUser)
    

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

// useEffect(() => {
//         console.log("dsad");
        
//     (async () => {
//         const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/userInfo"  
//         const fetchInfos = await axios.get(URL)
//         const setinfo = await setGpsLocationInfos(fetchInfos.data)
        

//     })();
//   }, []);

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
    props.call()
},[gpsButton])


    return(
        <View>
            {gpsButton ?(
            <Button onPress={setLocationUser}title="setGps"></Button>
            ):(
            <Button onPress={deleteLocationUser}title="DeleteGps"></Button>
            )}
        </View>
    )
}


export default  SetCoordsButton