import { NativeRouter, Route, Link, Routes } from "react-router-native";
import {
	StyleSheet,
	View,
	Dimensions,
	Text,
	ActivityIndicator,
	Image,
	ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const backGroundImage = {
	uri: "/Users/admin/Desktop/PortfolioProjects/new Friend/friend/assets/img/white-painted-wall-texture-background.jpg",
};
const Home = () => {
	return (
		<ImageBackground
			style={styles.container}
			source={backGroundImage}
			resizeMode='cover'>
			<Image
				style={{ width: 200, height: 200, marginBottom: 100 }}
				source={require("../../assets/img/firend.png")}
			/>
			<View style={styles.subContainer}>
				<LinearGradient style={styles.linkView} colors={["#2c3e50", "#3498db"]}>
					<Link underlayColor={"transparent"} to='/login'>
						<Text style={styles.text}>Login</Text>
					</Link>
				</LinearGradient>
				<LinearGradient style={styles.linkView} colors={["#2c3e50", "#3498db"]}>
					<Link underlayColor={"transparent"} to='/registerPartB'>
						<Text style={styles.text}>Register</Text>
					</Link>
				</LinearGradient>
				<Link underlayColor={"transparent"} to='/passwordReset'>
					<Text style={styles.passwort}>Passwort vergessen</Text>
				</Link>
			</View>
		</ImageBackground>
	);
};

export default Home;
const styles = StyleSheet.create({
	container: {
		height: "102%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	subContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},

	linkView: {
		justifyContent: "center",
		borderRadius: 5,
		margin: 10,
		textAlign: "center",
		width: "75%",
		height: 45,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 11,
		},
		shadowOpacity: 0.57,
		shadowRadius: 15.19,

		elevation: 23,
	},
	text: {
		textAlign: "center",
		color: "white",
		fontSize: 30,
	},
	passwort: {
		textAlign: "center",
		color: "#0000cd",
	},
});
