
import { StyleSheet,TextInput,ActivityIndicator,Alert, Text,Animated,ScrollView, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';

import { Ionicons, FontAwesome} from '@expo/vector-icons';

// import Search from '../Shared/search';

//import{LinearGradient} from 'expo-linear-gradient';

//import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

//import {AppLoading} from 'expo';
//import * as SplashScreen from 'expo-splash-screen';
//E3E4FA

//import AppLoading from 'expo-app-loading';



// This import used to change color
import { EventRegister } from 'react-native-event-listeners';

import React, {useState, useEffect, useContext} from 'react';
import LotterViewScreen from '../Screens/LotterViewScreen';

import { EndPoint } from "../Constant/links";
import { EndPointV3 } from "../Constant/links";

import { useFonts } from 'expo-font';



import {Radio, CheckBox} from "./CheckBox";
import {Button} from "./inputs";


const Home =() => {


const [instruments, setInstruments] = useState([]);



  
    return (
 


 


// { MWANZO WA container1}
 <View style={styles.container}>

 
 <Text style={styles.mainHeader}>Radio and Checkboxes</Text>




<Text style={styles.header}>Choose all that apply</Text>


<CheckBox options={[

  {label: "Dimoso", value: "Dimoso"},
  {label: "Juma", value: "Juma"},
  {label: "Issa", value: "Issa"},


  ]} 

  checkedValues={instruments}
  onChange={setInstruments}
  style={{marginBottom: 15}}

  />


<Button
 onPress={() => {
  alert('CHOSEN FRUIT: ${fruit}')
 }}
>
  
</Button>


    </View>
// MWISHO WA container1




  );
};






  
export default Home;


const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'white',

    
    // alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:25,
  },
  mainHeader:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    marginBottom:15,
    marginTop:0,
  
  },

header:{
  marginBottom:15,
  fontSize:16,
  color:'black',
},


});