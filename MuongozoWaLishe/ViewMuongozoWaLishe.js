
import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,Alert,Linking,
  
   
  KeyboardAvoidingView 
   } from 'react-native';
import React, {useState,useRef,useCallback, useEffect, useContext} from 'react';

import {globalStyles} from '../Styles/GlobalStyles';

import { EndPoint } from "../Constant/links";
import useFetch from '../useFetch';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import LotterViewScreen from '../Screens/LotterViewScreen';
import Header from '../Header/header';
import MinorHeader from '../Header/MinorHeader';


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,MaterialCommunityIcons, Ionicons, FontAwesome} from '@expo/vector-icons';

import Html from 'react-native-render-html';
import * as FileSystem from 'expo-file-system';
import {shareAsync} from 'expo-sharing';
import COLORS  from '../Constant/colors';





const { width, height } = Dimensions.get('window');

export default function ViewMuongozoWaLishe({navigation, route}) {




   const { 
    
    Title,
    Picha,
    Description,
    Prepared_By,
    pdf,
    
    Created,
    Updated,
    //CategoryName,
    JinaLaHuduma,
    Youtube,
    
    id 
   } = route.params



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


const [cart, setCart] = useState([]);
const [userToken, setUserToken] = useState('');
const [shouldReload, setShouldReload] = useState(false);
const [userData, setUserData] = useState({});

const [selectedProduct, setSelectedProduct] = useState(null);
const [quantity, setQuantity] = useState('');
const [isPending, setPending] = useState(false);




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





//KWA AJILI YA KURENDER HTML
const renderersProps ={
  img:{
    enableExperimentalPercentWidth:true
  }
}


  // Utility function to format the date as "YYYY-MM-DD"
  const formatDate = (dateString) => {
    if (!dateString) {
      return null;
    }
    const [year, month, day] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };
const htmlContent = ' <h1>This is the html document</h1> <img src="../assets/me.jpg" /> ';
const htmlContent2 = '<p style=\"text-align:center\"><span style=\"color:#fff\"><strong>SMART INVIGILATION SYSTEM</strong></span></p>\r\n\r\n<p>Examination cheating activities like face movement, head movements, hand movements, or hand contact are extensively involved, and the rectitude and worthiness of fair and unbiased examination are prohibited by such cheating activities. The aim of this project is to develop a model to supervise or control unethical activities in real-time examinations. Exam supervision is fallible due to limited human abilities and capacity to handle students in examination rooms, and these errors can be reduced with the help of the Smart Invigilation System.</p>\r\n\r\n<p>This work presents an automated system for exams invigilation using machine learning and computer vision approaches i.e., Dlib and Opencv . Dlib is an object detection algorithm that is implemented to detect the suspicious activities of students during examinations based on their face movements, and for starting capturing the video of students Opencv is used.</p>\r\n\r\n<p>The model is fully efficient in detecting and monitoring students in one frame during examinations. Different real-time scenarios are considered to evaluate the performance of the Automatic Invigilation System. The proposed invigilation model can be implemented in colleges, universities, and schools to detect and alert student suspicious activities. Hopefully, through the implementation of the proposed invigilation system, we can prevent and solve the problem of cheating because it is unethical.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/media/media/2023/04/10/3q.jpeg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><em>Click the link below to view more information about this project</em></p>'





// kwasasa natumia hii sio ya chini ila zote zinafanya kazi

  const downloadFromUrl = async () => {
    //rewardedInterstitial.show();
    const filename = "File.pdf";
    const result = await FileSystem.downloadAsync(
      EndPoint + `/${pdf}`,
      FileSystem.documentDirectory + filename
    );
    console.log(result);

    save(result.uri, filename, result.headers["Content-Type"]);
  };






const downloadFromAPI = async () => {
  //rewardedInterstitial.show();
    const filename = "File.pdf";
    const localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
    const result = await FileSystem.downloadAsync(
      EndPoint + `/${pdf}`,
      FileSystem.documentDirectory + filename,
      {
        headers: {
          "MyHeader": "MyValue"
        }
      }
    );
    console.log(result);
    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };







  return (

    <>{!fontsLoaded ? (<View/>):(

        <>
 {!isPending ? (

      <View style={[globalStyles.container,
        { 
      backgroundColor: COLORS.white
       } 
      //   { 
      // backgroundColor: isModalVisible ? 
      // 'black' : theme.backgroundColor,

      //  opacity: isModalVisible ? 
      // 0.1 : 1
      //  }

       ]}
      >
      
      <MinorHeader title={JinaLaHuduma} />
      

<ScrollView keyboardShouldPersistTaps="handled">




  <Text
  style={globalStyles.AppChaguaHudumaTextHomeScreen}  
  
  >{JinaLaHuduma}</Text>







{/*mwanzo wa  MainContainerMaktabaYaLishe*/}

<View style={[globalStyles.MainContainerMaktabaYaLishe,
    { 
      // backgroundColor: isModalVisible ? 
      // 'black' : COLORS.white,

      //  opacity: isModalVisible ? 
      // 0.1 : 1
       }
]}>
  


{/*mwanzo wa left container*/}
<View style={globalStyles.MainLeftContainerMaktabaYaLishe}>
   {Picha ?
                    <Image
                      style={globalStyles.MainLeftContainerMainImageMaktabaYaLishe}
                      source={{ uri: EndPoint + '/' + Picha }}
                    /> :
                    <Image
                      style={globalStyles.MainLeftContainerMainImageMaktabaYaLishe}
                      source={require('../assets/500.png')}
                    />
                  }

<Text style={[globalStyles.MainLeftContainerNameTextMaktabaYaLishe,{color:COLORS.black}]}
>{Title}</Text>


{Prepared_By &&
<Text style={[globalStyles.MainLeftContainerDescriptionMaktabaYaLishe,{color:COLORS.black}]}
>Imeandaliwa Na: {Prepared_By} </Text>}





</View>
{/*mwisho wa left container*/}






{/*mwanzo wa Right container*/}
<View style={globalStyles.MainRightContainerMaktabaYaLishe}>

 {pdf && (
<TouchableOpacity 
  //  onPress={() => {
  //   setModalVisible(true);
  //   setIsModalVisible(true); // Update state when modal opens
    
  // }}
  onPress={downloadFromUrl}

    style={{
      justifyContent:'center',
      alignItems:'center',
    }}
>
<MaterialCommunityIcons 
                name="download"
                 size={50} 
                 color="green"
                style={globalStyles.MainRightDescriptionIconMaktabaYaLishe}
                />

</TouchableOpacity>
)}




 {Youtube && (
<TouchableOpacity 
  //  onPress={() => {
  //   setModalVisible(true);
  //   setIsModalVisible(true); // Update state when modal opens
    
  // }}
  onPress={() => {Linking.openURL(Youtube)}}

    style={{
      justifyContent:'center',
      alignItems:'center',
      marginTop:25,
    }}
>
<FontAwesome 
                name="youtube"
                 size={50} 
                 color="red"
                style={[
                  globalStyles.MainRightDescriptionIconMaktabaYaLishe,
                  {
                    borderColor:'red'
                  }
                ]}
                />

</TouchableOpacity>
)}


</View>
{/*mwisho wa Right container*/}









</View>
{/*mwisho wa  MainContainerMaktabaYaLishe*/}




                <Text
                style={globalStyles.AppChaguaHudumaTextHomeScreen}  
                
                >Maelezo mafupi</Text>


            {Description ? (

 <View style={[{ 
          flex: 1,
          //marginTop:height/4, 
          //justifyContent: 'center', 
          //alignItems: 'center',
          //height:height,
          marginHorizontal:20,
          marginVertical:0,
           },
          {
            //backgroundColor:'red',
          }]}>
          <View style={[
            globalStyles.ModalViewMaktabaYaLishe,
            {

              //height:height,
            }]}>
  
         <Html 
contentWidth={400}
source={{html: Description}}
renderersProps={renderersProps}
tagsStyles={{
  
  p:{
    //color:COLORS.white,
    // fontSize:16
    color:'black',
    fontFamily:'Light',
    lineHeight:25,
    backgroundColor:COLORS.white,

  },
  
  a:{
    color:'black',
    textDecoration:'none',
    fontFamily:'Light',
  },
  h1:{
    color:'black',
    textAlign:'center',
    
    fontFamily:'Medium',
  },
   h2:{
    color:'black',
    textAlign:'center',
    fontFamily:'Medium',
  },
   h3:{
    color:'black',
    textAlign:'center',
    
    fontFamily:'Light',
  },
   h4:{
    color:'black',
    textAlign:'center',
    fontFamily:'Light',
  },
  // img:{
  //   width:150,
  //   height:150,
  // }
}}


/>


  </View>

</View>



):(

<View style={{
  justifyContent:'center',
  alignItems:'center',
  marginTop:20,
}}>
  <Text style={{
    color:'black',
    fontFamily:'Light'
  }}>Hakuna maelezo yoyote kwasasa!</Text>

    <View style={globalStyles.ErrorImageContainer}>
      <Image 
          source={require('../assets/500.png')}  
           style={globalStyles.ErrorImage}
          
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
  
</View>



</ScrollView>


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
         onPress={() => navigation.navigate('Home Stack')}           
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
              Rudi mwanzo
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
     
    <ScrollView keyboardShouldPersistTaps="handled">
        <View style={[{ 
          flex: 1,
          //marginTop:height/4, 
          justifyContent: 'center', 
          alignItems: 'center',
          //height:height,
           },
          {
            //backgroundColor:'red',
          }]}>
          <View style={[
            globalStyles.ModalViewMaktabaYaLishe,
            {

              //height:height,
            }]}>
            <Text style={[globalStyles.ModalTitleMaktabaYaLishe,{color:COLORS.white}]}>Full Description</Text>

                  

            {Description ? (


  
         <Html 
contentWidth={400}
source={{html: Description}}
renderersProps={renderersProps}
tagsStyles={{
  
  p:{
    //color:COLORS.white,
    // fontSize:16
    color:'white',
    fontFamily:'Light',
    lineHeight:25,
    backgroundColor:COLORS.white,

  },
  
  a:{
    color:'white',
    textDecoration:'none',
    fontFamily:'Light',
  },
  h1:{
    color:'white',
    textAlign:'center',
    
    fontFamily:'Medium',
  },
   h2:{
    color:'white',
    textAlign:'center',
    fontFamily:'Medium',
  },
   h3:{
    color:'white',
    textAlign:'center',
    
    fontFamily:'Light',
  },
   h4:{
    color:'white',
    textAlign:'center',
    fontFamily:'Light',
  },
  // img:{
  //   width:150,
  //   height:150,
  // }
}}


/>





):(

<View style={{
  justifyContent:'center',
  alignItems:'center',
  marginTop:20,
}}>
  <Text style={{
    color:'white',
    fontFamily:'Light'
  }}>Hakuna maelezo yoyote kwasasa!</Text>

    <View style={globalStyles.ErrorImageContainer}>
      <Image 
          source={require('../assets/500.png')}  
           style={globalStyles.ErrorImage}
          
          //source={item.ArticleImage} 
          //resizeMode='contain'
          contentContainerStyle={{ padding: 20 }}
          
          />
  </View>

</View>


)}


                    
                

  {pdf && (

         <View style={[globalStyles.row,{
          justifyContent:'center',
          alignItems:'center'

         }]}>
            <TouchableOpacity 
          style={globalStyles.downloadButtonArticle} 
          onPress={downloadFromUrl}
         
          >
          <Text style={[{marginLeft: 20}, {color:COLORS.black}]}>Download Pdf</Text>
        </TouchableOpacity>
        </View>
        )}

          
            

            <View style={globalStyles.ButtonConatinerMaktabaYaLishe}>
                    <TouchableOpacity style={globalStyles.ButtonCloseMaktabaYaLishe} 
                      onPress={() => {
    
                        setIsModalVisible(false); // Update state when modal opens
                        setModalVisible(false);
                      }}
                      >
                        <Text style={globalStyles.ConfirmCancelButtonTextMaktabaYaLishe}>CLOSE</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity 
                    style={globalStyles.ButtonAddMaktabaYaLishe}  
                     >
                        <Text style={globalStyles.ConfirmCancelButtonTextMaktabaYaLishe}>CONFIRM</Text>
                    </TouchableOpacity>*/}
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
}



const styles = StyleSheet.create({

 
});
