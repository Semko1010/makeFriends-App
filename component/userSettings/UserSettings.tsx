import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
	Button,
	ActivityIndicator,
	SafeAreaView,
} from "react-native";
import { Link } from "react-router-native";

//imports

import { Token, allInfosUser } from "../../App";
import ModalMenu from "../modalMenu/ModalMenu";
import ButtonChangeInfos from "./ChangeInfos";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../fireBase/FireBase";
interface user {
	img: string;
	latitude: number;
	longitude: number;
	userName: string;
	age: number;
	hobby: string;
	desc: string;
}

const UserSettings = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const { token, setToken } = useContext(Token);
	const [userData, setUserData] = useState<any>();
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const userToken = token.token;
	const userObjId = token.id;

	useEffect(() => {
		let unmounted = false;
		db.collection("login")
			.doc(token.email)
			.get()
			.then(doc => {
				if (doc.exists) {
					if (!unmounted) {
						setUserData(doc.data());
						setLoading(false);
					}
				}
			})
			.catch(error => {
				console.log("Errosrr getting document:", error);
			});

		return () => {
			unmounted = true;
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				// Button Linear Gradient

				colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}
				style={styles.container}>
				<View style={styles.menuButton}>
					<TouchableOpacity onPress={() => setModalVisible(true)}>
						<Image
							style={{ width: 35, height: 35, marginLeft: 15 }}
							source={require("../../assets/img/speisekarte.png")}
						/>
					</TouchableOpacity>
				</View>
				<ModalMenu
					modalValue={{ modalVisible, setModalVisible }}
					socket={{
						close: undefined,
					}}
				/>

				{loading && <ActivityIndicator size='large' color='#00ff00' />}
				<View style={styles.infoView}>
					<Image
						style={styles.userImg}
						source={{ uri: `data:image/png;base64,${userData?.img}` }}
					/>
					<View style={styles.menus}>
						<Image
							style={{ width: 30, height: 30, marginRight: 20 }}
							source={require("../../assets/img/emails.png")}
						/>
						<Text>
							Email: {userData?.email}
							{loading && <ActivityIndicator size='small' color='#00ff00' />}
						</Text>
					</View>
					<View style={styles.menus}>
						<Image
							style={{ width: 30, height: 30, marginRight: 20 }}
							source={require("../../assets/img/age.png")}
						/>
						<Text>
							Alter: {userData?.age}
							{loading && <ActivityIndicator size='small' color='#00ff00' />}
						</Text>
					</View>
					<View style={styles.menus}>
						<Image
							style={{ width: 30, height: 30, marginRight: 20 }}
							source={require("../../assets/img/user.png")}
						/>
						<Text>
							Username: {userData?.userName}
							{loading && <ActivityIndicator size='small' color='#00ff00' />}
						</Text>
					</View>
					<View style={styles.menus}>
						<Image
							style={{ width: 30, height: 30, marginRight: 20 }}
							source={require("../../assets/img/hobby.png")}
						/>
						<Text>
							Hobbys: {userData?.hobby}
							{loading && <ActivityIndicator size='small' color='#00ff00' />}
						</Text>
					</View>
					<View style={styles.menus}>
						<Image
							style={{ width: 30, height: 30, marginRight: 20 }}
							source={require("../../assets/img/desc.png")}
						/>
						<Text>
							Beschreibung: {userData?.desc}
							{loading && <ActivityIndicator size='small' color='#00ff00' />}
						</Text>
					</View>
					<View style={styles.menus}>
						<Image
							style={{ width: 30, height: 30, marginRight: 20 }}
							source={require("../../assets/img/edit.png")}
						/>
						<Link to='/changeInfos'>
							<Text>Infos bearbeiten</Text>
						</Link>
					</View>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	userImg: {
		width: 110,
		height: 100,
		borderRadius: 80,
	},
	container: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,

		alignItems: "center",
	},
	infoView: {
		flex: 1,
		justifyContent: "space-evenly",
		textAlign: "center",
	},
	menus: {
		flexDirection: "row",
		alignItems: "center",
	},
	menuButton: {
		width: Dimensions.get("window").width,
		height: 100,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "gray",
	},
});

export default UserSettings;

//Modules
// import React, { useContext, useEffect, useState } from "react";
// import {
// 	View,
// 	Text,
// 	StyleSheet,
// 	Image,
// 	TouchableOpacity,
// 	Dimensions,
// 	Button,
// 	ActivityIndicator,
// 	SafeAreaView,
// } from "react-native";
// import { Link } from "react-router-native";
// import Axios from "axios";

// //imports

// import { Token, allInfosUser } from "../../App";
// import ModalMenu from "../modalMenu/ModalMenu";
// import ButtonChangeInfos from "./ChangeInfos";
// import { LinearGradient } from "expo-linear-gradient";
// import { db } from "../fireBase/FireBase";
// interface user {
// 	img: string;
// 	latitude: number;
// 	longitude: number;
// 	username: string;
// 	age: number;
// 	hobby: string;
// 	desc: string;
// 	email: string
// }

// const UserSettings = () => {
// 	const [loading, setLoading] = useState<boolean>(true);
// 	const { token, setToken } = useContext(Token);
// 	const [userData, setUserData] = useState<user | undefined>();
// 	const [modalVisible, setModalVisible] = useState<boolean>(false);
// 	const userToken = token.token;

// console.log("tok",token);

// 	useEffect(() => {
// 		db
// 			.collection("login")
// 			.limit(100)
// 			.onSnapshot(querySnapshot => {
// 			const data = querySnapshot.docs.map(doc => ({
// 			...doc.data(),
// 			id: doc.id,
// 		}));

// 		setLoading(false);

// 			})

// 	}, []);

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<LinearGradient
// 				// Button Linear Gradient

// 				colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}
// 				style={styles.container}>
// 				<View style={styles.menuButton}>
// 					<TouchableOpacity onPress={() => setModalVisible(true)}>
// 						<Image
// 							style={{ width: 35, height: 35, marginLeft: 15 }}
// 							source={require("../../assets/img/speisekarte.png")}
// 						/>
// 					</TouchableOpacity>
// 				</View>
// 				<ModalMenu modalValue={{ modalVisible, setModalVisible }} />

// 				{loading && <ActivityIndicator size='large' color='#00ff00' />}
// 				<View style={styles.infoView}>
// 					<Image
// 						style={styles.userImg}
// 						source={{ uri: token?.img }}
// 					/>
// 					<View style={styles.menus}>
// 						<Image
// 							style={{ width: 30, height: 30, marginRight: 20 }}
// 							source={require("../../assets/img/emails.png")}
// 						/>
// 						<Text>
// 							Email: {token?.email}
// 							{loading && <ActivityIndicator size='small' color='#00ff00' />}
// 						</Text>
// 					</View>
// 					<View style={styles.menus}>
// 						<Image
// 							style={{ width: 30, height: 30, marginRight: 20 }}
// 							source={require("../../assets/img/age.png")}
// 						/>
// 						<Text>
// 							Alter: {token?.age}
// 							{loading && <ActivityIndicator size='small' color='#00ff00' />}
// 						</Text>
// 					</View>
// 					<View style={styles.menus}>
// 						<Image
// 							style={{ width: 30, height: 30, marginRight: 20 }}
// 							source={require("../../assets/img/user.png")}
// 						/>
// 						<Text>
// 							Username: {token?.username}
// 							{loading && <ActivityIndicator size='small' color='#00ff00' />}
// 						</Text>
// 					</View>
// 					<View style={styles.menus}>
// 						<Image
// 							style={{ width: 30, height: 30, marginRight: 20 }}
// 							source={require("../../assets/img/hobby.png")}
// 						/>
// 						<Text>
// 							Hobbys: {token?.hobby}
// 							{loading && <ActivityIndicator size='small' color='#00ff00' />}
// 						</Text>
// 					</View>
// 					<View style={styles.menus}>
// 						<Image
// 							style={{ width: 30, height: 30, marginRight: 20 }}
// 							source={require("../../assets/img/desc.png")}
// 						/>
// 						<Text>
// 							Beschreibung: {token?.desc}
// 							{loading && <ActivityIndicator size='small' color='#00ff00' />}
// 						</Text>
// 					</View>
// 					<View style={styles.menus}>
// 						<Image
// 							style={{ width: 30, height: 30, marginRight: 20 }}
// 							source={require("../../assets/img/edit.png")}
// 						/>
// 						<Link to='/changeInfos'>
// 							<Text>Infos bearbeiten</Text>
// 						</Link>
// 					</View>
// 				</View>
// 			</LinearGradient>
// 		</SafeAreaView>
// 	);
// };

// const styles = StyleSheet.create({
// 	userImg: {
// 		width: 110,
// 		height: 100,
// 		borderRadius: 80,
// 	},
// 	container: {
// 		width: Dimensions.get("window").width,
// 		height: Dimensions.get("window").height,

// 		alignItems: "center",
// 	},
// 	infoView: {
// 		flex: 1,
// 		justifyContent: "space-evenly",
// 		textAlign: "center",
// 	},
// 	menus: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 	},
// 	menuButton: {
// 		width: Dimensions.get("window").width,
// 		height: 100,
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		alignItems: "center",
// 		borderBottomWidth: 1,
// 		borderBottomColor: "gray",
// 	},
// });

// export default UserSettings;
