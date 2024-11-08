import { StyleSheet,Dimensions,Modal,ScrollView,Image, Text, View, TouchableOpacity } from "react-native";
import React, {useState,useRef, useEffect, useContext} from 'react';

import { AntDesign } from "@expo/vector-icons";
import Colors from "./Colors";
import {globalStyles} from '../Styles/GlobalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from "../Constant/links";
import AwesomeAlert from 'react-native-awesome-alerts';
import {MaterialIcons,MaterialCommunityIcons, Ionicons, FontAwesome} from '@expo/vector-icons';


const {height, width} = Dimensions.get('window');
export default function Top({userData,userToken,setUserToken, setUserData, isLoading,setIsLoading}) {

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





//console.log("TOKEN", userToken);


const [modalVisible, setModalVisible] = useState(false);

 const handleLogout = async () => {
    try {
      if (!userToken) {
        
        return;
      }

      // Make a POST request to your Django logout API
      const response = await axios.post(
        EndPoint + `/Account/logout_user/`,
        null,
        {
          headers: {
            Authorization: `Token ${userToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // If the logout was successful, remove the user token from AsyncStorage
      if (response.status === 200) {
        await AsyncStorage.removeItem('userToken', () => {
          setModalVisible(false);
          // Callback function to navigate to the Signin screen after token removal
          navigation.navigate('Signin Stack');
      //     navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Signin Stack' }],
      // });

        });
        
      } else {
        console.log('Failed to logout');
      }
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };








  return (
    <View>

    <View style={styles.icons}>
      <TouchableOpacity 
       onPress={() => {

        setModalVisible(true);
      }}
      style={styles.back}
      >
        <FontAwesome name="user-times" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => navigation.replace('Update Stack')}
      style={styles.setting}>
        <AntDesign name="setting" size={35} color="white" />
      </TouchableOpacity>
    </View>








              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                  <View style={globalStyles.ModalView}>
                    <Text style={{ marginLeft: 90, fontFamily:'Light', }}>Hello {userData ? userData.username : ''}</Text>

                    <ScrollView keyboardShouldPersistTaps="handled">

                      <View style={globalStyles.form}>

                        <Text 
                        style={{ fontFamily:'Light', 
                        marginLeft: 3 }}>
                        Unataka kutoka kwenye programu ?
                        </Text>


                        <View style={{ marginTop: 20 }}>


                        </View>
                      </View>

                      <View style={globalStyles.ButtonConatiner}>
                        <TouchableOpacity style={globalStyles.ButtonClose} onPress={() => setModalVisible(false)} >
                          <Text style={{
                            color: 'white',
                             fontFamily:'Light',
                          }}>Hapana</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={globalStyles.ButtonAdd}
                          onPress={handleLogout} 
                          >
                          <Text style={{
                            color: 'white',
                             fontFamily:'Light',
                          }}>Ndio</Text>
                        </TouchableOpacity>
                      </View>

                    </ScrollView>
                  </View>
                </View>
              </Modal>



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
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  back:{
    backgroundColor: Colors.alt,
    width: 45,
    height: 45,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  }
  
});
