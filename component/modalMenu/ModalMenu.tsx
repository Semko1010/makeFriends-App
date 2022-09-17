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
import { Token } from "../../App";

type ModalFC = {
	modalValue: {
		modalVisible: boolean;
		setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	};
	socket: {
		close: any;
	};
};

const ModalMenu = (props: ModalFC) => {
	const { token, setToken } = useContext(Token);

	const logout = () => {
		props.socket.close();
	};

	return (
		<SafeAreaView>
			<Modal
				animationType='slide'
				transparent={true}
				visible={props.modalValue.modalVisible}
				onRequestClose={() => {
					props.modalValue.setModalVisible(!props.modalValue.modalVisible);
				}}>
				<View style={styles.centeredView}>
					<LinearGradient colors={["#ADA996", "#F2F2F2", "#DBDBDB", "#EAEAEA"]}>
						<View style={styles.modalView}>
							{/* @ts-ignore  */}
							<ImageBackground
								source={require("../../assets/img/bck.jpg")}
								resizeMode='cover'
								style={styles.userImgView}>
								<Image
									style={styles.userImg}
									source={{
										uri: `data:image/png;base64,${token.img}`,
									}}
								/>
								<Text style={styles.modalText}>{token.userName}</Text>
							</ImageBackground>

							<View style={styles.date}>
								<Text
									style={{ fontSize: 35, borderBottomWidth: 1, width: "100%" }}>
									Menü
								</Text>

								<View></View>
								<View style={styles.buttons}>
									<Image
										style={{ width: 20, height: 20, marginRight: 20 }}
										source={require("../../assets/img/user.png")}
									/>
									<Link to='/userSettings'>
										<Text style={{ fontSize: 20, color: "white" }}>Profil</Text>
									</Link>
								</View>
								<View style={styles.buttons}>
									<Image
										style={{ width: 20, height: 20, marginRight: 20 }}
										source={require("../../assets/img/map.png")}
									/>
									<Link to='/map'>
										<Text style={{ fontSize: 20, color: "white" }}>Map</Text>
									</Link>
								</View>
								<View style={styles.buttons}>
									<Image
										style={{ width: 20, height: 20, marginRight: 20 }}
										source={require("../../assets/img/user.png")}
									/>
									<Link to='/'>
										<Text style={{ fontSize: 20, color: "white" }}>Daten</Text>
									</Link>
								</View>
								<View style={styles.buttons}>
									<TouchableOpacity
										style={{ flexDirection: "row", alignItems: "center" }}
										onPress={logout}>
										<Image
											style={{ width: 20, height: 20, marginRight: 20 }}
											source={require("../../assets/img/logout.png")}
										/>
										<Link underlayColor='transparent' to='/'>
											<Text style={{ fontSize: 20, color: "white" }}>
												Logout
											</Text>
										</Link>
									</TouchableOpacity>
								</View>
							</View>

							<View style={styles.footerView}>
								<View style={styles.buttons}></View>

								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() =>
										props.modalValue.setModalVisible(
											!props.modalValue.modalVisible,
										)
									}>
									<Text style={styles.textStyle}>Zurück</Text>
								</Pressable>
							</View>
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
		justifyContent: "space-evenly",
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
		width: Dimensions.get("window").width,
		justifyContent: "center",
		alignItems: "center",
	},
	date: {
		alignItems: "center",
		justifyContent: "center",
	},
	buttons: {
		marginTop: 5,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: 150,
		height: 50,
	},

	modalView: {
		justifyContent: "space-between",
		flex: 1,
		width: "100%",

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
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
});
export default ModalMenu;
