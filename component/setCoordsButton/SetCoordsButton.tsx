import React from "react"
import { Button, View } from "react-native"

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
            age: 6
            img: string
            latitude: number
            longitude: number
            name: string
            _id: string
        }
    }
    
} 






const SetCoordsButton = (props:coordinates) =>{
    


    const test = () => {
        console.log("test",props.location.location.latitude,props.location.location.longitude);
        console.log();
        props.location.userInfos.map(e => console.log(e)
        )
    }


    return(
        <View>
            <Button onPress={test}title="Button"></Button>
        </View>
    )
}


export default  SetCoordsButton