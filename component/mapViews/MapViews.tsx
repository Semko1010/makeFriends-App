//Modules
import React, { useState, useEffect, useContext } from "react";
import {
	ImageBackground,
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	Button,
	ActivityIndicator,
	Pressable,
	Modal,
	Alert,
	TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";

import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
//Imports

import { userInfo, Token, allInfosUser } from "../../App";
import Markers from "../marker/Marker";
import SetCoordsButton from "../setCoordsButton/SetCoordsButton";
import ModalMenu from "../modalMenu/ModalMenu";
import ChatModal from "../chat/ChatModal";
import { Link } from "react-router-native";
import { db } from "../fireBase/FireBase";
interface InterFaceInfos {
	age: number;
	img: string;
	latitude: number;
	longitude: number;
	userName: string;
	hobby: string;
	verifyUser: boolean;
	desc: string;
}

type coordinates = {
	longitude: number;
	latitude: number;
};
interface IMessage {
	_id: string | number;
	text: string;
	createdAt: Date | number;
	user: any;
	image?: string;
	video?: string;
	audio?: string;
	system?: boolean;
	sent?: boolean;
	received?: boolean;
	pending?: boolean;
	quickReplies?: any;
}
type chattMsg = {
	message: string;
};
type chatMessage = {
	chatMsgState: {
		allChat: IMessage[];
		setAllChat: React.Dispatch<React.SetStateAction<IMessage[]>>;
	};
	socket: {
		emit: any;
		close: any;
		on: any;
	};
	allUsers: {
		allUsers: [];
		setAllUsers: React.Dispatch<React.SetStateAction<[]>>;
	};
	socketId: string;
	showChat: {
		showChat: boolean;
		setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
	};
	chatModalVisible: {
		chatModalVisible: boolean;
		setChatModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	};
	notification: {
		notification: boolean;
		setNotification: React.Dispatch<React.SetStateAction<boolean>>;
	};
};

const MapViews = (props: chatMessage) => {
	const [location, setLocation] = useState<coordinates | undefined>();
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [infos, setInfos] = useState<boolean>(true);
	const { userInfos, setUserInfos } = useContext(allInfosUser);
	const { info, setInfo } = useContext(userInfo);
	const { token, setToken } = useContext(Token);
	const [modalVisible, setModalVisible] = useState(false);

	const [loading, setLoading] = useState<boolean>(true);
	const [calling, setCalling] = useState<boolean>(true);
	const [lastMessage, setLastMessage] = useState<[] | undefined>();
	const userToken = token.token;

	// useEffect(() => {
	// 	const docRef = db.collection("lastMsg").doc(token.userObjId);

	// 	docRef
	// 		.get()
	// 		.then(doc => {
	// 			if (doc.exists) {
	// 				setLastMessage(doc.data());
	// 			} else {
	// 				// doc.data() will be undefined in this case
	// 				console.log("No such document!");
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.log("Error getting document:", error);
	// 		});

	// 	console.log("TEstds", lastMessage);
	// }, [db]);
	// useEffect(() => {
	// 	if (db) {
	// 		const unscribe = db
	// 			.collection(`lastMsg:${token.userObjId}`)
	// 			.limit(100)
	// 			.onSnapshot(querySnapshot => {
	// 				const data = querySnapshot.docs.map(doc => ({
	// 					...doc.data(),
	// 					id: doc.id,
	// 				}));
	// 				setLastMessage(data);
	// 			});
	// 		return unscribe;
	// 	}
	// }, [db]);

	async function currentGps() {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setLocation(location.coords);
	}

	useEffect(() => {
		if (db) {
			const unscribe = db.collection("location").onSnapshot(querySnapshot => {
				const data = querySnapshot.docs.map(doc => ({
					...doc.data(),
					id: doc.id,
				}));
				setUserInfos(data);
			});

			return unscribe;
		}
	}, [db]);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			const setLoc = await setLocation(location.coords);

			setLoading(false);
		})();
	}, []);

	return (
		<View style={styles.container}>
			{loading && <ActivityIndicator size='large' color='#00ff00' />}
			{location && (
				<View style={styles.container}>
					<LinearGradient
						// Button Linear Gradient

						colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}
						style={styles.menu}>
						<TouchableOpacity onPress={() => setModalVisible(true)}>
							<Image
								style={{ width: 35, height: 35, marginLeft: 15 }}
								source={require("../../assets/img/speisekarte.png")}
							/>
						</TouchableOpacity>

						<SetCoordsButton location={location} call={{ currentGps }} />
					</LinearGradient>
					{/* @ts-ignore  */}
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: location.latitude,
							longitude: location.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
						showsUserLocation={true}
						provider='google'>
						{userInfos.map((e, index) => (
							<Markers
								key={index}
								latitude={e.userLocationinfos.latitude}
								longitude={e.userLocationinfos.longitude}
								userName={e.userLocationinfos.userName}
								img={e.userLocationinfos.img}
								age={e.userLocationinfos.age}
								hobby={e.userLocationinfos.hobby}
								desc={e.userLocationinfos.desc}
								userObjId={e.userLocationinfos.userObjId}
							/>
						))}
					</MapView>

					{/* INFO VIEW*/}

					<LinearGradient
						// Button Linear Gradient
						colors={["#ECE9E6", "#FFFFFF", "#DBDBDB", "#EAEAEA"]}
						style={styles.infos}>
						<View style={styles.infosText}>
							<Text>Name: {info.userName}</Text>
							<Text>Alter: {info.age}</Text>
							<Text>Hobbys: {info.hobby}</Text>
							<Text>Über mich: {info.desc}</Text>
						</View>

						<TouchableOpacity
							style={styles.chatBtn}
							onPress={() => props.chatModalVisible.setChatModalVisible(true)}>
							<Text>Chat</Text>
						</TouchableOpacity>
						{/* <Text style={styles}>{lastMessage.text}</Text> */}
					</LinearGradient>
				</View>
			)}

			{/* Menü */}
			<>
				<ModalMenu
					modalValue={{ modalVisible, setModalVisible }}
					socket={props.socket}
				/>
				<ChatModal
					chatModalVisible={props.chatModalVisible}
					socket={props.socket}
					allChat={props.chatMsgState}
					socketId={props.socketId}
					allUsers={props.allUsers}
				/>
			</>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-evenly",
	},

	map: {
		width: Dimensions.get("window").width,
		height: "75%",
	},
	infos: {
		backgroundColor: "white",

		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	infosText: {
		flexDirection: "column",
		marginLeft: 15,
	},
	chatBtn: {
		backgroundColor: "#7fff00",
		marginRight: 15,
		paddingBottom: 15,
		paddingTop: 15,
		paddingRight: 30,
		paddingLeft: 30,
		borderRadius: 10,
	},
	userImg: {
		width: 110,
		height: 100,
		borderRadius: 80,
	},
	userImgView: {
		width: Dimensions.get("window").width,
		height: 150,
		justifyContent: "center",
		alignItems: "center",
	},
	footerView: {
		borderTopWidth: 1,
		width: Dimensions.get("window").width,
		justifyContent: "center",
		alignItems: "center",
	},
	date: {
		alignItems: "center",
		justifyContent: "center",
	},
	buttons: {
		justifyContent: "center",
		alignItems: "center",
		width: 150,
		height: 50,
	},

	modalView: {
		justifyContent: "space-between",
		height: Dimensions.get("window").height,
		width: "100%",
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
	},

	menu: {
		width: Dimensions.get("window").width,
		height: 100,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "gray",
	},
	buttonOpen: {
		backgroundColor: "#F194Fa",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
});

export default MapViews;
