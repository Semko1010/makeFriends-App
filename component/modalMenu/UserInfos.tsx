import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import {
	Dimensions,
	Modal,
	View,
	StyleSheet,
	Image,
	Text,
	ImageBackground,
	Pressable,
	Button,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import { Link, useNavigate } from "react-router-native";
import { Token, userInfo } from "../../App";
import { db } from "../fireBase/FireBase";
import PrivateChat from "../chat/PrivateChat";
type ModalFC = {
	userInfosModal: {
		userInfosModal: boolean;
		setUserInfosModal: React.Dispatch<React.SetStateAction<boolean>>;
	};
	socket: {
		close: any;
	};
};

const UserInfos = (props: ModalFC) => {
	const navigate = useNavigate();
	const { token, setToken } = useContext(Token);
	const { info, setInfo } = useContext(userInfo);
	async function chatWithUser() {
		const chatId = token.id > info.id ? token.id + info.id : info.id + token.id;
		console.log("info", info);

		if (db) {
			const res = await db.collection("privateMessages").doc(chatId);
			const exists = (await res.get()).exists;

			if (!exists) {
				db.collection("privateMessages")
					.doc(chatId)
					.set({
						chats: [],
						msgReaded: false,
						users: [
							{
								userName: token.userName,
								age: token.age,
								desc: token.desc,
								hobby: token.hobby,
								img: token.img,
								online: false,
								id: token.id,
							},
							{
								userName: info.userName,
								age: info.age,
								desc: info.desc,
								hobby: info.hobby,
								img: info.img,
								online: false,
								id: info.id,
							},
						],
					});
			}
		}
		const nav = await navigate("/chat");
	}

	return (
		<SafeAreaView>
			<Modal
				animationType='slide'
				transparent={true}
				visible={props.userInfosModal.userInfosModal}
				onRequestClose={() => {
					props.userInfosModal.setUserInfosModal(
						!props.userInfosModal.userInfosModal,
					);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View>
							<View style={styles.infosText}>
								<Text>
									<Text style={{ color: "black" }}>Name: {info.userName}</Text>
								</Text>
								<Text style={styles.infoText}>Name: {info.userName}</Text>
								<Text style={styles.infoText}>Alter: {info.age}</Text>
								<Text style={styles.infoText}>Hobbys: {info.hobby}</Text>
								<Text style={styles.infoText}>Über mich: {info.desc}</Text>
							</View>
						</View>
						<View style={styles.footerView}>
							<TouchableOpacity
								onPress={() => chatWithUser()}
								style={styles.gradient}>
								<LinearGradient
									style={styles.gradient}
									colors={["#AF509F", "#5A00CF"]}>
									<Text
										style={{
											color: "white",
										}}>{`Chatten mit ${info.userName}`}</Text>
								</LinearGradient>
							</TouchableOpacity>
							<Pressable
								style={[styles.button, styles.buttonClose]}
								onPress={() =>
									props.userInfosModal.setUserInfosModal(
										!props.userInfosModal.userInfosModal,
									)
								}>
								<LinearGradient
									style={styles.gradient}
									colors={["#AF509F", "#5A00CF"]}>
									<Text
										style={{
											color: "white",
										}}>
										Zurück
									</Text>
								</LinearGradient>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
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
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	date: {},
	buttons: {
		marginTop: 5,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},

	modalView: {
		borderTopWidth: 5,
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(255,255,255,0.1)",
		borderTopColor: "rgba(255,255,255,0.2)",
		borderRightColor: "rgba(255,255,255,0.1)",
		borderLeftColor: "rgba(255,255,255,0.1)",
		backgroundColor: "rgb(0,0,0)",
		borderRadius: 20,
		height: 300,
		padding: 35,
		justifyContent: "space-between",
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
	menuButton: {
		height: 50,
		width: 50,
	},
	menu: {
		borderBottomWidth: 1,
		borderBottomColor: "gray",
	},
	buttonOpen: {
		backgroundColor: "#F194Fa",
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
		justifyContent: "flex-end",
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
	gradient: {
		borderRadius: 7,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	infoText: {
		borderRadius: 5,
		marginTop: 10,
		padding: 5,
		color: "white",
		borderWidth: 1,
		borderColor: "white",
		width: 250,
	},
});
export default UserInfos;
