
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
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ConstantAllOrderedItems = ({
  id,
    
    StaterFeed,
   FinisherFeed,
   LayerFeed,
   GrowerFeed,
    AinaYaKuku,
    UmriKwaSiku,
    

    TotalFoodMixerPercentage,
    TotalFoodAmount,
    UnaKiasiGaniChaChakula,

    
    TotalCPPercentageRequired,
     TotalWangaPercentageRequired,
     TotalMafutaPercentageRequired,

     TotalConstantFoodMixerPercentage,
     TotalMixerKios_ForConstantFoodGroups
}) => {

  //const ChakulaId = id;
const navigation = useNavigation();


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

  

 










//----------------------FOR CONSTANT QUERYSET------------------



const [constantCalculatedItems, setconstantCalculatedItems] = useState([]);
const [constant_queryset, setconstant_queryset] = useState([]);



useEffect(() => {
    const fetchConstantData = async () => {
        try {
            const response = await axios.get(`${EndPoint}/GetConstantFoodKilosForEachItemView/?id=${id}&TotalMixerKios_ForConstantFoodGroups=${TotalMixerKios_ForConstantFoodGroups}&TotalConstantFoodMixerPercentage=${TotalConstantFoodMixerPercentage}&TotalCPPercentageRequired=${TotalCPPercentageRequired}&TotalWangaPercentageRequired=${TotalWangaPercentageRequired}&TotalMafutaPercentageRequired=${TotalMafutaPercentageRequired}&AinaYaKuku=${AinaYaKuku}&StaterFeed=${StaterFeed}&GrowerFeed=${GrowerFeed}&LayerFeed=${LayerFeed}&FinisherFeed=${FinisherFeed}&UmriKwaSiku=${UmriKwaSiku}&TotalFoodAmount=${TotalFoodAmount}&TotalFoodMixerPercentage=${TotalFoodMixerPercentage}&UnaKiasiGaniChaChakula=${UnaKiasiGaniChaChakula}`, {
                
            });

            const { constant_queryset, constant_calculated_items } = response.data;

            setconstant_queryset(constant_queryset);
            setconstantCalculatedItems(constant_calculated_items);

            setisPending(true);
            setisRange(false);
        } catch (error) {
            console.error(error);
            setisPending(true);
        }
    };

    fetchConstantData();
}, []);











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
         {constantCalculatedItem.total_Constant_Kilos_For_Each_Item.toFixed(2)} Kg 
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













     </View> 





    )}</>
  );
};

export default ConstantAllOrderedItems;

const styles = StyleSheet.create({});
