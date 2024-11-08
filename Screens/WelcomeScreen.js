
import React, {useState, useEffect} from 'react';
import { StyleSheet,ImageBackground, Text,ScrollView, View,Image,Pressable, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import useFetch from '../useFetch';

import MinorHeader from '../Header/MinorHeader';
// import HomeScreenCard from '../Shared/HomeScreenCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useFonts} from 'expo-font';

import LottieView from 'lottie-react-native';
const WelcomeScreen =({navigation}) => {

   let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


  //const navigation = useNavigation();

 
  const [routes, setRoutes] = useState([
  {
    RouteName:'Mfugaji Smart inakusaidia Kukokotoa uwiano sahihi wa viungo kwa kuchanganya vyakula mbalimbali vya kuku. Pia Mfugaji Smart inakusaidia kukokotoa hesabu za matumizi ya chakula kwa muda Fulani',
   RouteImage:require('../assets/300.jpg'),
   id:'1'
 },

 

 
    ]);



 //FOR Routes APIS
//const { myfetch:routes, isPending, error } = useFetch('https://a2ca-196-249-104-119.ngrok-free.app/apis/ComputerVisionExperts');



 const {width, height} = Dimensions.get('window');
 





 
  return (


     <>{!fontsLoaded ? (<View/>):(
    

  // {<Header />}


// {mwanzo wa list za modules}

 

<View style={{flex: 1, 
  backgroundColor:'#233329',
//width: '100%',
flex:1,
marginTop:0,
}}>

<ScrollView 
        keyboardShouldPersistTaps="handled"
        >






{/*mwanzo*/}



     <View style={{
            //alignItems: 'center',
            width:width,
          }}>

        <View style={{
          width:width,
          //justifyContent:'center',
          alignItems:'center'
        }}>
      <Image
        source={require('../assets/400.jpg')}
        style={{
          height: height/2 ,
         width:'100%',
         borderRadius:5,
         marginTop:20,
       }}
      />
  
      </View>



      <View style={{
        width:width-20,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:-10,
        //flex:1,
      }}>

 <Pressable>
<Text style={{
  textAlign:'center',
  fontSize:18,
  marginTop:10,
  //fontWeight:'bold',
  marginBottom:10,
  //lineHeight:24,
  color:'green',
  fontFamily:'Bold',
  backgroundColor:'yellow',
  paddingHorizontal:15,
  borderRadius:10,

}}> MFUGAJI SMART</Text>



<Text style={{
  color:'white',
  lineHeight:20,
  fontFamily:'Regular',
  
}}>
  
  Karibu kwenye jukwaa la wafugaji la MFUGAJI SMART, hakika uko hatua moja mbele katika 
  kufuga kisasa. Pata zana na taarifa bora kukuza ufugaji wako kwa urahisi na uhakika. 

  Asante kwa kuchagua njia bora ya kufuga. <Text style={{
    color:'green',
    fontFamily:'Bold',
  }}>Mfugaji Smart - Fuga kidijitali</Text>
</Text>


</Pressable>


      </View>





    </View>





{/*mwisho*/}







   

           














</ScrollView>


                  <TouchableOpacity
                style={[styles.getstarted,
                  {
                     right:5,
                    position:'absolute',
                    bottom:10
                  }


                  ]}
                // onPress={() => navigation.navigate('PreLoader Stack')}
                onPress={() => navigation.navigate('Sera Screen')}
                >
                
                
                <Text style={{
                  //fontWeight: 'bold', 
                  //fontSize: 20,
                  backgroundColor:'green',
                  color:'white',
                  padding:10,
                  borderRadius:10,
                  fontFamily:'Medium',
                  //paddingHorizontal:20,
                }}>
                  Anza
                </Text>

          <Ionicons name='arrow-forward-circle' 
      size={28}
      color='white'  
      
       />

              </TouchableOpacity>
</View>



)}</>


     
  );
}
export default WelcomeScreen;

const styles = StyleSheet.create({
 // header:{
 //  width:'100',
 // height:'15%',
 // backgroundColor:'#c8c8c8',
 // alignItems:'center',
 // justifyContent:'center',
 // },


subtitle: {
    color:'white',
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color:'white',
    //fontSize: 22,
   // fontWeight: 'bold',
    marginTop: 20,
    //textAlign: 'center',
    fontFamily:'Regular',
    width:'95%'
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'red',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'black'
  },
  getstarted:{
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row',
    paddingHorizontal:20,

  },


    });
