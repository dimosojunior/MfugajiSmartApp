import React, { useState, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
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




//  import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';


// const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-4524511699441606/6815431262';
// const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-4524511699441606/7007002951';

// const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
//   requestNonPersonalizedAdsOnly: true
// });

// const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true
// });


export default function KumbushoLaUatamiaji_AinaZaNdege ({navigation, route}) {




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
    JinaLaHuduma 
   } = route.params


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
   const url = EndPoint + `/GetAinaZaNdegeView/?page=${current_page}&page_size=2`
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
              style={globalStyles.AppItemContainerHomeScreenOtherPages}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameHomeScreenOtherPages}

                 >{item.AinaYaNdege}</Text>


               <View 
                style={globalStyles.AppItemImageContainerHomeScreenOtherPages}
              >
              {item.PichaYaNdege ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreenOtherPages}
                   source={{
                      uri: EndPoint + '/' + item.PichaYaNdege
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageHomeScreenOtherPages}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>


                  <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreenOtherPages}

                   onPress={() =>
                    navigation.navigate('Kumbusho La Uatamiaji Form', {...item, JinaLaHuduma})
                   }
                  
              
        //     onPress={async () => {
        //   if (rewardedInterstitialLoaded) {
        //     try {
        //       await rewardedInterstitial.show();
        //       navigation.navigate('Kumbusho La Uatamiaji Form', {...item, JinaLaHuduma});
        //     } catch (error) {
        //       console.log('Error showing ad', error);
        //       //Alert.alert('Error', 'Failed to show ad. Please try again.');
        //       navigation.navigate('Kumbusho La Uatamiaji Form', {...item, JinaLaHuduma});
        //     }
        //   } else {
        //     navigation.navigate('Kumbusho La Uatamiaji Form', {...item, JinaLaHuduma});
        //   }
        // }}

                   >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreenOtherPages}
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

 if(item.AinaYaNdege.toLowerCase().includes(input.toLowerCase())){


return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreenOtherPages}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameHomeScreenOtherPages}

                 >{item.AinaYaNdege}</Text>


               <View 
                style={globalStyles.AppItemImageContainerHomeScreenOtherPages}
              >
              {item.PichaYaNdege ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreenOtherPages}
                   source={{
                      uri: EndPoint + '/' + item.PichaYaNdege
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageHomeScreenOtherPages}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>


                  <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreenOtherPages}

                   onPress={() =>
                    navigation.navigate('Kumbusho La Uatamiaji Form', {...item, JinaLaHuduma})}
                  

                 
        //     onPress={async () => {
        //   if (rewardedInterstitialLoaded) {
        //     try {
        //       await rewardedInterstitial.show();
        //       navigation.navigate('Kumbusho La Uatamiaji Form', {...item, JinaLaHuduma});
        //     } catch (error) {
        //       console.log('Error showing ad', error);
        //       //Alert.alert('Error', 'Failed to show ad. Please try again.');
        //       navigation.navigate('Kumbusho La Uatamiaji Form', {...item, JinaLaHuduma});
        //     }
        //   } else {
        //     navigation.navigate('Kumbusho La Uatamiaji Form', {...item, JinaLaHuduma});
        //   }
        // }}




                   >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreenOtherPages}
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





<MinorHeader title="Mayai" />



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
                    placeholder="Tafuta aina ya ndege" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>



              <View style={globalStyles.bottomview}>
            



                <Text
                style={globalStyles.AppChaguaHudumaTextHomeScreen}  
                
                >Chagua Aina Ya Ndege</Text>


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
                    numColumns={2}

                    ListFooterComponent={renderLoader}
                    onEndReached={getItems}
                    onEndReachedThreshold={0.5}
                  />


                        </>
      )}

         </>



      ) : (
       

 <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>Hakuna aina yeyote ya ndege kwasasa!! !
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