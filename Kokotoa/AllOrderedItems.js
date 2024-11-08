
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
// import { getFormatedDate } from "react-native-modern-datepicker";
// import DatePicker from "react-native-modern-datepicker";
import LottieView from 'lottie-react-native';
//import ConstantAllOrderedItems from './ConstantAllOrderedItems';


const { width, height } = Dimensions.get('window');

const AllOrderedItems = ({navigation, route}) => {

  const { 

   
   //  UmriKwaWiki,
   // 
   // total_price,
   //  total_Kilos,

    
   // KukuId,
   // UmriwaKukuId,
   // totalCartKilos,
   // totalCartPrice,
   id,//id ya order
    
    StaterFeed,
   FinisherFeed,
   LayerFeed,
   GrowerFeed,
    AinaYaKuku,
    UmriKwaSiku,
    UmriKwaWiki,
    Interval,
    

    TotalFoodMixerPercentage,
    TotalFoodAmount,
    UnaKiasiGaniChaChakula,

    //hizi zintoka kwenye model ya VyakulaOrder
    TotalCPPercentageRequired,
     TotalWangaPercentageRequired,
     TotalMafutaPercentageRequired,
     TotalMEPercentageRequired,

     TotalConstantFoodMixerPercentage,
     TotalMixerKios_ForConstantFoodGroups
    

   } = route.params

  //const ChakulaId = id;



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







 const [modalVisible, setModalVisible] = useState(false);
 const [isModalVisible, setIsModalVisible] = useState(false); // New state variable

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [queryset, setQueryset] = useState([]);
  const [mainTotalPrice, setMainTotalPrice] = useState(null);
  const [refresh, setRefresh] = useState(false);

//const [isPending, setisPending] = useState(false);
const [isRange, setisRange] = useState(false);

const [calculatedItems, setCalculatedItems] = useState([]);


//Load more
 // const [queryset, setOrders] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
//const [isPending, setPending] = useState(true);
const [isPending, setisPending] = useState(false);
const [userData, setUserData] = useState({});

  

 const pullMe =() => {
    setRefresh(true)

    setTimeout (() => {
      setRefresh(false)
    }, 10)
  }


 const [userToken, setUserToken] = useState('');

//UPDATE USER TOKEN
useFocusEffect(
    React.useCallback(() => {
      const updateUserToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token || '');
      };

      updateUserToken();

      // Listen for the 'updateUserToken' event
      const unsubscribe = navigation.addListener('updateUserToken', updateUserToken);

      // Cleanup the listener when the component unmounts
      return unsubscribe;
    }, [navigation])
  );






useEffect(() => {

   
    checkLoggedIn();
    // Fetch cart items only if the user is authenticated
    if (userToken) {
     setLoading(true)
     //getProducts();;
    }

  }, [userToken]);


 useEffect(() => {
    fetchUserData();
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const parsedUserData = JSON.parse(userDataJSON);
        setUserData(parsedUserData);
        
        //console.log("USERDATA ARE");
        //console.log(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };



const checkLoggedIn = async () => {
  const token = await AsyncStorage.getItem('userToken');
  setUserToken(token);
  
  
 
};

//HIZI NI ZA MAONI
const [Maoni_Ya_CPValue, setMaoni_Ya_CPValue] = useState(0);
const [Maoni_Ya_WangaValue, setMaoni_Ya_WangaValue] = useState(0);
const [Maoni_Ya_MafutaValue, setMaoni_Ya_MafutaValue] = useState(0);

const [TotalCPValue, setTotalCPValue] = useState(0);
const [TotalWangaValue, setTotalWangaValue] = useState(0);
const [TotalMafutaValue, setTotalMafutaValue] = useState(0);
const [TotalDCPValue, setTotalDCPValue] = useState(0);
const [TotalPREMIXValue, setTotalPREMIXValue] = useState(0);
const [TotalLysinValue, setTotalLysinValue] = useState(0);
const [TotalMETHValue, setTotalMETHValue] = useState(0);
const [TotalTryptophanValue, setTotalTryptophanValue] = useState(0);
const [TotalUngaWaMifupaValue, setTotalUngaWaMifupaValue] = useState(0);
const [TotalChumviValue, setTotalChumviValue] = useState(0);
const [TotalMEValue, setTotalMEValue] = useState(0);


const [Mashudu_Ya_Alizeti_New_Value, setMashudu_Ya_Alizeti_New_Value] = useState(0);
const [Pumba_Za_Mahindi_New_Value, setPumba_Za_Mahindi_New_Value] = useState(0);
const [Dagaa_New_Value, setDagaa_New_Value] = useState(0);






//----------------------FOR CONSTANT QUERYSET------------------
//----------------------FOR CONSTANT QUERYSET------------------



const [constantCalculatedItems, setconstantCalculatedItems] = useState([]);
const [constant_queryset, setconstant_queryset] = useState([]);







useEffect(() => {
    const fetchAllData = async () => {
        try {
            const response1 = axios.get(`${EndPoint}/GetAllVyakulaOrderItemsView/?id=${id}&TotalMixerKios_ForConstantFoodGroups=${TotalMixerKios_ForConstantFoodGroups}&TotalConstantFoodMixerPercentage=${TotalConstantFoodMixerPercentage}&TotalCPPercentageRequired=${TotalCPPercentageRequired}&TotalWangaPercentageRequired=${TotalWangaPercentageRequired}&TotalMafutaPercentageRequired=${TotalMafutaPercentageRequired}&TotalMEPercentageRequired=${TotalMEPercentageRequired}&AinaYaKuku=${AinaYaKuku}&StaterFeed=${StaterFeed}&GrowerFeed=${GrowerFeed}&LayerFeed=${LayerFeed}&FinisherFeed=${FinisherFeed}&UmriKwaWiki=${UmriKwaWiki}&Interval=${Interval}&UmriKwaSiku=${UmriKwaSiku}&TotalFoodAmount=${TotalFoodAmount}&TotalFoodMixerPercentage=${TotalFoodMixerPercentage}&UnaKiasiGaniChaChakula=${UnaKiasiGaniChaChakula}`);
            
            const response2 = axios.get(`${EndPoint}/GetConstantFoodKilosForEachItemView/?id=${id}&TotalMixerKios_ForConstantFoodGroups=${TotalMixerKios_ForConstantFoodGroups}&TotalConstantFoodMixerPercentage=${TotalConstantFoodMixerPercentage}&TotalCPPercentageRequired=${TotalCPPercentageRequired}&TotalWangaPercentageRequired=${TotalWangaPercentageRequired}&TotalMafutaPercentageRequired=${TotalMafutaPercentageRequired}&TotalMEPercentageRequired=${TotalMEPercentageRequired}&AinaYaKuku=${AinaYaKuku}&StaterFeed=${StaterFeed}&GrowerFeed=${GrowerFeed}&LayerFeed=${LayerFeed}&FinisherFeed=${FinisherFeed}&UmriKwaWiki=${UmriKwaWiki}&Interval=${Interval}&UmriKwaSiku=${UmriKwaSiku}&TotalFoodAmount=${TotalFoodAmount}&TotalFoodMixerPercentage=${TotalFoodMixerPercentage}&UnaKiasiGaniChaChakula=${UnaKiasiGaniChaChakula}`);

            const [result1, result2] = await Promise.all([response1, response2]);

            // Extract data from responses
            const { queryset, calculated_items, main_total_price, ...totals } = result1.data;
            const { constant_queryset, constant_calculated_items } = result2.data;

            // Set data for the first API call
            setQueryset(queryset);
            setCalculatedItems(calculated_items);
            setMainTotalPrice(main_total_price);

            // Set totals values
            setTotalCPValue(totals.TotalCP);
            setTotalWangaValue(totals.TotalWanga);
            setTotalMafutaValue(totals.TotalMafuta);
            setTotalDCPValue(totals.TotalDCP);
            setTotalPREMIXValue(totals.TotalPREMIX);
            setTotalLysinValue(totals.TotalLysin);
            setTotalMETHValue(totals.TotalMETH);
            setTotalTryptophanValue(totals.TotalTryptophan);
            setTotalUngaWaMifupaValue(totals.TotalUngaWaMifupa);
            setTotalChumviValue(totals.TotalChumvi);
            setTotalMEValue(totals.TotalME);

             //----pata materials ya lazima
         setMashudu_Ya_Alizeti_New_Value(totals.Mashudu_Ya_Alizeti_New_Value);
         setPumba_Za_Mahindi_New_Value(totals.Pumba_Za_Mahindi_New_Value);
         setDagaa_New_Value(totals.Dagaa_New_Value);


            setMaoni_Ya_CPValue(totals.Maoni_Ya_CP);
            setMaoni_Ya_WangaValue(totals.Maoni_Ya_Wanga);
            setMaoni_Ya_MafutaValue(totals.Maoni_Ya_Mafuta);

            // Set data for the second API call
            setconstant_queryset(constant_queryset);
            setconstantCalculatedItems(constant_calculated_items);

            setisPending(true);
            setisRange(false);
        } catch (error) {
            console.error(error);
            setisPending(true);
        }
    };

    fetchAllData();
}, []);





//-------------------CALCULATION------
// const JumlaYaMchanganyoWaMahindi_value = JumlaYaMchanganyoWaMahindi ? JumlaYaMchanganyoWaMahindi : 0;
// const JumlaYaMchanganyoWaMahindi_IdadiYaKuku = JumlaYaMchanganyoWaMahindi_value;


// console.log("-------------------------");
// console.log("Mashudu_Ya_Alizeti_New_Value", Mashudu_Ya_Alizeti_New_Value);
// console.log("Pumba_Za_Mahindi_New_Value", Pumba_Za_Mahindi_New_Value);
// console.log("Dagaa_New_Value", Dagaa_New_Value);



//console.log("Maoni", Maoni_Ya_CPValue);


  // Utility function to format the date as "YYYY-MM-DD"
  const formatDate = (dateString) => {
    if (!dateString) {
      return null;
    }
    const [year, month, day] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };



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






const ReportCard = ({item,calculatedItem , index}) => {
  


 return (

   <View style={globalStyles.TaarifaMainContainerLaZote}>

  
  
      <TouchableOpacity
       // onPress={() =>
       //  navigation.navigate('Taarifa Za Kuku', item)}
       
     
      
      style={globalStyles.TaarifaOverdoseCartItemsContainerr} >





{/* mwanzo wa flow ya 1*/}

{item && item.product && item.product.product_name && ( 
        <View 
        style={globalStyles.TaarifaOverdoseLeftCartItemsContainer}
        >
      
     
     
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
           
           Weka kiasi cha {item.product.product_name}
          </Text>
          
          </View>
          

         {item && item.product && item.product.product_name  &&(
         <View style={
            globalStyles.TaarifaRight
          }>
        
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
         {calculatedItem.Amount_For_Each_Product.toFixed(1)} Kg 
          </Text>
          
     </View>
     )}
     

      
       
        </View>
        )}

      {/*mwisho wa flow ya 1*/}








      </TouchableOpacity>

</View>




)




}
  

































const ConstantFoodCard = ({item,constantCalculatedItem , index}) => {
  


 return (

   <View style={globalStyles.TaarifaMainContainerLaZote}>

  
  
      <TouchableOpacity
       // onPress={() =>
       //  navigation.navigate('Taarifa Za Kuku', item)}
       
     
      
      style={globalStyles.TaarifaOverdoseCartItemsContainerr} >





{/* mwanzo wa flow ya 1*/}

{item && item.product && item.product.product_name && ( 
        <View 
        style={globalStyles.TaarifaOverdoseLeftCartItemsContainer}
        >
      
     
     
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
           
           Weka kiasi cha {item.product.product_name}
          </Text>
          
          </View>
          

         {item && item.product && item.product.product_name && ( 
         <View style={
            globalStyles.TaarifaRight
          }>
        
          <Text 
           style={globalStyles.TaarifaOverdoseItemNameCartItemsText2}
         >
         {constantCalculatedItem.total_Constant_Kilos_For_Each_Item.toFixed(1)} Kg 
          </Text>
          
     </View>
     )}
     

      
       
        </View>
        )}

      {/*mwisho wa flow ya 1*/}








      </TouchableOpacity>

</View>




)




}







  return (

    <>{!fontsLoaded ? (<View/>):(


    <>


 {isPending ? (

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
         
     



  <MinorHeader title="Matokeo"/>

      


<ScrollView>








{/* <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Mchanganuo wa vyakula vyako ulivyovichagua na kiasi 
unachotakiwa kuweka</Text>
*/}


{/*

        <Pressable
          style={[{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "white",
            // position:'absolute',
            // bottom:0,
            width:'100%',

          },
           
          ]}
        >
          <View style={{
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
              Tsh. {formatToThreeDigits(total_price)}/=
            </Text>
           
          </View>

         

          <View style={{
            width:'50%',
          }}>
            <Text style={{ 
              fontFamily:'Medium'
            }}>
              Jumla ya kiasi cha chakula
            </Text>

             <Text style={{ 
              fontFamily:'Medium'
            }}>
             {UnaKiasiGaniChaChakula} Kg
            </Text>
           
          </View>

        </Pressable>
   
 
*/}

<Text
    style={globalStyles.AppChaguaHudumaTextHomeScreen}  
    
    >Maelekezo jinsi ya kuchanganya chakula cha kilo {TotalFoodAmount} kwa {AinaYaKuku}  umri kuanzia siku {Interval}

     </Text>

        <Text
    style={{
      color:'red',
      fontFamily:'Medium',
      marginLeft:10,
      marginTop:10,
    }}  
    
    >Block 1

     </Text>
    


  
     {queryset && queryset.length > 0 ? (

    
    <View style={
      globalStyles.TaarifaOverdoseCartItemsContainer
    }>



      <>
                {queryset.map((item, index) => {
                  const calculatedItem = calculatedItems[index];
                  return (
                    <ReportCard
                      item={item}
                      calculatedItem={calculatedItem}
                      key={item.id || index}
                    />
                  );
                })}










              </>       

</View>









   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>hujachagua chakula chochote kwa sasa! !
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


{/*

<ConstantAllOrderedItems 
id={id} 
StaterFeed={StaterFeed} 
FinisherFeed={FinisherFeed} 
LayerFeed={LayerFeed} 
GrowerFeed={GrowerFeed}
AinaYaKuku={AinaYaKuku} 
UmriKwaSiku={UmriKwaSiku} 
TotalFoodMixerPercentage={TotalFoodMixerPercentage} 
TotalFoodAmount={TotalFoodAmount} 
UnaKiasiGaniChaChakula={UnaKiasiGaniChaChakula} 
TotalCPPercentageRequired={TotalCPPercentageRequired} 
TotalWangaPercentageRequired={TotalWangaPercentageRequired} 
TotalMafutaPercentageRequired={TotalMafutaPercentageRequired} 
TotalConstantFoodMixerPercentage={TotalConstantFoodMixerPercentage} 
TotalMixerKios_ForConstantFoodGroups={TotalMixerKios_ForConstantFoodGroups} 
userData={userData} 

/>
 */}


   <Text
    style={{
      color:'red',
      fontFamily:'Medium',
      marginLeft:10,
      marginTop:20,
    }}  
    
    >Block 2

     </Text>
    


   {constant_queryset && constant_queryset.length > 0 && (
    
    <View style={
      globalStyles.TaarifaOverdoseCartItemsContainer
    }>

      <>
                {constant_queryset.map((item, index) => {
                  const constantCalculatedItem = constantCalculatedItems[index];
                  return (
                    <ConstantFoodCard
                      item={item}
                      constantCalculatedItem={constantCalculatedItem}
                      key={item.id || index}
                    />
                  );
                })}










              </>       

</View>



   )}



{TotalFoodAmount > 0 && (

        <Pressable
          style={[{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "white",
            // position:'absolute',
            // bottom:0,
            width:'100%',

          },
           
          ]}
        >
          <View style={{
            width:'60%',
          }}>
            <Text style={{ 
              fontFamily:'Medium'
            }}>
              Jumla ya kiasi cha chakula
            </Text>

           
           
          </View>

         

          <View style={{
            width:'30%',
          }}>
            <Text style={{ 
              fontFamily:'Medium',
              color:'green',
            }}>
              {TotalFoodAmount} Kg
            </Text>

             
           
          </View>

        </Pressable>
   
 )}













{/*mwanzo wa Button*/}







                <View style={{
                  flexDirection:'row',
                  width:'90%',
                  alignItems:'center',
                  justifyContent:'space-between',
                  marginHorizontal:20,
                  marginTop:50,
                }}>

                 <TouchableOpacity 
                onPress={() => {
                  setModalVisible(true);
                  setIsModalVisible(true); // Reset state when modal closes
                 
                }}
               style={{
                width:'90%',
               }}>
                <Text style={{
                  
                  backgroundColor:'wheat',
                  paddingHorizontal:5,
                  textAlign:'center',
                  borderRadius:6,
                  paddingVertical:7,
                  color:'black',
                  fontFamily:'Bold',
                }}>Ushauri</Text>
                </TouchableOpacity>
              
              {/* 
               <TouchableOpacity 
                onPress={() =>
         navigation.navigate('Kukokotoa Ripoti', {
          TotalFoodMixerPercentage,id, 
          TotalFoodAmount,
          
          UnaKiasiGaniChaChakula, 
           
          TotalCPPercentageRequired,
      TotalWangaPercentageRequired,
      TotalMafutaPercentageRequired,
      TotalMEPercentageRequired,
           
             StaterFeed,
               FinisherFeed,
               LayerFeed,
               GrowerFeed,
                AinaYaKuku,
                
               UmriKwaSiku,
               UmriKwaWiki,
               Interval,
               TotalConstantFoodMixerPercentage,
               TotalMixerKios_ForConstantFoodGroups

            })}
       
               style={{
                width:'40%',
               }}>
                <Text style={{
                  
                  backgroundColor:'wheat',
                  paddingHorizontal:5,
                  textAlign:'center',
                  borderRadius:6,
                  paddingVertical:7,
                  color:'black',
                  fontFamily:'Bold',
                }}>Ripoti</Text>
                </TouchableOpacity>*/}

                </View>



{/*mwisho wa Button*/}






       <LottieView
        style={{
        height: height/4,
         width:'100%',
         borderRadius:5,
         //backgroundColor:'red',
         // justifyContent:'center',
         // alignItems:'center',
         zIndex:1,

        // flex:1,

        }}
        source={require('../assets/Loading/l2.json')} // Replace with your animation JSON file
        autoPlay
        loop
      />

      










<View style={{
  marginBottom:100,
}}>
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
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
        onPress ={() => navigation.navigate('Home Stack')}
           
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
    <ScrollView 
    keyboardShouldPersistTaps="handled"
    >
   
        <View style={{ 
         flex: 1,
         marginTop:height/6,
         //marginTop:15,
         //justifyContent: 'center', 
         alignItems: 'center',
          //backgroundColor: 'red' 
        }}>
          <View style={[
            globalStyles.ModalViewViewProduct,
            {
              backgroundColor:'green',
              //justifyContent: 'center', 
             //alignItems: 'center',
             //height:height/5,
             width:'90%',


            }



            ]}>

          
{/*
              <View style={{
            backgroundColor:'black',
            borderColor:'white',
            borderWidth:1,
            marginBottom:20,
          }}>
            
          </View>*/}

             <Text style={[globalStyles.ModalTitleViewProduct,
              {
                textAlign:'center',
                fontFamily:'Medium',
                color:'white',
                width:'100%',
                marginBottom:20,

              }
              ]}>
              
            USHAURI         
            
            </Text>


              

              <View style={{
                flexDirection:'column',
                // justifyContent:'space-between',
                // alignItems:'center',
              }}>

               <Text style={[globalStyles.ModalTitleViewProduct,
              {
                //textAlign:'center',
                fontFamily:'Medium',
                color:'white',
                width:'100%',

              }
              ]}>
              Hongera! Mchanganyiko huu ni mzuri. Hakikisha unaandaa chakula hiki katika 
              hali ya usafi na zingatia ubora wa kila malighafi ili kupata matokeo mazuri zaidi.

              Hifadhi mchanaganyiko wa chakula cha kuku katika sehemu kavu na salama ili kuzuia kuoza. 

              Unaweza kufanya makadirio ya malighafi zilizopo kwenye block namba 1. 

              Kwa msaada zaidi piga simu: <Text style={{
                color:'yellow',
                fontFamily:'Bold',
              }}>0759 536 085</Text>
             
            </Text>
          
           
            </View>

            
            

            <View style={[globalStyles.ButtonConatinerViewProduct,

              {
                'marginTop':50,
              }

              ]}>

              <TouchableOpacity 
                    style={[globalStyles.ButtonAddViewProduct,
                      {
                            backgroundColor:'green',
                            marginRight:10,
                            borderWidth:1,
                            borderColor:'white',
                            justifyContent:'center',
                            alignItems:'center',
                            flex:1
                          }
                      ]}  
                    //onPress={addCartItem}
                    onPress={() => {
                      setModalVisible(false);
                      setIsModalVisible(false); // Reset state when modal closes
                     
                    }}
                                 >
                        <Text 
                        style={[
                          globalStyles.ConfirmCancelButtonTextViewProduct,
                          {
                            //backgroundColor:'black'
                          }
                          ]}>Sawa</Text>
                    </TouchableOpacity>
                    
                   
            </View>
          </View>
        </View>
        
        </ScrollView>
      </Modal>
















     </View> 


            ):(

<LotterViewScreen />

)}

    

    </>



    )}</>
  );
};

export default AllOrderedItems;

const styles = StyleSheet.create({});
