import MapView, { Marker,Callout} from "react-native-maps";
import { StyleSheet, Text, View ,Dimensions,Image, Button} from 'react-native'
import React, {useState,useEffect,useContext} from 'react'
import {userInfo} from "../../App"


interface Props {
  img:string
  latitude:number,
  longitude:number,
  userName:string
  age:number
  hobby :string
  desc:string
  userObjId:string
  showChat:{

    setShowChat:React.Dispatch<React.SetStateAction<boolean>>
  }
}
const Markers = (props:Props) => {

    const {info,setInfo} = useContext(userInfo)
    
   const eachInfoOfUser = () =>{
    
    setInfo(props)
     props.showChat.setShowChat(true)
   }
   
 
   
   
   
    return(
       
        <>
        {/* @ts-ignore  */}
        <Marker
        tracksViewChanges={false}
        onPress={eachInfoOfUser}
        coordinate={{
	      latitude: props.latitude,
		    longitude: props.longitude,
        }}
        title={props.userName}
        description="Semko">
        <View >
               <Image
							style={styles.userImg}
							source={{
								uri: `data:image/png;base64,${props.img}`,
							}}
					    />
              
              
           </View>
          
        </Marker>
       </>
       
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