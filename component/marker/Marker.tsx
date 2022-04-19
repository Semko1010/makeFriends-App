import MapView, { Marker,Callout} from "react-native-maps";
import { StyleSheet, Text, View ,Dimensions,Image, Button} from 'react-native'
import React, {useState,useEffect,useContext} from 'react'
import {userInfo} from "../../App"


interface Props {
  img:string
  latitude:number,
  longitude:number,
  name:string
  age:number
}
const Markers = (props:Props) => {

    const {info,setInfo} = useContext(userInfo)
    
   const eachInfoOfUser = () =>{
    
    setInfo(props)
     
   }
   
   
   
   
    return(
       
           
        <Marker
        onPress={eachInfoOfUser}
        coordinate={{
	      latitude: props.latitude,
		    longitude: props.longitude,
        }}
        title={props.name}
        description="Semko">
        <View >
               <Image
							style={styles.userImg}
							source={{
								uri: props.img,
							}}
					    />
           </View>
        </Marker>
       
       
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    userImg:{
      width: 80,
      height: 80,
      borderRadius:80
    },
    button:{width: 150, height: 50}
  });
  
  
export default Markers