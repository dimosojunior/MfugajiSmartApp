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




export default function ViewNotification ({navigation, route}) {

   const { 
    
    duka_lako,
    id,
    Maelezo,
    //LevelImage,
    phone,
    username,
    Location,
    created_at,
    PichaYaPost,
    PichaYaPost2,
    PichaYaPost3,
    PichaYaPost4,
    PichaYaPost5,
    profile_image,
   // Likes,
    //UserRole,
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


//kwa ajili ya kuzoom in/out
  // Shared value for scaling
  //---BUT ukionana unakutana na error ya React-native-reanimated mismatch
  //basi hii na hizo import zake hapo juu ndo inasababisha ko utazitoa maana
  //hizi kwa sasa zinahitaji react native 3.10.1 or 3.10.0 na utainstall kama
  //hivi npx expo install react-native-reanimated
  const scale = useSharedValue(1);

  // Gesture handler for pinch-to-zoom
  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withSpring(1);  // Reset to original size when gesture ends
    },
  });

  // Animated style to apply the scaling
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
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


const [likedItems, setLikedItems] = useState(new Set()); // Store liked items in a set


//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);





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


  const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Programu imeshindwa kufungua hii linki: ${url}`);
        }
    }

const sendTextMessage = useCallback(async (phNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])

const message = "Mfugaji Smart!!"


//KWA AJILI YA KURENDER HTML
const renderersProps ={
  img:{
    enableExperimentalPercentWidth:true
  }
}


const htmlContent = ' <h1>This is the html document</h1> <img src="../assets/me.jpg" /> ';
const htmlContent2 = '<p style=\"text-align:center\"><span style=\"color:#fff\"><strong>SMART INVIGILATION SYSTEM</strong></span></p>\r\n\r\n<p>Examination cheating activities like face movement, head movements, hand movements, or hand contact are extensively involved, and the rectitude and worthiness of fair and unbiased examination are prohibited by such cheating activities. The aim of this project is to develop a model to supervise or control unethical activities in real-time examinations. Exam supervision is fallible due to limited human abilities and capacity to handle students in examination rooms, and these errors can be reduced with the help of the Smart Invigilation System.</p>\r\n\r\n<p>This work presents an automated system for exams invigilation using machine learning and computer vision approaches i.e., Dlib and Opencv . Dlib is an object detection algorithm that is implemented to detect the suspicious activities of students during examinations based on their face movements, and for starting capturing the video of students Opencv is used.</p>\r\n\r\n<p>The model is fully efficient in detecting and monitoring students in one frame during examinations. Different real-time scenarios are considered to evaluate the performance of the Automatic Invigilation System. The proposed invigilation model can be implemented in colleges, universities, and schools to detect and alert student suspicious activities. Hopefully, through the implementation of the proposed invigilation system, we can prevent and solve the problem of cheating because it is unethical.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/media/media/2023/04/10/3q.jpeg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><em>Click the link below to view more information about this project</em></p>'












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
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `Tarehe: ${day}/${month}/${year}, ${hours}:${minutes}`;
  };

 
 const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: PichaYaPost, name: "PichaYaPost" },
    { src: PichaYaPost2, name: "PichaYaPost 2" },
    { src: PichaYaPost3, name: "PichaYaPost 3" },
    { src: PichaYaPost4, name: "PichaYaPost 4" },
    { src: PichaYaPost5, name: "PichaYaPost 5" }
    
    
  ].filter(img => img.src);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  //console.log("LENGTH", images.length);


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

           <MinorHeader title="Posti Iliyopendwa"/>

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
                    width:'50%',


                  }
                ]}  
                
                >
                Taarifa za posti iliyopendwa na  {username}
                </Text>
               
               {images && images.length > 1 && (
               <TouchableOpacity 
               onPress={nextImage}
               style={{
                width:'40%',
               }}>
                <Text style={{
                  
                  backgroundColor:'green',
                  paddingHorizontal:5,
                  textAlign:'center',
                  borderRadius:6,
                  paddingVertical:7,
                  color:'white',
                  fontFamily:'Bold',
                }}>Picha zingine: <Text style={{
                  color:'red',
                }}>{images.length}</Text></Text>
                   <Ionicons name='arrow-down-circle' 
                size={28}
                color='green' 
                style={{
                 // marginTop:70,
                }} 
                
                 />

               
                </TouchableOpacity>
                )}

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

                 >{duka_lako}</Text>




  

           <View 
                style={[globalStyles.AppItemImageContainerHomeScreen,
                  {
                    marginBottom:15,
                  }

                  ]}
              >
              {images[currentImageIndex].src ? (

                 <PinchGestureHandler onGestureEvent={pinchHandler}>
                 <Animated.View style={[styles.imageContainer, animatedStyle]}>
                  <Image

                  style={[globalStyles.AppItemImageHomeScreen,

                    {
                      height:height/3,
                    }

                    ]}
                   source={{
                      uri: EndPoint + '/' + images[currentImageIndex].src
                    }}
                      
                      >
                  </Image>
                   </Animated.View>
                 </PinchGestureHandler>
                  ):(
                  <Image

                  style={[globalStyles.AppItemImageHomeScreen,

                     {
                      height:height/3,
                    }

                    ]}
                   source={require('../assets/500.png')} 
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

        //      onPress={() => {
        //    navigation.navigate('View Duka Lako', item);    
        // }} 
        >
           <View style={globalStyles.LeftBtnContainer}>
            <Text 
          style={[globalStyles.AppItemButtonTextHomeScreen,
            {
              width:'100%',
              marginTop:30,
               
              backgroundColor:'rgba(0,0,0,0)',
              borderColor:'black',
              borderWidth:1,
              color:'green',
            
            }

            ]}
        >Siku aliyopenda: {formatDate(created_at)}</Text>
         </View>
         </TouchableOpacity>



                </View>
                <View>
                 
                </View>




<View>
  
      <View style={[globalStyles.menuWrapper, 
        {backgroundColor:COLORS.white}]}>
       
   {username != MtoaMaoniUsername ? (       
<Text style={{
  marginTop:50,
  fontFamily:'Medium',

}}>
  Hello {MtoaMaoniUsername}, unaweza kuwasiliana na {username} kupitia njia hizo hapo chini
</Text>
):(
<Text style={{
  marginTop:50,
  fontFamily:'Medium',

}}>
  Hello {MtoaMaoniUsername}, watu wengine wanaweza kuwasiliana na wewe kupitia njia hizi

</Text>

)}

 {phone && (
         <TouchableOpacity onPress={() => {   Linking.openURL(`tel:${phone}`)}}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="phone" color="green" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'black'}]}>Piga Simu</Text>
          </View>
        </TouchableOpacity>)}

{phone && (
        <TouchableOpacity  onPress={() => sendTextMessage(phone, message)}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="message" color="red" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'black'}]}>Mtumie ujumbe kawaida</Text>
          </View>
        </TouchableOpacity>)}



 {phone && (
        <TouchableOpacity onPress={() => { Linking.openURL(`whatsapp://send?phone=${phone}&text=${message}`)}}>
          <View style={[globalStyles.menuItem, {

          }]}>
            <FontAwesome name="whatsapp" color="green" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'black'}]}>Chati naye whatsapp</Text>
          </View>
        </TouchableOpacity>)}



          {email && (
         <TouchableOpacity onPress={() => {  Linking.openURL(`mailto:${email}?subject=Hello ${username}&body=${message}`)}}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="email" color="black" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'black'}]}>Mtumie email</Text>
          </View>
        </TouchableOpacity>)}

        





      </View>

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