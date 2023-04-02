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
	const scrollViewRef = useRef();
	async function privateMsg(user: any) {
		const setUserName = await setLastMessage(user.name);
		const setTrue = await setPrivateMsgStat(true);
		const setFalse = await setPrivateMsgStat(false);
	}

	const send = (messages: any) => {
		let Test;

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
					unreadedMsg: firebase.firestore.FieldValue.arrayUnion({
						_id,
						createdAt,

						text,
						id: token.id,
						user,
						status: false,
					}),
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
							unreadedMsg: [],

							msgReaded: false,
						});
					}
				}
			})
			.catch(error => {
				console.log("Errosrr getting document:", error);
			});
	}, [messages]);
	useEffect(() => {
		let time = new Date();
		let b = time.getDate();
		let c = time.getMonth() + 1;
		let d = time.getFullYear();
		let day = "";
		switch (time.getDay()) {
			case 0:
				day = "Sonntag";
				break;
			case 1:
				day = "Montag";
				break;
			case 2:
				day = "Dienstag";
				break;
			case 3:
				day = "Mittwoch";
				break;
			case 4:
				day = "Donnerstag";
				break;
			case 5:
				day = "Freitag";
				break;
			case 6:
				day = "Samstag";
				break;
		}
	}, []);
	async function back() {
		navigate("/chat");
	}
	const customtInputToolbar = (props: any) => {
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

					<View
						// ref={scrollViewRef}
						// onContentSizeChange={() =>
						// 	scrollViewRef.current?.scrollToEnd({ animated: true })
						// }
						style={styles.giftedChat}>
						{/* <View
							style={{
								paddingBottom: 70,
								paddingTop: 100,
							}}>
							{messages.map((msg: any, index: number) => {
								let lastMsg = messages[messages.length - 1];

								let date = new Date(lastMsg.createdAt).toUTCString();

								let msgTime = new Date(date).getDay();
								console.log(msgTime);

								return (
									<View
										key={index}
										style={{
											alignItems: `${
												msg.id === token.id ? "flex-end" : "flex-start"
											}`,
										}}>
										<Text
											style={{
												color: "white",
												marginLeft: "auto",
												marginRight: "auto",
											}}>
											{msgTime === new Date().getDay()
												? null
												: new Date(msg.createdAt).toUTCString()}
										</Text>
										<View
											style={{
												backgroundColor: `${
													msg.id === token.id
														? "rgb(63,0,224)"
														: "rgb(36,37,47)"
												}`,
												width: "auto",
												paddingLeft: 10,
												paddingRight: 25,
												paddingBottom: 10,
												paddingTop: 10,
												marginTop: 5,
												borderRadius: 10,
											}}>
											<Text
												style={{
													color: "white",
													overflow: "hidden",
												}}>
												{msg.text}
											</Text>
											<Text>
												{msg.length === 0
													? ""
													: `${
															Math.floor(
																((msg.createdAt / 1000 / 60 / 60) % 24) + 1,
															) >= 0 &&
															Math.floor(
																((msg.createdAt / 1000 / 60 / 60) % 24) + 1,
															) < 10
																? `0${Math.floor(
																		((msg.createdAt / 1000 / 60 / 60) % 24) + 1,
																  )}`
																: Math.floor(
																		((msg.createdAt / 1000 / 60 / 60) % 24) + 1,
																  )
													  }:${
															Math.floor((msg.createdAt / 1000 / 60) % 60) >=
																0 &&
															Math.floor((msg.createdAt / 1000 / 60) % 60) < 10
																? `0${Math.floor(
																		(msg.createdAt / 1000 / 60) % 60,
																  )}`
																: Math.floor((msg.createdAt / 1000 / 60) % 60)
													  }`}
											</Text>
										</View>
									</View>
								);
							})}
						</View> */}
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
										messagesContainerStyle={{
											backgroundColor: "red",
											paddingTop: 100,
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
												backgroundColor: "rgb(36,37,47)",
											},
											right: {
												backgroundColor: "rgb(63,0,224)",
											},
										}}
									/>
								);
							}}
						/>
					</View>
					{/* <View style={styles.inputView}>
						<TextInput
							style={styles.textInput}
							placeholderTextColor='white'
							placeholder='Nachricht eingeben'></TextInput>
					</View> */}
				</View>
			</Modal>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	safeArea: {},
	container: {
		backgroundColor: "rgb(4, 5, 8)",
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
		backgroundColor: "rgba(4,5,8,0.8)",
		position: "absolute",
		zIndex: 9999,
		width: "100%",
	},
	giftedChat: {
		flex: 1,
	},
	header: {
		marginLeft: 15,
		fontSize: 18,
		fontWeight: "600",
		color: "rgb(250,250,250)",
	},
	textInput: {
		borderWidth: 1,
		width: "65%",
		height: "70%",
		paddingLeft: 10,
		backgroundColor: "rgb(36,37,47)",
		borderRadius: 40,
	},
	inputView: {
		justifyContent: "center",
		width: "100%",
		height: "10%",
		position: "absolute",
		zIndex: 9999,
		bottom: 0,
		backgroundColor: "rgba(4,5,8,0.8)",
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
