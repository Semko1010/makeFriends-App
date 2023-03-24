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
import { Link } from "react-router-native";
import { Token, userInfo } from "../../App";
import { db } from "../fireBase/FireBase";

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
	const { token, setToken } = useContext(Token);
	const { info, setInfo } = useContext(userInfo);
	async function chatWithUser() {
		const chatId = token.id > info.id ? token.id + info.id : info.id + token.id;

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
					<LinearGradient
						style={styles.modalView}
						colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
						<View>
							<View style={styles.infosText}>
								<Text>
									<Text style={{ color: "black" }}>Name: {info.userName}</Text>
								</Text>

								<Text>Alter: {info.age}</Text>
								<Text>Hobbys: {info.hobby}</Text>
								<Text>Über mich: {info.desc}</Text>
							</View>
							<TouchableOpacity
								style={styles.chatBtn}
								onPress={() => chatWithUser()}>
								<Text
									style={{
										color: "white",
									}}>{`Chatten mit ${info.userName}`}</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.footerView}>
							<Pressable
								style={[styles.button, styles.buttonClose]}
								onPress={() =>
									props.userInfosModal.setUserInfosModal(
										!props.userInfosModal.userInfosModal,
									)
								}>
								<Text style={styles.textStyle}>Zurück</Text>
							</Pressable>
						</View>
					</LinearGradient>
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
		borderRadius: 20,
		height: 300,
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
});
export default UserInfos;
