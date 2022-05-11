import React, { useContext, useState } from "react"
import { Button, View, TextInput } from "react-native"
import Axios from "axios"

//Imports

import {Token} from "../../App"



const ChangeInfos = () =>{
    const { token, setToken} = useContext(Token)
    const [userName, setUnserName] = useState<string>()
    const [hobby, setHobby] = useState<string>()
    const [desc, setDesc] = useState<string>()
    const userToken = token.token
    const user={
        userName,
        hobby, 
        desc
    }
    



    async function changeUserInfos(){
    const URL = "http://10.0.2.2:2020/api/friend/users/changeUserInfos"   
    const postInfos = await Axios.post(URL,user,{headers:{userToken}})
    console.log(postInfos);
    

    }
    return (
        <View>
            <TextInput 
            onChangeText={e => setUnserName(e)}
            placeholder="Username" />

            <TextInput 
            onChangeText={e => setHobby(e)}
            placeholder="Hobbys" />

            <TextInput 
            onChangeText={e => setDesc(e)}
            placeholder="Beschreibung" />
            
            
            <Button onPress={changeUserInfos} title="Speichern"/>
        </View>
    )

}


export default ChangeInfos