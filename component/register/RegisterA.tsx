import React, { useState, useContext } from "react";
import { View, Button, Text, Image } from "react-native";
// import {userImage} from "../../App"
import * as ImagePicker from "expo-image-picker";
import { Link } from "react-router-native";

type userImage = {
	Image: {
		img: string | undefined;
		setImg: React.Dispatch<React.SetStateAction<string | undefined>>;
	};
};

const RegisterA = (props: userImage) => {
	// const { img,setImg } = useContext(userImage);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			height: 50,
			width: 50,
			aspect: [4, 3],
			quality: 0.1,
			base64: true,
		});
		{
			/* @ts-ignore  */
		}
		props.Image.setImg(result.base64);
	};

	const pickCamera = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,

			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.5,
			base64: true,
		});
		{
			/* @ts-ignore  */
		}
		props.Image.setImg(result.base64);
	};

	return (
		<View>
			<Image
				style={{ width: 100, height: 100 }}
				source={{
					uri: `data:image/png;base64,${props.Image.img}`,
				}}
			/>
			<Button onPress={pickImage} title='pickImage'></Button>

			<Button onPress={pickCamera} title='pickCamera'></Button>

			<Link underlayColor={"transparent"} to='/registerInfos'>
				<Text>Weiter</Text>
			</Link>
		</View>
	);
};

export default RegisterA;
