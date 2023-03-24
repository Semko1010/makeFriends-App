import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	Button,
	TextInput,
	StyleSheet,
	Dimensions,
	ScrollView,
	Image,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import { Link, useNavigate } from "react-router-native";
import { io } from "socket.io-client";
import PrivateChat from "./PrivateChat";
import { userInfo, Token, allInfosUser, lastMsg } from "../../App";
import { db } from "../fireBase/FireBase";

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
interface prvMessages {
	x: any;
	createdAt: string;
	id: string;
	text: string;
	userName: string;
	img: string;
	user: {
		avatar: string;
		name: string;
		_id: string;
	};

	_id: string;
}
interface IMessage {
	prvMessages: prvMessages[];
	setPrvMessages: React.Dispatch<React.SetStateAction<prvMessages[]>>;
}
const Chat = (props: chatMessage) => {
	const navigate = useNavigate();
	const { info, setInfo } = useContext(userInfo);
	const { token, setToken } = useContext(Token);
	const { countMsg, setCountMsg } = useContext(lastMsg);
	const [msgRead, setMsgRead] = useState<boolean>(true);
	const [allChat, setAllChat] = useState([]);
	const [room, setRoom] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [myChats, setMyChats] = useState<any>([]);
	const [search, setSearch] = useState<string>("");
	const [messages, setMessages] = useState([]);
	let arr: any[] = [];
	let test: any[] = [];

	useEffect(() => {
		let unmounted = false;
		const chatId = token.id > info.id ? token.id + info.id : info.id + token.id;

		if (db) {
			db.collection("privateMessages")
				.limit(100)
				.onSnapshot(querySnapshot => {
					const data = querySnapshot.docs.map(doc => ({
						...doc.data(),
						id: doc.id,
					}));
					arr = [];

					data.map(chat => {
						if (chat.id.includes(token.id)) {
							chat.users.map((u: any) => {
								if (u.id == token.id) {
								} else {
									arr.push({
										chats: chat.chats,
										users: u,
										msgReaded: chat.msgReaded,
									});
									db.collection("login")
										.limit(100)
										.onSnapshot(querySnapshot => {
											const login = querySnapshot.docs.map(doc => ({
												...doc.data(),
												id: doc.id,
											}));
											test = [];

											arr.map(i => {
												login.map(l => {
													if (i.users.id === l.id) {
														test.push({
															chats: i.chats,
															msgReaded: i.msgReaded,
															users: i.users,
															logins: l,
														});
													} else {
													}
												});
											});

											if (!unmounted) {
												setMyChats(test);
											}
										});
								}
							});
						}
					});
				});
		}
		return () => {
			unmounted = true;
			// setMyChats(test);
		};
	}, [db, info]);

	async function chatPrv(id: any) {
		const setInf = await setInfo(id.users);

		const navToChat = await navigate("/privateChat");
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headline}>
				<Text style={styles.header}>Chats</Text>
				<TextInput
					onChangeText={e => setSearch(e)}
					style={styles.input}
					placeholderTextColor='rgb(135,133,131)'
					placeholder='Suchen'></TextInput>
			</View>

			<ScrollView style={styles.scroll}>
				<View style={styles.scrollView}>
					{myChats
						?.filter((i: { userName: string }) => {
							return search.toLowerCase() === ""
								? i
								: i.userName.toUpperCase().includes(search);
						})
						.map((item: any, index: React.Key | null | undefined) => {
							return (
								<TouchableOpacity
									key={index}
									style={styles.userContainer}
									onPress={() => chatPrv(item)}>
									<View style={styles.imgContainer}>
										<Image
											style={{ width: 50, height: 50, borderRadius: 50 }}
											source={{
												uri: `data:image/png;base64,${item.logins.img}`,
											}}
										/>
									</View>

									<View style={styles.infoContainer}>
										<Text style={styles.name}>{item.logins.userName}</Text>
										<Text style={styles.lastMessage}>
											{item.chats.length === 0
												? ""
												: item.chats[item.chats.length - 1].text}
										</Text>
									</View>

									<Text style={styles.notificationMessage}>
										{item.chats[item.chats.length - 1]?.id === token.id ? (
											!item.msgReaded ? (
												""
											) : (
												""
											)
										) : !item.msgReaded ? (
											""
										) : (
											<Image
												style={{
													width: 30,
													height: 30,
												}}
												source={require("../../assets/img/msg.png")}
											/>
										)}
									</Text>

									{item.logins.online ? (
										<View style={styles.online}></View>
									) : (
										<View style={styles.offline}></View>
									)}
								</TouchableOpacity>
							);
						})}
				</View>
			</ScrollView>
			<Link to='/map'>
				<Text>Map</Text>
			</Link>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "rgb(27,27,27)",
	},
	userContainer: {
		marginTop: 25,
		width: "100%",

		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row",
	},
	imgContainer: {
		width: "30%",
	},
	infoContainer: {
		width: "70%",
	},
	headline: {
		paddingLeft: 25,
		paddingRight: 25,

		width: Dimensions.get("window").width,
	},
	online: {
		position: "absolute",
		right: 0,
		backgroundColor: "green",
		width: 20,
		height: 20,
		borderRadius: 20,
	},
	offline: {
		position: "absolute",
		right: 0,
		backgroundColor: "red",
		width: 20,
		height: 20,
		borderRadius: 20,
	},
	header: {
		marginTop: 15,
		fontSize: 32,
		fontWeight: "600",
		color: "rgb(250,250,250)",
	},
	input: {
		marginTop: 10,
		backgroundColor: "rgb(23,19,16)",
		borderRadius: 15,
		height: 35,
		paddingLeft: 10,
	},
	name: {
		color: "rgb(255,255,255)",
		fontSize: 18,
		fontWeight: "500",
	},
	lastMessage: {
		marginTop: 5,
		color: "rgb(135,133,131)",
	},
	notificationMessageContainer: {},
	notificationMessage: {
		textAlign: "center",
		color: "rgb(255,255,255)",
		fontSize: 18,
		fontWeight: "700",
		position: "absolute",
		right: 50,
	},

	chatMsg: {
		textAlign: "center",

		width: "70%",
		height: 25,
	},
	scroll: {
		marginTop: 10,
		paddingRight: 30,
		paddingLeft: 30,
	},
	scrollView: {
		alignItems: "center",
	},
	msgView: {
		justifyContent: "space-around",
		alignItems: "baseline",
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
});

export default Chat;
