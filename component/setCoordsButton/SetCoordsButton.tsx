import { useContext, useEffect, useState } from "react";
import {
	Button,
	View,
	Image,
	TouchableOpacity,
	StyleSheet,
	Text,
	AppState,
} from "react-native";

//Imports
import { Token, allInfosUser } from "../../App";

import { db } from "../fireBase/FireBase";

type coordinates = {
	location: {
		longitude: number;
		latitude: number;
	};
	viewFix: {
		viewFix: boolean;
		setViewFix: React.Dispatch<React.SetStateAction<boolean>>;
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
	emails: string;
}

const SetCoordsButton = (props: coordinates) => {
	const { token, setToken } = useContext(Token);
	const [gpsButton, setGpsButton] = useState<boolean>(true);
	const { userInfos, setUserInfos } = useContext(allInfosUser);
	const [userData, setUserData] = useState<user | undefined>();

	const userLocationinfos = {
		latitude: props.location.latitude,
		longitude: props.location.longitude,
		userName: token.userName,
		email: token.email,
		age: token.age,
		hobby: token.hobby,
		img: token.img,
		desc: token.desc,
		id: token.id,
	};

	useEffect(() => {
		userInfos.find(item => {
			if (item.userLocationinfos.id === token.id) {
				setGpsButton(false);
			}
		});
	}, [userInfos, db]);
	console.log(token.email);

	function setLocationUser() {
		props.viewFix.setViewFix(true);
		if (db) {
			db.collection("location").add({
				userLocationinfos,
			});
			setGpsButton(false);
		}
		db.collection("login").doc(token.email).update({
			online: true,
		});
	}
	async function deleteLocationUser() {
		props.viewFix.setViewFix(true);
		let gpsId;
		userInfos.find(e => {
			if (e.userLocationinfos.id === token.id) {
				gpsId = e.id;
			}
		});

		const deleteGpsPosition = await db
			.collection("location")
			.doc(gpsId)
			.delete();
		setGpsButton(true);
		const offlineSet = await db.collection("login").doc(token.email).update({
			online: false,
		});
	}

	AppState.addEventListener("change", state => {
		if (state === "active") {
			// do this
		} else if (state === "background") {
			console.log("delete");
			deleteLocationUser();
		} else if (state === "inactive") {
			// do that other thing
		}
	});
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
