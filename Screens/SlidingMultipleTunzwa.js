import React, { useState,useCallback,useRef, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  Linking,
  Animated,
  Dimensions,
  Alert,
  SafeAreaView,
  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons, FontAwesome,AntDesign, FontAwesome5} from '@expo/vector-icons';

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

import {HomeCustomCard} from '../RenderedComponents/HomeCustomCard';
// import Sliding from './Sliding';

import { useFocusEffect } from '@react-navigation/native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import  {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');
export default function SlidingComponent () {

const navigation = useNavigation();

  

  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});





    const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
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




 const fadeAnimSmart = useRef(new Animated.Value(0)).current;
const fadeAnimKidijitali = useRef(new Animated.Value(0)).current;

useEffect(() => {
    // Uhuishaji wa fade-in na fade-out wa maandishi kwa mfuatano
    Animated.loop(
        Animated.sequence([
            Animated.timing(fadeAnimSmart, {
                toValue: 1,
                duration: 2000, // muda wa kuongezeka uwazi (2 sekunde)
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimSmart, {
                toValue: 0,
                duration: 2000, // muda wa kupungua uwazi (2 sekunde)
                useNativeDriver: true,
            }),
            // Kisha, uhuishaji wa 'Fuga Kidijitali'
            Animated.timing(fadeAnimKidijitali, {
                toValue: 1,
                duration: 2000, // muda wa kuongezeka uwazi (2 sekunde)
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimKidijitali, {
                toValue: 0,
                duration: 2000, // muda wa kupungua uwazi (2 sekunde)
                useNativeDriver: true,
            }),
        ])
    ).start();
}, [fadeAnimSmart, fadeAnimKidijitali]);



  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value is 0

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000, // Fade in duration
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000, // Fade out duration
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  // const nav = useNavigation();
  // const DATA = [
  //   {
  //     id: 1,
  //     name: "Bajeti Ya Chakula",
  //     backgroundColor:"#6BC5E8",
  //     queryset2rc:im1
      
  //   },
  //   {
  //     id: 2,
  //     name: "Kumbusho La Shamba",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im2
  //   },

  //   {
  //     id: 3,
  //     name: "Kitabu Shamba",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im3
  //   },

  //   {
  //     id: 4,
  //     name: "Jamii Ya Mfugaji",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im4
  //   }


  // ];




const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');

  const [Location, setLocation] = useState('');
  const [Maelezo, setMaelezo] = useState('');

  const [Role, setRole] = useState('');

 const [isLoading2, setIsLoading2] = useState(false);

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
        setEmail(userData.email);
        setUsername(userData.username);
        setPhone(userData.phone);
        setcompany_name(userData.company_name);
         setMaelezo(userData.Maelezo);
          setLocation(userData.Location);
           // setRole(userData.Role.Role);
           // console.log("ROLll", Location);

        
         

      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
 
  const emailRegex = /\S+@\S+\.\S+/;

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setIsLoading2(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading2(false);
    } else {
      showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
      setIsLoading2(false);
    }
  };



const [unseenCount, setUnseenCount] = useState(0);

   useEffect(() => {
    if (userToken) {
        // Fetch unseen notifications count
        axios.get(`${EndPoint}/CountUnseenNotificationsView/`, {
            headers: { 'Authorization': `Token ${userToken}` }
        })
        .then(response => {
            setUnseenCount(response.data.unseen_count);
            //console.log("UNSEEN", unseenCount);
        })
        .catch(error => {
            //console.error(error);
        });

        // Mark notifications as seen when the screen is loaded
        // axios.post(`${EndPoint}/MarkNotificationsAsSeenView/`, {}, {
        //     headers: { 'Authorization': `Token ${userToken}` }
        // })
        // .then(response => {
        //     console.log(response.data.message);
        // })
        // .catch(error => {
        //     console.error(error);
        // });
    }
}, [userToken]);





const myphone = "0628431507";























//FOR SEARCHING
const [input, setInput] = useState('');

//Load more
const [queryset2, setQueryset2] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);




const getItems2 = () => {
    setPending(true);
    const url = EndPoint + `/GetAllSlidingInformationsView/`;
    
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.queryset2.length > 0) {
                // Replace the old queryset2 with the new data to avoid duplication
                setQueryset2(data.queryset2);  // Replace instead of appending
                setPending(false);
            } else {
                setPending(false);
            }
        })
        .catch(error => {
            setPending(false);
           // console.error("Error fetching data: ", error);
        });
};





  // const loadMoreItem = () => {
  //   setcurrent_page(current_page + 1);
  // };

  useEffect(() => {
    //setLoading(true)
    getItems2();
  }, []);





//------------------FOR SLIDING------------------

 const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  if (flatlistRef.current && queryset2.length > 0) {
    const interval = setInterval(() => {
      const newIndex = (activeIndex + 1) % queryset2.length;
      // Ensure flatlistRef is not null before trying to call scrollToIndex
      if (flatlistRef.current) {
        flatlistRef.current.scrollToIndex({ index: newIndex, animated: true });
      }
      setActiveIndex(newIndex);
    }, 2000);

    return () => clearInterval(interval);
  }
}, [activeIndex, queryset2.length]);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: screenWidth,
      offset: screenWidth * index,
      index,
    }),
    [screenWidth]
  );


// Handle Scroll
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };


  // Render Dot Indicators
  
  // const renderDotIndicators = () => (
  //   queryset2.map((_, index) => (
  //     <View
  //       key={index}
  //       style={{
  //         backgroundColor: activeIndex === index ? 'green' : 'red',
  //         height: 10,
  //         width: 10,
  //         borderRadius: 5,
  //         marginHorizontal: 6,
  //       }}
  //     />
  //   ))
  // );

const renderDotIndicators = () => {
    return queryset2.map((dot, index) => {
      // if the active index === index

      if (activeIndex === index) {
        return (
          <View
          key={index}

            style={{
              backgroundColor: "green",
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          ></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "black",
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          ></View>
        );
      }
    });
  };





  const renderItem = ({item, index}) => {

    
    return (

       <SafeAreaView style={{
        // backgroundColor:'green',
        // //flex:1,
        // marginBottom:50,
        // height:height,
       }}>
              


 



   <ImageBackground

                //source={require('../assets/im2.jpg')}
          source={{ uri: `${EndPoint}/${item.PichaYa1}` }}
          style={{ height: height / 4 + 10, width: screenWidth, borderRadius: 10 }}
                
            >

              <View style={[globalStyles.topview,
                {
                 // width:'100%',
                 //marginBottom:0,
                }

                ]}>
                  <View style={globalStyles.welcomecontainer}>
                     
                     <View
                      style={globalStyles.AppWelcomeMsgContainerHomeScreen} 
                     
                     >
                     <Text
                style={[
                    styles.welcomemessage,
                    {
                        //opacity: fadeAnimSmart, // Tumia animation ya opacity
                        color: item.MainTitleColor,
                        fontSize: 25,
                        fontFamily: 'Medium',
                        marginTop:15,
                    },
                ]}
            >
                {item.MainTitle}
            </Text>

            <Text
                style={[
                    styles.welcomemessage,
                    {
                        //opacity: fadeAnimKidijitali, // Tumia animation ya opacity
                        color: item.MinorTitleColor,
                        fontSize: 20,
                        fontFamily: 'Regular',
                    },
                ]}
            >
                {item.MinorTitle}
            </Text>
                     </View>
                     
                
                 <TouchableOpacity 
                   onPress={() => {
                navigation.navigate('See Notifications');    
                  }}
                  style={[globalStyles.circle,
                    {
                      backgroundColor:'wheat',
                      justifyContent:'space-around',
                      alignItems:'center',
                      flexDirection:'row',
                    }

                    ]}
                       >
                    <View style={{
                     //opacity: fadeAnim
                      }}>
                     <FontAwesome name='bell-o' 
                      size={20}
                      color='black'
                      style={[globalStyles.RightHeaderImageu,
                        {
                          fontFamily:'Bold',
                        }
                        ]}  
                      
                       />
                       </View>

                      {unseenCount > 0 ? (
                      <Text style={{
                        color:'red',
                        fontFamily:'Bold',
                       }}>{unseenCount}</Text>
                       ):(

                       <Text style={{
                        color:'black',
                        fontFamily:'Bold',
                       }}>{unseenCount}</Text>
                       )}
                   {/*   <Image source={require('../assets/icon.png')} 
                  style={globalStyles.RightHeaderImage} />*/}

                      </TouchableOpacity>




                  </View>

                 {/* <Text style={{color:"black"}}> 
                  Where will you go</Text>*/}
                  

                 {/* <View style={globalStyles.searchbar}>
                    <Ionicons name="search-outline" 
                    size={25} 
                    color={COLORS.black} 

                    style={globalStyles.AppIConHomeScreen}

                      />
                    <TextInput 
                    value={input} onChangeText ={(text) => setInput(text)}
                    placeholder="Tafuta huduma" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreen}
                    
                    ></TextInput>
                  </View>*/}



                  {/*mwisho wa topview*/}
              </View>
</ImageBackground>






            <HomeCustomCard 
            //elevated={true} 
             //  style={globalStyles.AppCustomCardContainerHomeScreen}
             style={{
              backgroundColor:item.BackgroundColor,
            //marginHorizontal:24,
            marginTop:-10,
            padding:10,
            borderRadius:10,
            flexDirection:"row",
            justifyContent:"space-around",
            width:screenWidth - 24,
            marginHorizontal:10,
            alignItems:"center",
            //zIndex:2,
            // flex:1,
            // marginBottom:30,
            // height:height,
            paddingVertical:2,


             }}
           
            >
                  <View 
                  style={[globalStyles.AppCustomSimuContainerHomeScreen,

                    {
                     //marginTop:-100,
                    }


                    ]}
                  
                  >
                  {/*  <Text 
                    style={globalStyles.AppCustomSimuTextHomeScreen}
                   
                    >Huduma kwa wateja</Text>*/}
                    <Text
                    style={[globalStyles.AppCustomSimuTextValueHomeScreen,

                      {
                        color:item.DescriptionColor,
                        fontFamily:'Medium',
                      }

                      ]} 
                    >
                 {item.Description}
                    
                    </Text>
                  </View>

                   <View 
                style={globalStyles.AppCustomMahaliContainerHomeScreen}
                
                  >
                 
                   
                     
                 {Location ? (
                <Text
                  style={globalStyles.AppCustomMahaliTextHomeScreen} 
                  
                  ><FontAwesome5 
                  name={item.IconName} 
                      size={20}
                      color='brown'  
                      
                       />
                       </Text>
                  ):(
                   <Text
                     style={globalStyles.AppCustomMahaliTextHomeScreen} 
                  
                    >  
                    <FontAwesome5 name='user-circle' 
                      size={20}
                      color='brown'  
                      
                       />
                </Text>

                  )}
                  
                    {Location ? (

                    <TouchableOpacity
                   onPress={() => {   Linking.openURL(`tel:${item.phone}`)}}
                    >
                    
                     <Text
                    style={[
                      globalStyles.AppCustomMahaliTextValueHomeScreen,
                      {
                        backgroundColor:'green',
                        padding:4,
                        borderRadius:5,
                        color:'white',
                         borderTopRightRadius:0, 
                         borderBottomLeftRadius:0, 
                         marginTop:5,
                      }


                      ]} 
                    
                  
                    >
                    Wasiliana nasi
                    </Text>
                   
                    </TouchableOpacity>


                    ):(
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Update Stack')}
                    >
                    <Text
                    style={[
                      globalStyles.AppCustomMahaliTextValueHomeScreen,
                      {
                        backgroundColor:'brown',
                        padding:4,
                        borderRadius:5,
                        color:'white',
                         borderTopRightRadius:0, 
                         borderBottomLeftRadius:0, 
                         marginTop:5,
                      }


                      ]} 
                    
                  
                    >
                    Malizia usajili
                    </Text>
                    </TouchableOpacity>
                    )}
                  </View>
                
                </HomeCustomCard>



           </SafeAreaView>

           )




// mwisho wa render
  };





  return (

       <>{!fontsLoaded ? (<View/>):(

          <View style={globalStyles.container}>

         
    

 
{ !isLoading2 ? (
  <>
      
      { queryset2 && queryset2.length > 0 ? (
        <>

         {setLoading===true?(<ActivityIndicator/>):(
      <>

       <View style={{
        //marginBottom:50,
        //flex:1,
        //backgroundColor:'red',
       }}>
      <FlatList
        data={queryset2}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
      />
      </View>
    <View style={{ flexDirection: "row",
       justifyContent: "center", marginTop: 10, 
       marginBottom: 10 
     }}>
        {renderDotIndicators()}
      </View>
   


                        </>
      )}

         </>



      ) : (
       

 <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>Hakuna huduma iliyopo kwasasa!! !
  </Text>


  <View style={globalStyles.ErrorImageContainerHomePage}>
      <Image 
          source={require('../assets/500.png')}  
           style={globalStyles.ErrorImageHomePage}
          
          //source={item.ArticleImage} 
          //resizeMode='contain'
          contentContainerStyle={{ padding: 20 }}
          
          />
  </View>


</View>
      )}
 </>

):(
<LotterViewScreen />


)} 







          </View>


          )}</>

          );
}

const styles = StyleSheet.create({
 
});