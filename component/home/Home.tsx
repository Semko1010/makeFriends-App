import { NativeRouter, Route, Link, Routes } from "react-router-native";
import { StyleSheet, View ,Dimensions,Text,ActivityIndicator} from 'react-native'


const Home = () =>{
    return(
        <View>
        <Link to="/registerA">
            <Text>Register</Text>
        </Link>
        <Link to="/login">
            <Text>Login</Text>
        </Link>

        </View>
    )
}

export default Home