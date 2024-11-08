import React, { useState,useContext,useRef,memo,useCallback, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Pressable,
  Linking,
  Alert,
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
import { useFocusEffect } from '@react-navigation/native';

import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');



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
          style={{
           height: height / 3 + 150,
           width: screenWidth, borderRadius: 10 }}
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



export default function YourPosts ({navigation}) {

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

const message = "Tafadhali! naomba kuidhinisha biashara yangu"

const HudumaKwaWatejaNumber = "0759536085";


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
    const url = `${EndPoint}/GetAllDukaLakoPostedByUserItselfView/?page=${current_page}&page_size=2`;
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


//const [likes, setLikes] = useState(0);
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
    
    // Pata item iliyosasishwa
    const updatedLikes = response.data.Likes;

    // Sasisha queryset
    const updatedQueryset = queryset.map((item) =>
      item.id === itemId ? { ...item, Likes: updatedLikes } : item
    );
    setQueryset(updatedQueryset);
    console.log("Umeweka like");
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};





  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
 
 
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

                  style={globalStyles.AppItemNameHomeScreen}

                 >{item.Title}</Text>


       <Carousel images={carouselItems} />
{/*

               <View 
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

               
        >
           <View style={globalStyles.LeftBtnContainer}>
            <Text 
          style={[
      globalStyles.AppItemButtonTextHomeScreen,

      {
        backgroundColor:'rgba(0,0,0,0)',
        color:'green',
      }

      ]}
        >{formatDate(item.Created)}</Text>
         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya left*/}


       {/*mwanzo wa view ya right*/}
         <Pressable 
          // onPress={() => handleLikeToggle(item.id)}
          >
         <View style={globalStyles.RightBtnContainer}>
         <View>
           <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'red',
          marginTop:5,
         }}>{item.Likes} 
         </Text>
         </View>
        
        <View>
           <FontAwesome name='heart' 
      size={20}
      color='brown'  
      
       />
        </View>
        

         </View>
         </Pressable>
          {/*mwisho wa view ya right*/}


                  </TouchableOpacity>





{/*mwanzo wa action buttons*/}

{/*mwanzo wa mstari*/}
 <View style={{
  borderBottomColor:'green',
  borderBottomWidth:1,
  marginTop:10,
 }}>
   <Text>
     
   </Text>
 </View>
{/*mwiso wa mstari*/}

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

               
        >
       {/* <Pressable 
      onPress={() => navigation.navigate('Edit Post DukaLako', {...item, postId: item.id })}

          >
         <View style={globalStyles.RightBtnContainer}>
         <View>
           <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'green',
          marginTop:5,
         }}>Badilisha
         </Text>
         </View>
        
        <View>
           <FontAwesome name='pencil-square-o' 
      size={20}
      color='green'  
      
       />
        </View>
        

         </View>
         </Pressable>*/}
         </TouchableOpacity>
          {/*mwisho wa view ya left*/}


       {/*mwanzo wa view ya right*/}
         <Pressable 
        onPress={() => navigation.navigate('Delete Post DukaLako', {...item, postId: item.id })}

          >
         <View style={globalStyles.RightBtnContainer}>
         <View>
           <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'red',
          marginTop:5,
         }}>Futa
         </Text>
         </View>
        
        <View>
           <FontAwesome name='trash-o' 
      size={20}
      color='brown'  
      
       />
        </View>
        

         </View>
         </Pressable>
          {/*mwisho wa view ya right*/}


                  </TouchableOpacity>




{/*mwisho wa action buttons*/}

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

                  style={globalStyles.AppItemNameHomeScreen}

                 >{item.Title}</Text>


       <Carousel images={carouselItems} />
{/*

               <View 
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

               
        >
           <View style={globalStyles.LeftBtnContainer}>
            <Text 
          style={[
      globalStyles.AppItemButtonTextHomeScreen,

      {
        backgroundColor:'rgba(0,0,0,0)',
        color:'green',
      }

      ]}
        >{formatDate(item.Created)}</Text>
         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya left*/}


       {/*mwanzo wa view ya right*/}
         <Pressable 
          // onPress={() => handleLikeToggle(item.id)}
          >
         <View style={globalStyles.RightBtnContainer}>
         <View>
           <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'red',
          marginTop:5,
         }}>{item.Likes} 
         </Text>
         </View>
        
        <View>
           <FontAwesome name='heart' 
      size={20}
      color='brown'  
      
       />
        </View>
        

         </View>
         </Pressable>
          {/*mwisho wa view ya right*/}


                  </TouchableOpacity>





{/*mwanzo wa action buttons*/}

{/*mwanzo wa mstari*/}
 <View style={{
  borderBottomColor:'green',
  borderBottomWidth:1,
  marginTop:10,
 }}>
   <Text>
     
   </Text>
 </View>
{/*mwiso wa mstari*/}

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

               
        >
       {/* <Pressable 
      onPress={() => navigation.navigate('Edit Post DukaLako', {...item, postId: item.id })}

          >
         <View style={globalStyles.RightBtnContainer}>
         <View>
           <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'green',
          marginTop:5,
         }}>Badilisha
         </Text>
         </View>
        
        <View>
           <FontAwesome name='pencil-square-o' 
      size={20}
      color='green'  
      
       />
        </View>
        

         </View>
         </Pressable>*/}
         </TouchableOpacity>
          {/*mwisho wa view ya left*/}


       {/*mwanzo wa view ya right*/}
         <Pressable 
        onPress={() => navigation.navigate('Delete Post DukaLako', {...item, postId: item.id })}

          >
         <View style={globalStyles.RightBtnContainer}>
         <View>
           <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'red',
          marginTop:5,
         }}>Futa
         </Text>
         </View>
        
        <View>
           <FontAwesome name='trash-o' 
      size={20}
      color='brown'  
      
       />
        </View>
        

         </View>
         </Pressable>
          {/*mwisho wa view ya right*/}


                  </TouchableOpacity>




{/*mwisho wa action buttons*/}

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
                    placeholder="Tafuta " 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>

                  </View>



              <View style={globalStyles.bottomview}>



          {/*  mwanzo wa Itself container*/}
              <View style={[
                globalStyles.ItselfMajorContainer,
                {
                  backgroundColor:'lightgreen',
                  width:'100%',
                }

                ]}>
             
             <View style={globalStyles.ItselfLeftMinorContainer}>
             <TouchableOpacity 
               onPress={() => {
            navigation.navigate('See Notifications');    
        }}
        style={{
          width:'50%',
        }}
             >
              <Text 
              style={[
                globalStyles.ItselfLeftMinorText,
                {
                  backgroundColor:'green',
                  color:'white'
                }

                ]}>Taarifa</Text>
              </TouchableOpacity>
              </View>
             
              <TouchableOpacity 
            onPress={() => {
            navigation.navigate('Duka Lako Form');    
        }}
              style={[globalStyles.ItselfRightMinorContainer,
                {
                  width:'40%',
                  //backgroundColor:'red',
                }

                ]}>
              <View >
                  {/*<FontAwesome name='plus-square-o' 
                  size={30}
                  color='red'  
                  
                   />*/}
                    <Text 
              style={[
                globalStyles.ItselfRightiMinorText,
                {
                  //backgroundColor:'white',
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
             {/*  mwisho wa Itself container*/}
            

       {/*  mwanzo wa omba kuidhinishwa*/}
             <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              width:'95%',
              marginTop:20,
             }}>

                <Text
                style={[globalStyles.AppChaguaHudumaTextHomeScreen,
                  {
                    width:'40%',
                  }

                  ]}  
                
                >Posti zako mwenyewe</Text>
              
              <TouchableOpacity 
             
            //onPress={() => { Linking.openURL(`whatsapp://send?phone=${HudumaKwaWatejaNumber}&text=${message}`)}}
         
   onPress={() => { Linking.openURL(`whatsapp://send?phone=${HudumaKwaWatejaNumber}&text=${message}`)}}
   
       

            style={{
              width:'45%',
            }}
              >
            
       
                 <Text 
              style={[
                globalStyles.ItselfRightiMinorText,
                {
                  //backgroundColor:'white',
                  backgroundColor:'green',
                  color:'white',
                  fontFamily:'Bold',
                  //marginRight:30,
                  // width:'45%',
                  textAlign:'center',
                  borderRadius:5,
                  paddingVertical:7,
                }

                ]}>Omba Kuidhinishwa</Text>
                </TouchableOpacity>

                </View>
               {/* mwisho wa omba kuidhinishwa*/}

               {/*mwanzo wa mstari*/}
             <View style={{
              borderBottomColor:'green',
              borderBottomWidth:1,
              marginTop:10,
             }}>
               <Text>
                 
               </Text>
             </View>
            {/*mwiso wa mstari*/}


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
  <Text style={globalStyles.noitemText}>Huna posti yoyote uliyowahi kuweka!! !
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