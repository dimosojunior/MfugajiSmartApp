
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

import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

const IngizaKiasi = ({navigation, route}) => {

   const { 
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

    AinaYaKuku,
   KukuId,
   UmriKwaWiki,
   UmriKwaSiku,
   Interval,
    id //id ya umri wa kuku
   } = route.params

  const UmriwaKukuId = id;
  const UnaKiasiGaniChaChakula = 0;
  const selectedProductIds = 0;
  const setSelectedProductIds = 0
  const totalCartPrice = 0;
   const totalCartKilos = 0;

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
   const url = EndPoint + `/GetIdadiYaKilosView/?page=${current_page}&page_size=500`
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
          <ActivityIndicator size="large" color="lightgreen" />
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

      }}>Bonyeza kuendelea kutengeneza chakula cha Kg: {input}</Text>
            
          
        </View>



      </TouchableOpacity>






)}
</>


)




  // hili bano la chini ni la if ya juu kama mtu akitype   
}

if (item.IdadiYaKilos.toString().toLowerCase().includes(input.toLowerCase())) {

return (

<>
{input != '' ? (

 <TouchableOpacity

      //  onPress={() =>
      //   navigation.navigate('Taarifa Za Kuku Per Kuku Namba', { ...item, KukuId,UmriWaKukuId, AinaYaKuku, UmriKwaWiki })
      // }

        onPress={() => {
        navigation.navigate('Vyakula Vyote', { ...item,
          UmriwaKukuId,
          UmriKwaWiki, 
          UmriKwaSiku,
          Interval, 
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
        });
        // setIsModalVisible(false); // Update state when modal opens
        // setModalVisible(false);
      }}
       
     
      
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
        paddingVertical:10,
        marginVertical:10,
        color:'white',
        borderRadius:8,
        paddingHorizontal:30,
        lineHeight:30,
        fontFamily:'Medium',

      }}>Bonyeza kuendelea 
      kutengeneza chakula cha Kilo:<Text style={{
        color:'red',
        fontFamily:'Bold',
        fontSize:20,
      }}> {item.IdadiYaKilos}</Text>
            </Text>
          
        </View>



      </TouchableOpacity>

):(


<View style={{
          width:width,
          //justifyContent:'center',
          alignItems:'center'
        }}>
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
        height: height/2 - 70,
         width:'80%',
         borderRadius:5,

        }}
        source={require('../assets/Loading/l1.json')} // Replace with your animation JSON file
        autoPlay
        loop
      />

      </View>




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

     <View style={[globalStyles.container
     ,{
      
      backgroundColor: input != '' ? 
              COLORS.white : 'lightgreen'
    }]}>
         
     



  <MinorHeader title="Kiasi"/>

      






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
                    placeholder="Ingiza kiasi" 
                     placeholderTextColor='black'
                     keyboardType="numeric"
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>




  {input != '' ? (
  <Text
      style={globalStyles.AppChaguaHudumaTextHomeScreen}  
      
      >Unataka kutengeneza chakula cha Kg {input} ?</Text>
 

 ):(

 <View>



<View style={{
          width:width,
          justifyContent:'center',
          alignItems:'center',
          //flex:1,
          backgroundColor:'lightgreen',
          //height:height,
        }}>

        <Text
    style={globalStyles.AppChaguaHudumaTextHomeScreen}  
    
    >Tafadhali, ingiza kiasi cha chakula ulichonacho au 
    unachohitaji kutengeneza kwa kilo.</Text>

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



       









       







      
      { queryset && queryset.length > 0 ? (
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
  <Text style={globalStyles.noitemText}>Hakuna taarifa zozote za kiasi cha chakula! !
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
                    <Image source={require('../assets/icon.png')} style={globalStyles.alertImage} />
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

export default IngizaKiasi;

const styles = StyleSheet.create({});
