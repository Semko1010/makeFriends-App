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
} from "react-native";

//imports
import { db } from "../fireBase/FireBase";
import { userInfo, Token } from "../../App";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

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
	const send = messages => {
		setMessages(previousMessages =>
			GiftedChat.append(previousMessages, messages),
		);

		const temp = messages[0];
		const createdAt = Date.parse(temp.createdAt);

		const { _id, text, user } = messages[0];
		if (db) {
			// db.collection("privateMessages").doc(info.userObjId).collection(token.userObjId + info.userObjId).add({
			// 	_id,
			// 	createdAt,
			// 	text,
			// 	userObjId:token.userObjId,
			// 	user,
			// })

			db.collection(info.userObjId).add({
				_id,
				createdAt,
				text,
				userObjId: token.userObjId,
				user,
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
				<View
					style={{
						width: "100%",
						height: "15%",
						alignItems: "center",
						backgroundColor: "white",
						paddingTop: 30,
					}}>
					<Text> Du bist im Gruppenchat:</Text>
					<Image
						style={{ width: 50, height: 50 }}
						source={{
							uri: `data:image/png;base64,${token.img}`,
						}}
					/>
				</View>
				<View style={{ height: "80%", backgroundColor: "rgba(0, 0, 0,0.5)" }}>
					<GiftedChat
						messages={messages}
						onSend={messages => send(messages)}
						// inverted={false}
						showAvatarForEveryMessage={true}
						renderUsernameOnMessage={true}
						text={privateMsgStat ? `@${lastMessage} ` : undefined}
						user={{
							name: token.userName,
							_id: token.emails,
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

				<View style={{ backgroundColor: "#1e90ff", height: "5%" }}>
					<Button
						title='Zurück'
						onPress={() => props.chatModalVisible.setChatModalVisible(false)}
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
