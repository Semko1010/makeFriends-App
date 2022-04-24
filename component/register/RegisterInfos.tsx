

import React, { useState } from 'react'
import {TextInput, View, StyleSheet, Text, Button} from 'react-native'
import { Link } from 'react-router-native'

const RegisterInfos = () =>{
const [age,  setAge] =   useState<string>()
const [hoby, setHoby] = useState<string>()
const [desc, setDesc] = useState<string>()

    return(
        <View style={styles.linkContainer}>	
        
      

        <TextInput
            onChangeText={e => setHoby(e)}
            style={styles.linkView}
            placeholder='Hobbys'
            placeholderTextColor='black'
            
            
        />

        <TextInput
            onChangeText={e => setDesc(e)}
            style={styles.linkView}
            placeholder='Beschreibung'
            placeholderTextColor='black'
            
    
            
        />
        <Link underlayColor={"transparent"} to='/registerB'>
			<Text>Weiter</Text>
        </Link>
    </View>
    )
}


const styles = StyleSheet.create({
	
	linkView: {
		margin: 10,
		alignItems: "center",
		textAlign: "center",
		width: 300,
		height: 40,
		backgroundColor: "#fffaf0",
	},
	linkContainer: {
		alignItems: "center",
		marginBottom: 50,
	},
});
export default RegisterInfos