import {useContext, useEffect, useState} from "react"
import { Button, View } from "react-native"
import Axios from "axios"
//Imports
import {Token} from "../../App"
import axios from "axios"
type coordinates ={
    location:{
        location:{
            longitude: number,
            latitude: number,
            accuracy: number,
            altitude: number
            altitudeAccuracy: number
            heading: number
            speed: number
        }
       userInfos:{
           
       }
    }
    
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





const SetCoordsButton = (props:coordinates) =>{
    const { token, setToken} = useContext(Token)
    const [gpsLocationInfos,setGpsLocationInfos] = useState<tokenInfos[] | undefined>([])
    const [gpsButton, setGpsButton] = useState<boolean>(true)

  
const userLocationinfos={
    latitude:props.location.location.latitude,
    longitude:props.location.location.longitude,
    userName:token.userName,
    age:token.age,
    hobby:token.hobby,
    img:token.img,
    token:token.token,
    userObjId:token.userObjId
    
}

useEffect(() => {
        
    (async () => {
        const URL = "http://10.0.2.2:2020/api/friend/users/userInfo"  
        const fetchInfos = await axios.get(URL)
        const setinfo = await setGpsLocationInfos(fetchInfos.data)
        

    })();
  }, []);

async function setLocation() {
		
    // const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/userInfo"  
    const URL = "http://10.0.2.2:2020/api/friend/users/userInfo"  
    const URLPost = "http://10.0.2.2:2020/api/friend/users/userLocation";
    const URLRemove = "http://10.0.2.2:2020/api/friend/users/deleteLocation";
    const fetchInfos = await axios.get(URL)
    const setInfosUsers = await setGpsLocationInfos(fetchInfos.data)
    
    
    
    const map = await gpsLocationInfos.map(e =>{
        
        if(e.userObjId==token.userObjId){
         axios.post(URLRemove,e )  
        console.log("fdsad");
         
        }
        else{
            axios.post(URLPost, userLocationinfos)   
            .then(response=>{
                console.log(response);
                
            })
            console.log("asfs");
            
        }
        
        
        
    })
       
}
async function setLocationUser () {
    const URLPost = "http://10.0.2.2:2020/api/friend/users/userLocation";
    const URL = "http://10.0.2.2:2020/api/friend/users/userInfo"  
    const fetchInfos = await axios.get(URL)
    const setInfosUsers = await setGpsLocationInfos(fetchInfos.data)
    const setPosition = await axios.post(URLPost, userLocationinfos)
    if(setPosition.data.locationSet){
        setGpsButton(false)
    }
    

}
async function deleteLocationUser () {
    const URLRemove = "http://10.0.2.2:2020/api/friend/users/deleteLocation";
    const URL = "http://10.0.2.2:2020/api/friend/users/userInfo"  
    const fetchInfos = await axios.get(URL)
    const setInfosUsers = await setGpsLocationInfos(fetchInfos.data)
    const setPosition = await axios.post(URLRemove,token)
    
    console.log(token.userObjId);
    

}

   


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