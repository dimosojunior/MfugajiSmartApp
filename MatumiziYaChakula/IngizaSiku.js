
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


const IngizaSiku = ({navigation, route}) => {
   const { 
    
     id, //hii ni id ya umri wa kuku
    KukuId ,
    UmriKwaWiki,
    AinaYaKuku,
    StaterFeed,
   FinisherFeed,
   LayerFeed,
   GrowerFeed,

    UmriKwaSiku,
    
    Interval
   } = route.params

  const UmriWaKukuId = id;

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
const [inputi, setInputi] = useState('');


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








  
  return (

    <>{!fontsLoaded ? (<View/>):(


    <>


 {!isPending ? (

     <View style={[globalStyles.container
     ,globalStyles.ImagePosterColor]}>
         
     



  <MinorHeader title="Ingiza Siku"/>

      


 <ScrollView 
        keyboardShouldPersistTaps="handled"
        >








{/*mwanzo wa view ya image*/}
 <View>



<View style={{
          width:width,
          //justifyContent:'center',
         // alignItems:'center',
          //flex:1,
          //backgroundColor:'#fdb9b1',
          //height:height,
        }}>

     
      <Image

      style={globalStyles.UmriInitialImage}
       source={require('../assets/300.jpg')} 
      >
      </Image>

      </View>


     


</View>


{/*Mwisho wa view ya image*/}








       {/*mwanzo wa search*/}

         <View style={[{position: 'relative', 
        flex:2,
        position: 'relative',
        //backgroundColor:'#fdb9b1',
        marginTop:-30,

        //marginTop:10,

        //bottom: 30
      },
      globalStyles.ImagePosterColor
      ]}>

<Text style={globalStyles.tuambieSiku}>
Tafadhali, tuambie unahitaji kutengeneza chakula cha muda gani ? (ingiza siku unazotaka kutengeneza chakula, mwisho siku 168 "Miezi 6")

</Text>

     <View style={[globalStyles.searchbarOtherPages,

      {

        //flex:2,
        // marginTop:-30,
        

      }


      ]}>


                 <View style={globalStyles.searchbarIconContainerOtherPages}>
                    <Ionicons name="search-outline" 
                    size={25} 
                    color={COLORS.black} 

                    style={globalStyles.AppIConHomeScreenOtherPages}

                      />
                    </View>

                    <View style={globalStyles.searchbarInputContainerOtherPages}>
                    <TextInput 
                    value={inputi} onChangeText ={(text) => setInputi(text)}
                    placeholder="Ingiza siku" 
                     placeholderTextColor='black'
                     keyboardType="numeric"
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>









  {inputi != '' && (



 <TouchableOpacity


   onPress={() =>
        navigation.navigate('Ingiza Idadi Ya Kuku', { inputi, KukuId, AinaYaKuku,UmriKwaWiki,UmriWaKukuId, Interval,UmriKwaSiku, StaterFeed, GrowerFeed, LayerFeed, FinisherFeed })}
       
           
      style={[
        globalStyles.IdadiYaKukuFirstContainer,
        {
          //backgroundColor:'red',
          width:'90%',
          //flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          marginLeft:20,
        }
      ]} >


        <View 
        style={{
          //backgroundColor:'red'
        }}
        >

      <Text style={{
        backgroundColor:'green',
        paddingVertical:10,
        marginVertical:10,
        color:'white',
        borderRadius:8,
        paddingHorizontal:30,
        lineHeight:30,
        fontFamily:'Medium',

      }}>Bonyeza kuendelea kutengeneza chakula cha siku  <Text style={{
        color:'red',
        fontFamily:'Bold',
        fontSize:20,
      }}> {inputi}</Text>
            </Text>
          
        </View>



      </TouchableOpacity>


 )}









    </View>

 {/*mwisho wa search*/}










       













{/*<View style={{
  marginBottom:100,
}}>
  <Text style={{
    color:'white',
  }}>Vuta juu</Text>
</View>
*/}

{/*mwanzo kwaajili ya kupress order*/}



</ScrollView>


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

export default IngizaSiku;

const styles = StyleSheet.create({});
