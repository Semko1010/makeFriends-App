//Modules
import React, { useContext, useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";

import { useNavigate } from "react-router";
import { auth, db } from "../fireBase/FireBase";
import uuid from "react-native-uuid";
type infosUser = {
	infos: {
		age: string | undefined;
		setAge: React.Dispatch<React.SetStateAction<string | undefined>>;
		hobby: string | undefined;
		setHobby: React.Dispatch<React.SetStateAction<string | undefined>>;
		desc: string | undefined;
		setDesc: React.Dispatch<React.SetStateAction<string | undefined>>;
		img: string | undefined;
		setImg: React.Dispatch<React.SetStateAction<string | undefined>>;
	};
};
const RegisterB = (props: infosUser) => {
	// const { img,setImg } = useContext(userImage);
	const [userName, setUsername] = useState<string | undefined>("");
	const [email, setEmail] = useState<string | undefined>("");
	const [password, setPassword] = useState<string | undefined>("");
	const [verify, setVerify] = useState<boolean>(false);
	const user = {};
	const navigate = useNavigate();

	async function register() {
		// auth
		// 	.createUserWithEmailAndPassword(email, password)
		// 	.then(credential => {
		// 		console.log("credential", credential);

		// 		if (credential && credential.user) {
		const ref = db.collection("login").doc();

		const exists = (await ref.get()).exists;

		if (!exists) {
			db.collection("login").doc(email).set({
				age: props.infos.age,
				desc: props.infos.desc,
				email,
				hobby: props.infos.hobby,
				img: props.infos.img,
				online: false,
				password,
				userName,
				verify,
				id: uuid.v4(),
			});
			navigate("/login");
		} else {
			console.log("user Exists");
		}

		// 		}
		// 	})
		// 	.catch(error => alert(error.message));

		// auth
		// 	.createUserWithEmailAndPassword(email, password)
		// 	.then(auth => {
		// 		console.log("auth", auth);
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});

		// if (db) {
		// 	db.collection("login").doc().set({
		// 		age: props.infos.age,
		// 		desc: props.infos.desc,
		// 		email,
		// 		hobby: props.infos.hobby,
		// 		img: props.infos.img,
		// 		online: false,
		// 		password,
		// 		userName,
		// 		verify,
		// 	});

		// 	// }
		// }

		// if (userName.length >= 3 && email.includes("@") && password.length >= 6) {
	}
	console.log("u", email);

	return (
		<View>
			<View style={styles.linkContainer}>
				<TextInput
					style={styles.linkView}
					onChangeText={e => setUsername(e.toLowerCase())}
					placeholder='Username'
					placeholderTextColor='black'
				/>

				<TextInput
					onChangeText={e => setEmail(e.toLowerCase())}
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
				<Button onPress={register} title='Registrieren'></Button>
			</View>
		</View>
	);
};

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
export default RegisterB;
