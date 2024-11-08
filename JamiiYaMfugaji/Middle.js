import { StyleSheet,Dimensions,TouchableOpacity, Text, View, Image } from "react-native";
import React, {useState,useRef, useEffect, useContext} from 'react';

import { AntDesign } from "@expo/vector-icons";
import Colors from "./Colors";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from "../Constant/links";
import {globalStyles} from '../Styles/GlobalStyles';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useFonts} from 'expo-font';

const {height, width} = Dimensions.get('window');
export default function Middle({item,isClicked,setisClicked, userData,setUserData, isLoading,setIsLoading}) {

let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


    //const theme = useContext(themeContext)
const navigation = useNavigation();
// const [userData, setUserData] = useState({});
//   const [userToken, setUserToken] = useState('');
//const [isLoading, setIsLoading] = useState(false);





 const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

   const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };




  return (
    <View style={styles.main}>



      <View style={styles.imageContainer}>
       {item && item.profile_image ? (
        <Image style={styles.image} 
        source={{ uri: EndPoint + '/' + item.profile_image }}             
         />):(

         <Image style={styles.image} 
        source={require("../assets/i2.jpg")}
         />)}


        <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
         Jina Kamili: {item && item.username ? item.username : ''}
        </Text>
        <Text
          style={{ 
            fontSize: 16, 
            color: 'white', 
            fontWeight: "500" 
          }}
        >
        Email : {item && item.email ? item.email : ''}
        </Text>
      </View>

      <View style={styles.middleSectionTextContainer}>
        <View style={styles.middleSectionText1}>
          <Text style={styles.toptext}>Simu</Text>
          <Text style={styles.bottomtext}>
          {item && item.phone ? item.phone : ''}
          </Text>
        </View>
        <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Mahali</Text>
          <Text style={styles.bottomtext}>
          {item && item.Location ? item.Location : 'Mbeya'}
          </Text>
        </View>

       {/* <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Kanda</Text>
          <Text style={styles.bottomtext}>
          {item && item.Kanda ? item.Kanda : 'Kaskazini'}
          </Text>
        </View>*/}
        
      </View>



 <TouchableOpacity 
        onPress={() => setisClicked(item.id)} 
      >
        <Text style={{
          color: isClicked ? 'white' : 'white',
          marginTop: 20,
          marginBottom: 20,
          backgroundColor: isClicked ? 'brown' : 'green',
          textAlign: 'center',
          width: '50%',
          paddingVertical: 10,
          borderRadius: 8,
        }}>
          {isClicked ? 'Funga' : 'Taarifa zaidi'}
        </Text>
      </TouchableOpacity>






               <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="Overdose Stores"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="green"
                onConfirmPressed={hideAlert}
                 confirmButtonStyle={globalStyles.alertButton}
                contentContainerStyle={globalStyles.alertContainer}
                customView={
                  <View style={globalStyles.alertContent}>
                    <Image source={require('../assets/i2.jpg')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>Mfugaji Smart</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />



    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 30,
    width:'100%',
    // flex:1,
    // height:height,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width:'100%',
  },
  image: {
    width: '28%',
    height: 90,
    borderRadius: 50,
    marginBottom: 5,
  },
  middleSectionTextContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    width:'100%',
    //flex:1,
  },
  middleSectionText1:{
    justifyContent: "center",
    alignItems: "center",
    width:'50%',

  },
  middleSectionText: {
    justifyContent: "center",
    alignItems: "center",
    width:'25%',
  },
  toptext: {
    fontSize: 16,
    color:  Colors.white,
    fontWeight: "bold",
  },
  bottomtext: {
    fontSize: 16,
    color: 'wheat',
    fontWeight: "700",
  },
});
