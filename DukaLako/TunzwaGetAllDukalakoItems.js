import React, { useState,useContext,useRef,useCallback,memo, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
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
import MinorHeader from '../Header/MinorHeader';
import { Audio } from 'expo-av'; // Ongeza hili

import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming 
} from 'react-native-reanimated';
//import Carousel from 'react-native-snap-carousel';




//  import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';


// const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-4524511699441606/6815431262';
// const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-4524511699441606/7007002951';

// const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
//   requestNonPersonalizedAdsOnly: true
// });

// const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true
// });



const { width, height } = Dimensions.get('screen');






// Function to prefetch images
const prefetchImages = async (images) => {
  const prefetchPromises = images.map((image) => {
    if (image) {
      return Image.prefetch(`${EndPoint}/${image}`);
    }
  });
  await Promise.all(prefetchPromises);
};

// Carousel component with memoization
const Carousel = memo(({ images }) => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
  if (flatlistRef.current && images.length > 0) {
    const interval = setInterval(() => {
      const newIndex = (activeIndex + 1) % images.length;
      // Ensure flatlistRef is not null before trying to call scrollToIndex
      if (flatlistRef.current) {
        flatlistRef.current.scrollToIndex({ index: newIndex, animated: true });
      }
      setActiveIndex(newIndex);
    }, 2000);

    return () => clearInterval(interval);
  }
}, [activeIndex, images.length]);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: screenWidth,
      offset: screenWidth * index,
      index,
    }),
    [screenWidth]
  );

  const Slide = ({ item }) => (
    <View>
      <TouchableOpacity activeOpacity={1}>
        <Image
          source={{ uri: `${EndPoint}/${item}` }}
          style={{ height: height / 3 + 150,
           width: screenWidth, 
           borderRadius: 10 }}
        />
      </TouchableOpacity>
    </View>
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderDotIndicators = () => (
    images.map((_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? 'green' : 'red',
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      />
    ))
  );


  return (
    <View>
      <FlatList
        data={images}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={Slide}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
      />
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15, marginBottom: 15 }}>
        {renderDotIndicators()}
      </View>
    </View>
  );
});






export default function GetAllDukaLakoItems ({navigation}) {





   // MWANZO WA ADS
  // const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  // const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] = useState(false);
  
  // const loadInterstitial = () => {
  //   const unsubscribeLoaded = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       setInterstitialLoaded(true);
  //     }
  //   );

  //   const unsubscribeClosed = interstitial.addAdEventListener(
  //     AdEventType.CLOSED,
  //     () => {
  //       setInterstitialLoaded(false);
  //       interstitial.load();
  //     }
  //   );

  //   interstitial.load();

  //   return () => {
  //     unsubscribeClosed();
  //     unsubscribeLoaded();
  //   }
  // }

  // const loadRewardedInterstitial = () => {
  //   const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
  //     RewardedAdEventType.LOADED,
  //     () => {
  //       setRewardedInterstitialLoaded(true);
  //     }
  //   );

  //   const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     reward => {
  //       console.log(`User earned reward of ${reward.amount} ${reward.type}`);
  //     }
  //   );

  //   const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
  //     AdEventType.CLOSED,
  //     () => {
  //       setRewardedInterstitialLoaded(false);
  //       rewardedInterstitial.load();
  //     }
  //   );

  //   rewardedInterstitial.load();

  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeClosed();
  //     unsubscribeEarned();
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribeInterstitialEvents = loadInterstitial();
  //   const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();

  //   return () => {
  //     unsubscribeInterstitialEvents();
  //     unsubscribeRewardedInterstitialEvents();
  //   };
  // }, [])


// MWISHO WA ADS




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




 //  NOTE: kwnye hii page kuna Warnings;
 //  1.INayosababisha can read queryset length of undefined ni zile conditions za
 //  kuchange color when like button is clicked, ukitoa zile error inaondoka.

 //  2. Inayosababisha hii error,
 //  VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 1800, "dt": 1322, "prevDt": 3032}
 // Ni hizo sliding images zinazoslide ko ukitoa hiyo error inaondoka.
   //  const { 
    
   //  id,
   //  JinaLaHuduma 
   // } = route.params


  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});

  const [userToken, setUserToken] = useState('');
const [shouldReload, setShouldReload] = useState(false);
const [userData, setUserData] = useState({});





//--------------------GET USER LOGIN DATA------------------



 const [Maoni, setMaoni] = useState('');
  const [MtoaMaoniEmail, setMtoaMaoniEmail] = useState('');
 const [MtoaMaoniUsername, setMtoaMaoniUsername] = useState('');
 const [MtoaMaoniPhone, setMtoaMaoniPhone] = useState('');
 const [MtoaMaoniLocation, setMtoaMaoniLocation] = useState('');
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
        setMtoaMaoniEmail(userData.email);
        setMtoaMaoniUsername(userData.username);
        setMtoaMaoniPhone(userData.phone);
        setMtoaMaoniLocation(userData.Location);
        
        
       

      } catch (error) {
        //handleErrorMessage(error);
        console.log("Malizia Usajili");

      }
    }
  };









//--------------------MWISHO GET USER LOGIN DATA------------------



    const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };






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




//    useEffect(() => {
//     setLoading(true)
//     getItems();
//     loadLikedStatus();
//   }, []);






// useEffect(() => {
//     checkLoggedIn();
// }, [userToken]);


// Fetch the user token first
  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     const token = await AsyncStorage.getItem('userToken');
  //     setUserToken(token);
  //     console.log("SEE USERTOKENI",userToken);
  //   };

  //   checkLoggedIn();
  // }, [userToken]);

//hii inafetch liked items by that user then ina fetch proudct step by step
  useEffect(() => {
    const loadData = async () => {
      try {
        // Step 1: Fetch user token
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.log("No user Token");
          return;
        }
        setUserToken(token);
        console.log("My Token", token);

        // Step 2: Fetch items
        const itemsFetched = await getItems(token);
        if (itemsFetched) {
          // Step 3: Load liked status after fetching items
          await loadLikedStatus(token, itemsFetched);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
        setPending(false);
      }
    };

    loadData();
  }, []);


  const getItems = async (token) => {
    if (endReached) {
      setLoading(false);
      setIsLoading(false);
      setPending(false);
      return null;
    } else {
      setIsLoading(true);
      const url = EndPoint + `/GetAllDukaLakoView/?page=${current_page}&page_size=50`;
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.queryset.length > 0) {
            setQueryset([...queryset, ...data.queryset]);
            setIsLoading(false);
            setLoading(false);
            setcurrent_page(current_page + 1);
            setPending(false);
            return data.queryset;
          } else {
            setIsLoading(false);
            setEndReached(true);
            setLoading(false);
            setPending(false);
            return null;
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


//hii function kazi yake ni kushow tu ni products zip huyu user aliyelogin
//amezilike na zipi hajazilike basi
 const loadLikedStatus = async (token, items) => {
    try {
      if (!token) {
        console.log('loadLikedStatus: userToken or queryset not ready.');
        return;
      }

      console.log('loadLikedStatus: userToken and queryset are ready.');

      const likedItemsSet = new Set();
      for (const item of items) {
        const response = await fetch(`${EndPoint}/CheckLikeStatus/${item.id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const data = await response.json();
        if (data.isLiked) {
          likedItemsSet.add(item.id);
        }
      }
      setLikedItems(likedItemsSet);

      console.log('likedItems', likedItemsSet);
      console.log('userToken', token);

    } catch (error) {
      console.error('Error loading liked status:', error);
    }
  };

 
 


const handleLikeToggle = async (itemId) => {
    try {
      const response = await axios.post(
        `${EndPoint}/ToggleLikeView/${itemId}/`,
        {},
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );



      const updatedLikes = response.data.Likes;
      const isLiked = response.data.isLiked;  // Get the updated like status
       const message = response.data.message;
       
       console.log("IS LIKED",isLiked );
      // Update queryset with new likes count
      const updatedQueryset = queryset.map((item) =>
        item.id === itemId ? { ...item, Likes: updatedLikes } : item
      );
      setQueryset(updatedQueryset);

      // Update liked items
      //hii ni kwaajili ya kuchange color ya like button
      // if (isLiked) {
      //   likedItems.add(itemId);
      // } else {
      //   likedItems.delete(itemId);
      // }
      // setLikedItems(new Set(likedItems)); // Update state

        // Update liked items to immediately reflect the change
        if (!isLiked) {
            setLikedItems(prevLikedItems => new Set(prevLikedItems).add(itemId));
        } else {
            setLikedItems(prevLikedItems => {
                const updatedSet = new Set(prevLikedItems);
                updatedSet.delete(itemId);
                return updatedSet;
            });
        }


       // Cheza sauti baada ya kubonyeza kitufe
      await soundRef.current.replayAsync();




    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };















  // Ongeza soundRef kwa ajili ya sauti
  const soundRef = useRef(new Audio.Sound());

  // Pakia sauti unapofungua skrini
  useEffect(() => {
    const loadSound = async () => {
      try {
        await soundRef.current.loadAsync(require('../assets/like.mp3')); // Badilisha na njia ya faili ya sauti
      } catch (error) {
        console.error('Error loading sound:', error);
      }
    };

    loadSound();

    // Safisha sauti baada ya skrini kufungwa
    return () => {
      soundRef.current.unloadAsync();
    };
  }, []);



//-------------NI KWA AJILI YA KUEXPAND TEXT-----------

const [textHeight, setTextHeight] = useState({});
const [lineLimit, setLineLimit] = useState(3); // Number of lines to limit

const handleTextLayout = (itemId, event) => {
  const { height } = event.nativeEvent.layout;
  const lineHeight = 18; // Assuming a line height of 18 (you can adjust this based on your styling)
  const maxHeight = lineHeight * lineLimit; // Calculate the max height for 3 lines

  if (height > maxHeight) {
    setTextHeight(prev => ({ ...prev, [itemId]: height }));
  } else {
    setTextHeight(prev => ({ ...prev, [itemId]: 0 })); // No expansion needed if height is less than max
  }
};


 //const [isExpanded, setIsExpanded] = useState(false); // State to manage text expansion
const [expandedItems, setExpandedItems] = useState({}); // State to manage text expansion

  const toggleExpanded = (itemId) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [itemId]: !prevExpandedItems[itemId], // Toggle the expanded state for the clicked item
    }));
  };


  const transportItem = ({item}) => {

     const carouselItems = [
      item.PichaYaPost,
      item.PichaYaPost2,
      item.PichaYaPost3,
      item.PichaYaPost4,
      item.PichaYaPost5,
      // { src: item.PichaYaPost},
      // { src: item.PichaYaPost2},
      // { src: item.PichaYaPost2},
      // { src: item.PichaYaPost4},
      // { src: item.PichaYaPost5},
    ].filter(Boolean); // Filter out any null or undefined values

    //console.log("Carousel Items:", carouselItems);
    const isLiked = likedItems.has(item.id);



    if (input === ""){

    return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >



         {/*mwanzo mwa informations za mtu aliyepost*/}

            <View style={globalStyles.UserInfoContainer}>
              
            {/*mwanzo wa left info*/}
             <View style={globalStyles.UserInfoLeftContainer}>
             {item.profile_image ? ( 
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={{
                      uri: EndPoint + '/' + item.profile_image
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={require('../assets/profile.jpg')} 
                  >
                  </Image>
                )}
               
             </View>
           {/*mwisho wa left info*/}

           {/*mwanzo wa middle info*/}
           {item.TickStatus == "Ndio Anastahili" && (
           <View style={globalStyles.UserInfoMiddleContainer}>
           
             <Text style={globalStyles.UserInfoUsername}>
               <FontAwesome name='check-square-o' 
              size={20}
              //color="black" 
              color="green" 
              
               />
             </Text>
              </View>
              )}
            {/*mwisho wa middle info*/}

             
             {/*mwanzo wa right info*/}
           <View style={[
            globalStyles.UserInfoRightContainer,
            {
              width: item.TickStatus == "Ndio Anastahili" ? '60%' : '75%'
            }
            ]
          }>
           {item.company_name && item.company_name != 'null' ? (
             <Text style={globalStyles.UserInfoUsername}>
             {item.company_name}</Text>
             ):(
              <Text style={globalStyles.UserInfoUsername}>
             {item.username}</Text>
             )}
           </View>
            {/*mwisho wa right info*/}



            </View>
           
           {/*mwanzo mwa informations za mtu aliyepost*/}

                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={[globalStyles.AppItemNameHomeScreen,
                    {
                      marginBottom:15,
                    }

                    ]}

                 >{item.Title}</Text>


 <PinchGestureHandler onGestureEvent={pinchHandler}>
   <Animated.View style={[styles.imageContainer, animatedStyle]}>

<Carousel images={carouselItems} />

 </Animated.View>
  </PinchGestureHandler>
    
      
           {/*    <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.PichaYaPost ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={{
                      uri: EndPoint + '/' + item.PichaYaPost
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
               </View>*/}








  {item.Maelezo && (
               <TouchableOpacity style={{
                 width:'90%',
                 marginHorizontal:20,
               }}>
             
             
               <Text style={{
                color:'black',
                fontFamily:'Light',
               }}
               //numberOfLines={isExpanded ? 0 : 3}
                numberOfLines={expandedItems[item.id] ? undefined : 3}
          onLayout={(event) => handleTextLayout(item.id, event)}
               >
                 {item.Maelezo}
               </Text>
                {textHeight[item.id] > lineLimit * 18 && !expandedItems[item.id] && (
                <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
                  <Text style={[styles.readMoreText,
                    {
                      fontFamily:'Medium',
                      color:'green',
                      //color:textHeight[item.id] > lineLimit * 18 && !expandedItems[item.id] ? 'white' : 'green',
                    }

                    ]}>Soma Zaidi -></Text>
                </TouchableOpacity>
              )}
              {expandedItems[item.id] && (
                <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
                  <Text style={[styles.readMoreText,
                    {
                      fontFamily:'Medium',
                      color:'red',
                    }

                    ]}> Funga</Text>
                </TouchableOpacity>
              )}
                 
               </TouchableOpacity>
               )}


                  <TouchableOpacity 

                  style={[globalStyles.AppItemButtonHomeScreen,
                    {
                      width:'90%',
                    //padding:5,
                   // borderRadius:6,
                    marginTop:20,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    }


                    ]}

                 
                >
            {/*mwanzo wa view ya left*/}
              <TouchableOpacity 

             onPress={() => {
           navigation.navigate('View Duka Lako', item);    
        }}


        //   onPress={async () => {
        //   if (rewardedInterstitialLoaded) {
        //     try {
        //       await rewardedInterstitial.show();
        //       navigation.navigate('View Duka Lako', item); 
        //     } catch (error) {
        //       console.log('Error showing ad', error);
        //       //Alert.alert('Error', 'Failed to show ad. Please try again.');
        //       navigation.navigate('View Duka Lako', item); 
        //     }
        //   } else {
        //     navigation.navigate('View Duka Lako', item); 
        //   }
        // }}



         >
           <View style={globalStyles.LeftBtnContainer}>
          {/*  <Text 
          style={globalStyles.AppItemButtonTextHomeScreen}
        >Wasiliana naye</Text>*/}
            <FontAwesome name='phone' 
            size={20}
            color="black" 
            style={globalStyles.AppItemButtonTextHomeScreen}
            
       />
         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya left*/}



           {/*mwanzo wa view ya comment*/}
         <TouchableOpacity 
          onPress={() => navigation.navigate('All Chatting Screen', item)}
          >
         <View style={[globalStyles.RightBtnContainer,
          {
            backgroundColor:'green',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            paddingVertical:8,
            paddingHorizontal:10,
            borderRadius:8,
          }

          ]}>
         <View>
          {/* <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'red',
          marginTop:5,
         }}> 4
         </Text>*/}
         <Text 
          style={{
            color:'white',
            marginRight:10,
          }}
        >Chati</Text>
         </View>
        
        <View>
           <FontAwesome name='comment-o' 
      size={20}
      color="white" 
            
       />
        </View>
        

         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya comment*/}


       {/*mwanzo wa view ya right*/}
         <TouchableOpacity 
          onPress={() => handleLikeToggle(item.id)}
          >
         <View style={globalStyles.RightBtnContainer}>
         <View>
           <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'red',
          marginTop:5,
         }}> {item.Likes}
         </Text>
         </View>
        
        <View>
           <FontAwesome name='heart' 
      size={20}
      //color="black" 
      color={isLiked ? 'red' : 'black'} 
      
       />
        </View>
        

         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya right*/}


                  </TouchableOpacity>
                </View>
                <View>
                 
                </View>
              </View>
           </CustomCard>


           )




     // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if(item.Title.toLowerCase().includes(input.toLowerCase())){
  
   return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >



         {/*mwanzo mwa informations za mtu aliyepost*/}

            <View style={globalStyles.UserInfoContainer}>
              
            {/*mwanzo wa left info*/}
             <View style={globalStyles.UserInfoLeftContainer}>
             {item.profile_image ? ( 
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={{
                      uri: EndPoint + '/' + item.profile_image
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={require('../assets/profile.jpg')} 
                  >
                  </Image>
                )}
               
             </View>
           {/*mwisho wa left info*/}

           {/*mwanzo wa middle info*/}
           {item.TickStatus == "Ndio Anastahili" && (
           <View style={globalStyles.UserInfoMiddleContainer}>
           
             <Text style={globalStyles.UserInfoUsername}>
               <FontAwesome name='check-square-o' 
              size={20}
              //color="black" 
              color="green" 
              
               />
             </Text>
              </View>
              )}
            {/*mwisho wa middle info*/}

             
             {/*mwanzo wa right info*/}
           <View style={[
            globalStyles.UserInfoRightContainer,
            {
              width: item.TickStatus == "Ndio Anastahili" ? '60%' : '75%'
            }
            ]
          }>
           {item.company_name && item.company_name != 'null' ? (
             <Text style={globalStyles.UserInfoUsername}>
             {item.company_name}</Text>
             ):(
              <Text style={globalStyles.UserInfoUsername}>
             {item.username}</Text>
             )}
           </View>
            {/*mwisho wa right info*/}



            </View>
           
           {/*mwanzo mwa informations za mtu aliyepost*/}

                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={[globalStyles.AppItemNameHomeScreen,
                    {
                      marginBottom:15,
                    }

                    ]}

                 >{item.Title}</Text>


 <PinchGestureHandler onGestureEvent={pinchHandler}>
   <Animated.View style={[styles.imageContainer, animatedStyle]}>

<Carousel images={carouselItems} />

 </Animated.View>
  </PinchGestureHandler>
    
      
           {/*    <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.PichaYaPost ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={{
                      uri: EndPoint + '/' + item.PichaYaPost
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
               </View>*/}








  {item.Maelezo && (
               <TouchableOpacity style={{
                 width:'90%',
                 marginHorizontal:20,
               }}>
             
             
               <Text style={{
                color:'black',
                fontFamily:'Light',
               }}
               //numberOfLines={isExpanded ? 0 : 3}
                numberOfLines={expandedItems[item.id] ? undefined : 3}
          onLayout={(event) => handleTextLayout(item.id, event)}
               >
                 {item.Maelezo}
               </Text>
                {textHeight[item.id] > lineLimit * 18 && !expandedItems[item.id] && (
                <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
                  <Text style={[styles.readMoreText,
                    {
                      fontFamily:'Medium',
                      color:'green',
                      //color:textHeight[item.id] > lineLimit * 18 && !expandedItems[item.id] ? 'white' : 'green',
                    }

                    ]}>Soma Zaidi -></Text>
                </TouchableOpacity>
              )}
              {expandedItems[item.id] && (
                <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
                  <Text style={[styles.readMoreText,
                    {
                      fontFamily:'Medium',
                      color:'red',
                    }

                    ]}> Funga</Text>
                </TouchableOpacity>
              )}
                 
               </TouchableOpacity>
               )}


                  <TouchableOpacity 

                  style={[globalStyles.AppItemButtonHomeScreen,
                    {
                      width:'90%',
                    //padding:5,
                   // borderRadius:6,
                    marginTop:20,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    }


                    ]}

                 
                >
            {/*mwanzo wa view ya left*/}
              <TouchableOpacity 

             onPress={() => {
           navigation.navigate('View Duka Lako', item);    
        }}


        //   onPress={async () => {
        //   if (rewardedInterstitialLoaded) {
        //     try {
        //       await rewardedInterstitial.show();
        //       navigation.navigate('View Duka Lako', item); 
        //     } catch (error) {
        //       console.log('Error showing ad', error);
        //       //Alert.alert('Error', 'Failed to show ad. Please try again.');
        //       navigation.navigate('View Duka Lako', item); 
        //     }
        //   } else {
        //     navigation.navigate('View Duka Lako', item); 
        //   }
        // }}



         >
           <View style={globalStyles.LeftBtnContainer}>
          {/*  <Text 
          style={globalStyles.AppItemButtonTextHomeScreen}
        >Wasiliana naye</Text>*/}
            <FontAwesome name='phone' 
            size={20}
            color="black" 
            style={globalStyles.AppItemButtonTextHomeScreen}
            
       />
         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya left*/}



           {/*mwanzo wa view ya comment*/}
         <TouchableOpacity 
          onPress={() => navigation.navigate('All Chatting Screen', item)}
          >
         <View style={[globalStyles.RightBtnContainer,
          {
            backgroundColor:'green',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            paddingVertical:8,
            paddingHorizontal:10,
            borderRadius:8,
          }

          ]}>
         <View>
          {/* <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'red',
          marginTop:5,
         }}> 4
         </Text>*/}
         <Text 
          style={{
            color:'white',
            marginRight:10,
          }}
        >Chati</Text>
         </View>
        
        <View>
           <FontAwesome name='comment-o' 
      size={20}
      color="white" 
            
       />
        </View>
        

         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya comment*/}


       {/*mwanzo wa view ya right*/}
         <TouchableOpacity 
          onPress={() => handleLikeToggle(item.id)}
          >
         <View style={globalStyles.RightBtnContainer}>
         <View>
           <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'red',
          marginTop:5,
         }}> {item.Likes}
         </Text>
         </View>
        
        <View>
           <FontAwesome name='heart' 
      size={20}
      //color="black" 
      color={isLiked ? 'red' : 'black'} 
      
       />
        </View>
        

         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya right*/}


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





<MinorHeader title="Duka Lako" />



    <View style={globalStyles.searchbarOtherPages}>

                 <View style={globalStyles.searchbarIconContainerOtherPages}>
                    <Ionicons name="search-outline" 
                    size={25} 
                    color={COLORS.black} 

                    style={globalStyles.AppIConHomeScreenOtherPages}

                      />
                    </View>

                    <View style={globalStyles.searchbarInputContainerOtherPages}>
                    <TextInput 
                    value={input} onChangeText ={(text) => setInput(text)}
                    placeholder="Tafuta bidhaa, mfano mayai" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>

                  </View>



              <View style={globalStyles.bottomview}>

 

          {/*  mwanzo wa Itself container*/}
            {MtoaMaoniLocation ? (
              <View style={[globalStyles.ItselfMajorContainer,

                  {
                  backgroundColor:'green',
                  width:'100%',
                }

                ]}>
             
             <View style={globalStyles.ItselfLeftMinorContainer}>
             <TouchableOpacity 
              

               onPress={() => {
            navigation.navigate('Your Posts');  

        }}

        //   onPress={async () => {
        //   if (rewardedInterstitialLoaded) {
        //     try {
        //       await rewardedInterstitial.show();
        //       navigation.navigate('Your Posts');  
        //     } catch (error) {
        //       console.log('Error showing ad', error);
        //       //Alert.alert('Error', 'Failed to show ad. Please try again.');
        //       navigation.navigate('Your Posts');  
        //     }
        //   } else {
        //     navigation.navigate('Your Posts');  
        //   }
        // }}





        style={{
          width:'50%',
        }}
             >
              <Text style={[globalStyles.ItselfLeftMinorText,
                 {
                  backgroundColor:'yellow',
                  color:'black'
                }

                ]}>Duka Langu</Text>
              </TouchableOpacity>
              </View>
             

           
              <TouchableOpacity 
            onPress={() => {
            navigation.navigate('Duka Lako Form');    
        }}

        //   onPress={async () => {
        //   if (rewardedInterstitialLoaded) {
        //     try {
        //       await rewardedInterstitial.show();
        //       navigation.navigate('Duka Lako Form'); 
        //     } catch (error) {
        //       console.log('Error showing ad', error);
        //       //Alert.alert('Error', 'Failed to show ad. Please try again.');
        //       navigation.navigate('Duka Lako Form'); 
        //     }
        //   } else {
        //     navigation.navigate('Duka Lako Form'); 
        //   }
        // }}


              style={[globalStyles.ItselfRightMinorContainer,
                {
                  width:'40%',
                  //backgroundColor:'red',
                }

                ]}>
              <View style={{
                //backgroundColor:'red',
              }}>
                {/*  <FontAwesome name='plus-square-o' 
                  size={30}
                  color='brown'  
                  
                   />*/}
                      <Text 
              style={[
                globalStyles.ItselfRightiMinorText,
                {
                 backgroundColor:'blue',
                  color:'white',
                  fontFamily:'Bold',
                  //marginRight:30,
                  width:'50%',
                  textAlign:'center',
                  borderRadius:5,
                  paddingVertical:7,
                }

                ]}>POSTI</Text>
              </View>
              </TouchableOpacity>
             
                
              </View>
               ):(

          <View style={[globalStyles.ItselfMajorContainer,

                  {
                  backgroundColor:'black',
                }

                ]}>
             
             <View style={globalStyles.ItselfLeftMinorContainer}>
             <TouchableOpacity 
               onPress={() => {
            navigation.navigate('Update Stack');    
        }}


         




             >
              <Text style={[globalStyles.ItselfLeftMinorText,
                 {
                  backgroundColor:'brown',
                  color:'white'
                }

                ]}>Malizia Usajili ili uweze kuweka posti mpya</Text>
              </TouchableOpacity>
              </View>
             

           
              <TouchableOpacity 
            onPress={() => {
            navigation.navigate('Update Stack');    
        }}


         




              style={globalStyles.ItselfRightMinorContainer}>
              <View >
                  <FontAwesome name='user-circle' 
                  size={30}
                  color='white'  
                  
                   />
              </View>
              </TouchableOpacity>
             
                
              </View>

               )}
             {/*  mwisho wa Itself container*/}
            



                <Text
                style={globalStyles.AppChaguaHudumaTextHomeScreen}  
                
                >Posti mbalimbali za watu</Text>


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
  <Text style={globalStyles.noitemText}>Hakuna posti yoyote iliyopo kwasasa!! !
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

   slideContainer: {
    width:width-20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  slideImage: {
    width,
    height: height/4, // Adjust the height to fit your design
    resizeMode: 'cover',
  },
  carouselContainer: {
    marginVertical: 10,
    overflow: 'hidden',

  },
  carouselContent: {
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeCount: {
    fontSize: 14,
    marginRight: 5,
    color: 'red',
  },
 
});