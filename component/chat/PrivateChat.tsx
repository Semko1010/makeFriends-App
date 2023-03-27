import React, {
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
	useRef,
} from "react";
import {
	Modal,
	View,
	Button,
	StyleSheet,
	ScrollView,
	Image,
	Text,
	TextInput,
	Dimensions,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";

//imports
import { db } from "../fireBase/FireBase";
import { userInfo, Token, lastMsg } from "../../App";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { Link, useNavigate } from "react-router-native";
import uuid from "react-native-uuid";
import firebase from "firebase";
type chattMsg = {
	message: string;
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

type ModalFC = {
	chatModalVisible: {
		chatModalVisible: boolean;
		setChatModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	};
	allChat: {
		allChat: IMessage[];
		setAllChat: React.Dispatch<React.SetStateAction<IMessage[]>>;
	};

	allUsers: {
		allUsers: [];
		setAllUsers: React.Dispatch<React.SetStateAction<[]>>;
	};
	socket: {
		emit: any;
		close: any;
		on: any;
	};

	socketId: string;
};

const PrivateChat = (props: any) => {
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const { info, setInfo } = useContext(userInfo);
	const { token, setToken } = useContext(Token);
	const { countMsg, setCountMsg } = useContext(lastMsg);
	const [lastMessage, setLastMessage] = useState("");
	const [last, setLast] = useState("");
	const [privateMsgStat, setPrivateMsgStat] = useState<boolean>(false);

	async function privateMsg(user: any) {
		const setUserName = await setLastMessage(user.name);
		const setTrue = await setPrivateMsgStat(true);
		const setFalse = await setPrivateMsgStat(false);
	}

	const send = (messages: any) => {
		setMessages(previousMessages =>
			GiftedChat.append(previousMessages, messages),
		);

		const temp = messages[0];
		const createdAt = Date.parse(temp.createdAt);
		const chatId = token.id > info.id ? token.id + info.id : info.id + token.id;
		const { _id, text, user } = messages[0];
		if (db) {
			db.collection("privateMessages")
				.doc(chatId)
				.update({
					chats: firebase.firestore.FieldValue.arrayUnion({
						_id,
						createdAt,
						text,
						id: token.id,
						user,
						status: false,
					}),
					msgReaded: true,
				});
		}
	};

	useEffect(() => {
		let unmounted = false;
		const chatId = token.id > info.id ? token.id + info.id : info.id + token.id;

		if (db) {
			db.collection("privateMessages")
				.doc(chatId)
				.onSnapshot(doc => {
					if (doc.exists) {
						if (!unmounted) {
							setMessages(doc.data()?.chats);
						}
					}
				});

			// db.collection("privateMessages")
			// 	.doc(chatId)
			// 	.get()
			// 	.then(doc => {
			// 		if (doc.exists) {
			// 			if (!unmounted) {
			// 				setMessages(doc.data()?.chats);
			// 			}

			// 			if (
			// 				doc.data()?.chats[doc.data()?.chats.length - 1].id === token.id
			// 			) {
			// 			} else {
			// 				db.collection("privateMessages").doc(chatId).update({
			// 					msgReaded: false,
			// 				});
			// 			}
			// 		}
			// 	})
			// 	.catch(error => {
			// 		console.log("Errosrr getting document:", error);
			// 	});
		}
		return () => {
			unmounted = true;
		};
	}, [db, info]);

	useEffect(() => {
		const chatId = token.id > info.id ? token.id + info.id : info.id + token.id;
		db.collection("privateMessages")
			.doc(chatId)
			.get()
			.then(doc => {
				if (doc.exists) {
					if (doc.data()?.chats[doc.data()?.chats.length - 1].id === token.id) {
					} else {
						db.collection("privateMessages").doc(chatId).update({
							msgReaded: false,
						});
					}
				}
			})
			.catch(error => {
				console.log("Errosrr getting document:", error);
			});
	}, [messages]);

	async function back() {
		navigate("/chat");
	}
	const customtInputToolbar = props => {
		return (
			<View style={{ flex: 1, width: 250 }}>
				<InputToolbar
					{...props}
					containerStyle={{
						backgroundColor: "rgb(47,39,34)",
						height: 40,
						borderRadius: 30,
						marginLeft: 15,
						marginBottom: 3,
						borderTopColor: "rgb(47,39,34)",
					}}
				/>
			</View>
		);
	};
	const renderMessage = props => {
		return <View {...props} style={{ height: props }}></View>;
	};
	messages.sort((a: any, b: any) => b.createdAt - a.createdAt);
	return (
		<SafeAreaView style={styles.safeArea}>
			<Modal animationType='slide' transparent={true} visible={true}>
				<View style={styles.container}>
					<View style={styles.headline}>
						<TouchableOpacity onPress={() => back()}>
							<View>
								<Image
									style={{
										width: 30,
										height: 30,
										marginRight: 20,
									}}
									source={require("../../assets/img/arrow-left.png")}
								/>
							</View>
						</TouchableOpacity>

						<Image
							style={{
								width: 50,
								height: 50,
								borderRadius: 50,
							}}
							source={{
								uri: `data:image/png;base64,${info.img}`,
							}}
						/>
						<Text style={styles.header}>{info.userName}</Text>
					</View>

					<GiftedChat
						wrapInSafeArea={false}
						messages={messages}
						onSend={messages => send(messages)}
						renderAvatar={() => null}
						showAvatarForEveryMessage={false}
						renderUsernameOnMessage={false}
						renderInputToolbar={props => customtInputToolbar(props)}
						text={privateMsgStat ? `@${lastMessage} ` : undefined}
						user={{
							name: token.userName,
							_id: token.email,
							avatar: ``,
						}}
						onPressAvatar={user => privateMsg(user)}
						renderBubble={props => {
							return (
								<Bubble
									{...props}
									timeTextStyle={{
										right: {
											fontSize: 8,
										},
										left: {
											fontSize: 8,
										},
									}}
									UsernameTextStyle={{
										right: {
											fontSize: 8,
											color: "red",
										},
										left: {
											fontSize: 8,
											color: "red",
										},
									}}
									textStyle={{
										right: {
											color: "rgb(252,247,233)",
											fontSize: 12,
										},
										left: {
											color: "rgb(250,250,250)",
											fontSize: 12,
										},
									}}
									wrapperStyle={{
										left: {
											backgroundColor: "rgb(49,41,36)",
										},
										right: {
											backgroundColor: "rgb(230,173,91)",
										},
									}}
								/>
							);
						}}
					/>
				</View>
			</Modal>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: "rgb(27, 27, 27)",
	},
	container: {
		backgroundColor: "rgb(27, 27, 27)",
		height: "100%",
	},
	headline: {
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		paddingTop: 35,
		paddingBottom: 15,
		paddingLeft: 25,
		paddingRight: 25,
	},
	header: {
		marginLeft: 15,
		fontSize: 18,
		fontWeight: "600",
		color: "rgb(250,250,250)",
	},
	textInput: {
		borderWidth: 1,
		width: "70%",
		height: "5%",
	},
	chatMsg: {
		textAlign: "center",

		width: "70%",
		height: 25,
	},
	scroll: {
		marginTop: 10,
		width: 300,
	},
	scrollView: {
		alignItems: "center",
	},
	msgView: {
		justifyContent: "space-evenly",
		alignItems: "baseline",
	},
});
export default PrivateChat;
