import React, { useState,useContext,useRef, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Pressable,
  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

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
import DirectHomeStack from '../Header/DirectHomeStack';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');




export default function SeeNotifications ({navigation}) {

   //  const { 
    
   //  id,
   //  JinaLaHuduma 
   // } = route.params
 const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [queryset, setQueryset] = useState([]);
  const [current_page, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [isPending, setIsPending] = useState(true);

   const [modalVisible, setModalVisible] = useState(false);
 const [isModalVisible, setIsModalVisible] = useState(false); // New state variable


//FOR SEARCHING
const [input, setInput] = useState('');

  
 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };


  let [fontsLoaded] = useFonts({
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  useFocusEffect(
    React.useCallback(() => {
      const updateUserToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token || '');
      };
      updateUserToken();
      const unsubscribe = navigation.addListener('updateUserToken', updateUserToken);
      return unsubscribe;
    }, [navigation])
  );




useEffect(() => {

   
    checkLoggedIn();
    // Fetch cart items only if the user is authenticated
    if (userToken) {
     setLoading(true)
     getItems();;
    }

  }, [userToken]);


const checkLoggedIn = async () => {
  const token = await AsyncStorage.getItem('userToken');
  setUserToken(token);
  
  
 
};





  const getItems = () => {
   if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setIsPending(false);
    return;
  } else {


    //setIsPending(true);
    setIsLoading(true);
    const url = `${EndPoint}/notifications/?page=${current_page}&page_size=2`;
    fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Token ${userToken}` },
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.queryset.length > 0) {
        setQueryset([...queryset, ...data.queryset]);
        setCurrentPage(current_page + 1);
        setIsLoading(false);
        setLoading(false);
        setIsPending(false);
      } else {
        setEndReached(true);
        // setIsLoading(false);
        setIsLoading(false);
        setLoading(false);
        setIsPending(false);
          
      }
      // setIsLoading(false);
      //   setLoading(false);
       // setIsPending(false);

    })
    // .catch(() => {
    //   setIsPending(false);
    // });

  }
  };


//console.log("USER TOKEN", userToken);



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

  // useEffect(() => {
  //   setLoading(true)
  //   getItems();
  // }, []);







  const [unseenCount, setUnseenCount] = useState(0);

   useEffect(() => {
    if (userToken) {
        // Fetch unseen notifications count
        axios.get(`${EndPoint}/CountUnseenNotificationsView/`, {
            headers: { 'Authorization': `Token ${userToken}` }
        })
        .then(response => {
            setUnseenCount(response.data.unseen_count);
        })
        .catch(error => {
            console.error(error);
        });

        // Mark notifications as seen when the screen is loaded
        axios.post(`${EndPoint}/MarkNotificationsAsSeenView/`, {}, {
            headers: { 'Authorization': `Token ${userToken}` }
        })
        .then(response => {
            console.log(response.data.message);
        })
        .catch(error => {
            console.error(error);
        });
    }
}, [userToken]);









  // const formatDate = (dateString) => {
  //   if (!dateString) return null;
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

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

 


  const transportItem = ({item}) => {



    return (


      <Pressable 
          onPress={() => {
            navigation.navigate('View Notification', item);    
        }}
      >
        



          {/*  mwanzo wa Itself container*/}
              <View style={[globalStyles.ItselfMajorContainer,

                  {
                  backgroundColor:'wheat',
                  marginHorizontal:10,
                  width:'95%',
                  justifyContent:'space-between',
                  marginBottom:10,
                  //elevation:3,
                  elevation: 3,
                shadowColor: Platform.OS === "android" ? 'black' : "black",
                shadowOpacity: 1,
                }

                ]}>
             
             <View style={[globalStyles.ItselfLeftMinorContainer,
              {
                width:'75%',
                //backgroundColor:'wheat',
              }

              ]}>
            
              <Text style={[globalStyles.ItselfLeftMinorTexti,
                 {
                  backgroundColor:'rgba(0,0,0,0)',
                  color:'black',
                  padding:0,
                  margin:0,
                  fontFamily:'Bold',
                  //backgroundColor:'green',
                  //paddingHorizontal:10,
                  //borderRadius:6,
                  //width:'80%',
                  //paddingVertical:10,
                  //color:'white',
                  //textAlign:'center',
                }

                ]}>{item.message}</Text>

                 <Text style={[globalStyles.ItselfLeftMinorTexti,
                 {
                  backgroundColor:'rgba(0,0,0,0)',
                  color:'black',
                  padding:0,
                  margin:0,
                  fontFamily:'Light',
                }

                ]}><Text style={{
                  fontFamily:'Medium',
                }}>Posti: </Text>{item.duka_lako}</Text>

                 <Text style={[globalStyles.ItselfLeftMinorTexti,
                 {
                  backgroundColor:'rgba(0,0,0,0)',
                  color:'green',
                  padding:0,
                  margin:0,
                  fontFamily:'Light',
                }

                ]}><Text style={{
                  fontFamily:'Medium',
                }}></Text> {formatDate(item.created_at)}</Text>
              
              </View>
             
              
            <TouchableOpacity 
          
              style={[globalStyles.ItselfRightMinorContainer,
                 {
                width:'20%',
                //backgroundColor:'black',
              }

                ]}>
              
              
              {item.Photo ? ( 
               <Image

                  style={[globalStyles.UserInfoLeftImagee,
                    {
                      width:'100%',
                      height:height/11,
                      borderRadius:40,
                    }

                    ]}
                   source={{
                      uri: EndPoint + '/' + item.Photo
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                   style={[globalStyles.UserInfoLeftImagee,
                    {
                      width:'100%',
                      height:height/11,
                      borderRadius:40,
                    }

                    ]}
                   source={require('../assets/profile.jpg')} 
                  >
                  </Image>
                )}

               
              </TouchableOpacity>
                
              </View>
             {/*  mwisho wa Itself container*/}
            



      </Pressable>

     


     )






// mwisho wa render
  };




  return (

       <>{!fontsLoaded ? (<View/>):(



          <View style={globalStyles.container}>





<DirectHomeStack title="Notifications" />



 

              <View style={globalStyles.bottomview}>



          {/*  mwanzo wa Itself container*/}
              <View style={[
                globalStyles.ItselfMajorContainer,
                {
                  backgroundColor:'lightgreen',
                }

                ]}>
             
             <View style={globalStyles.ItselfLeftMinorContainer}>
             <TouchableOpacity 
               onPress={() => {
            navigation.navigate('Get All Duka Lako Items');    
        }}
             >
              <Text 
              style={[
                globalStyles.ItselfLeftMinorText,
                {
                  backgroundColor:'green',
                  color:'white'
                }

                ]}>Duka Langu</Text>
              </TouchableOpacity>
              </View>
             
              <TouchableOpacity 
            onPress={() => {
            navigation.navigate('Duka Lako Form');    
        }}
              style={globalStyles.ItselfRightMinorContainer}>
              <View >
                  <FontAwesome name='plus-square-o' 
                  size={30}
                  color='red'  
                  
                   />
              </View>
              </TouchableOpacity>
                
              </View>
             {/*  mwisho wa Itself container*/}
            

 {/*<Text>{`You have ${unseenCount} unseen notifications`}</Text>*/}

                <Text
                style={globalStyles.AppChaguaHudumaTextHomeScreen}  
                
                >Notifications Zako</Text>


            {/*mwanzo wa Item View*/}
                <View 
                style={globalStyles.AppFlatListContainerHomeScreen} 
               
                >




{ !isPending ? (
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
  <Text style={globalStyles.noitemText}>Hakuna notifications yoyote kwasasa!! !
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