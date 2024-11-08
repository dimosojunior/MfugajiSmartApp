import { StyleSheet,ScrollView,Image, Text, View, ImageBackground } from "react-native";
import Top from "./Top";
import Middle from "./Middle";
import Bottom from "./Bottom";
import Sizes from "./Sizes";
import React, {useState,useRef, useEffect, useContext} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from "../Constant/links";
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../Styles/GlobalStyles';
import LotterViewScreen from '../Screens/LotterViewScreen';


export default function ProfileHomeScreen() {


    //const theme = useContext(themeContext)
const navigation = useNavigation();
const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
const [isLoading, setIsLoading] = useState(false);






 const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

   const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };




const handleErrorMessage = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code
      // if (error.response.status === 401) {
      //   showAlertFunction('Registration error. Please try again later.');
      // } else if (error.response.status === 404) {
      //   showAlertFunction('Not Found: The requested resource was not found.');

      // } 
      // else {
      //   showAlertFunction('An error occurred while processing your request.');
      // }
    }  if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
    } else {
      showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
    }
  };



  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
    //fetchUserData();
  }, [userData]);


 useEffect(() => {
    checkLoggedIn();


  }, [userToken]);


  const checkLoggedIn = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    if (userToken) {
      try {
        const userResponse = await axios.get(
          EndPoint + '/Account/user_data/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const userData1 = userResponse.data;
        setUserData(userData1);
       
      // setEmail(userData.email);
      // setUsername(userData.username);
      // setPhone(userData.phone);
      // setcompany_name(userData.company_name);
      setIsLoading(false);
       
      } catch (error) {
        handleErrorMessage(error);
        
      }
    }
  };




  return (

                <>
 {!isLoading ? (

    <>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/bc1.png")}
        // blurRadius={1}
      >
      <ScrollView
keyboardShouldPersistTaps="handled" 
// refreshControl={
//         <RefreshControl
//         refreshing={refresh}
//         onRefresh={() => pullMe()}
//         />
//        }
      showsVerticalScrollIndicator={false}
       
 
      >

        <View style={styles.container}>

       <Top userToken={userToken} setUserToken={setUserToken} userData={userData} setUserData={setUserData} isLoading={isLoading} setIsLoading={setIsLoading} />
          <Middle userData={userData} setUserData={setUserData} isLoading={isLoading} setIsLoading={setIsLoading}/>
          <Bottom userData={userData} setUserData={setUserData} isLoading={isLoading} setIsLoading={setIsLoading}/>
      



        </View>


        </ScrollView>


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



      </ImageBackground>
    </>

       ):(

<LotterViewScreen />

)}

    </>

  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    marginHorizontal: Sizes.medium,
    marginTop: Sizes.safe,
  },
});
