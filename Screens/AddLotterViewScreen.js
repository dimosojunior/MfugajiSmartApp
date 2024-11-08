
import { StyleSheet,Dimensions, Switch,TouchableOpacity,ActivityIndicator, ScrollView, Text, View, Button, Image } from 'react-native';


import { EventRegister } from 'react-native-event-listeners';

import React, {useState, useEffect, useContext} from 'react';
import theme from '../theme/theme';
import themeContext from '../theme/themeContext';


import {globalStyles} from '../Styles/GlobalStyles';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFonts } from 'expo-font'

import LottieView from 'lottie-react-native';
export default function LotterViewScreen() {

    // To change color
const theme = useContext(themeContext)
const [darkMode, setdarkMode] = useState(false)


  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});

  const navigation = useNavigation();
  const {width, height} = Dimensions.get('window');
  
 
  return (
    
<>{!fontsLoaded ? (<View/>):(

   

<View 
style={{
  justifyContent:'center',
  alignItems:'center',
   flex:1,
  zIndex:1,
  opacity:0.5,
  //height:height,
  // backgroundColor:'red',

}}
>

 <Text style={{
        color:'green',
        fontFamily:'Bold',

      }}>Please wait ......</Text>
  <LottieView
        style={{
          //flex:1,
          height:150,
          width:150,

        }}
        source={require('../assets/Loading/loading1.json')} // Replace with your animation JSON file
        autoPlay
        loop
      />
     


</View>


)}</>

  );
}

const styles = StyleSheet.create({

  Profilecontainer:{
    // justifyContent:'center',
    // alignItems:'center',
     //flex:1,
     justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'wheat',
    zIndex:1,
  },


});