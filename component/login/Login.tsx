//modules
import React, { useState ,useContext} from "react"
import { View ,TextInput,StyleSheet, Button } from "react-native"
import Axios from "axios";
import { Link, useNavigate } from "react-router-native";
//imports
import {Token} from "../../App"
const Login = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { token, setToken} = useContext(Token)
    const user = { email, password };

    async function login() {
		
        
		const URL = "http://10.0.2.2:2020/api/friend/users/login";
		
		
			try {
				const fetch = await Axios.post(URL, user);
				console.log("WSdad",fetch.data);
				
				if(fetch.data.token){
					if(fetch.data.verifyUser){
						setToken(fetch.data);
						navigate("/map")
					}else{
						console.log("Pleaser Verify Account");
						
					}
                
                }
				
			} catch (err) {
				console.log(err);
			}
		
	}

    return(
        <View>
        <View style={styles.linkView}>

					<TextInput
						onChangeText={e => setEmail(e)}
						style={styles.textInput}
						placeholder='Email'
						placeholderTextColor='black'
						
					/>
				</View>
				<View style={styles.linkView}>
					<TextInput
						onChangeText={e => setPassword(e)}
						style={styles.textInput}
						placeholder='Password'
						placeholderTextColor='black'
						
					/>
				</View>
                <Button onPress={login} title='Login'></Button>
        </View>
    )
}
const styles = StyleSheet.create({
	
	textInput: {
		margin: 5,
		textAlign: "center",
		padding: 3,
		color: "black",
	},
	
	linkContainer: {
		marginBottom: 100,
		alignItems: "center",
	},
	linkView: {
		margin: 10,
		textAlign: "center",
		width: 300,
		height: 40,
		backgroundColor: "#fffaf0",
		color: "black",
	},
	
});
export default Login