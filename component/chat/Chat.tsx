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
import ChatModal from "../chat/ChatModal";
import { userInfo, Token, allInfosUser, lastMsg } from "../../App";
import { db } from "../fireBase/FireBase";
import RegisterB from "../register/RegisterB";

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
	userObjId: string;
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
	const [allChats, setAllchats] = useState<prvMessages[]>([]);
	const [myChats, setMyChats] = useState<any>([]);
	const [search, setSearch] = useState<string>("");

	let arr: any[] = [];
	let userArr = [];

	useEffect(() => {
		(async () => {
			if (db) {
				const unscribe = await db
					.collection("privateMessages")
					.limit(100)
					.onSnapshot(querySnapshot => {
						const data = querySnapshot.docs.map(doc => ({
							...doc.data(),
							id: doc.id,
						}));
						arr = [];

						data.map(chat => {
							if (chat.id.includes(token.userObjId)) {
								chat.users.map((u: any) => {
									if (u.userObjId == token.userObjId) {
										console.log("u", u.msgnotReaded);

										setMsgRead(u.msgnotReaded);
									} else {
										arr.push({ chats: chat.chats, users: u });
									}
								});
							}
						});

						// setAllchats(data);

						setMyChats(arr);
					});

				return unscribe;
			}
		})();
	}, [db, info]);

	async function chatPrv(id: any) {
		console.log("dd");

		const res = await db
			.collection("privateMessages")
			.doc("6285545d13b062ac50142efe625f7d69741fd64eb0ade4ce")
			.collection("chats")
			.get()
			.then(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					doc.ref.update({
						status: true,
					});
				});
			});
		const setInf = await setInfo(id.users);
		// const navToChat = await navigate("/privateChat");
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
							console.log(item);

							return (
								<TouchableOpacity
									key={index}
									style={styles.userContainer}
									onPress={() => chatPrv(item)}>
									<View style={styles.imgContainer}>
										<Image
											style={{ width: 50, height: 50, borderRadius: 50 }}
											source={{
												uri: `data:image/png;base64,${item.users.img}`,
											}}
										/>
									</View>

									<View style={styles.infoContainer}>
										<Text style={styles.name}>{item.users.userName}</Text>
										<Text style={styles.lastMessage}>{item.userName}</Text>
									</View>
									<View style={styles.notificationMessageContainer}>
										<Text style={styles.notificationMessage}>
											{msgRead ? "u" : "r"}
										</Text>
									</View>
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
		flex: 1,
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
	notificationMessageContainer: {
		backgroundColor: "rgb(230,173,91)",
		color: "rgb(255,255,255)",
		width: 25,
		height: 25,
		borderRadius: 25,
		textAlign: "center",
	},
	notificationMessage: {
		textAlign: "center",
		color: "rgb(255,255,255)",
		fontSize: 18,
		fontWeight: "700",
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
