
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

import IdadiYaKukuComponent  from '../Components/IdadiYaKukuComponent';

const { width, height } = Dimensions.get('window');
const TaarifaZaKukuPerKukuNamba = ({navigation, route}) => {

   const { 
    
   StaterFeed,
   FinisherFeed,
   LayerFeed,
   GrowerFeed,
    //id,
    KukuId ,
    UmriKwaWiki,
    UmriKwaSiku,
    UmriWaKukuId,

    AinaYaKuku,
    Interval,
    UmriWaKukuIdKwaajiliYaPerKuku,
    Siku,
    inputi2,
    

    //IdadiYaKuku
   } = route.params

  
  const IdadiYaKuku = inputi2;
  const AinaYaKuku_Name = AinaYaKuku;
  const UmriWaKukuKwaSiku = UmriKwaSiku;
  const IdadiYaKukuWako = inputi2;
  const id = UmriWaKukuId;


//hapa tunazigawanya idadi ya siku kwasababu kule kwenye apis sisi
//tumepigia kwa kuku mmoja tu, kwahiyo tuzigawanye siku ili kila kuku
//achukue siku zake hukuhuku ili mgawanyo wa chakula kwenye kila
//wiki usizidi wastani wa wiki chakula kutumika, kwasababu idadi ya siku
//ndo zinatumika kufanya iterations.
  // const IdadiYaSikuValue = Siku / IdadiYaKukuWako;
  // const IdadiYaSiku = IdadiYaSikuValue.toFixed(0);
  const IdadiYaSiku = Siku;


  //const IdadiYaSiku = IdadiYaSiku;
  //console.log("IDADI YA SIKU", IdadiYaSiku);

  const DisplayIdadiYaSiku = Siku;
  

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




//HIZI NI BASED ON USER
const [total_Kilos_neededBasedOnUserDays, settotal_Kilos_neededBasedOnUserDays] = useState(0);
const [MudaWaChakulaKitakapoTumikaBasedOnUserDays, setMudaWaChakulaKitakapoTumikaBasedOnUserDays] = useState(0);



const [TotalStarterFeedBasedOnUser, setTotalStarterFeedBasedOnUser] = useState(0);
const [TotalGrowerFeedBasedOnUser, setTotalGrowerFeedBasedOnUser] = useState(0);
const [TotalLayerFeedBasedOnUser, setTotalLayerFeedBasedOnUser] = useState(0);
const [TotalFinisherFeedBasedOnUser, setTotalFinisherFeedBasedOnUser] = useState(0);


//------------EXTRA INFORMATIONS--------------
const [Starter_Kwa_Wiki, setStarter_Kwa_Wiki] = useState(0);
const [Grower_Kwa_Wiki, setGrower_Kwa_Wiki] = useState(0);
const [Layer_Kwa_Wiki, setLayer_Kwa_Wiki] = useState(0);
const [Finisher_Kwa_Wiki, setFinisher_Kwa_Wiki] = useState(0);
const [Remained_Days_For_Lasr_Week, setRemained_Days_For_Lasr_Week] = useState(0);


const [MudaWaZiada, setMudaWaZiada] = useState(0);



//---HIZI NI BASED ON USER SIKU ALIZOINGIZA


//-------------------KWA WIKI--------------------
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki] = useState(0);








const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaSiku] = useState(0);
const [KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaSiku, setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaSiku] = useState(0);







//--------KUPATA KULINGANA NA IDADI YA KUKU-----------
const [calculatedValue, setCalculatedValue] = useState(null); // New state variable








const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable


//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);


//FOR SEARCHING
const [input, setInput] = useState('');



//   useEffect(() => {
//   // Calculate the main total price whenever orders change
//   if (queryset.length > 0) {
//     const total = queryset.reduce((acc, x) => acc + x.total_price, 0);
//     total_Kilos_neededBasedOnUserDays(total);
//   }
// }, [queryset]);

const getItems = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetTaarifaZaKukuByCategoryZaAinaYaKukuNaUmriWaKukuView/?IdadiYaSiku=${IdadiYaSiku}&KukuId=${KukuId}&id=${id}&IdadiYaKukuWako=${IdadiYaKukuWako}&AinaYaKuku_Name=${AinaYaKuku_Name}&UmriWaKukuKwaSiku=${UmriWaKukuKwaSiku}&page=${current_page}&page_size=2`
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset.length > 0) {
          setQueryset([...queryset, ...data.queryset]);

          settotal_Kilos_neededBasedOnUserDays(data.JumlaKiasiChaChakulaBasedOnUserKwaWikiZote_KwaAinaYaKuku);
          setMudaWaChakulaKitakapoTumikaBasedOnUserDays(data.score_count);
         
         setTotalStarterFeedBasedOnUser(data.TotalStarterFeed);
         setTotalGrowerFeedBasedOnUser(data.TotalGrowerFeed);
         setTotalLayerFeedBasedOnUser(data.TotalLayerFeed);
         setTotalFinisherFeedBasedOnUser(data.TotalFinisherFeed);


         setStarter_Kwa_Wiki(data.Starter_Kwa_Wiki);
         setGrower_Kwa_Wiki(data.Grower_Kwa_Wiki);
         setLayer_Kwa_Wiki(data.Layer_Kwa_Wiki);
         setFinisher_Kwa_Wiki(data.Finisher_Kwa_Wiki);
         setRemained_Days_For_Lasr_Week(data.Remained_Days_For_Lasr_Week);

        

                   
        

          //HIZI NI BASED ON USER
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki);
          
          


          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaSiku);
          setKiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaSiku(data.KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaSiku);
        
        
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





  const handleScroll = (event) =>{
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const scrollEndY = layoutMeasurement.height + contentOffset.y
    const contetHeight = contentSize.height

    if (scrollEndY >= contetHeight - 50) {
      getItems()
    }
  }






//mwisho wa load more













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





 //calculate total kilos per week based on the number of kuku 
const total_Kilos_neededBasedOnUserDays_value = total_Kilos_neededBasedOnUserDays ? total_Kilos_neededBasedOnUserDays : 0;
const total_Kilos_neededBasedOnUserDays_IdadiYaKuku = total_Kilos_neededBasedOnUserDays_value;

 //calculate muda per week based on the number of kuku 
const MudaWaChakulaKitakapoTumikaBasedOnUserDays_value = MudaWaChakulaKitakapoTumikaBasedOnUserDays ? MudaWaChakulaKitakapoTumikaBasedOnUserDays : 0;
const MudaWaChakulaKitakapoTumikaBasedOnUserDays_IdadiYaKuku = MudaWaChakulaKitakapoTumikaBasedOnUserDays_value;

const MudaWaZiada_value = MudaWaChakulaKitakapoTumikaBasedOnUserDays_IdadiYaKuku ? MudaWaChakulaKitakapoTumikaBasedOnUserDays_IdadiYaKuku + 1 : 0;
const MudaWaZiada_IdadiYaKuku = MudaWaZiada_value;



const TotalStarterFeedBasedOnUser_value = TotalStarterFeedBasedOnUser ? TotalStarterFeedBasedOnUser : 0;
const TotalStarterFeedBasedOnUser_IdadiYaKuku = TotalStarterFeedBasedOnUser_value;


const TotalGrowerFeedBasedOnUser_value = TotalGrowerFeedBasedOnUser ? TotalGrowerFeedBasedOnUser : 0;
const TotalGrowerFeedBasedOnUser_IdadiYaKuku = TotalGrowerFeedBasedOnUser_value;


const TotalLayerFeedBasedOnUser_value = TotalLayerFeedBasedOnUser ? TotalLayerFeedBasedOnUser : 0;
const TotalLayerFeedBasedOnUser_IdadiYaKuku = TotalLayerFeedBasedOnUser_value;


const TotalFinisherFeedBasedOnUser_value = TotalFinisherFeedBasedOnUser ? TotalFinisherFeedBasedOnUser : 0;
const TotalFinisherFeedBasedOnUser_IdadiYaKuku = TotalFinisherFeedBasedOnUser_value;












//---------------------INTERMS OF WEEKS---------------


//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki_value;
//mwisho wa wiki


//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki_value;
//mwisho wa wiki








//------------------INTERMS OF SIKU----------------------

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaSiku_value;
//mwisho wa wiki


//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaSiku_value;
//mwisho wa wiki

//mwanzo wa wiki
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaSiku_value = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaSiku ? KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaSiku : 0;
const KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaSiku_IdadiYaKuku = KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaSiku_value;
//mwisho wa wiki








const TotalVyakulaCard = () => {
  




 return (

   <View style={globalStyles.TaarifaMainContainerLaZote}>

  
  
      <TouchableOpacity
       // onPress={() =>
       //  navigation.navigate('Taarifa Za Kuku', item)}
       
     
      
      style={globalStyles.TaarifaOverdoseCartItemsContainer} >


   






   {/* mwanzo wa flow ya 1*/}
        <View 
        style={globalStyles.TaarifaOverdoseLeftCartItemsContainer}
        >
      
     
     {total_Kilos_neededBasedOnUserDays > 0 && ( 
     <View style={
            globalStyles.TaarifaLeft
          }>
        <Text style={
            globalStyles.TaarifaOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText}
         >
           
            Wastani wa kiasi Chakula kinachohitajika kwa siku zote {DisplayIdadiYaSiku}
          </Text>
          
          </View>
          )}

         {total_Kilos_neededBasedOnUserDays > 0 && ( 
         <View style={
            globalStyles.TaarifaRight
          }>
        
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {total_Kilos_neededBasedOnUserDays_IdadiYaKuku.toFixed(1)} Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya 1*/}








   {/* mwanzo wa flow ya 11*/}
        <View 
        style={globalStyles.TaarifaOverdoseLeftCartItemsContainer}
        >
      
     
     {Starter_Kwa_Wiki > 0 && ( 
     <View style={
            globalStyles.TaarifaLeft
          }>
        <Text style={
            globalStyles.TaarifaOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText}
         >
           
            Chakula cha Starter, <Text style={{
              color:'brown',
              fontFamily:'Bold',
            }}>kwa wiki  ({Starter_Kwa_Wiki}) </Text> utatumia
          </Text>
          
          </View>
          )}

         {Starter_Kwa_Wiki > 0 && ( 
         <View style={
            globalStyles.TaarifaRight
          }>
        
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {TotalStarterFeedBasedOnUser_IdadiYaKuku.toFixed(1)} Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya 11*/}






   {/* mwanzo wa flow ya 111*/}
        <View 
        style={globalStyles.TaarifaOverdoseLeftCartItemsContainer}
        >
      
     
     {Grower_Kwa_Wiki > 0 && ( 
     <View style={
            globalStyles.TaarifaLeft
          }>
        <Text style={
            globalStyles.TaarifaOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText}
         >
           
            Chakula cha Grower, <Text style={{
              color:'brown',
              fontFamily:'Bold',
            }}> kwa Wiki ({Grower_Kwa_Wiki}) </Text>  utatumia
          </Text>
          
          </View>
          )}

         {Grower_Kwa_Wiki > 0 && ( 
         <View style={
            globalStyles.TaarifaRight
          }>
        
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {TotalGrowerFeedBasedOnUser_IdadiYaKuku.toFixed(1)} Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya 111*/}






   {/* mwanzo wa flow ya 1111*/}
        <View 
        style={globalStyles.TaarifaOverdoseLeftCartItemsContainer}
        >
      
     
     {Layer_Kwa_Wiki > 0 && ( 
     <View style={
            globalStyles.TaarifaLeft
          }>
        <Text style={
            globalStyles.TaarifaOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText}
         >
           
            Chakula cha Layers, <Text style={{
              color:'brown',
              fontFamily:'Bold',
            }}> kwa Wiki ({Layer_Kwa_Wiki}) </Text>  utatumia
          </Text>
          
          </View>
          )}

         {Layer_Kwa_Wiki > 0 && ( 
         <View style={
            globalStyles.TaarifaRight
          }>
        
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {TotalLayerFeedBasedOnUser_IdadiYaKuku.toFixed(1)} Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya 1111*/}








   {/* mwanzo wa flow ya 22*/}
        <View 
        style={globalStyles.TaarifaOverdoseLeftCartItemsContainer}
        >
      
     
     {Finisher_Kwa_Wiki > 0 && ( 
     <View style={
            globalStyles.TaarifaLeft
          }>
        <Text style={
            globalStyles.TaarifaOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText}
         >
           
            Chakula cha Finisher, <Text style={{
              color:'brown',
              fontFamily:'Bold',
            }}> kwa Wiki ({Finisher_Kwa_Wiki}) </Text>  utatumia
          </Text>
          
          </View>
          )}

         {Finisher_Kwa_Wiki > 0 && ( 
         <View style={
            globalStyles.TaarifaRight
          }>
        
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {TotalFinisherFeedBasedOnUser_IdadiYaKuku.toFixed(1)} Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya 22*/}










   {/* mwanzo wa flow ya 2*/}
        <View 
        style={globalStyles.TaarifaOverdoseLeftCartItemsContainer}
        >
      
     
     {MudaWaChakulaKitakapoTumikaBasedOnUserDays > 0 && ( 
     <View style={
            globalStyles.TaarifaLeft
          }>
        <Text style={
            globalStyles.TaarifaOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText}
         >
           
            Utatumia kwa wastani wa wiki
          </Text>
          
          </View>
          )}

         {MudaWaChakulaKitakapoTumikaBasedOnUserDays > 0 && ( 
         <View style={
            globalStyles.TaarifaRight
          }>
        
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {MudaWaZiada_IdadiYaKuku.toFixed(0)} 
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya 2*/}








      </TouchableOpacity>

</View>




)
}




const InventoryCard = ({item, index}) => {
  
 




 return (

   <View style={globalStyles.TaarifaMainContainerLaZote}>

   

















{/* mwanzo wa mchanganuo kulingana na siku ulizozichagua*/}

{/*<Text
    style={globalStyles.AppChaguaHudumaTextHomeScreen}  
    
    >Mchanganuo wa mahitaji ya kuku aina ya {AinaYaKuku},
    umri kuanzia siku {Interval}, kwa 
    siku {DisplayIdadiYaSiku} unazohitaji kutengeneza chakula.
     </Text>
*/}




 <Pressable style={globalStyles.MaelezoContainer1TaarifaZaKuku}>

  
{total_Kilos_neededBasedOnUserDays > 0 && (
 <Text 
 style={[
  globalStyles.MaelezoText1TaarifaZaKuku,

  {
    color:'black',
  }


]}>
   Mgawanyo wa chakula kwa siku {DisplayIdadiYaSiku}   
    </Text>
    )}

    </Pressable>














{/*mwanzo wa mgawanyo wa chakula kwa siku ulizozichagua*/}

{total_Kilos_neededBasedOnUserDays > 0 && (
   <View style={globalStyles.TaarifaZaKukuMaelezoMainContainerLaZote}>

      <TouchableOpacity
       // onPress={() =>
       //  navigation.navigate('TaarifaZaKukuMaelezo Za Kuku', item)}
      style={globalStyles.TaarifaZaKukuMaelezoOverdoseCartItemsContainer} >


   {/* mwanzo wa flow ya wiki 1*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={[
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale,

            {
              //width:'10%',

            }
          ]}>
            =></Text>
          <Text 
           style={[globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText,

              {
              width:'80%',

            }
            ]}
         >
           
            Wiki ya 1 tumia 
              wastani wa kilo 
            
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 1*/}







 {/* mwanzo wa flow ya wiki 2*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 2 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 2 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_1_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 2*/}





{/* mwanzo wa flow ya wiki 3*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 3 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 3 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_2_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 3*/}




{/* mwanzo wa flow ya wiki 4*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 4 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 4 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_3_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 4*/}




      {/* mwanzo wa flow ya wiki 5*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 5 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 5 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_4_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 5*/}







{/* mwanzo wa flow ya wiki 6*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 6 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 6 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_5_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 6*/}











{/* mwanzo wa flow ya wiki 7*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={[
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText,
            {
              width:'70%'
            }

            ]}
         >
           
            Wiki ya 7 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 7 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_6_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 7*/}







{/* mwanzo wa flow ya wiki 8*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 8  tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>

        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 8 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_7_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 8*/}





{/* mwanzo wa flow ya wiki 9*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 9 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 9 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_8_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 9*/}





{/* mwanzo wa flow ya wiki 10*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 10 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 10 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_9_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 10*/}





{/* mwanzo wa flow ya wiki 11*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 11 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 11 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_10_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 11*/}








{/* mwanzo wa flow ya wiki 12*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 12 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 12 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_11_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 12*/}






{/* mwanzo wa flow ya wiki 13*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 13 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 13 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_12_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 13*/}





{/* mwanzo wa flow ya wiki 14*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 14 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 14 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_13_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 14*/}











{/* mwanzo wa flow ya wiki 15*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 15 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 15 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_14_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 15*/}





{/* mwanzo wa flow ya wiki 16*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 16 tumia wastani wa kilo 
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 16 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_15_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 16*/}



 

{/* mwanzo wa flow ya wiki 17*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 17 tumia wastani wa kilo
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 17 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_16_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 17*/}








{/* mwanzo wa flow ya wiki 18*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 18 tumia wastani wa kilo
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 18 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_17_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 18*/}






{/* mwanzo wa flow ya wiki 19*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 19 tumia wastani wa kilo
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 19 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_18_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 19*/}







{/* mwanzo wa flow ya wiki 20*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 20 tumia wastani wa kilo
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 20 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_19_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 20*/}












{/* mwanzo wa flow ya wiki 21*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 21 tumia wastani wa kilo
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 21 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_20_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 21*/}









{/* mwanzo wa flow ya wiki 22*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 22 tumia wastani wa kilo
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 22 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_21_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 22*/}






{/* mwanzo wa flow ya wiki 23*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 23 tumia wastani wa kilo
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_23_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
        {/*mwanzo wa view ya ziada*/}
        {MudaWaZiada_IdadiYaKuku == 23 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_22_KwaWiki_IdadiYaKuku > 0 && KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki_IdadiYaKuku <= 0 && (
        <View style={{
              width: '40%',
              //marginLeft:30,
            }}>
           <Text style={{
              //width: '50%',
              color:'brown',
              fontFamily:'Bold',
              marginLeft:10,

            }}>
              (ndani ya siku {Remained_Days_For_Lasr_Week}) </Text>
        </View>
        )} 
      {/*mwisho wa view ya ziada*/}
      {/*mwisho wa flow ya wiki ya 23*/}





{/* mwanzo wa flow ya wiki 24*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki_IdadiYaKuku > 0 && ( 
     <View style={
            globalStyles.TaarifaZaKukuMaelezoLeft
          }>
        <Text style={
            globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale
          }>
            =></Text>
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText}
         >
           
            Wiki ya 24 na kuendelea tumia wastani wa kilo
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
          
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki_IdadiYaKuku.toFixed(1)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaWiki_IdadiYaKuku > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
          

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaBasedOnUserKwaKukuWaUmriWaWiki_24_KwaSiku_IdadiYaKuku.toFixed(1)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 24*/}




   </TouchableOpacity>

  </View>

  )}

{/*mwisho wa mgawanyo wa chakula kwa siku ulizozichagua*/}










{/* mwisho wa mchanganuo kulingana na siku ulizozichagua*/}











{/*MWANZO WA COMMENT*/}

{/*<Text
    style={globalStyles.AppChaguaHudumaTextHomeScreen}  
    
    >Weka Comment hapa

     </Text>*/}

{/*MWISHO WA COMMENT*/}




</View>




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
         
     



  <MinorHeader title="Matumizi Ya Chakula"/>


<ScrollView
keyboardShouldPersistTaps="handled" 
// refreshControl={
//         <RefreshControl
//         refreshing={refresh}
//         onRefresh={() => pullMe()}
//         />
//        }
      showsVerticalScrollIndicator={false}
       
 onScroll={handleScroll} scrollEventThrottle={16}
      >




      
 { queryset && queryset.length > 0 ? (
        <>














<Text
    style={globalStyles.AppChaguaHudumaTextHomeScreen}  
    
    >Mchanganuo wa jumla kwa kuku {IdadiYaKuku} {AinaYaKuku},
    umri kuanzia siku {Interval}, kwa siku {DisplayIdadiYaSiku}.

     </Text>
    


<TotalVyakulaCard />


           

       

{/*
         {setLoading===true?(<ActivityIndicator/>):(
      <>

   
      <FlatList
          data={queryset}
          showsVerticalScrollIndicator={false}
         // style={{marginTop: 12, width: '100%'}}
          renderItem={TotalVyakulaCard}
          //numColumns={2}
          ListFooterComponent={renderLoader}
          onEndReached={getItems}
          onEndReachedThreshold={0.5}
        />
                
 </>
      )}
*/}
    




{/*<Text
    style={globalStyles.AppChaguaHudumaTextHomeScreen}  
    
    >Mchanganuo wa mahitaji ya kuku {IdadiYaKuku} aina ya {AinaYaKuku},
    umri kuanzia siku {Interval}.
     </Text>*/}



      
     
           {setLoading===true?(<ActivityIndicator/>):(

             <>

          {queryset.map((item, index) => {
          return <InventoryCard item={item} key={item.id || index} />;
          })}

          {isLoading&&(<ActivityIndicator/>)}
          </>
          )}

         </>



   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>Hakuna Taarifa za kuku aina ya {AinaYaKuku} kwa wiki ya {UmriKwaWiki}! !
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



</ScrollView>


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
         onPress={() => navigation.navigate("Home Stack")}
           
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
              Rudi mwanzo
            </Text>
          </TouchableOpacity>
          

        </Pressable>
   












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

export default TaarifaZaKukuPerKukuNamba;

const styles = StyleSheet.create({});
