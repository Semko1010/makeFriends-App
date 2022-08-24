import firebase from "firebase";

import { useEffect, useState } from "react";

const firebaseConfig = {
	apiKey: "AIzaSyCfb50hlWbqJ6jnMT6aZroBqSQ4tJ3QJ-o",
	authDomain: "chat-c3afc.firebaseapp.com",
	projectId: "chat-c3afc",
	storageBucket: "chat-c3afc.appspot.com",
	messagingSenderId: "1097503984179",
	appId: "1:1097503984179:web:3270bca766b7c9d7eaf146",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
