import { StyleSheet,Image, Text,Dimensions,TouchableOpacity, View } from "react-native";
import React, {useState,useRef, useEffect, useContext} from 'react';

import Colors from "./Colors";
import Sizes from "./Sizes";
import Card from "./Card";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from "../Constant/links";
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../Styles/GlobalStyles';

const {height, width} = Dimensions.get('window');

export default function Bottom({userData,setUserData, isLoading,setIsLoading}) {

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

const [isExpanded, setIsExpanded] = useState(false); // State to manage text expansion



  return (
    <View style={styles.bottomContainer}>
    {userData && userData.Maelezo && (
      <Text style={{ fontSize: 20, color: Colors.white, fontWeight: "bold" }}>
        Zaidi kuhusu  {userData && userData.username ? userData.username : ''}
      </Text>
      )}



 {userData && userData.Maelezo && (
      <View style={{
        marginTop:20,
        width:'90%',
      }}>
        <Text style={{
          color:'white',

        }}
        
        >
          {userData.Maelezo}
        </Text>    
                 
      </View>
      )}



      <View style={styles.completeContainer}>
      {userData && userData.Mkoa && userData.Mkoa.JinaLaMkoa && (
        <Card
          icon={
            <FontAwesome
              name="home"
              size={24}
              color={Colors.primary}
            />
          }
          cardTextOne= {userData && userData.Mkoa && userData.Mkoa.JinaLaMkoa ? userData.Mkoa.JinaLaMkoa : 'Mbeya'}
          cardText="Mkoa"
          style={{ backgroundColor: Colors.primary}}
        />
        )}
  
        {userData && userData.AinaYaKuku && userData.AinaYaKuku.AinaYaKuku && (
        <Card
          icon={
            <FontAwesome 
            name="briefcase" 
            size={24} 
            color={Colors.secondary} />
          }
          cardTextOne= {userData && userData.AinaYaKuku && userData.AinaYaKuku.AinaYaKuku ? userData.AinaYaKuku.AinaYaKuku : 'Broila'}
          cardText="Aina Ya kuku Wako"
          style={{ backgroundColor: Colors.secondary }}
        />
        )}
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.bottomSectionText}>Mfugaji Smart</Text>
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
  bottomContainer: {
    marginTop: Sizes.medium,
  },
  completeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Sizes.xs,
  },
  card: {
    backgroundColor: Colors.secondary,
  },
  bottomSection: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Sizes.medium,
  },
  bottomSectionText: {
    fontWeight: "bold",
    fontSize: Sizes.smedium,
    color: 'white',
    borderBottomWidth: 1,
    marginBottom: 5,
    borderBottomColor: Colors.darkGray,
  }
});
