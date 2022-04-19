//Modules
import React, {useState,useEffect,useContext} from 'react'
import { StyleSheet, Text, View ,Dimensions,Image, Button,ActivityIndicator} from 'react-native'
import MapView, { Marker,Callout} from "react-native-maps";
import * as Location from 'expo-location';

import axios from 'axios';
//Imports
import Api from "../../component/api/Api.json"
import {userInfo} from "../../App"
import Markers from "../marker/Marker"

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
    const [ loading, setLoading] = useState<boolean>(true)
    
   
async function test (){
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  setLocation(location.coords);
  console.log(location);
  

}




      useEffect(() => {
        
        (async () => {
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


    
    

        
          
          setLoading(false)
          
          
          
        })();
      }, []);



    return(
        <View style={styles.container}>
          {loading&&(
            <ActivityIndicator size="large" color="#00ff00" />
          )}
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
        showsCompass={true}
        showsUserLocation={true}
        
        // onUserLocationChange={()=>console.log({ coordinate: Location })}
				provider='google'>
			

        
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
    
    <View style={styles.infos}>
      <View style={styles.infosText}> 
            <Text>Name: {info.name}</Text>
            <Text>Alter: {info.age}</Text>
            <Text>{location.latitude}</Text>
            <Text>{location.latitude}</Text>
            </View>
        <View style={styles.button}>
            <Button 
      
            onPress={test}
            title="Nachricht senden"
            />
        </View>

    </View>
    
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