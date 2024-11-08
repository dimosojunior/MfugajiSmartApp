
import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,
  
   
  KeyboardAvoidingView 
   } from 'react-native';
import React, {useState,useRef, useEffect, useContext} from 'react';

import {globalStyles} from '../Styles/GlobalStyles';

import { EndPoint } from "../Constant/links";
import useFetch from '../useFetch';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import LotterViewScreen from '../Screens/LotterViewScreen';
//import Header from '../Header/header';
import MinorHeader from '../Header/MinorHeader';
import COLORS  from '../Constant/colors';


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

import LottieView from 'lottie-react-native';




//  import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';


// const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-4524511699441606/6815431262';
// const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-4524511699441606/7007002951';

// const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
//   requestNonPersonalizedAdsOnly: true
// });

// const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true
// });





const {width, height} = Dimensions.get('window');


const UmriWaKukuMabadilikoYaLishe = ({navigation, route}) => {




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


const { 
    
    id,
    JinaLaHuduma,
    AinaYaKuku 
   } = route.params


  //const KukuId = id;

    // To change color
// const theme = useContext(themeContext)
// const [darkMode, setdarkMode] = useState(false)
 
 const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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












//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);


//FOR SEARCHING
const [input, setInput] = useState('');


const getItems = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetUmriWaKukuView/?page=${current_page}&page_size=24`
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
















const formatToThreeDigits = (number) => {
  if (number !== null) {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 0, // Ensure two decimal places
      maximumFractionDigits: 2, // Limit to two decimal places
      minimumIntegerDigits: 1, // Ensure at least one integer digit
    });
  }
  return null;
};









const InventoryCard = ({item, index}) => {
  


//mwanzo wa search
   if (input === ""){

 
 return (


 
<>
{input != '' && (


      <TouchableOpacity

    
     
      
      style={[
        globalStyles.IdadiYaKukuFirstContainer,
        {
          //backgroundColor:'red',
          width:'100%',
          //flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
        }
      ]} >


        <View 
        style={{
          //backgroundColor:'red'
        }}
        >

      <Text style={{
        backgroundColor:'green',
        paddingVertical:30,
        marginVertical:10,
        color:'white',
        borderRadius:8,
        paddingHorizontal:30,

      }}> Umri wa kuku wako: {input}</Text>
            
          
        </View>



      </TouchableOpacity>






)}
</>






)



  // hili bano la chini ni la if ya juu kama mtu akitype   
}

if (item.UmriKwaWiki.toString().toLowerCase().includes(input.toLowerCase())) {
 return (



      <TouchableOpacity
       onPress={() =>
        navigation.navigate('Mabadiliko Ya Lishe Form', {...item,AinaYaKuku, JinaLaHuduma})
      }


        //  onPress={async () => {
        //   if (rewardedInterstitialLoaded) {
        //     try {
        //       await rewardedInterstitial.show();
        //       navigation.navigate('Mabadiliko Ya Lishe Form', {...item,AinaYaKuku, JinaLaHuduma});
        //     } catch (error) {
        //       console.log('Error showing ad', error);
        //       //Alert.alert('Error', 'Failed to show ad. Please try again.');
        //       navigation.navigate('Mabadiliko Ya Lishe Form', {...item,AinaYaKuku, JinaLaHuduma});
        //     }
        //   } else {
        //     navigation.navigate('Mabadiliko Ya Lishe Form', {...item,AinaYaKuku, JinaLaHuduma});
        //   }
        // }}
       
     
      
      style={globalStyles.OverdoseCartItemsContainer} >


        <View 
        style={globalStyles.OverdoseLeftCartItemsContainer}
        >

        {item.UmriKwaWiki && (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Wiki  :

          </Text>
          )}

         {item.Interval && (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Siku :
          </Text>
          )}


      

         
        {/*  <Text
           style={globalStyles.OverdoseIconCartItemsText}
          >
            
        <FontAwesome
        style={globalStyles.OverdoseIcon1CartItems}
          
          name="cart-arrow-down"
          size={15}
          color="black"
        />
           
          </Text>*/}
       

           




      
            
          
        </View>



        <Pressable 
         onPress={() =>
        navigation.navigate('Mabadiliko Ya Lishe Form', {...item,AinaYaKuku, JinaLaHuduma})}
       

        //   onPress={async () => {
        //   if (rewardedInterstitialLoaded) {
        //     try {
        //       await rewardedInterstitial.show();
        //       navigation.navigate('Mabadiliko Ya Lishe Form', {...item,AinaYaKuku, JinaLaHuduma});
        //     } catch (error) {
        //       console.log('Error showing ad', error);
        //       //Alert.alert('Error', 'Failed to show ad. Please try again.');
        //       navigation.navigate('Mabadiliko Ya Lishe Form', {...item,AinaYaKuku, JinaLaHuduma});
        //     }
        //   } else {
        //     navigation.navigate('Mabadiliko Ya Lishe Form', {...item,AinaYaKuku, JinaLaHuduma});
        //   }
        // }}
       

        style={globalStyles.OverdoseImageContainerCartItems}
        >
      





       
        {item.UmriKwaWiki >= 24 ? (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.UmriKwaWiki} na zaidi
          </Text>
          ):(

            <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.UmriKwaWiki}
          </Text>

          )}

         {item.UmriKwaWiki >= 24 ? (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            168 na zaidi
          </Text>
          ):(
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.Interval}
          </Text>

          )}







        </Pressable>









      </TouchableOpacity>






)








// hili bano la chini ni la if ya pili mwisho
  }



}
  
  return (

    <>{!fontsLoaded ? (<View/>):(


    <>


 {!isPending ? (

     <View style={[globalStyles.container
     ,{backgroundColor:COLORS.white}]}>
         
     



  <MinorHeader title="Umri Wa Kuku"/>

      






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
                    placeholder="Ingiza wiki" 
                     placeholderTextColor='black'
                     keyboardType="numeric"
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>




  {input != '' && input > 24 && (
  <Text
      style={globalStyles.AppChaguaHudumaTextHomeScreen}  
      
      >Ingiza wiki 24 ili kuendelea kama kuku wako wana umri zaidi ya wiki 24 (Miezi 6)</Text>
 
)}


  {input != '' && input <= 24 && (
  <Text
      style={globalStyles.AppChaguaHudumaTextHomeScreen}  
      
      >Tafdhali chagua umri wa kuku wako wa wiki {input} hapo chini kuendelea</Text>
 

 )}

    {input == '' && (

 <View>



<View style={{
          width:width,
          //justifyContent:'center',
          alignItems:'center',
          //flex:1,
          backgroundColor:'lightgreen',
          height:height,
        }}>

        <Text
    style={globalStyles.AppChaguaHudumaTextHomeScreen}  
    
    >Tafadhali, tuambie kuku wako wana umri gani? (ingiza wiki walizonazo kuku wako, mwisho wiki 24)</Text>

     {/* <Image
        source={item?.RouteImage}
        style={{
          height: height/2 - 70,
         width:'80%',
         borderRadius:5,
       }}
      />*/}
       <LottieView
        style={{
        height: height/2,
         width:'80%',
         borderRadius:5,
         // backgroundColor:'red',
         // justifyContent:'center',
         // alignItems:'center',
         zIndex:1,

        // flex:1,

        }}
        source={require('../assets/Loading/l2.json')} // Replace with your animation JSON file
        autoPlay
        loop
      />

      </View>





</View>

 )}





       









       







      
    {queryset && queryset.length > 0 ? (

        <>

         {setLoading===true?(<ActivityIndicator/>):(
      <>

   
      <FlatList
          data={queryset}
          showsVerticalScrollIndicator={false}
         // style={{marginTop: 12, width: '100%'}}
          renderItem={InventoryCard}
          numColumns={2}
          ListFooterComponent={renderLoader}
          onEndReached={getItems}
          onEndReachedThreshold={0.5}
          keyboardShouldPersistTaps="handled"
        />
                
 </>
      )}

         </>



   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>Hakuna taarifa za umri wa kuku! !
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











{/*<View style={{
  marginBottom:100,
}}>
  <Text style={{
    color:'white',
  }}>Vuta juu</Text>
</View>
*/}

{/*mwanzo kwaajili ya kupress order*/}






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
                    <Image source={require('../assets/splashe.png')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>MFUGAJI SMART</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />




     </View> 


            ):(

<LotterViewScreen />

)}

    

    </>



    )}</>
  );
};

export default UmriWaKukuMabadilikoYaLishe;

const styles = StyleSheet.create({});
