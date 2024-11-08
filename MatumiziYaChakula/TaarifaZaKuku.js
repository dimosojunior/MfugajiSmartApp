
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
const TaarifaZaKuku = ({navigation, route}) => {

   const { 
    
   
    //id,
    KukuId ,
    UmriKwaWiki,
    AinaYaKuku,
    Interval,
    UmriWaKukuId,
    Siku
   } = route.params
  const id = UmriWaKukuId;
  const UmriWaKukuIdKwaajiliYaPerKuku = UmriWaKukuId;
  const IdadiYaSiku = Siku;
  //console.log("IDADI YA SIKU", IdadiYaSiku);
  

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

//HIZI NI BASED ON AINA NA UMRI WA KUKU TU KABLA HATJAMUANGALIA USER
const [total_Kilos_needed_Based_on_Aina_Umri_WaKuku, settotal_Kilos_needed_Based_on_Aina_Umri_WaKuku] = useState(0);


//HIZI KULINGANA NA AINA NA UMRI WA KUKU NOT BASED ON USER
const [KiasiChaChakulaKwaWiki_1, setKiasiChaChakulaKwaWiki_1] = useState(0);
const [KiasiChaChakulaKwaWiki_2, setKiasiChaChakulaKwaWiki_2] = useState(0);
const [KiasiChaChakulaKwaWiki_3, setKiasiChaChakulaKwaWiki_3] = useState(0);
const [KiasiChaChakulaKwaWiki_4, setKiasiChaChakulaKwaWiki_4] = useState(0);
const [KiasiChaChakulaKwaWiki_5, setKiasiChaChakulaKwaWiki_5] = useState(0);
const [KiasiChaChakulaKwaWiki_6, setKiasiChaChakulaKwaWiki_6] = useState(0);
const [KiasiChaChakulaKwaWiki_7, setKiasiChaChakulaKwaWiki_7] = useState(0);
const [KiasiChaChakulaKwaWiki_8, setKiasiChaChakulaKwaWiki_8] = useState(0);
const [KiasiChaChakulaKwaWiki_9, setKiasiChaChakulaKwaWiki_9] = useState(0);
const [KiasiChaChakulaKwaWiki_10, setKiasiChaChakulaKwaWiki_10] = useState(0);
const [KiasiChaChakulaKwaWiki_11, setKiasiChaChakulaKwaWiki_11] = useState(0);
const [KiasiChaChakulaKwaWiki_12, setKiasiChaChakulaKwaWiki_12] = useState(0);
const [KiasiChaChakulaKwaWiki_13, setKiasiChaChakulaKwaWiki_13] = useState(0);
const [KiasiChaChakulaKwaWiki_14, setKiasiChaChakulaKwaWiki_14] = useState(0);
const [KiasiChaChakulaKwaWiki_15, setKiasiChaChakulaKwaWiki_15] = useState(0);
const [KiasiChaChakulaKwaWiki_16, setKiasiChaChakulaKwaWiki_16] = useState(0);


const [KiasiChaChakulaKwaSiku_KwaWiki_1, setKiasiChaChakulaKwaSiku_KwaWiki_1] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_2, setKiasiChaChakulaKwaSiku_KwaWiki_2] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_3, setKiasiChaChakulaKwaSiku_KwaWiki_3] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_4, setKiasiChaChakulaKwaSiku_KwaWiki_4] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_5, setKiasiChaChakulaKwaSiku_KwaWiki_5] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_6, setKiasiChaChakulaKwaSiku_KwaWiki_6] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_7, setKiasiChaChakulaKwaSiku_KwaWiki_7] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_8, setKiasiChaChakulaKwaSiku_KwaWiki_8] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_9, setKiasiChaChakulaKwaSiku_KwaWiki_9] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_10, setKiasiChaChakulaKwaSiku_KwaWiki_10] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_11, setKiasiChaChakulaKwaSiku_KwaWiki_11] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_12, setKiasiChaChakulaKwaSiku_KwaWiki_12] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_13, setKiasiChaChakulaKwaSiku_KwaWiki_13] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_14, setKiasiChaChakulaKwaSiku_KwaWiki_14] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_15, setKiasiChaChakulaKwaSiku_KwaWiki_15] = useState(0);
const [KiasiChaChakulaKwaSiku_KwaWiki_16, setKiasiChaChakulaKwaSiku_KwaWiki_16] = useState(0);






//---HIZI NI BASED ON USER SIKU ALIZOINGIZA

const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_1, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_1] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_2, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_2] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_3, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_3] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_4, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_4] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_5, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_5] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_6, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_6] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_7, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_7] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_8, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_8] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_9, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_9] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_10, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_10] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_11, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_11] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_12, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_12] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_13, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_13] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_14, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_14] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_15, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_15] = useState(0);
const [KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_16, setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_16] = useState(0);


const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_1, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_1] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_2, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_2] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_3, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_3] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_4, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_4] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_5, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_5] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_6, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_6] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_7, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_7] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_8, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_8] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_9, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_9] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_10, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_10] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_11, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_11] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_12, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_12] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_13, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_13] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_14, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_14] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_15, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_15] = useState(0);
const [KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_16, setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_16] = useState(0);


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
   const url = EndPoint + `/GetTaarifaZaKukuByCategoryZaAinaYaKukuNaUmriWaKukuView/?IdadiYaSiku=${IdadiYaSiku}&KukuId=${KukuId}&id=${id}&page=${current_page}&page_size=2`
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset.length > 0) {
          setQueryset([...queryset, ...data.queryset]);

          settotal_Kilos_neededBasedOnUserDays(data.total_Kilos_needed);
          setMudaWaChakulaKitakapoTumikaBasedOnUserDays(data.score_count);

          settotal_Kilos_needed_Based_on_Aina_Umri_WaKuku(data.total_Kilos_needed_Based_on_Aina_Umri_WaKuku);
          
          //hiki ni kiasi kwa kuangalia tu aina na umri wa huyo kuku
          //na sio kuangalia user anataka kutengeneza chakula cha siku ngapi
          setKiasiChaChakulaKwaWiki_1(data.KiasiChaChakulaKwaWiki_1);
          setKiasiChaChakulaKwaWiki_2(data.KiasiChaChakulaKwaWiki_2);
          setKiasiChaChakulaKwaWiki_3(data.KiasiChaChakulaKwaWiki_3);
          setKiasiChaChakulaKwaWiki_4(data.KiasiChaChakulaKwaWiki_4);
          setKiasiChaChakulaKwaWiki_5(data.KiasiChaChakulaKwaWiki_5);
          setKiasiChaChakulaKwaWiki_6(data.KiasiChaChakulaKwaWiki_6);
          setKiasiChaChakulaKwaWiki_7(data.KiasiChaChakulaKwaWiki_7);
          setKiasiChaChakulaKwaWiki_8(data.KiasiChaChakulaKwaWiki_8);
          setKiasiChaChakulaKwaWiki_9(data.KiasiChaChakulaKwaWiki_9);
          setKiasiChaChakulaKwaWiki_10(data.KiasiChaChakulaKwaWiki_10);
          setKiasiChaChakulaKwaWiki_11(data.KiasiChaChakulaKwaWiki_11);
          setKiasiChaChakulaKwaWiki_12(data.KiasiChaChakulaKwaWiki_12);
          setKiasiChaChakulaKwaWiki_13(data.KiasiChaChakulaKwaWiki_13);
          setKiasiChaChakulaKwaWiki_14(data.KiasiChaChakulaKwaWiki_14);
          setKiasiChaChakulaKwaWiki_15(data.KiasiChaChakulaKwaWiki_15);
          setKiasiChaChakulaKwaWiki_16(data.KiasiChaChakulaKwaWiki_16);

          //hiki ni kiasi kwa kuangalia tu aina na umri wa huyo kuku
          //na sio kuangalia user anataka kutengeneza chakula cha siku ngapi
          setKiasiChaChakulaKwaSiku_KwaWiki_1(data.KiasiChaChakulaKwaSiku_KwaWiki_1);
          setKiasiChaChakulaKwaSiku_KwaWiki_2(data.KiasiChaChakulaKwaSiku_KwaWiki_2);
          setKiasiChaChakulaKwaSiku_KwaWiki_3(data.KiasiChaChakulaKwaSiku_KwaWiki_3);
          setKiasiChaChakulaKwaSiku_KwaWiki_4(data.KiasiChaChakulaKwaSiku_KwaWiki_4);
          setKiasiChaChakulaKwaSiku_KwaWiki_5(data.KiasiChaChakulaKwaSiku_KwaWiki_5);
          setKiasiChaChakulaKwaSiku_KwaWiki_6(data.KiasiChaChakulaKwaSiku_KwaWiki_6);
          setKiasiChaChakulaKwaSiku_KwaWiki_7(data.KiasiChaChakulaKwaSiku_KwaWiki_7);
          setKiasiChaChakulaKwaSiku_KwaWiki_8(data.KiasiChaChakulaKwaSiku_KwaWiki_8);
          setKiasiChaChakulaKwaSiku_KwaWiki_9(data.KiasiChaChakulaKwaSiku_KwaWiki_9);
          setKiasiChaChakulaKwaSiku_KwaWiki_10(data.KiasiChaChakulaKwaSiku_KwaWiki_10);
          setKiasiChaChakulaKwaSiku_KwaWiki_11(data.KiasiChaChakulaKwaSiku_KwaWiki_11);
          setKiasiChaChakulaKwaSiku_KwaWiki_12(data.KiasiChaChakulaKwaSiku_KwaWiki_12);
          setKiasiChaChakulaKwaSiku_KwaWiki_13(data.KiasiChaChakulaKwaSiku_KwaWiki_13);
          setKiasiChaChakulaKwaSiku_KwaWiki_14(data.KiasiChaChakulaKwaSiku_KwaWiki_14);
          setKiasiChaChakulaKwaSiku_KwaWiki_15(data.KiasiChaChakulaKwaSiku_KwaWiki_15);
          setKiasiChaChakulaKwaSiku_KwaWiki_16(data.KiasiChaChakulaKwaSiku_KwaWiki_16);

        



          //HIZI NI BASEDON USER
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_1(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_1);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_2(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_2);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_3(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_3);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_4(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_4);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_5(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_5);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_6(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_6);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_7(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_7);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_8(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_8);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_9(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_9);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_10(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_10);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_11(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_11);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_12(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_12);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_13(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_13);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_14(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_14);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_15(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_15);
          setKiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_16(data.KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_16);

        
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_1(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_1);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_2(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_2);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_3(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_3);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_4(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_4);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_5(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_5);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_6(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_6);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_7(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_7);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_8(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_8);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_9(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_9);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_10(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_10);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_11(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_11);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_12(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_12);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_13(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_13);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_14(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_14);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_15(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_15);
          setKiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_16(data.KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_16);


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






const TotalVyakulaCard = () => {
  




 return (

   <View style={globalStyles.TaarifaMainContainerLaZote}>

  
  
      <TouchableOpacity
       // onPress={() =>
       //  navigation.navigate('Taarifa Za Kuku', item)}
       
     
      
      style={globalStyles.TaarifaOverdoseCartItemsContainer} >


   {/* mwanzo wa flow ya 00*/}
        <View 
        style={globalStyles.TaarifaOverdoseLeftCartItemsContainer}
        >
      
     
     {AinaYaKuku && ( 
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
           
            Aina yako ya kuku
          </Text>
          
          </View>
          )}

         {AinaYaKuku && ( 
         <View style={
            globalStyles.TaarifaRight
          }>
        
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {AinaYaKuku} 
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya 000*/}





      {/* mwanzo wa flow ya 00*/}
        <View 
        style={globalStyles.TaarifaOverdoseLeftCartItemsContainer}
        >
      
     
     {UmriKwaWiki && ( 
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
           
            Umri wa kuku wako
          </Text>
          
          </View>
          )}

         {UmriKwaWiki && ( 
         <View style={
            globalStyles.TaarifaRight
          }>
        
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
           Wiki: {UmriKwaWiki} 
          </Text>

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
           Siku: {Interval} 
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya 00*/}



       
       {/* mwanzo wa flow ya 0*/}
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
           
             Idadi Ya Kuku
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
            1
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya 0*/}



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
           
            Wastani wa kiasi Chakula kinachohitajika kwa siku
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
            {total_Kilos_neededBasedOnUserDays.toFixed(2)} Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya 1*/}








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
           
            Kitatumika kwa wastani wa wiki
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
            {MudaWaChakulaKitakapoTumikaBasedOnUserDays} 
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

    <Pressable style={globalStyles.MaelezoContainer1TaarifaZaKuku}>

    <Text style={globalStyles.MaelezoText1TaarifaZaKuku}>
    Haya ni maelekezo yanayotokana na taarifa ambazo ulizijaza.   
    </Text>

  {total_Kilos_needed_Based_on_Aina_Umri_WaKuku > 0 && (
     <Text style={globalStyles.MaelezoText2TaarifaZaKuku}>
   Kuku mmoja aina ya {AinaYaKuku} mwenye umri wa wiki {UmriKwaWiki},
   yani kuanzia siku {Interval}, anahitaji jumla ya kiasi 
   <Text> </Text>  
   <Text style={globalStyles.MaelezoValue1TaarifaZaKuku} >
   {total_Kilos_needed_Based_on_Aina_Umri_WaKuku.toFixed(2)} Kg </Text>
   cha chakula.
    </Text>
      )}

{total_Kilos_needed_Based_on_Aina_Umri_WaKuku > 0 && (
 <Text style={globalStyles.MaelezoText1TaarifaZaKuku}>
    Ambapo mgawanyo wa chakula utakuwa kama ifuatavyo kwa wiki nzima 
    na kwa kila siku kwa aina hii ya kuku;   
    </Text>
    )}

    </Pressable>












{/*mwanzo wa mgawanyo wa chakula*/}

{total_Kilos_needed_Based_on_Aina_Umri_WaKuku > 0 && (
   <View style={globalStyles.TaarifaZaKukuMaelezoMainContainerLaZote}>

      <TouchableOpacity
       // onPress={() =>
       //  navigation.navigate('TaarifaZaKukuMaelezo Za Kuku', item)}
      style={globalStyles.TaarifaZaKukuMaelezoOverdoseCartItemsContainer} >


   {/* mwanzo wa flow ya wiki 1*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_1 > 0 && ( 
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
           
            Wiki ya 1 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_1 > 0 && ( 
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
            {KiasiChaChakulaKwaWiki_1.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_1 > 0 && ( 
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
            {KiasiChaChakulaKwaSiku_KwaWiki_1.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 1*/}







   {/* mwanzo wa flow ya wiki 2*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_2 > 0 && ( 
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
           
            Wiki ya 2 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_2 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_2.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_2 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_2.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 2*/}





   {/* mwanzo wa flow ya wiki 3*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_3 > 0 && ( 
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
           
            Wiki ya 3 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_3 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_3.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_3 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_3.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 3*/}








   {/* mwanzo wa flow ya wiki 4*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_4 > 0 && ( 
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
           
            Wiki ya 4 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_4 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_4.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_4 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_4.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 4*/}







   {/* mwanzo wa flow ya wiki 5*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_5 > 0 && ( 
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
           
            Wiki ya 5 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_5 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_5.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_5 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_5.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 5*/}







   {/* mwanzo wa flow ya wiki 6*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_6 > 0 && ( 
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
           
            Wiki ya 6 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_6 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_6.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_6 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_6.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 6*/}






   {/* mwanzo wa flow ya wiki 7*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_7 > 0 && ( 
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
           
            Wiki ya 7 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_7 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_7.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_7 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_7.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 7*/}







   {/* mwanzo wa flow ya wiki 8*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_8 > 0 && ( 
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
           
            Wiki ya 8 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_8 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_8.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_8 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_8.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 8*/}







   {/* mwanzo wa flow ya wiki 9*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_9 > 0 && ( 
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
           
            Wiki ya 9 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_9 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_9.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_9 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_9.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 9*/}







   {/* mwanzo wa flow ya wiki 10*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_10 > 0 && ( 
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
           
            Wiki ya 10 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_10 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_10.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_10 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_10.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 10*/}





   {/* mwanzo wa flow ya wiki 11*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_11 > 0 && ( 
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
           
            Wiki ya 11 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_11 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_11.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_11 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_11.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 11*/}




   {/* mwanzo wa flow ya wiki 12*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_12 > 0 && ( 
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
           
            Wiki ya 12 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_12 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_12.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_12 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_12.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 12*/}






   {/* mwanzo wa flow ya wiki 13*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_13 > 0 && ( 
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
           
            Wiki ya 13 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_13 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_13.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_13 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_13.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 13*/}







   {/* mwanzo wa flow ya wiki 14*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_14 > 0 && ( 
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
           
            Wiki ya 14 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_14 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_14.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_14 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_14.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 14*/}






   {/* mwanzo wa flow ya wiki 15*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_15 > 0 && ( 
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
           
            Wiki ya 15 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_15 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_15.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_15 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_15.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 15*/}





   {/* mwanzo wa flow ya wiki 16*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_16 > 0 && ( 
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
           
            Wiki ya 16 na zaidi anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_16 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_16.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaSiku_KwaWiki_16 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_KwaWiki_16.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 16*/}

 

   </TouchableOpacity>

  </View>

  )}

{/*mwisho wa mgawanyo wa chakula*/}













{/* mwanzo wa mchanganuo kulingana na siku ulizozichagua*/}

<Text
    style={globalStyles.AppChaguaHudumaTextHomeScreen}  
    
    >Mchanganuo wa mahitaji ya kuku aina ya {AinaYaKuku},
    umri kuanzia siku {Interval}, kwa 
    siku {IdadiYaSiku} unazohitaji kutengeneza chakula.
     </Text>





 <Pressable style={globalStyles.MaelezoContainer1TaarifaZaKuku}>

    <Text style={globalStyles.MaelezoText1TaarifaZaKuku}>
    Haya ni maelekezo kwa siku {IdadiYaSiku} ambazo ulizijaza.   
    </Text>

  {total_Kilos_neededBasedOnUserDays > 0 && (
     <Text style={globalStyles.MaelezoText2TaarifaZaKuku}>
   Kuku mmoja aina ya {AinaYaKuku} mwenye umri wa wiki {UmriKwaWiki},
   yani kuanzia siku {Interval}, anahitaji wastani wa kiasi cha 
   <Text> </Text>  
   <Text style={globalStyles.MaelezoValue1TaarifaZaKuku} >
   {total_Kilos_neededBasedOnUserDays.toFixed(2)} Kg </Text>
   cha chakula, ambacho Kitatumika kwa wastani wa wiki {MudaWaChakulaKitakapoTumikaBasedOnUserDays}
    </Text>
      )}

{total_Kilos_needed_Based_on_Aina_Umri_WaKuku > 0 && (
 <Text style={globalStyles.MaelezoText1TaarifaZaKuku}>
    Ambapo mgawanyo wa chakula kwa hizi wiki zote   {MudaWaChakulaKitakapoTumikaBasedOnUserDays} utakuwa kama ifuatavyo kwa wiki nzima 
    na kwa kila siku kwa aina hii ya kuku;   
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
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_1 > 0 && ( 
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
           
            Wiki ya 1 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_1 > 0 && ( 
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
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_1.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_1 > 0 && ( 
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
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_1.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 1*/}







   {/* mwanzo wa flow ya wiki 2*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_2 > 0 && ( 
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
           
            Wiki ya 2 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_2 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_2.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_2 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_2.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 2*/}





   {/* mwanzo wa flow ya wiki 3*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_3 > 0 && ( 
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
           
            Wiki ya 3 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_3 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_3.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_3 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_3.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 3*/}








   {/* mwanzo wa flow ya wiki 4*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_4 > 0 && ( 
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
           
            Wiki ya 4 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_4 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_4.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_4 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_4.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 4*/}







   {/* mwanzo wa flow ya wiki 5*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_5 > 0 && ( 
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
           
            Wiki ya 5 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_5 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_5.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_5 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_5.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 5*/}







   {/* mwanzo wa flow ya wiki 6*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_6 > 0 && ( 
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
           
            Wiki ya 6 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_6 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_6.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_6 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_6.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 6*/}






   {/* mwanzo wa flow ya wiki 7*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_7 > 0 && ( 
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
           
            Wiki ya 7 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_7 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_7.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_7 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_7.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 7*/}







   {/* mwanzo wa flow ya wiki 8*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_8 > 0 && ( 
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
           
            Wiki ya 8 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_8 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_8.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_8 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_8.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 8*/}







   {/* mwanzo wa flow ya wiki 9*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_9 > 0 && ( 
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
           
            Wiki ya 9 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_9 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_9.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_9 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_9.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 9*/}







   {/* mwanzo wa flow ya wiki 10*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_10 > 0 && ( 
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
           
            Wiki ya 10 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_10 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_10.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_10 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_10.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 10*/}





   {/* mwanzo wa flow ya wiki 11*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_11 > 0 && ( 
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
           
            Wiki ya 11 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_11 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_11.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_11 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_11.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 11*/}




   {/* mwanzo wa flow ya wiki 12*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_12 > 0 && ( 
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
           
            Wiki ya 12 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_12 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_12.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_12 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_12.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 12*/}






   {/* mwanzo wa flow ya wiki 13*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_13 > 0 && ( 
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
           
            Wiki ya 13 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_13 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_13.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_13 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_13.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 13*/}







   {/* mwanzo wa flow ya wiki 14*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_14 > 0 && ( 
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
           
            Wiki ya 14 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_14 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_14.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_14 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_14.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 14*/}






   {/* mwanzo wa flow ya wiki 15*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_15 > 0 && ( 
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
           
            Wiki ya 15 anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_15 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_15.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_15 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_15.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 15*/}





   {/* mwanzo wa flow ya wiki 16*/}
        <View 
        style={globalStyles.TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer}
        >
      
     
     {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_16 > 0 && ( 
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
           
            Wiki ya 16 na zaidi anatumia wastani
          </Text>
          
          </View>
          )}

         {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_16 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         {/* <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            Wiki
          </Text>*/}
          <Text 
           style={globalStyles.TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_16.toFixed(2)}Kg 
          </Text>
          
     </View>
     )}

       {KiasiChaChakulaKwaWiki_BasedOn_User_KwaWiki_16 > 0 && ( 
         <View style={
            globalStyles.TaarifaZaKukuMaelezoRight
          }>
         
         {/* <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            Siku
          </Text>*/}

          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
            {KiasiChaChakulaKwaSiku_BasedOn_User_KwaWiki_16.toFixed(2)}Kg
          </Text>
          
     </View>
     )}

      
       
        </View>
      {/*mwisho wa flow ya wiki ya 16*/}

 

   </TouchableOpacity>

  </View>

  )}

{/*mwisho wa mgawanyo wa chakula kwa siku ulizozichagua*/}












{/*MWANZO WA COMMENT*/}

<Text
    style={globalStyles.AppChaguaHudumaTextHomeScreen}  
    
    >Weka Comment hapa

     </Text>

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
         
     



  <MinorHeader title={AinaYaKuku}/>


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
    
    >Mchanganuo wa jumla kwa kuku aina {AinaYaKuku},
    umri kuanzia siku {Interval}, kwa siku {IdadiYaSiku}.

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
    




<Text
    style={globalStyles.AppChaguaHudumaTextHomeScreen}  
    
    >Mchanganuo wa mahitaji ya kuku aina ya {AinaYaKuku},
    umri kuanzia siku {Interval}.
     </Text>


       
      
     
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
         onPress={() => {
           
            setModalVisible(true);
            setIsModalVisible(true); // Update state when modal opens
            }}
           
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
              Ingiza Idadi ya kuku wako
            </Text>
          </TouchableOpacity>
          

        </Pressable>
   






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
     
    
        <View style={[{ 
          flex: 1,
         //marginTop:height/4, 
          justifyContent: 'center', 
          alignItems: 'center',
          //height:height,
           },
          {
            // backgroundColor:'green',
          }]}>
          <View style={[
            globalStyles.ModalViewIdadiYaSiku,
            {

              //height:height,
              flex:1,
              // backgroundColor:'red',

            }]}>
         

        

        <IdadiYaKukuComponent 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        isModalVisible={isModalVisible} 
        setIsModalVisible={setIsModalVisible}  
        AinaYaKuku={AinaYaKuku} 
        UmriKwaWiki={UmriKwaWiki} 
        KukuId={KukuId} 
        UmriWaKukuIdKwaajiliYaPerKuku={UmriWaKukuIdKwaajiliYaPerKuku}
        IdadiYaSiku={IdadiYaSiku}
        Interval={Interval} 
        />
 



          
          </View>
        </View>



       
        
      </Modal>









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

export default TaarifaZaKuku;

const styles = StyleSheet.create({});
