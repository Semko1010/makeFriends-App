import { NativeRouter, Route, Link, Routes } from "react-router-native";
import { StyleSheet, View ,Dimensions,Text,ActivityIndicator} from 'react-native'


const Home = () =>{
    return(
        <View>
        <Link to="/map">
        <Text>Map</Text>

</Link>

        </View>
    )
}

export default Home