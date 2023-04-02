//Modules
import React, { useState, useEffect, useContext, useCallback } from "react";
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

import { LinearGradient } from "expo-linear-gradient";
//Imports

import { userInfo, Token, allInfosUser, lastMsg } from "../../App";
import Markers from "../marker/Marker";
import SetCoordsButton from "../setCoordsButton/SetCoordsButton";
import ModalMenu from "../modalMenu/ModalMenu";
import ChatModal from "../chat/ChatModal";
import UserInfos from "../modalMenu/UserInfos";
import { Link, useNavigate } from "react-router-native";
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
	setGps: {};
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
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(true);
	const [userInfosModal, setUserInfosModal] = useState<boolean>(false);
	const [Gps, setGps] = useState<boolean>(false);
	const { countMsg, setCountMsg } = useContext(lastMsg);
	const [viewFix, setViewFix] = useState<boolean>(false);
	const userToken = token.token;
	const userLocationinfos = {
		latitude: location?.latitude,
		longitude: location?.longitude,
		age: token.age,
		hobby: token.hobby,
		img: token.img,
		desc: token.desc,
	};

	useEffect(() => {
		let unmounted = false;

		db.collection("location").onSnapshot(querySnapshot => {
			setViewFix(true);
			const data = querySnapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));

			if (!unmounted) {
				setUserInfos(data);

				setTimeout(() => {
					setViewFix(false);
				}, 1000);
			}
		});

		return () => {
			unmounted = true;
			setViewFix(false);
		};
	}, [db]);

	useEffect(() => {
		let unmounted = false;
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			if (!unmounted) {
				const setLoc = await setLocation(location.coords);
			}
			if (!unmounted) {
				setLoading(false);
			}
		})();
		return () => {
			unmounted = true;
		};
	}, [db]);

	return (
		<SafeAreaView style={styles.container}>
			{loading && <ActivityIndicator size='large' color='#00ff00' />}
			{location && (
				<SafeAreaView style={styles.container}>
					<View
						// Button Linear Gradient

						style={styles.menu}>
						<TouchableOpacity onPress={() => setModalVisible(true)}>
							<Image
								style={{ width: 35, height: 35, marginLeft: 15 }}
								source={require("../../assets/img/speisekarte.png")}
							/>
						</TouchableOpacity>
						<View style={styles.groupChatText}>
							<Image
								style={{ width: 50, height: 50, borderRadius: 50 }}
								source={{
									uri: `data:image/png;base64,${token.img}`,
								}}
							/>
						</View>

						<SetCoordsButton
							location={location}
							viewFix={{ viewFix, setViewFix }}
						/>
					</View>
					{/* @ts-ignore  */}
					<MapView
						style={styles.map}
						userInterfaceStyle={"light"}
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
								id={e.userLocationinfos.id}
								userInfosModal={{ userInfosModal, setUserInfosModal }}
								viewFix={{ viewFix, setViewFix }}
								user={""}
								email={""}
							/>
						))}
					</MapView>

					{/* INFO VIEW*/}

					<View
						// Button Linear Gradient

						style={styles.infos}>
						<TouchableOpacity
							style={styles.chatBtn}
							onPress={() => props.chatModalVisible.setChatModalVisible(true)}>
							<Text style={{ color: "white" }}>Global Chat</Text>
						</TouchableOpacity>

						{/* <Text style={styles}>{lastMessage.text}</Text> */}
					</View>
				</SafeAreaView>
			)}

			<>
				<ModalMenu
					modalValue={{ modalVisible, setModalVisible }}
					socket={props.socket}
				/>
				<UserInfos
					userInfosModal={{ userInfosModal, setUserInfosModal }}
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
		height: "10%",
		borderTopWidth: 1,
		backgroundColor: "rgb(49,41,36)",
		justifyContent: "center",
	},
	infosText: {
		flexDirection: "column",
		marginLeft: 25,
	},
	menu: {
		paddingBottom: 10,
		paddingTop: 25,
		height: "15%",
		backgroundColor: "rgb(49,41,36)",
		width: Dimensions.get("window").width,

		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "gray",
	},
	chatBtn: {
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgb(230,173,91)",
		width: 150,
		paddingTop: 15,
		paddingBottom: 15,
		paddingRight: 30,
		paddingLeft: 30,
		borderWidth: 1,
		borderRadius: 10,
		marginLeft: 15,
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
