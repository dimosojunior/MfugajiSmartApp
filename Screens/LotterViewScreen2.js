
import { StyleSheet,Switch,TouchableOpacity,ActivityIndicator, ScrollView, Text, View, Button, Image } from 'react-native';


import { EventRegister } from 'react-native-event-listeners';

import React, {useState, useEffect, useContext} from 'react';

import {globalStyles} from '../Styles/GlobalStyles';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import LottieView from 'lottie-react-native';
export default function LotterViewScreen2() {
  const navigation = useNavigation();
  
 
  return (
    


   

<View 
style={{
  justifyContent:'center',
  alignItems:'center',
}}
>
  <LottieView
        style={{

        }}
        source={require('../assets/Loading/loading1.json')} // Replace with your animation JSON file
        autoPlay
        loop
      />


</View>




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