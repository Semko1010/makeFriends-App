import React, {useState,useContext}from "react"
import { View ,Button,Text} from "react-native"
import {userImage} from "../../App"
import * as ImagePicker from "expo-image-picker";
import { Link } from "react-router-native";




const RegisterA = ()=>{
    const { img,setImg } = useContext(userImage);
    console.log(img);
    

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
    
        setImg(result.base64);
    };
    
    const pickCamera = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
    
        setImg(result.base64);
    };

    return(
        <View>
<Button onPress={pickImage} title="pickImage"></Button>

<Button onPress={pickCamera} title="pickCamera"></Button>

<Link underlayColor={"transparent"} to='/registerB'>
					<Text>Weiter</Text>
</Link>
        </View>
    )
}

export default RegisterA