//modules
import React, { useState, useContext } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	Button,
	ActivityIndicator,
	ImageBackground,
} from "react-native";
import Axios from "axios";
import { Link, useNavigate } from "react-router-native";
//imports
import { Token } from "../../App";
import { LinearGradient } from "expo-linear-gradient";

type semir = {
	value: {
		img: string;
		setImg: React.Dispatch<React.SetStateAction<string>>;
	};
};

const Login = (props: any) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState<boolean>(false);
	const { token, setToken } = useContext(Token);
	const user = { email, password };

	async function login() {
		// const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/login";
		const URL = "https://makefriendsapp.herokuapp.com/api/friend/users/login";

		setLoading(true);
		try {
			const fetch = await Axios.post(URL, user);
			console.log("WSdad", fetch.data);

			if (fetch.data.token) {
				if (fetch.data.verifyUser) {
					setToken(fetch.data);
					setLoading(false);
					navigate("/map");
					// props.socket.emit("join_room",fetch.data.userObjId)
				} else {
					console.log("Pleaser Verify Account");
				}
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<ImageBackground
			style={styles.container}
			source={require("/Users/admin/Desktop/PortfolioProjects/new Friend/friend/assets/img/white-painted-wall-texture-background.jpg")}
			resizeMode='cover'>
			{loading && <ActivityIndicator size='large' color='#00ff00' />}
			<TextInput
				onChangeText={e => setEmail(e)}
				style={styles.linkView}
				placeholder='Email'
				placeholderTextColor='black'
			/>

			<TextInput
				onChangeText={e => setPassword(e)}
				style={styles.linkView}
				placeholder='Password'
				placeholderTextColor='black'
			/>
			<LinearGradient style={styles.linkView} colors={["#2c3e50", "#3498db"]}>
				<Button onPress={login} title='Login' />
			</LinearGradient>
		</ImageBackground>
	);
};
const styles = StyleSheet.create({
	container: {
		height: "102%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
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
		borderRadius: 5,
		width: 300,
		height: 40,
		backgroundColor: "#fffaf0",
		color: "black",
	},
	register: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		backgroundColor: "#2B2D5B",
	},
});
export default Login;
