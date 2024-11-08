import { StyleSheet,Dimensions, Text, View, Image } from "react-native";
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

const {height, width} = Dimensions.get('window');
export default function Middle({userData,setUserData, isLoading,setIsLoading}) {

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
       {userData && userData.profile_image ? (
        <Image style={styles.image} 
        source={{ uri: EndPoint + '/' + userData.profile_image }}             
         />):(

         <Image style={styles.image} 
        source={require("../assets/profile.jpg")}
         />)}


        <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
         Jina Kamili: {userData && userData.username ? userData.username : ''}
        </Text>
        <Text
          style={{ 
            fontSize: 16, 
            color: 'white', 
            fontWeight: "500" 
          }}
        >
        Email : {userData && userData.email ? userData.email : ''}
        </Text>
      </View>
        
        
      <View style={styles.middleSectionTextContainer}>
      {userData && userData.phone && (
        <View style={styles.middleSectionText1}>
          <Text style={styles.toptext}>Simu</Text>
          <Text style={styles.bottomtext}>
          {userData && userData.phone ? userData.phone : ''}
          </Text>
        </View>
        )}

        {userData && userData.Location && (
        <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Mahali</Text>
          <Text style={styles.bottomtext}>
          {userData && userData.Location ? userData.Location : 'Mbeya'}
          </Text>
        </View>
        )}

       {/* <View style={styles.middleSectionText}>
          <Text style={styles.toptext}>Kanda</Text>
          <Text style={styles.bottomtext}>
          {userData && userData.Kanda ? userData.Kanda : 'Kaskazini'}
          </Text>
        </View>*/}
        
      </View>









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
    //height: 90,
    height: height/7 - 6,
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
