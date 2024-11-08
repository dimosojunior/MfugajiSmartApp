import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Linking,Alert,
  Dimensions,
  Modal,
  Pressable,

  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import COLORS  from '../Constant/colors';

import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import LotterViewScreen from '../Screens/LotterViewScreen';

import {CustomCard} from '../RenderedComponents/CustomCard';
import MinorHeader from '../Header/MinorHeader';
import React, {useState,useCallback,useRef, useEffect, useContext} from 'react';

import Html from 'react-native-render-html';
import { FontAwesome} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Audio } from 'expo-av'; // Ongeza hili
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming 
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');





export default function DeletePostDukaLako ({navigation, route }) {

   const { 
    postId,
    Title,
    id,
    Maelezo,
    LevelImage,
    phone,
    username,
    Location,
    Created,
    PichaYaPost,
    PichaYaPost2,
    PichaYaPost3,
    PichaYaPost4,
    PichaYaPost5,
    profile_image,
    Likes,
    UserRole,
    email
   } = route.params




 
  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


const ViewedUsernameProduct = username;

const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable
const [displayContentsState, setdisplayContentsState] = useState(false);



 const [Maoni, setMaoni] = useState('');
const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [MtoaMaoniEmail, setMtoaMaoniEmail] = useState('');
 const [MtoaMaoniUsername, setMtoaMaoniUsername] = useState('');
 const [MtoaMaoniPhone, setMtoaMaoniPhone] = useState('');
 const [isLoading2, setIsLoading2] = useState(false);


//FOR SEARCHING
const [input, setInput] = useState('');








 useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
  }, [userData]);

  useEffect(() => {
    checkLoggedIn();
  }, [userToken]);

  const checkLoggedIn = async () => {
    setIsLoading2(true);
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



        const userData = userResponse.data;
        setIsLoading2(false);
        setMtoaMaoniEmail(userData.email);
        setMtoaMaoniUsername(userData.username);
        setMtoaMaoniPhone(userData.phone);
        
        
       

      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
  //const [isPending, setPending] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setIsLoading2(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading2(false);
    } else {
      showAlertFunction('Kuna tatizo wakati wa utoaji wa maoni yako');
      setIsLoading2(false);
    }
  };



const handleDeletePost = async () => {
    const token = await AsyncStorage.getItem('token');
    //setUserToken(token);
    //console.log("USER", userToken);
    try {
      await axios.delete(EndPoint + `/DeleteDukaLakoPostView/${postId}/delete/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      showAlertFunction('Umefanikiwa kufuta posti yako');
      navigation.replace('Your Posts');  // Navigate back to the previous screen
    } catch (error) {
      showAlertFunction('Imeshindikana kufuta posti yako');
      //console.log(error);
    }
  };







    const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };








 const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
 








  return (

       <>{!fontsLoaded ? (<View/>):(

        <>
        {!isLoading2 ? (

          <View style={[globalStyles.container,
             { 
              

              //  opacity: isModalVisible ? 
              // 0.1 : 1
               }

            ]}>

           <MinorHeader title="Futa Posti"/>

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





    


              <View style={[globalStyles.bottomview,
                { 
              

               opacity: isModalVisible ? 
              0.1 : 1
               }


                ]}>
            



                <View style={{
                  flexDirection:'row',
                  width:'100%',
                  alignItems:'center',
                  justifyContent:'space-between',
                }}>
               <Text
                style={[
                  globalStyles.AppChaguaHudumaTextYoutubeChannel,
                  {
                    fontFamily:'Medium',
                    color:'green',
                    marginHorizontal:0,
                    width:'90%',


                  }
                ]}  
                
                >
                hello {MtoaMaoniUsername}, unakaribia kufuta posti yako                
                </Text>
               
             

                </View>













            {/*mwanzo wa Item View*/}
                <View 
                style={globalStyles.AppFlatListContainerYoutubeChannel} 
               
                >



          
      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerYoutubeChannel}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameYoutubeChannel}

                 >{Title}</Text>




  

           <View 
                style={[globalStyles.AppItemImageContainerHomeScreen,
                  {
                    marginBottom:15,
                  }

                  ]}
              >
              {PichaYaPost && ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={{
                      uri: EndPoint + '/' + PichaYaPost
                    }}
                      
                      >
                  </Image>
                  )}
                
                
               </View>


           {Maelezo && (
               <TouchableOpacity style={{
                 width:'90%',
                 marginHorizontal:20,
               }}>
             
             
               <Text style={{
                color:'black',
                fontFamily:'Light',
               }}>
                 {Maelezo}
               </Text>
                 
               </TouchableOpacity>
               )}

            <TouchableOpacity 

         onPress={handleDeletePost}
        >
           <View style={globalStyles.LeftBtnContainer}>
            <Text 
          style={[globalStyles.AppItemButtonTextHomeScreen,
            {
              width:'50%',
              marginTop:30,
               
              backgroundColor:'brown',
              borderColor:'white',
              borderWidth:1,
            
            }

            ]}
        >Futa</Text>
         </View>
         </TouchableOpacity>



                </View>
                <View>
                 
                </View>






              </View>
           </CustomCard>







                </View>

          {/*Mwisho wa item View*/}









  












               
                </View>























</ScrollView>



              <AwesomeAlert
                show={showAlert}
                showProgress={false}
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

 ) : (
  <LotterViewScreen />
)}
</>



          )}</>

          );
}

const styles = StyleSheet.create({
 
});