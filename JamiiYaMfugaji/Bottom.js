import { StyleSheet,Image,Linking,Platform, Text,Dimensions,TouchableOpacity, View } from "react-native";
import React, {useState,useRef,useCallback, useEffect, useContext} from 'react';

import Colors from "./Colors";
import Sizes from "./Sizes";
import Card from "./Card";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from "../Constant/links";
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../Styles/GlobalStyles';
import {useFonts} from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const {height, width} = Dimensions.get('window');

export default function Bottom({item,phoneValue, userData,setuserData, isLoading,setIsLoading}) {


let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});



  const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Programu imeshindwa kufungua hii linki: ${url}`);
        }
    }

const sendTextMessage = useCallback(async (phNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])

const message = "Mfugaji Smart!!"


    //const theme = useContext(themeContext)
const navigation = useNavigation();
// const [userData, setUserData] = useState({});
//   const [userToken, setUserToken] = useState('');
//const [isLoading, setIsLoading] = useState(false);





 const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

   const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

const [isExpanded, setIsExpanded] = useState(false); // State to manage text expansion



  return (
    <View style={styles.bottomContainer}>
      <Text style={{ fontSize: 16, color: Colors.white, fontWeight: "bold" }}>
        Zaidi kuhusu  {item && item.username ? item.username : ''}
      </Text>

      <View style={styles.completeContainer}>
        <Card
          icon={
            <FontAwesome
              name="home"
              size={24}
              color={Colors.primary}
            />
          }
          cardTextOne= {item && item.Mkoa && item.Mkoa.JinaLaMkoa ? item.Mkoa.JinaLaMkoa : 'Mbeya'}
          cardText="Mkoa"
          style={{ backgroundColor: Colors.primary}}
        />
        <Card
          icon={
            <FontAwesome 
            name="briefcase" 
            size={24} 
            color={Colors.secondary} />
          }
          cardTextOne= {item && item.AinaYaKuku && item.AinaYaKuku.AinaYaKuku ? item.AinaYaKuku.AinaYaKuku : 'Broila'}
          cardText="Aina Ya kuku Wake"
          style={{ backgroundColor: Colors.secondary }}
        />
      </View>


{item.Maelezo && (
      <View style={styles.bottomSection}>
        <Text style={styles.bottomSectionText}>
        {item.username} ni nani ?
        </Text>
      </View>
      )}



{item.Maelezo && (
      <View style={{
        marginTop:20,
        width:'90%',
      }}>
        <Text style={{
          color:'white',

        }}
        
        >
          {item.Maelezo}
        </Text>    
                 
      </View>
      )}


{/*mwanzo wa link*/}
<View style={styles.LinkContainerWafugaji}>
  {userData.username != item.username ? (
  <Text style={styles.LinkTextWafugaji}>Unaweza kuwasiliana na Mfugaji
  , {item.username} kupitia njia hizi;</Text>
  ):(
 <Text style={styles.LinkTextWafugaji}>Watu wanaweza kuwasiliana na wewe kupitia njia hizi;</Text>
  )}



 <View style={[globalStyles.menuWrapper, 
  {backgroundColor:'rgba(0,0,0,0)'}]}>


    {item.phone && (
         <TouchableOpacity onPress={() => {   Linking.openURL(`tel:${item.phone}`)}}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="phone" color="yellow" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'white'}]}>Piga Simu</Text>
          </View>
        </TouchableOpacity>)}
       

       {item.phone && (
        <TouchableOpacity  onPress={() => sendTextMessage(phoneValue, message)}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="message" color="red" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'white'}]}>Mtumie ujumbe kawaida</Text>
          </View>
        </TouchableOpacity>)}

        {item.phone && (
        <TouchableOpacity onPress={() => { Linking.openURL(`whatsapp://send?phone=${item.phone}&text=${message}`)}}>
          <View style={[globalStyles.menuItem, {

          }]}>
            <FontAwesome name="whatsapp" color="green" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'white'}]}>Chati naye whatsapp</Text>
          </View>
        </TouchableOpacity>)}

        

          {item.email && (
         <TouchableOpacity onPress={() => {  Linking.openURL(`mailto:${item.email}?subject=Hello ${item.username}&body=${message}`)}}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="email" color="wheat" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'white'}]}>Mtumie email</Text>
          </View>
        </TouchableOpacity>)}

       
  
</View>

</View>
{/*mwisho wa link*/}









{item && item.Level && item.Level.Level && (
<View style={styles.PichaYaNyotaContainer}>
   
        <View style={styles.LeftPichaYaNyota}>
        <Text style={styles.LeftTextPichaYaNyota}>
        Level Ya Mfugaji

        </Text>
          
        </View>

        <View style={styles.RightPichaYaNyota}>
        <Image style={styles.Nyotaimage} 
        source={{ uri: EndPoint + '/' + item.LevelImage }}             
         />

         {/*<Image style={styles.Nyotaimage} 
        source={require("../assets/500.png")}
         />*/}
        </View>
</View>
)}

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
                    <Text style={globalStyles.alertTitle}>Mfugaji Smart</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />








    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    marginTop: Sizes.medium,
  },
  completeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Sizes.xs,
  },
  card: {
    backgroundColor: Colors.secondary,
  },
  bottomSection: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Sizes.medium,
  },
  bottomSectionText: {
    fontWeight: "bold",
    fontSize: Sizes.smedium,
    color: 'white',
    borderBottomWidth: 1,
    marginBottom: 5,
    borderBottomColor: Colors.darkGray,
  },


  maelezoContainerWafugaji:{
    marginBottom:20,
    width:'90%',
    marginTop:20,
  },
  maelezoTextWafugaji:{
    color:'white'
  },

  LinkContainerWafugaji:{

    marginBottom:20,
    width:'90%',
    marginTop:20,

  },

 LinkTextWafugaji:{
    color:'green',
    marginTop:15,
    marginBottom:20,
  },



IconContainerWafugaji:{
  justifyContent:'center',
  alignItems:'center',

},

PichaYaNyotaContainer:{
  width:'90%',
  marginHorizontal:20,
  justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row',
  marginBottom:20,
},
Nyotaimage:{
  width:'100%',
  height:height/12,
  borderRadius:10,
},

LeftPichaYaNyota:{
  width:'40%',

},
RightPichaYaNyota:{
  width:'60%',

},
LeftTextPichaYaNyota:{
  color:'white',

},



});
