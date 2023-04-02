// //modules

import React, { useState, useContext, useEffect } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	Button,
	ActivityIndicator,
} from "react-native";
import { Link, useNavigate } from "react-router-native";
//imports
import { lastMsg, Token } from "../../App";
import { db } from "../fireBase/FireBase";

const Login = () => {
	const { countMsg, setCountMsg } = useContext(lastMsg);
	const { token, setToken } = useContext(Token);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginUser, setLoginUser] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);
	// setCountMsg(true);
	const user = { email, password };

	async function login() {
		let unmounted = false;
		db.collection("login")
			.doc(email)
			.get()
			.then(doc => {
				if (doc.exists) {
					if (doc.data()?.email === email) {
						if (!unmounted) {
							setToken(doc.data());
							navigate("/map");
						}
					}
				}
			})
			.catch(error => {
				console.log("Errosrr getting document:", error);
			});

		return () => {
			unmounted = true;
		};
	}

	return (
		<View>
			<View style={styles.linkView}>
				{loading && <ActivityIndicator size='large' color='#00ff00' />}
				<TextInput
					onChangeText={e => setEmail(e.toLowerCase().trim())}
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
	);
};
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
export default Login;
