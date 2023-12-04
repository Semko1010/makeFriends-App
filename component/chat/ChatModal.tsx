import React, {
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
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
	TouchableOpacity,
} from "react-native";

//imports
import { db } from "../fireBase/FireBase";
import { userInfo, Token } from "../../App";
import {
	GiftedChat,
	Bubble,
	Send,
	InputToolbar,
} from "react-native-gifted-chat";

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

const ChatModal = (props: ModalFC) => {
	const [messages, setMessages] = useState([]);
	const { info, setInfo } = useContext(userInfo);
	const { token, setToken } = useContext(Token);
	const [lastMessage, setLastMessage] = useState("");
	const [privateMsgStat, setPrivateMsgStat] = useState<boolean>(false);

	async function privateMsg(user) {
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

		const { _id, text, user } = messages[0];
		if (db) {
			db.collection("messages").doc().set({
				_id,
				createdAt,
				text,
				id: token.id,
				user,
				status: false,
			});
		}
	};

	useEffect(() => {
		let unmounted = false;
		if (db) {
			const unscribe = db
				.collection("messages")
				.limit(100)
				.onSnapshot(querySnapshot => {
					const data = querySnapshot.docs.map(doc => ({
						...doc.data(),
						id: doc.id,
					}));
					if (!unmounted) {
						setMessages(data);
					}
				});

			return unscribe;
		}
		return () => {
			unmounted = true;
		};
	}, [db, info]);
	const customtInputToolbar = (props: any) => {
		return (
			<View style={{ flex: 1, width: 250 }}>
				<InputToolbar
					{...props}
					containerStyle={{
						borderTopColor: "rgb(36,37,47)",
						backgroundColor: "rgb(36,37,47)",
						height: 40,
						borderRadius: 30,
						marginLeft: 15,
						marginBottom: 3,
					}}
				/>
			</View>
		);
	};
	const renderSend = (props: any) => {
		return (
			<Send {...props}>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<Image
						style={{
							width: 20,
							height: 20,
							marginRight: 20,
							marginBottom: 10,
						}}
						source={require("../../assets/img/sendMsg.png")}
					/>
				</View>
			</Send>
		);
	};
	messages.sort((a: any, b: any) => b.createdAt - a.createdAt);
	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={props.chatModalVisible.chatModalVisible}
			onRequestClose={() => {
				props.chatModalVisible.setChatModalVisible;
			}}>
			<View style={styles.container}>
				<Text
					style={{
						color: "white",
						position: "absolute",
						top: 80,
						left: 0,
						zIndex: 9999,
					}}>
					{" "}
					Du bist im Gruppenchat:
				</Text>
				<View
					style={{
						width: "100%",
						height: "15%",
						alignItems: "center",
						backgroundColor: "rgb(0,0,0)",
						paddingTop: 30,
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<TouchableOpacity
						onPress={() => props.chatModalVisible.setChatModalVisible(false)}>
						<Image
							style={{
								width: 30,
								height: 30,

								marginRight: 20,
							}}
							source={require("../../assets/img/arrow-left.png")}
						/>
					</TouchableOpacity>
					<View>
						<Image
							style={{ width: 50, height: 50, borderRadius: 50 }}
							source={{
								uri: `data:image/png;base64,${token.img}`,
							}}
						/>
					</View>
				</View>
				<View style={{ flex: 1, backgroundColor: "rgb(0, 0, 0)" }}>
					<GiftedChat
						messages={messages}
						onSend={messages => send(messages)}
						renderInputToolbar={props => customtInputToolbar(props)}
						renderSend={props => renderSend(props)}
						alwaysShowSend
						showAvatarForEveryMessage={true}
						renderUsernameOnMessage={true}
						text={privateMsgStat ? `@${lastMessage} ` : undefined}
						user={{
							name: token.userName,
							_id: token.id,
							avatar: `data:image/png;base64,${token.img}`,
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
											color: "white",
											fontSize: 12,
										},
										left: {
											color: "#24204F",
											fontSize: 12,
										},
									}}
									wrapperStyle={{
										left: {
											backgroundColor: "#E6F5F3",
											height: 40,
										},
										right: {
											backgroundColor: "green",
										},
									}}
								/>
							);
						}}
					/>
				</View>
			</View>
		</Modal>
	);
};
const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		width: Dimensions.get("window").width,
		height: "100%",
		position: "relative",
	},
	headline: {
		textAlign: "center",
		alignItems: "center",
		marginTop: 50,
		borderBottomWidth: 1,
		width: Dimensions.get("window").width,
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
export default ChatModal;
