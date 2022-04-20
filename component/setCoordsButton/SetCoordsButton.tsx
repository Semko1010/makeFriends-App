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
    const [gpsLocationInfos,setGpsLocationInfos] = useState<tokenInfos[] | undefined>()
    console.log("dsad",props.location.userInfos);
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
      const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/userInfo"
      const fetchInfos = await axios.get(URL)
      const setInfosUsers = await setGpsLocationInfos(fetchInfos.data)
    

    })();
  }, []);

async function setLocation() {
		
        
    const URL = "http://10.0.2.2:2020/api/friend/users/userLocation";
    const URLRemove = "http://10.0.2.2:2020/api/friend/users/deleteLocation";
    
    gpsLocationInfos.map(e =>{
        if(e.userObjId==token.userObjId){
         axios.post(URLRemove,e )   
            
        }
        else{
            axios.post(URL, userLocationinfos)   
            .then(response=>{
                console.log(response);
                
            })
        }
        
        
        
    })
        // try {
        //     const fetch = await Axios.post(URL, userLocationinfos);
        //     console.log(fetch);
            
            
           
            
        // } catch (err) {
        //     console.log(err);
        // }
    
}

    const test = () => {
        console.log("test",userLocationinfos);
        
        
    }


    return(
        <View>
            <Button onPress={setLocation}title="Button"></Button>
        </View>
    )
}


export default  SetCoordsButton