import MapView, { Marker, Callout } from "react-native-maps";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	Button,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { userInfo } from "../../App";

interface Props {
	img: string;
	latitude: number;
	longitude: number;
	userName: string;
	age: number;
	hobby: string;
	desc: string;

	user: {};
	id: string;
	email: string;
	userInfosModal: {
		userInfosModal: boolean;
		setUserInfosModal: React.Dispatch<React.SetStateAction<boolean>>;
	};
	viewFix: {
		viewFix: boolean;
		setViewFix: React.Dispatch<React.SetStateAction<boolean>>;
	};
}

const Markers = (props: Props) => {
	const { info, setInfo } = useContext(userInfo);

	const eachInfoOfUser = () => {
		setInfo(props);
		props.userInfosModal.setUserInfosModal(
			!props.userInfosModal.userInfosModal,
		);
	};

	// useEffect(() => {
	// 	props.viewFix.setViewFix(false);
	// 	console.log("props.viewFix.viewFix", props.viewFix.viewFix);
	// }, []);
	return (
		<>
			{/* @ts-ignore  */}

			<Marker
				tracksViewChanges={props.viewFix.viewFix}
				onPress={eachInfoOfUser}
				coordinate={{
					latitude: props.latitude,
					longitude: props.longitude,
				}}
				title={props.userName}
				description={`Status: ${props.desc}`}>
				<View>
					<Image
						style={styles.userImg}
						source={{
							uri: `data:image/png;base64,${props.img}`,
						}}
					/>
				</View>
			</Marker>
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	userImg: {
		width: 80,
		height: 80,
		borderRadius: 80,
	},
	button: { width: 150, height: 50 },
});

export default Markers;
