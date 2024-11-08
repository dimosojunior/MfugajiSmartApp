
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
import Header from '../Header/header';
import MinorHeader from '../Header/MinorHeader';

// import theme from '../theme/theme';
// import themeContext from '../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

import COLORS  from '../Constant/colors';
import { useFocusEffect } from '@react-navigation/native';
// import { getFormatedDate } from "react-native-modern-datepicker";
// import DatePicker from "react-native-modern-datepicker";

//  import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';


// const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-4524511699441606/6815431262';
// const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-4524511699441606/7007002951';

// const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
//   requestNonPersonalizedAdsOnly: true
// });

// const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true
// });







const { width, height } = Dimensions.get('window');

const AllOrders = ({navigation}) => {



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

  // const { 
    
  //  // KukuId,
  //  // UmriwaKukuId,
  //  // totalCartKilos,
  //  // totalCartPrice,

  //  // StaterFeed,
  //  // FinisherFeed,
  //  // LayerFeed,
  //  // GrowerFeed,
  //  //  AinaYaKuku,
  //  //  UmriKwaWiki,
  //  // UmriKwaSiku,
  //  // UnaKiasiGaniChaChakula
    
  //  } = route.params

  //const ChakulaId = id;
//const UnaKiasiGaniChaChakula = 100;


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





//FOR SEARCHING
const [input, setInput] = useState('');


 const [modalVisible, setModalVisible] = useState(false);
 const [isModalVisible, setIsModalVisible] = useState(false); // New state variable

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orders, setOrders] = useState([]);
  const [mainTotalPrice, setMainTotalPrice] = useState(null);
  const [refresh, setRefresh] = useState(false);

//const [isPending, setisPending] = useState(false);
const [isRange, setisRange] = useState(false);




//Load more
 // const [queryset, setOrders] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);


  

 const pullMe =() => {
    setRefresh(true)

    setTimeout (() => {
      setRefresh(false)
    }, 10)
  }


 const [userToken, setUserToken] = useState('');

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






useEffect(() => {

   
    checkLoggedIn();
    // Fetch cart items only if the user is authenticated
    if (userToken) {
     setLoading(true)
     getProducts();;
    }

  }, [userToken]);


const checkLoggedIn = async () => {
  const token = await AsyncStorage.getItem('userToken');
  setUserToken(token);
  
  
 
};





  useEffect(() => {
  // Calculate the main total price whenever orders change
  if (orders.length > 0) {
    const total = orders.reduce((acc, order) => acc + order.total_price, 0);
    setMainTotalPrice(total);
  }
}, [orders]);

const getProducts = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    const url = EndPoint + `/VyakulaOrder/?page=${current_page}&page_size=2`;
    
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${userToken}`, // Add the Authorization header here
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.orders.length > 0) {
          setOrders([...orders, ...data.orders]);
          setIsLoading(false);
          setLoading(false);
          setcurrent_page(current_page + 1);
          setPending(false);
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
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="red" />
        </View> : null
    );
  };

 




  // Utility function to format the date as "YYYY-MM-DD"
 const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


   const formatDate2 = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  };

 



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







const ReportCard = ({item, index}) => {
  

//mwanzo wa search
   if (input === ""){


 return (


<>
{item.total_price > 0 && (

      <Pressable
      style={[
        globalStyles.VyakulaCartItemsContainerHistoria,
        
      ]} >

{/*OverdoseCartItemsContainer*/}
        <View 
        style={globalStyles.VyakulaLeftCartItemsContainer}
        >

        
         <Text 
           style={globalStyles.VyakulaItemNameCartItemsText}
         >
            Tarehe:  <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
              {formatDate(item.created)}
            </Text>  
          </Text>


          <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Kiasi cha chakula:  <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {item.TotalFoodAmount} Kg
            </Text> 
          </Text>
          


         
          
          
        

       {/*mwanzo wa button*/}
          <TouchableOpacity
                  onPress={() =>
        navigation.navigate('All Ordered Items', item)}

        //     onPress={async () => {
        //   if (rewardedInterstitialLoaded) {
        //     try {
        //       await rewardedInterstitial.show();
        //       navigation.navigate('All Ordered Items', item);
        //     } catch (error) {
        //       console.log('Error showing ad', error);
        //       //Alert.alert('Error', 'Failed to show ad. Please try again.');
        //       navigation.navigate('All Ordered Items', item);
        //     }
        //   } else {
        //     navigation.navigate('All Ordered Items', item);
        //   }
        // }}

       



        //        onPress={() =>
        // navigation.navigate('All Ordered Items', {...item, 
        //   KukuId,UnaKiasiGaniChaChakula,
        //    UmriwaKukuId, 
        //    totalCartKilos, 
        //    totalCartPrice ,

        //    AinaYaKuku,  
        //    StaterFeed,
        //    GrowerFeed, 
        //    LayerFeed, 
        //    FinisherFeed,
        //    UmriKwaWiki,
        //    UmriKwaSiku
        //  })}
       
           style={globalStyles.VyakulaAddButtonContainerCartItems}
                 >
              <Text
               style={[
                globalStyles.VyakulaAddButtonTextCartItems,
                {
                  backgroundColor:'brown',
                }
              ]}
            
              >
                Matokeo
              </Text>
            </TouchableOpacity>
             {/*mwisho wa button*/}
          
        </View>



        <Pressable 

        style={globalStyles.VyakulaImageContainerCartItems}
        >

         <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Muda: <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {formatDate2(item.created)}
            </Text> 
          </Text>


       {/*  <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Bei Ya Jumla: Tsh.  <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {formatToThreeDigits(item.total_price)}/=
            </Text> 
          </Text>
*/}
       






        </Pressable>
      </Pressable>
)}




</>
)





  // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if (item.id.toString().toLowerCase().includes(input.toLowerCase())) {



 return (


<>
{item.total_price > 0 && (

      <Pressable
      style={[
        globalStyles.VyakulaCartItemsContainerHistoria,
        
      ]} >

{/*OverdoseCartItemsContainer*/}
        <View 
        style={globalStyles.VyakulaLeftCartItemsContainer}
        >

        
         <Text 
           style={globalStyles.VyakulaItemNameCartItemsText}
         >
            Awamu ya ukokotoaji:  <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
            {item.id}
            </Text>  
          </Text>


          <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Kiasi cha chakula:  <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {item.TotalFoodAmount} Kg
            </Text> 
          </Text>
          


         
          
          
        

       {/*mwanzo wa button*/}
          <TouchableOpacity

           onPress={() =>
        navigation.navigate('All Ordered Items', item)}

        
        //     onPress={async () => {
        //   if (rewardedInterstitialLoaded) {
        //     try {
        //       await rewardedInterstitial.show();
        //       navigation.navigate('All Ordered Items', item);
        //     } catch (error) {
        //       console.log('Error showing ad', error);
        //       //Alert.alert('Error', 'Failed to show ad. Please try again.');
        //       navigation.navigate('All Ordered Items', item);
        //     }
        //   } else {
        //     navigation.navigate('All Ordered Items', item);
        //   }
        // }}






        //        onPress={() =>
        // navigation.navigate('All Ordered Items', {...item,
        //  KukuId,UnaKiasiGaniChaChakula, 
        //  UmriwaKukuId, 
        //  totalCartKilos,
        //   totalCartPrice,

        //   AinaYaKuku,  
        //    StaterFeed,
        //    GrowerFeed, 
        //    LayerFeed, 
        //    FinisherFeed,
        //    UmriKwaWiki,
        //    UmriKwaSiku 
        // })}
       
           style={globalStyles.VyakulaAddButtonContainerCartItems}
                 >
              <Text
               style={[
                globalStyles.VyakulaAddButtonTextCartItems,
                {
                  backgroundColor:'brown',
                }
              ]}
            
              >
                Matokeo
              </Text>
            </TouchableOpacity>
             {/*mwisho wa button*/}
          
        </View>



        <Pressable 

        style={globalStyles.VyakulaImageContainerCartItems}
        >

         <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Tarehe <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {formatDate(item.created)}
            </Text> 
          </Text>


       {/*  <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Bei Ya Jumla: Tsh.  <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {formatToThreeDigits(item.total_price)}/=
            </Text> 
          </Text>
*/}
       






        </Pressable>
      </Pressable>
)}




</>
)













// hili bano la chini ni la if ya pili mwisho
  }






}
  












  return (

    <>{!fontsLoaded ? (<View/>):(


    <>


 {!isPending ? (

     <View style={[
      globalStyles.container
     ,
         { 
          backgroundColor: isModalVisible ? 
          COLORS.black : COLORS.white,

           opacity: isModalVisible ? 
          0.1 : 1
           }
     ]}>
         
     



  <MinorHeader title="Historia"/>

      










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
                    placeholder="Ingiza namba ya uwiano" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>






 <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Michanganuo yote ya vyakula ulivyowahi kukokotoa</Text>


  
      {orders && orders.length > 0 ? (


      <>
     
 {setLoading===true?(<ActivityIndicator/>):(
      <>
      
      <FlatList
        data={orders}
        renderItem={ReportCard}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderLoader}
        onEndReached={getProducts}
        onEndReachedThreshold={0.5}
      />
      </>
      )}
         </>         




   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>hujachagua chakula chochote kwa sasa! !
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








<View style={{
  marginBottom:100,
}}>
  <Text style={{
    color:'white',
  }}>Vuta juu</Text>
</View>


{/*mwanzo kwaajili ya kupress order*/}





        <Pressable
          style={[{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "white",
            position:'absolute',
            bottom:0,
            width:'100%',

          },
           
          ]}
        >
        {/*  <View style={{
            width:'50%',
          }}>
            <Text style={{ 
              fontFamily:'Medium'
            }}>
              Bei ya jumla
            </Text>

             <Text style={{ 
              fontFamily:'Medium'
            }}>
              Tsh. {formatToThreeDigits(totalCartPrice)}/=
            </Text>
           
          </View>*/}

         

          <TouchableOpacity
        onPress ={() => navigation.navigate('Home Stack')}
           
            style={{
              
              padding: 10,
              width:'100%',
              borderRadius: 6,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            
            <Text style={{
             //fontSize: 16, 
             //fontWeight: "500", 
             color: "white" ,
            // padding:13,
             backgroundColor: "green",
             borderColor:'white',
             borderWidth:1,
             textAlign:'center',
             borderRadius:8,
             width:'100%',
             fontFamily:'Light',
             paddingVertical:10,

           }}>
              Rudi Mwanzo
            </Text>
          </TouchableOpacity>
          

        </Pressable>
   









     <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="Vyakula Stores"
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










{/*MODAL FOR MAKING ORDER*/}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsModalVisible(false); // Reset state when modal closes
        }}
      >
    
    <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1,marginTop:height/4,
         justifyContent: 'center', alignItems: 'center',
          //backgroundColor: 'red' 
        }}>
          <View style={globalStyles.ModalViewViewProduct}>
            <Text style={globalStyles.ModalTitleViewProduct}>
            Ingiza kiasi cha chakula ulichonacho</Text>

                    <Text 
                    style={globalStyles.EnterQuntityTextViewProduct}
                    > Kiasi (Kwa Kilo)</Text>
                    < View style={globalStyles.inputViewProduct}>
                        <FontAwesome style={globalStyles.InputIconViewProduct} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputViewProduct}  
                        placeholder=' Kiasi' 
                        // value={quantity}
                  // onChangeText={text => setQuantity(text)}
                  keyboardType="numeric"
                  placeholderTextColor="black"
                        />
                    </View>
                



          
            

            <View style={globalStyles.ButtonConatinerViewProduct}>
                    <TouchableOpacity 
                    style={globalStyles.ButtonCloseViewProduct} 
                      onPress={() => {
    
                        setIsModalVisible(false); // Update state when modal opens
                        setModalVisible(false);
                      }}
                     >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Funga</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={globalStyles.ButtonAddViewProduct}  
                   // onPress={addCartItem}
                     >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Kubali</Text>
                    </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
        
      </Modal>














     </View> 


            ):(

<LotterViewScreen />

)}

    

    </>



    )}</>
  );
};

export default AllOrders;

const styles = StyleSheet.create({});
