import React, { useContext, useState } from "react";
import {
	Button,
	View,
	TextInput,
	ImageBackground,
	ActivityIndicator,
	StyleSheet,
	Text,
} from "react-native";
import Axios from "axios";

//Imports

import { Token } from "../../App";
import { useNavigate } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../fireBase/FireBase";

const ChangeInfos = () => {
	const navigate = useNavigate();
	const { token, setToken } = useContext(Token);
	const [userName, setUnserName] = useState<string>(token.userName);
	const [hobby, setHobby] = useState<string>(token.hobby);
	const [desc, setDesc] = useState<string>(token.desc);
	const [error, setError] = useState<boolean>(false);
	const userToken = token.token;

	const user = {
		userName,
		hobby,
		desc,
	};

	async function changeUserInfos() {
		if (userName.length >= 5 && hobby.length >= 5 && desc.length >= 5) {
			db.collection("login")
				.doc(token.email)
				.update({
					userName: userName,
					hobby: hobby,
					desc: desc,
				})

				.catch(error => {
					console.log("Errosrr getting document:", error);
				});
			navigate("/userSettings");
		} else {
			setError(true);
		}
	}
	return (
		<ImageBackground
			style={styles.container}
			source={require("/Users/admin/Desktop/PortfolioProjects/new Friend/friend/assets/img/white-painted-wall-texture-background.jpg")}
			resizeMode='cover'>
			{error && (
				<Text style={{ color: "red", marginBottom: 30 }}>
					"Bitte alle Felder ausfüllen"
				</Text>
			)}

			<View>
				<Text style={styles.label}>Username</Text>
				<TextInput
					value={userName}
					style={styles.linkView}
					onChangeText={e => setUnserName(e)}
					placeholder='Username'
				/>
				<Text style={styles.label}>Hobbys</Text>
				<TextInput
					value={hobby}
					style={styles.linkView}
					onChangeText={e => setHobby(e)}
					placeholder='Hobbys'
				/>
				<Text style={styles.label}>Status</Text>
				<TextInput
					value={desc}
					style={styles.linkView}
					onChangeText={e => setDesc(e)}
					placeholder='Status'
				/>
			</View>
			<LinearGradient
				style={styles.linkViewButton}
				colors={["#2c3e50", "#3498db"]}>
				<Button onPress={changeUserInfos} title='Änderung Speichern' />
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
	label: { margin: 10 },

	linkContainer: {
		marginBottom: 100,
		alignItems: "center",
	},
	linkView: {
		marginLeft: 10,
		textAlign: "center",
		borderRadius: 5,
		width: 300,
		height: 40,
		backgroundColor: "#fffaf0",
		color: "black",
	},
	linkViewButton: {
		marginTop: 50,
		marginLeft: 10,
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

export default ChangeInfos;
