import React, {useState,useEffect,useContext} from 'react'
import { StyleSheet, Text, View ,Dimensions,Image, Button} from 'react-native'
import MapView, { Marker,Callout} from "react-native-maps";
import * as Location from 'expo-location';
import Markers from "../marker/Marker"

import {userInfo} from "../../App"
import axios from 'axios';
const MapViews = () =>{
  interface InterFaceInfos{
    age:number,
    img:string,
    latitude: number,
    longitude: number,
    name:string
    
    }

    type coordinates ={
        longitude: number;
        latitude: number
} 
    const [location, setLocation] = useState<coordinates | undefined>();
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [ infos, setInfos] = useState<boolean>(true)
    const [userInfos, setUserInfos] = useState<InterFaceInfos[]>([])
    const {info,setInfo} = useContext(userInfo)
    
   

      useEffect(() => {
        
        (async () => {
    const URL = "http://10.0.2.2:2020/api/friend/users/userInfo"
    const fetchInfos = await axios.get(URL)
    const setInfosUsers = await setUserInfos(fetchInfos.data)
    console.log("Semir",userInfos);

        let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location.coords);
          
          
        })();
      }, []);


    return(
        <View style={styles.container}>
     {location   &&(
       <View>
         
     <MapView
				style={styles.map}
				initialRegion={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				provider='google'>
				
        {/* <MarkerFetch/> */}

        
        {userInfos.map(e => 
        
        
    <Markers
    latitude={e.latitude}
    longitude={e.longitude}
    name={e.name}
    img={e.img}
    age={e.age}
    />
    
  )}
    </MapView>

    {/* INFO VIEW*/}
    {infos &&(
    <View style={styles.infos}>
      <View style={styles.infosText}> 
            <Text>Name: {info.name}</Text>
            <Text>Alter: {info.age}</Text>
            <Text>32 Jahre</Text>
            </View>
        <View style={styles.button}>
            <Button 
      
            onPress={() => alert("Tesxt")}
            title="Nachricht senden"
            />
        </View>

    </View>
    )}
      </View>
     )}
     
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
  

export default MapViews