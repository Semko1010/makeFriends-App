//Modules
import React, { useContext, useState } from "react";
import { View,TextInput,Text,StyleSheet, Button } from "react-native";
import Axios from "axios";
import { useNavigate } from "react-router";
//Imports

// import {userImage} from "../../App"
// type userImage={
//     Image:{
//         img:string,
//         setImg: React.Dispatch<React.SetStateAction<string>>
//     }
// }
type infosUser={
	infos:{
		age:string | undefined,
		setAge:React.Dispatch<React.SetStateAction<string | undefined>>,
		hobby:string | undefined,
		setHobby:React.Dispatch<React.SetStateAction<string | undefined>>,
		desc:string | undefined,
		setDesc:React.Dispatch<React.SetStateAction<string | undefined>>
		img:string | undefined,
		setImg:React.Dispatch<React.SetStateAction<string | undefined>>
	}
	
}
const RegisterB = (props:infosUser) =>{
    // const { img,setImg } = useContext(userImage);
    const [userName, setUsername] = useState<string | undefined>("")
    const [email, setEmail] = useState<string | undefined>("")
    const [password, setPassword] = useState<string | undefined>("")
    const [verify, setVerify] = useState<boolean>(false);
    const user = { userName, email, password ,verify, props};
	const navigate = useNavigate();
    
    async function register() {
		
        
	
		const URL = "https://friendserver.onrender.com/api/friend/users/register";
		
		// if (userName.length >= 3 && email.includes("@") && password.length >= 6) {
			try {
				const fetch = await Axios.post(URL, user);
				
				
				if(fetch.data.userCreated){
					navigate("/login");
				}
				
			} catch (err) {
				console.log(err);
			}
		// } else {
			
		// }
	}





    return(
        <View>

<View style={styles.linkContainer}>
				<TextInput
					style={styles.linkView}
					onChangeText={e => setUsername(e)}
					placeholder='Username'
					placeholderTextColor='black'
					
					
				/>

				<TextInput
					onChangeText={e => setEmail(e)}
					style={styles.linkView}
					placeholder='Email'
					placeholderTextColor='black'
					
					
				/>

				<TextInput
					onChangeText={e => setPassword(e)}
					style={styles.linkView}
					placeholder='Passwort'
					placeholderTextColor='black'
					
			
					
				/>
                <Button onPress={register} title="Registrieren"></Button>
			</View>
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
export default RegisterB