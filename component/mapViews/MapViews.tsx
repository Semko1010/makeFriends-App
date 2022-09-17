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
	SafeAreaView,
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
	const [Gps, setGps] = useState<boolean>(false);
	const [viewFix, setViewFix] = useState<boolean>(true);
	const userToken = token.token;
	const userLocationinfos = {
		latitude: location?.latitude,
		longitude: location?.longitude,
		userName: token.userName,
		age: token.age,
		hobby: token.hobby,
		img: token.img,
		desc: token.desc,
		token: token.token,
		userObjId: token.userObjId,
	};

	useEffect(() => {
		(async () => {
			const settingView = await setViewFix(true);
			const unscribe = await db
				.collection("location")
				.onSnapshot(querySnapshot => {
					const data = querySnapshot.docs.map(doc => ({
						...doc.data(),
						id: doc.id,
					}));
					setUserInfos(data);
				});
			if (userInfos) {
				const settingViewFix = await setViewFix(true);
			}

			return unscribe;
		})();
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
	}, [db]);

	// async function setLocationUser() {
	// 	(async () => {
	// 		if (Gps) {
	// 			let { status } = await Location.requestForegroundPermissionsAsync();
	// 			if (status !== "granted") {
	// 				setErrorMsg("Permission to access location was denied");
	// 				return;
	// 			}

	// 			let location = await Location.getCurrentPositionAsync({});
	// 			const setLoc = await setLocation(location.coords);
	// 			const setGps = await db
	// 				.collection("location")
	// 				.doc(token.userObjId)
	// 				.set({
	// 					userLocationinfos,
	// 				});
	// 		}
	// 	})();
	// }
	return (
		<SafeAreaView style={styles.container}>
			{loading && <ActivityIndicator size='large' color='#00ff00' />}
			{location && (
				<SafeAreaView style={styles.container}>
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
						<View style={styles.groupChatText}>
							<Image
								style={{ width: 50, height: 50 }}
								source={{
									uri: `data:image/png;base64,${info.img}`,
								}}
							/>
							<Text style={{ textAlign: "center" }}>Ausgewählt</Text>
						</View>

						<SetCoordsButton location={location} setGps={{ Gps, setGps }} />
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
						// onUserLocationChange={setLocationUser}
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
								viewFix={{ viewFix, setViewFix }}
							/>
						))}
					</MapView>

					{/* INFO VIEW*/}

					<LinearGradient
						// Button Linear Gradient
						colors={["#ECE9E6", "#FFFFFF", "#DBDBDB", "#EAEAEA"]}
						style={styles.infos}>
						<View style={styles.infosText}>
							<Text>
								<Text style={{ color: "black" }}>Name: </Text>
								{info.userName}
							</Text>

							<Text>Alter: {info.age}</Text>
							<Text>Hobbys: {info.hobby}</Text>
							<Text>Über mich: {info.desc}</Text>
						</View>

						<TouchableOpacity
							style={styles.chatBtn}
							onPress={() => props.chatModalVisible.setChatModalVisible(true)}>
							<Text style={{ color: "white" }}>Chat</Text>
						</TouchableOpacity>
						{/* <Text style={styles}>{lastMessage.text}</Text> */}
					</LinearGradient>
				</SafeAreaView>
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
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-evenly",
	},

	map: {
		width: Dimensions.get("window").width,
		flex: 1,
	},
	infos: {
		borderTopWidth: 1,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	infosText: {
		flexDirection: "column",
		marginLeft: 25,
	},
	chatBtn: {
		backgroundColor: "#00bfff",

		marginRight: 25,
		paddingBottom: 15,
		paddingTop: 15,
		paddingRight: 30,
		paddingLeft: 30,
		borderWidth: 1,
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
	groupChatText: {
		alignItems: "center",
	},
});

export default MapViews;
