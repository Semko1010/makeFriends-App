//Modules
import React, {useState,useEffect,useContext} from 'react'
import { StyleSheet, Text, View ,Dimensions,Image, Button,ActivityIndicator} from 'react-native'
import MapView, { Marker,Callout} from "react-native-maps";
import * as Location from 'expo-location';

import axios from 'axios';
//Imports
import Api from "../../component/api/Api.json"
import {userInfo,Token,allInfosUser} from "../../App"
import Markers from "../marker/Marker"
import SetCoordsButton from "../setCoordsButton/SetCoordsButton"

import { Link } from 'react-router-native';
const MapViews = () =>{
  interface InterFaceInfos{
    age:number,
    img:string,
    latitude: number,
    longitude: number,
    userName:string
    hobby:string,
    verifyUser:boolean,

    }

    type coordinates ={
        longitude: number,
        latitude: number,
        
        // accuracy: number,
        // altitude: number
        // altitudeAccuracy: number
        // heading: number
        // speed: number
} 
    const [location, setLocation] = useState<coordinates | undefined>();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [ infos, setInfos] = useState<boolean>(true)
    const {userInfos, setUserInfos} = useContext(allInfosUser)
  
    const {info,setInfo} = useContext(userInfo)
    const [ loading, setLoading] = useState<boolean>(true)
    const [ calling, setCalling] = useState<boolean>(true)
    
    const { token, setToken} = useContext(Token)


async function test (){
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

          // const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/userInfo"
          const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/userInfo"
          const fetchInfos = await axios.get(URL)
          const setInfosUsers = await setUserInfos(fetchInfos.data)
         

          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          const setLoc = await setLocation(location.coords);
          console.log("Semiraga", location);
          
          setLoading(false)
          
          
          
        })();
      }, []);


async function call  () {
  
  
  const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/userInfo"
 const fetchInfos = await axios.get(URL)
  const setInfosUsers = await setUserInfos(fetchInfos.data)
  
}



    return(
        <View style={styles.container}>
          {loading&&(
            <ActivityIndicator size="large" color="#00ff00" />
          )}
     {location   &&(
       <View style={styles.container}>
         <View style={styles.menu}>
      
        <View style={styles.button}>
          <Link to="/">
            <Text>Back</Text>
          </Link>
            
        </View>
        <View style={styles.button}>
            <Button 
      
            onPress={test}
            title="Menü"
            />
        </View>
    
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
			

        
        {userInfos.map(e => 
        
        
    <Markers
    latitude={e.latitude}
    longitude={e.longitude}
    userName={e.userName}
    img={e.img}
    age={e.age}
    hobby={e.hobby}

    />
    
  )}
 
    </MapView>

    {/* INFO VIEW*/}
    
    <View style={styles.infos}>
      <View style={styles.infosText}> 
            <Text>Name: {info.userName}</Text>
            <Text>Alter: {info.age}</Text>
            <Text>Hobbys: {info.hobby}</Text>
            <Text>da{calling}</Text>
            </View>
        <View style={styles.button}>
            <Button 
      
            onPress={call}
            title="Nachricht senden"
            />
        </View>
    <SetCoordsButton
    location={location}
    call={call}
    />
    </View>
    
  </View>
     )}
     
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      justifyContent: 'space-evenly',
    },
    menu:{
      
      
      flexDirection:"row",
      justifyContent: 'center',
      
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
      width: 80,
      height: 80,
      borderRadius:80
    },
    button:{width: 150, height: 50}
  });
  

export default MapViews