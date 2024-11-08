
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

const { width, height } = Dimensions.get('window');




const HistoriaZaKumbushoZaMabadilikoYaLishe = ({ navigation }) => {
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
    const url = `${EndPoint}/GetAllKumbushoLaMabadilikoYaLisheView/?page=${current_page}&page_size=2`;
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




//console.log("USERTOKEN", userToken);

const removeUserSubmittedData = async (postId) => {
  setIsPending(true);
    const token = await AsyncStorage.getItem('token');
    //setUserToken(token);
    //console.log("postId", postId);
    try {
       await axios.delete(EndPoint + `/DeleteKumbushoLaMabadilikoYaLisheByUserItsSelfView/${postId}/delete/`, {
      //await axios.delete(EndPoint + `/DeleteKumbushoLaMabadilikoYaLisheByUserItsSelfView/?KumbushoID=${KumbushoID}`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
       setQueryset(queryset.filter((item) => item.id !== postId));
      setIsPending(false);

      showAlertFunction('Umefanikiwa kufuta kumbusho');
      navigation.navigate('Historia Za Kumbusho Za Mabadiliko Ya Lishe');  // Navigate back to the previous screen
    

    } catch (error) {
       setIsPending(false);
      showAlertFunction('Imeshindikana kufuta kumbusho');
     
      //console.log(error);
    }
  };


  // const removeUserSubmittedData = (KumbushoID) => {
  //   setIsPending(true);
  //   const apiUrl = `${EndPoint}/DeleteKumbushoLaMabadilikoYaLisheByUserItsSelfView/?KumbushoID=${KumbushoID}`;
  //   axios
  //     .delete(apiUrl, {
  //       headers: { 'Authorization': `Token ${userToken}`, 'Content-Type': 'application/json' },
  //     })
  //     .then((response) => {
  //       if (response.status === 204) {
  //         setQueryset(queryset.filter((item) => item.id !== KumbushoID));
  //         setAlertMessage("Umefanikiwa kuondoa taarifa");
  //         setShowAlert(true);
  //         setIsPending(false);
  //       } else {
  //         setAlertMessage("Imeshindikana kuondoa taarifa");
  //         setShowAlert(true);
  //         setIsPending(false);
  //       }
  //       setIsPending(false);
  //     })
  //     .catch((error) => {
  //       setAlertMessage("Imeshindikana kuondoa taarifa");
  //       setShowAlert(true);
  //       setIsPending(false);
  //       //console.log("ERRRR", error);
  //     });
  // };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
 
const CartCard = ({item, index}) => {
  


 return (



      <Pressable
      style={[
        globalStyles.VyakulaCartItemsContainerHistoria,
        
      ]} >

{/*OverdoseCartItemsContainer*/}
        <View 
        style={[globalStyles.VyakulaLeftCartItemsContainer,
          {
            width:'50%',
          }

          ]}
        >

         {item.username && ( 
          <Text 
           style={globalStyles.VyakulaItemNameCartItemsText}
         >
            {item.username}
          </Text>)}


          <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Aina ya kuku:  <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
               {item.AinaYaKuku}
            </Text> 
          </Text>


            <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Umri wa kuku:  <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
              Wiki {item.UmriWaKukuKwaWiki}
            </Text> 
          </Text>


          

  <Text 
    style={globalStyles.VyakulaPriceCartItemsText}
  >
    
      kundi la kuku wako:  <Text style={{
        color:'green',
        fontFamily:'Bold'
      }}>
         {item.KundiLaKukuWake}
      </Text> 
    </Text>
         
          
          
        

       {/*mwanzo wa button*/}
          <TouchableOpacity
            onPress={() => removeUserSubmittedData(item.id)}
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
                Futa
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
          
            Tarehe: {formatDate(item.Created)}
          </Text>







        </Pressable>
      </Pressable>






)






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
         
     



  <MinorHeader title="Historia Zako"/>

      















 <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Kumbusho zako za mabadiliko ya lishe ulizowahi kuweka</Text>


  
   {queryset && queryset.length > 0 ? (

    <>
 {setLoading===true?(<ActivityIndicator/>):(
      <>
      
      <FlatList
        data={queryset}
        renderItem={CartCard}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderLoader}
        onEndReached={getItems}
        onEndReachedThreshold={0.5}
      />
      </>
      )}
       


</>

   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>hukuna kumbusho lolote kwasasa ulilowahi kuweka !!
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
  marginBottom:150,
}}>
 {/* <Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
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
         //onPress={makeOrder}
              onPress={() =>
        navigation.navigate('Home Stack')}
       
           
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




















     </View> 


            ):(

<LotterViewScreen />

)}

    

    </>



    )}</>
  );
};

export default HistoriaZaKumbushoZaMabadilikoYaLishe;

const styles = StyleSheet.create({});
