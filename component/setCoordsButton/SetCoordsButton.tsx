import { useContext, useEffect, useState } from "react";
import {
	Button,
	View,
	Image,
	TouchableOpacity,
	StyleSheet,
	Text,
} from "react-native";
import Axios from "axios";
//Imports
import { Token, allInfosUser } from "../../App";
import axios from "axios";
import { db } from "../fireBase/FireBase";

type coordinates = {
	location: {
		longitude: number;
		latitude: number;
	};
};

interface user {
	img: string;
	latitude: number;
	longitude: number;
	userName: string;
	email: string;
	age: number;
	hobby: string;
	desc: string;
}

const SetCoordsButton = (props: coordinates) => {
	const { token, setToken } = useContext(Token);
	const [gpsButton, setGpsButton] = useState<boolean>(true);
	const { userInfos, setUserInfos } = useContext(allInfosUser);
	const [userData, setUserData] = useState<user | undefined>();
	const userToken = token.token;
	

	const userLocationinfos = {
		latitude: props.location.latitude,
		longitude: props.location.longitude,
		userName: token.username,
		email: token.email,
		age: token.age,
		hobby: token.hobby,
		img: token.img,
		desc: token.desc,
		
	};



	useEffect(() => {
		console.log("userInfos",userInfos);
		
		userInfos.find(item => {
			if (item.userLocationinfos.email == token.email) {
				
				
				setGpsButton(false);
			}
		});
	}, [userInfos]);

	async function setLocationUser() {
		
		if (db) {
			db.collection("location").add({
				userLocationinfos,
			});
			setGpsButton(false);
		}
	}
	async function deleteLocationUser() {
		
		let gpsId;
		const searchUser = await userInfos.find(e => {
			if (e.userLocationinfos.email === token.email) {
				gpsId = e.id;
			}
		});

		const deleteGpsPosition = await db
			.collection("location")
			.doc(gpsId)
			.delete();
		setGpsButton(true);
	}

	return (
		<View>
			{gpsButton ? (
				<TouchableOpacity onPress={setLocationUser}>
					<Image
						style={{ width: 50, height: 50, marginRight: 30 }}
						source={require("../../assets/img/gps.png")}
					/>
				</TouchableOpacity>
			) : (
				<TouchableOpacity onPress={deleteLocationUser}>
					<Image
						style={{ width: 50, height: 50, marginRight: 30 }}
						source={require("../../assets/img/location.png")}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	setLocationButton: {
		width: 50,
		height: 50,
		backgroundColor: "green",
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		color: "white",
	},
	RemoveLocationButton: {
		width: 50,
		height: 50,
		backgroundColor: "red",
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		color: "white",
	},
});
export default SetCoordsButton;
