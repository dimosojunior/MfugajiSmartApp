
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
const {width, height} = Dimensions.get('window');


const Kokotoa_UmriWaKuku = ({navigation, route}) => {

   const { 
    
   AinaYaKuku,
   StaterFeed,
   FinisherFeed,
   LayerFeed,
   GrowerFeed,

   TotalCPPercentageRequired_Starter,
   TotalWangaPercentageRequired_Starter,
   TotalMafutaPercentageRequired_Starter,

   TotalCPPercentageRequired_Grower,
   TotalWangaPercentageRequired_Grower,
   TotalMafutaPercentageRequired_Grower,

   TotalCPPercentageRequired_Layer,
   TotalWangaPercentageRequired_Layer,
   TotalMafutaPercentageRequired_Layer,

   TotalCPPercentageRequired_Finisher,
   TotalWangaPercentageRequired_Finisher,
   TotalMafutaPercentageRequired_Finisher,

   TotalMEPercentageRequired_Starter,
   TotalMEPercentageRequired_Grower,
   TotalMEPercentageRequired_Layer,
   TotalMEPercentageRequired_Finisher,


    id 
   } = route.params

  const KukuId = id;

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

      //  onPress={() =>
      //   navigation.navigate('Taarifa Za Kuku Per Kuku Namba', { ...item, KukuId,UmriWaKukuId, AinaYaKuku, UmriKwaWiki })
      // }

       // onPress={() => {
       // navigation.navigate('Vyakula Vyote', { ...item,UmriwaKukuId,UmriKwaWiki, UmriKwaSiku, KukuId, AinaYaKuku,  StaterFeed,GrowerFeed, LayerFeed, FinisherFeed });
        // setIsModalVisible(false); // Update state when modal opens
        // setModalVisible(false);
      //}}
       
     
      
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
        navigation.navigate('Ingiza Kiasi', { ...item,
         KukuId, 
         AinaYaKuku, 
         StaterFeed,
         GrowerFeed, 
         LayerFeed, 
         FinisherFeed,

    TotalCPPercentageRequired_Starter,
   TotalWangaPercentageRequired_Starter,
   TotalMafutaPercentageRequired_Starter,

   TotalCPPercentageRequired_Grower,
   TotalWangaPercentageRequired_Grower,
   TotalMafutaPercentageRequired_Grower,

   TotalCPPercentageRequired_Layer,
   TotalWangaPercentageRequired_Layer,
   TotalMafutaPercentageRequired_Layer,

   TotalCPPercentageRequired_Finisher,
   TotalWangaPercentageRequired_Finisher,
   TotalMafutaPercentageRequired_Finisher,

   TotalMEPercentageRequired_Starter,
   TotalMEPercentageRequired_Grower,
   TotalMEPercentageRequired_Layer,
   TotalMEPercentageRequired_Finisher
          })}
       
            
      
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


         {item.Interval && ( 
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Aina Ya Chakula :
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
        navigation.navigate('Ingiza Kiasi', { ...item,
         KukuId, 
         AinaYaKuku, 
         StaterFeed,
         GrowerFeed, 
         LayerFeed, 
         FinisherFeed,

    TotalCPPercentageRequired_Starter,
   TotalWangaPercentageRequired_Starter,
   TotalMafutaPercentageRequired_Starter,

   TotalCPPercentageRequired_Grower,
   TotalWangaPercentageRequired_Grower,
   TotalMafutaPercentageRequired_Grower,

   TotalCPPercentageRequired_Layer,
   TotalWangaPercentageRequired_Layer,
   TotalMafutaPercentageRequired_Layer,

   TotalCPPercentageRequired_Finisher,
   TotalWangaPercentageRequired_Finisher,
   TotalMafutaPercentageRequired_Finisher,

   TotalMEPercentageRequired_Starter,
   TotalMEPercentageRequired_Grower,
   TotalMEPercentageRequired_Layer,
   TotalMEPercentageRequired_Finisher
          })}
       

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


{/*mwanzo wa Vipindi Kuku aina ya Kroila*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku aina ya Kroila' && StaterFeed == "1 - 4" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 28 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
           Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku aina ya Kroila' && GrowerFeed == "5 - 17"  && item.UmriKwaSiku >= 29 && item.UmriKwaSiku <= 119 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}




       {/*mwanzo wa check ya 03*/}
         {/* {AinaYaKuku == 'Kuku aina ya Kroila' && FinisherFeed == "10 - 12"  && item.UmriKwaSiku >= 70 && item.UmriKwaSiku <= 84 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Finisher Feed
          </Text>
          )}*/}

      {/*mwisho wa check ya 03*/}





       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku aina ya Kroila' && LayerFeed == "18" && item.UmriKwaSiku >= 120  && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Layer Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi Kuku aina ya Kroila*/}








{/*mwanzo wa Vipindi Kuku wa Mayai (Layers)*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku wa Mayai (Layers)' && StaterFeed == "1 - 4" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 28 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku wa Mayai (Layers)' && GrowerFeed == "5 - 17" && item.UmriKwaSiku >= 29 && item.UmriKwaSiku <= 119 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}







       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku wa Mayai (Layers)' && LayerFeed == "18" && item.UmriKwaSiku >= 120 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Layer Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi kuku wa Kuku wa Mayai (Layers)*/}
















{/*mwanzo wa Vipindi Kuku aina ya Broila (kuku wa nyama)*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku aina ya Broila (kuku wa nyama)' && StaterFeed == "1 - 2" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 14 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku aina ya Broila (kuku wa nyama)' && GrowerFeed == "3 - 4" && item.UmriKwaSiku >= 15 && item.UmriKwaSiku <= 28 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}







       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku aina ya Broila (kuku wa nyama)' && FinisherFeed == "5" && item.UmriKwaSiku >= 29  &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Finisher Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi kuku wa Kuku aina ya Broila (kuku wa nyama)*/}













{/*mwanzo wa Vipindi Kuku aina ya Sasso*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku aina ya Sasso' && StaterFeed == "1 - 4" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 28 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
           Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku aina ya Sasso' && GrowerFeed == "5 - 17"  && item.UmriKwaSiku >= 29 && item.UmriKwaSiku <= 119 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}




       {/*mwanzo wa check ya 03*/}
         {/* {AinaYaKuku == 'Kuku aina ya Sasso' && FinisherFeed == "10 - 12"  && item.UmriKwaSiku >= 70 && item.UmriKwaSiku <= 84 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Finisher Feed
          </Text>
          )}*/}

      {/*mwisho wa check ya 03*/}





       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku aina ya Sasso' && LayerFeed == "18" && item.UmriKwaSiku >= 120  && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Layer Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi Kuku aina ya Sasso*/}











{/*mwanzo wa Vipindi Kuku aina ya Tanbro*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku aina ya Tanbro' && StaterFeed == "1 - 4" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 28 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
           Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku aina ya Tanbro' && GrowerFeed == "5 - 17"  && item.UmriKwaSiku >= 29 && item.UmriKwaSiku <= 119 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}




       {/*mwanzo wa check ya 03*/}
         {/* {AinaYaKuku == 'Kuku aina ya Tanbro' && FinisherFeed == "10 - 12"  && item.UmriKwaSiku >= 70 && item.UmriKwaSiku <= 84 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Finisher Feed
          </Text>
          )}*/}

      {/*mwisho wa check ya 03*/}





       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku aina ya Tanbro' && LayerFeed == "18" && item.UmriKwaSiku >= 120  && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Layer Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi Kuku aina ya Tanbro*/}







{/*mwanzo wa Vipindi Kuku aina ya Kenbro*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku aina ya Kenbro' && StaterFeed == "1 - 4" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 28 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
           Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku aina ya Kenbro' && GrowerFeed == "5 - 17"  && item.UmriKwaSiku >= 29 && item.UmriKwaSiku <= 119 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}




       {/*mwanzo wa check ya 03*/}
         {/* {AinaYaKuku == 'Kuku aina ya Kenbro' && FinisherFeed == "10 - 12"  && item.UmriKwaSiku >= 70 && item.UmriKwaSiku <= 84 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Finisher Feed
          </Text>
          )}*/}

      {/*mwisho wa check ya 03*/}





       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku aina ya Kenbro' && LayerFeed == "18" && item.UmriKwaSiku >= 120  && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Layer Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi Kuku aina ya Kenbro*/}







{/*mwanzo wa Vipindi Kuku aina ya Malawi*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku wa Malawi' && StaterFeed == "1 - 6" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 42 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
           Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku wa Malawi' && GrowerFeed == "7 - 21"  && item.UmriKwaSiku >= 43 && item.UmriKwaSiku <= 147 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}




       {/*mwanzo wa check ya 03*/}
         {/* {AinaYaKuku == 'Kuku wa Malawi' && FinisherFeed == "10 - 12"  && item.UmriKwaSiku >= 70 && item.UmriKwaSiku <= 84 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Finisher Feed
          </Text>
          )}*/}

      {/*mwisho wa check ya 03*/}





       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku wa Malawi' && LayerFeed == "22" && item.UmriKwaSiku >= 148  && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Layer Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi Kuku aina ya Malawi*/}









{/*mwanzo wa Vipindi Kuku aina ya Kienyeji*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku wa Kienyeji' && StaterFeed == "1 - 6" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 42 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
           Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku wa Kienyeji' && GrowerFeed == "7 - 21"  && item.UmriKwaSiku >= 43 && item.UmriKwaSiku <= 147 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}




       {/*mwanzo wa check ya 03*/}
         {/* {AinaYaKuku == 'Kuku wa Kienyeji' && FinisherFeed == "10 - 12"  && item.UmriKwaSiku >= 70 && item.UmriKwaSiku <= 84 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Finisher Feed
          </Text>
          )}*/}

      {/*mwisho wa check ya 03*/}





       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku wa Kienyeji' && LayerFeed == "22" && item.UmriKwaSiku >= 148  && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Layer Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi Kuku aina ya Kienyeji*/}


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
  <Text style={globalStyles.noitemText}>Hakuna taarifa za kuku aina ya {AinaYaKuku}! !
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

export default Kokotoa_UmriWaKuku;

const styles = StyleSheet.create({});
