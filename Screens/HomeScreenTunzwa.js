import React, { useState,useCallback,useRef, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  Linking,
  Animated,
  Alert,
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

import {CustomCard} from '../RenderedComponents/CustomCard';
import { useFocusEffect } from '@react-navigation/native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import  {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming 
} from 'react-native-reanimated';

export default function HomeScreen ({navigation}) {


  

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
  //     imagesrc:im1
      
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


//UPDATE USER TOKEN
useFocusEffect(
    React.useCallback(() => {
      const updateUserToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token || '');
      };

      updateUserToken();

      // Listen for the 'updateUserToken' event
      const unsubscribe = navigation.addListener('updateUserToken', updateUserToken);

      // Cleanup the listener when the component unmounts
      return unsubscribe;
    }, [navigation])
  );



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
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);




const getItems = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetAllHudumaView/?page=${current_page}&page_size=2`
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset.length > 0) {
          setQueryset([...queryset, ...data.queryset]);
          setIsLoading(false);
          setLoading(false);
          setcurrent_page(current_page + 1);
          setPending(false);

          // console.log("NEW CRRRENT", current_page);
          // console.log(queryset);

        } else {
          setIsLoading(false);
          setEndReached(true);
          setLoading(false);
          setPending(false);
        }
      });
  }
};





 const renderLoader = () => {
    return (
      isLoading ?
        <View style={globalStyles.loaderStyle}>
          <ActivityIndicator size="large" color="red" />
        </View> : null
    );
  };

  // const loadMoreItem = () => {
  //   setcurrent_page(current_page + 1);
  // };

  useEffect(() => {
    setLoading(true)
    getItems();
  }, []);











  const transportItem = ({item}) => {

    if (input === ""){

    return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameHomeScreen}

                 >{item.JinaLaHuduma}</Text>


               <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.PichaYaHuduma ? ( 
                  <Image

                  style={[globalStyles.AppItemImageHomeScreen,
                    {
                     // height:400,
                    }


                    ]}
                   source={{
                      uri: EndPoint + '/' + item.PichaYaHuduma
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>


                  <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreen}

                   // onPress={() => 
                   //  navigation.navigate('Mgawanyo Wa Huduma', item)}
                  // onPress={() => 
                   //  navigation.navigate('Angalia Huduma', item)}
               onPress={() => {
              if (item.JinaLaHuduma === 'Jamii Ya Wafugaji') {
                navigation.navigate('Jamii Ya Mfugaji HomeScreen', item);
              } else if (item.JinaLaHuduma === 'Duka Lako') {
                navigation.navigate('Get All Duka Lako Items', item);
              } else {
                navigation.navigate('Mgawanyo Wa Huduma', item);
              }
            }}


                   >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreen}
                  >Ingia</Text>
                  </TouchableOpacity>
                </View>
                <View>
                 
                </View>
              </View>
           </CustomCard>


           )




     // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if(item.JinaLaHuduma.toLowerCase().includes(input.toLowerCase())){



return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameHomeScreen}

                 >{item.JinaLaHuduma}</Text>


               <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.PichaYaHuduma ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={{
                      uri: EndPoint + '/' + item.PichaYaHuduma
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>


                  <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreen}

                   // onPress={() => 
                   //  navigation.navigate('Mgawanyo Wa Huduma', item)}
                  
                      onPress={() => {
              if (item.JinaLaHuduma === 'Jamii Ya Wafugaji') {
                navigation.navigate('Jamii Ya Mfugaji HomeScreen', item);
              } else if (item.JinaLaHuduma === 'Duka Lako') {
                navigation.navigate('Get All Duka Lako Items', item);
              } else {
                navigation.navigate('Mgawanyo Wa Huduma', item);
              }
            }}
                   >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreen}
                  >Ingia</Text>
                  </TouchableOpacity>
                </View>
                <View>
                 
                </View>
              </View>
           </CustomCard>


           )






// hili bano la chini ni la if ya pili mwisho
  }



// mwisho wa render
  };




  return (

       <>{!fontsLoaded ? (<View/>):(

          <View style={globalStyles.container}>

           <ImageBackground

                source={require('../assets/im2.jpg')}
                style={{
                    flex: 1,
                    opacity:1,
                }}
                resizeMode= "cover"
            >

              <View style={globalStyles.topview}>
                  <View style={globalStyles.welcomecontainer}>
                     
                     <View
                      style={globalStyles.AppWelcomeMsgContainerHomeScreen} 
                     
                     >
                     <Animated.Text
                style={[
                    styles.welcomemessage,
                    {
                        opacity: fadeAnimSmart, // Tumia animation ya opacity
                        color: 'white',
                        fontSize: 25,
                        fontFamily: 'Medium',
                        marginTop:15,
                    },
                ]}
            >
                MFUGAJI SMART
            </Animated.Text>

            <Animated.Text
                style={[
                    styles.welcomemessage,
                    {
                        opacity: fadeAnimKidijitali, // Tumia animation ya opacity
                        color: 'yellow',
                        fontSize: 20,
                        fontFamily: 'Regular',
                    },
                ]}
            >
                Fuga Kidijitali
            </Animated.Text>
                     </View>
                     
                
                 <TouchableOpacity 
                   onPress={() => {
                navigation.replace('See Notifications');    
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
                    <Animated.View style={{
                     opacity: fadeAnim
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
                       </Animated.View>

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


              <View style={globalStyles.bottomview}>
              <CustomCard elevated={true} 
               style={globalStyles.AppCustomCardContainerHomeScreen}
           
            >
                  <View 
                  style={globalStyles.AppCustomSimuContainerHomeScreen}
                  
                  >
                  {/*  <Text 
                    style={globalStyles.AppCustomSimuTextHomeScreen}
                   
                    >Huduma kwa wateja</Text>*/}
                    <Text
                    style={[globalStyles.AppCustomSimuTextValueHomeScreen,

                      {
                        color:'green',
                        fontFamily:'Medium',
                      }

                      ]} 
                    >
                  uza kuku/mayai hapa kwa haraka zaidi
                    
                    </Text>
                  </View>

                   <View 
                style={globalStyles.AppCustomMahaliContainerHomeScreen}
                
                  >
                 
                   
                     
                 {Location ? (
                <Text
                  style={globalStyles.AppCustomMahaliTextHomeScreen} 
                  
                  ><FontAwesome5 name='phone' 
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
                   onPress={() => {   Linking.openURL(`tel:${myphone}`)}}
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
                
                </CustomCard>



                <Text
                style={globalStyles.AppChaguaHudumaTextHomeScreen}  
                
                >Chagua Huduma</Text>


            {/*mwanzo wa Item View*/}
                <View 
                style={globalStyles.AppFlatListContainerHomeScreen} 
               
                >

{ !isLoading2 ? (
  <>
      
      { queryset && queryset.length > 0 ? (
        <>

         {setLoading===true?(<ActivityIndicator/>):(
      <>

                    <FlatList
                    data={queryset}
                    renderItem={transportItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}

                    ListFooterComponent={renderLoader}
                    onEndReached={getItems}
                    onEndReachedThreshold={0.5}
                  />


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

          {/*Mwisho wa item View*/}





               
                </View>







          </View>


          )}</>

          );
}

const styles = StyleSheet.create({
 
});