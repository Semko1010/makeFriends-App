// //modules

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

const Login = (props:any) =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [ loading, setLoading] = useState<boolean>(false)
	const { token, setToken} = useContext(Token)
    const user = { email, password};
	
	

    async function login() {
		
    
	   
		
		
		
		// const URL = "http://localhost:2020/api/friend/users/login";
		const URL = "https://friendserver.onrender.com/api/friend/users/login";
		
		setLoading(true)
			try {
				const fetch = await Axios.post(URL, user);
			
				console.log(fetch);
				
				if(fetch.data.token){
					if(fetch.data.verifyUser){
						setToken(fetch.data);
						setLoading(false)
						navigate("/map")
						// props.socket.emit("join_room",fetch.data.userObjId) 
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



// import React, { useState, useContext, useEffect } from "react";
// import {
// 	View,
// 	TextInput,
// 	StyleSheet,
// 	Button,
// 	ActivityIndicator,
// 	ImageBackground,
// } from "react-native";
// import Axios from "axios";
// import { Link, useNavigate } from "react-router-native";
// //imports
// import { Token } from "../../App";
// import { LinearGradient } from "expo-linear-gradient";
// import { db } from "../fireBase/FireBase";
// import { useJwt } from "react-jwt";

// type semir = {
// 	value: {
// 		img: string;
// 		setImg: React.Dispatch<React.SetStateAction<string>>;
// 	};
// };







// const Login = (props: any) => {
// 	const navigate = useNavigate();
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [loading, setLoading] = useState<boolean>(false);
// 	const { token, setToken } = useContext(Token);
// 	const user = { email, password };
// 	const tokens = "Your JWT";
// 	const { decodedToken, isExpired } = useJwt(tokens);

// 	async function login() {
// 		console.log("tokens",tokens);
		

// 		setLoading(true);
		
// 		try {
// 			db
// 			.collection("login")
// 			.limit(100)
// 			.onSnapshot(querySnapshot => {
// 			const data = querySnapshot.docs.map(doc => ({
// 			...doc.data(),
// 			id: doc.id,
// 		}));
// 		data.find((user) => {
// 			if (email === user.username && password === user.password) {
// 				setToken(user)
// 				console.log("user",user);
// 				navigate("/map")
// 			}else{
// 				console.log("fail");
				
// 			}
			
// 		})
		
// 			})

			
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}

// 	return (
// 		<ImageBackground
// 			style={styles.container}
// 			source={require("/Users/admin/Desktop/PortfolioProjects/new Friend/friend/assets/img/white-painted-wall-texture-background.jpg")}
// 			resizeMode='cover'>
// 			{loading && <ActivityIndicator size='large' color='#00ff00' />}
// 			<TextInput
// 				onChangeText={e => setEmail(e)}
// 				style={styles.linkView}
// 				placeholder='Email'
// 				placeholderTextColor='black'
// 			/>

// 			<TextInput
// 				onChangeText={e => setPassword(e)}
// 				style={styles.linkView}
// 				placeholder='Password'
// 				placeholderTextColor='black'
// 			/>
// 			<LinearGradient style={styles.linkView} colors={["#2c3e50", "#3498db"]}>
// 				<Button onPress={login} title='Login' />
// 			</LinearGradient>
// 		</ImageBackground>
// 	);
// };
// const styles = StyleSheet.create({
// 	container: {
// 		height: "102%",
// 		width: "100%",
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	textInput: {
// 		margin: 5,
// 		textAlign: "center",
// 		padding: 3,
// 		color: "black",
// 	},

// 	linkContainer: {
// 		marginBottom: 100,
// 		alignItems: "center",
// 	},
// 	linkView: {
// 		margin: 10,
// 		textAlign: "center",
// 		borderRadius: 5,
// 		width: 300,
// 		height: 40,
// 		backgroundColor: "#fffaf0",
// 		color: "black",
// 	},
// 	register: {
// 		display: "flex",
// 		justifyContent: "center",
// 		alignItems: "center",
// 		flexDirection: "column",
// 		height: "100%",
// 		width: "100%",
// 		backgroundColor: "#2B2D5B",
// 	},
// });
// export default Login;
