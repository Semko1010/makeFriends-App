import { LinearGradient } from "expo-linear-gradient"
import React, { useContext } from "react"
import { Dimensions, Modal, View, StyleSheet, Image, Text, ImageBackground, Pressable} from "react-native"
import { Link } from "react-router-native"
import {Token} from "../../App"

type ModalFC={
    modalValue:{
        modalVisible:boolean,
        setModalVisible:React.Dispatch<React.SetStateAction<boolean>>
    }
    
}

const ModalMenu = (props:ModalFC) =>{
    const { token, setToken} = useContext(Token)


    return (
        
            <Modal
     
     animationType="slide"
     transparent={true}
     visible={props.modalValue.modalVisible}
     onRequestClose={() => {
       
       props.modalValue.setModalVisible(!props.modalValue.modalVisible);
     }}>
       
     <View style={styles.centeredView}>
     <LinearGradient
       colors={['#2980B9', '#6DD5FA', '#FFFFFF']}
       >
       <View style={styles.modalView}>

         {/* @ts-ignore  */}
           <ImageBackground source={require("../../assets/img/bck.jpg")} resizeMode="cover" style={styles.userImgView}>
             <Image
                           style={styles.userImg}
                           source={{
                             uri: `data:image/png;base64,${token.img}`,
                           }}
                       />
             <Text style={styles.modalText}>{token.userName}</Text>
           </ImageBackground>
         
        <View style={styles.date}>
         <Text style={{fontSize:20,borderBottomWidth:1,width:"100%"}}>Menü</Text>
         
         <View>
         
           </View>
         <View style={styles.buttons}>
             <Link to="/userSettings">
               <Text style={{fontSize:20}}>Profil</Text>
             </Link>
         </View>
         <View style={styles.buttons}>
             <Link to="/map">
               <Text style={{fontSize:20}}>Map</Text>
             </Link>
         </View>
          <View style={styles.buttons}>
             <Link to="/">
               <Text style={{fontSize:20}}>Daten</Text>
             </Link>
         </View>
         </View>

         <View style={styles.footerView}>
         <View style={styles.buttons}>
             <Link to="/">
               <Text style={{fontSize:20}}>Logout</Text>
             </Link>
         </View>
         
         <Pressable
           style={[styles.button, styles.buttonClose]}
           onPress={() => props.modalValue.setModalVisible(!props.modalValue.modalVisible)}>
           <Text style={styles.textStyle}>Zurück</Text>
         </Pressable>
         </View>
         
       </View>
       </LinearGradient>
     </View>
    
   </Modal>
        
    )
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      justifyContent: 'space-evenly',
    },
   
   
 
   
    userImg:{
      width: 110,
      height: 100,
      borderRadius:80
    },
    userImgView:{
      width:Dimensions.get('window').width,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      
    },
    footerView:{
      borderTopWidth:1,
      width:Dimensions.get('window').width,
      justifyContent:"center",
      alignItems: "center",
    },
    date:{
      alignItems:"center",
      justifyContent:"center",
      
    },
    buttons:{
      marginTop:5,
      borderRadius:10,
      borderWidth:1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 150, 
      height: 50},

    modalView: {
      justifyContent:"space-between",
      height:Dimensions.get('window').height,
      width:"100%",
      
      
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
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
    menuButton:{
      height:50,
      width:50,
    },
    menu:{
     
      borderBottomWidth:1,
      borderBottomColor:"gray"
    },
    buttonOpen: {
      backgroundColor: '#F194Fa',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    centeredView: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
          
        },
  });
export default ModalMenu