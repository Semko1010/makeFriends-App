
import DatePicker from 'react-native-datepicker'
import React, { useState } from 'react'
import {TextInput, View, StyleSheet, Text, Button} from 'react-native'
import { Link } from 'react-router-native'
import RegisterB from "./RegisterB"
const RegisterInfos = () =>{
const [age,  setAge] =   useState<string>()
const [hoby, setHoby] = useState<string>()
const [desc, setDesc] = useState<string>()
console.log(age);

    return(
        <View style={styles.linkContainer}>
            
        {/* @ts-ignore  */}    
        <DatePicker
					date={age}
					mode='date'
					placeholder='Datum'
					format='DD.MM.YYYY'
					minDate='01-01-1900'
					maxDate='01-01-2100'
					confirmBtnText='Bestätigen'
					cancelBtnText='Abbrechen'
					customStyles={{
						dateIcon: {},
						dateInput: {
							borderColor: "gray",
							alignItems: "center",
							borderWidth: 0,
							borderBottomWidth: 1,
						},
						placeholderText: {
							fontSize: 17,
							color: "gray",
						},
						dateText: {
							fontSize: 17,
							color: "black",
							textAlign: "center",
						},
					}}
                    
					onDateChange={(date: React.SetStateAction<string | undefined>) => {
						setAge(date);
					}}
				/>
      

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