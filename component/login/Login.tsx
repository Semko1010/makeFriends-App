//modules
import React, { useState ,useContext} from "react"
import { View ,TextInput,StyleSheet, Button,ActivityIndicator } from "react-native"
import Axios from "axios";
import { Link, useNavigate } from "react-router-native";
//imports
import {Token} from "../../App"

type semir={
	value:{
		img:string
		setImg:React.Dispatch<React.SetStateAction<string>>
	}
}

const Login = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [ loading, setLoading] = useState<boolean>(false)
	const { token, setToken} = useContext(Token)
    const user = { email, password};
	
	

    async function login() {
		
       
		
		// const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/login";
		const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/login";
		
		setLoading(true)
			try {
				const fetch = await Axios.post(URL, user);
				console.log("WSdad",fetch.data);
				
				if(fetch.data.token){
					if(fetch.data.verifyUser){
						setToken(fetch.data);
						setLoading(false)
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
		{loading&&(
            <ActivityIndicator size="large" color="#00ff00" />
          )}
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