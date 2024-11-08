import React, { useState, useEffect } from 'react';
import { View, SafeAreaView,Pressable, ImageBackground,
 TextInput, Alert, Image, StyleSheet, ActivityIndicator,Modal, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import { globalStyles } from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import { COLORS, SIZES } from '../Screens/src/Constant';
import LotterViewScreen from '../Screens/LotterViewScreen';
import MinorHeader from '../Header/MinorHeader';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
//import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import Checkbox from 'expo-checkbox'; // Make sure to install this package

const { width, height } = Dimensions.get('window');

const MabadilikoYaLisheForm = ({ navigation, route }) => {

  const { 
    
    //id,
    JinaLaHuduma,
    AinaYaKuku,
    UmriKwaSiku,
    UmriKwaWiki
   } = route.params


// console.log("AinaYaNdege", AinaYaNdege);
// console.log("SikuKamiliZaKuatamia", SikuKamiliZaKuatamia);

const UmriWaKukuKwaWiki = UmriKwaWiki;
const UmriWaKukuKwaSiku = UmriKwaSiku;


  let [fontsLoaded] = useFonts({
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };


const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable
const [displayContentsState, setdisplayContentsState] = useState(false);






    const [profile_image, setprofile_image] = useState(null);
  const [extractedText, setExtractedText] = useState('');



//MWANZO WA PICK IMAGE FROM THE PHONE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
      setprofile_image(result.assets[0].uri); // Use assets array
      console.log("PROJECT IMAGE", profile_image)
      processImage(); // Use assets array
  };

 const  processImage = ()=>{
    console.log('Converted')
  }

  //MWISHO WA PICK IMAGE FROM THE PHONE


//MWANZO WA PICK PDF FROM THE PHONE

// Add PDF state
const [pdf, setPdf] = useState(null);

// Add PDF picker function
const pickPdf = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf'
    });
    if (!result.cancelled) {
      setPdf(result.assets[0].uri);
      console.log("result URI:", result);
      console.log("PDF URI:", pdf); // Log PDF URI after setting
    }
  };
//MWISHO WA PICK PDF FROM THE PHONE
const [MudaWaKumbusho, setMudaWaKumbusho] = useState('');
const [selectedMudaWaKumbusho, setSelectedMudaWaKumbusho] = useState(null);

const [MfumoWaKufuga, setMfumoWaKufuga] = useState('');
const [selectedMfumoWaKufuga, setSelectedMfumoWaKufuga] = useState(null);

const [LengoLaKufuga, setLengoLaKufuga] = useState('');
const [selectedLengoLaKufuga, setSelectedLengoLaKufuga] = useState(null);

const [KundiLaKukuWake, setKundiLaKukuWake] = useState('');


 // const [AinaYaNdege, setAinaYaNdege] = useState([]);
 // const [selectedAinaYaNdege, setSelectedAinaYaNdege] = useState(null);
 
 //  // Fetch Universities
 //  useEffect(() => {
 //    fetch(`${EndPoint}/Add/AinaZaNdegeViewSet/`)
 //      .then((response) => response.json())
 //      .then((data) => {
 //        setAinaYaNdege(data);
        
 //        // Set the default selectedRoomClass if needed
 //        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
 //      })
 //      .catch((error) => {
 //        //console.error('Error fetching Product categories:', error);
 //        //showAlertFunction("Error fetching Universities");
 //      });
 //  }, []);





  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');

 
  const [username, setUsername] = useState('');


 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
  }, [userData]);

  useEffect(() => {
    checkLoggedIn();
  }, [userToken]);

  const checkLoggedIn = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    if (userToken) {
      try {
        const userResponse = await axios.get(
          EndPoint + '/Account/user_data/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );



        const userData = userResponse.data;
        setIsLoading(false);
        // setEmail(userData.email);
        setUsername(userData.username);
        // setPhone(userData.phone);
        // setcompany_name(userData.company_name);
        //  setMaelezo(userData.Maelezo);
        //   setLocation(userData.Location);
        
      

      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setIsLoading(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading(false);
    } else {
      showAlertFunction('Kuna tatizo kwenye ukasanyaji wa taarifa zako');
      setIsLoading(false);
    }
  };





  const handleSubmit = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();


      if (LengoLaKufuga) {
      formData.append('LengoLaKufuga', LengoLaKufuga);
      } else {
            showAlertFunction('Tafadhali tuambie lengo la kufuga kuku wako, ni kwa ajili ya nyama au mayai ?.');
            setIsLoading(false);
            return;
        }


       if (MudaWaKumbusho) {
      formData.append('MudaWaKumbusho', MudaWaKumbusho);
      } else {
            showAlertFunction('Tafadhali tuambie unahitaji kumbusho lije muda gani');
            setIsLoading(false);
            return;
        }


     if (MfumoWaKufuga) {
      formData.append('MfumoWaKufuga', MfumoWaKufuga);
      } else {
            showAlertFunction('Tafadhali tuambie unatumia mfumo gani kufuga');
            setIsLoading(false);
            return;
        }

      

        // Hakikisha kuwa selectedMkoa na selectedAinaYaNdege sio null
        if (KundiLaKukuWake) {
            formData.append('KundiLaKukuWake', KundiLaKukuWake);
        } else {
            showAlertFunction('Tafadhali ingiza kundi la kuku wako.');
            setIsLoading(false);
            return;
        }



 



      axios.post(EndPoint + `/AddKumbushoLaMabadilikoYaLisheView/?AinaYaKuku=${AinaYaKuku}&UmriWaKukuKwaWiki=${UmriWaKukuKwaWiki}&UmriWaKukuKwaSiku=${UmriWaKukuKwaSiku}`, formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setIsLoading(false);
        showAlertFunction("Umefanikiwa kuweka kumbusho la mabadiliko ya lishe");
        //console.log("Well");
         setModalVisible(false);
        setIsModalVisible(false); // Reset state when modal closes
       setdisplayContentsState(true);

       setLengoLaKufuga('');
       setMfumoWaKufuga('');
       setMudaWaKumbusho('');
       setKundiLaKukuWake('');
       

       
      }).catch(error => {
        setIsLoading(false);
        console.log(error);
         setModalVisible(false);
          setIsModalVisible(false); // Reset state when modal closes
         setdisplayContentsState(false);
        handleErrorMessage(error);

      });
    }
  };



  const LengoLaKufugaChoices = [
    {id:1, label: 'Kwaajili Ya Mayai', value: 'Kwaajili Ya Mayai' },
    {id:2, label: 'Kwaajili Ya Nyama', value: 'Kwaajili Ya Nyama' }
  ];

    const MudaWaKumbushoChoices = [
    {id:1, label: '12:00 asubuhi -> 6:00 mchana', value: '12:00 asubuhi -> 6:00 mchana' },
    {id:2, label: '6:00 mchana -> 12:00 jioni', value: '6:00 mchana -> 12:00 jioni' }
  ];

  

    const MfumoWaKufugaChoices = [
    {id:1, label: 'Shadidi (mfumo wa ndani tu)', value: 'Shadidi (mfumo wa ndani tu)' },
    {id:2, label: 'Nusu huria (mfumo wa ndani na nje)', value: 'Nusu huria (mfumo wa ndani na nje)' },
    {id:3, label: 'Huria (mfumo wa nje)', value: 'Huria (mfumo wa nje)' }
  ];

  

  


  return (
    <>
      {!fontsLoaded ? (<View />) : (
        <>
          {!isLoading ? (
            <View style={{ 
              flex: 1,


            }}

              >
              <MinorHeader title="Lishe" />
              <ImageBackground
                source={require('../assets/bc1.png')}
                style={[{ 
                  flex: 1,
                 //opacity: 1,

                 },

                 { 
              

               opacity: isModalVisible ? 
              0.1 : 1
               }

               ]}
                resizeMode="cover"
              >
                <ScrollView keyboardShouldPersistTaps="handled">
                  <View style={styles.ImageAccountContainer}>
                    <Text style={styles.title}>MFUGAJI SMART</Text>
                    <Text style={styles.subtitle}>Fuga Kidijitali</Text>
                  </View>


{!displayContentsState && (

<Pressable>



  <Text style={styles.dataContainerFormTitle}>
  Karibu {username}, tafadhali jaza taarifa muhimu hapo chini
     </Text>











{/*  mwanzo wa picker*/}
{/*
 <View style={{ marginTop: 20 }}>

 <View style={{
          width:'90%',
          //height:100
          marginHorizontal:20,
          marginVertical:0,
          marginTop:20,
         }}>
            <Text style={[globalStyles.haippo,
              {
                //width:'90%',
                color:'wheat',
              }
              ]}>
                 Chagua aina ya ndege
            </Text>
            </View>
        

        < View style={[globalStyles.inputTax,
          {
            backgroundColor:'rgba(0,0,0,0)',
            width:'100%',
            marginHorizontal:0,
          }

          ]}>
        

     <View style={[globalStyles.picker,
      {
        backgroundColor:'rgba(0,0,0,0)',
        //backgroundColor:'red',
        width:'100%',
        borderRadius:10,
      }

      ]}>

            
          <Picker
           style={[globalStyles.pickerInputAddNewProject,
            {
              backgroundColor:'white',
              width:"100%",
              borderRadius:10,
            }
            ]}
            selectedValue={selectedAinaYaNdege}
            onValueChange={(itemValue) => setSelectedAinaYaNdege(itemValue)}
          >

            {AinaYaNdege.map((x) => (
              <Picker.Item
                key={x.id}
                label={x.AinaYaNdege}
                value={x}
                color="green"
              />
            ))}
          </Picker>

         </View>
          
        </View>    
          
        
    </View>*/}

  {/*  mwisho wa picker*/}





{/*mwanzo wa input*/}
 <View style={{
          width:'90%',
          //height:100
          marginHorizontal:20,
          marginVertical:0,
          marginTop:40,
         }}>
            <Text style={[globalStyles.haippo,
              {
                //width:'90%',
                color:'wheat',
              }
              ]}>
                 Sajili jina la kundi la kuku wako (mfano: kuku wa uyole)
            </Text>
            </View>

 <TextInput
  //placeholder='Kiasi Cha Mayai'
  value={KundiLaKukuWake}
  onChangeText={setKundiLaKukuWake}
  placeholderTextColor={COLORS.white}
  //keyboardType="numeric"
  style={styles.MyTextInput}
/>

{/*mwisho wa input*/}
















{/*  mwanzo wa picker*/}
 <View style={{ marginTop: 20 }}>

 <View style={{
          width:'90%',
          //height:100
          marginHorizontal:20,
         }}>
            <Text style={[globalStyles.haippo,
              {
                //width:'90%',
                color:'wheat',
              }
              ]}>
                  Chagua lengo la wewe kufuga kuku ?
            </Text>
            </View>
        

        < View style={[globalStyles.inputTax,
          {
            backgroundColor:'rgba(0,0,0,0)',
            width:'100%',
            marginHorizontal:0,
          }

          ]}>
        

     <View style={[globalStyles.picker,
      {
        backgroundColor:'rgba(0,0,0,0)',
        //backgroundColor:'red',
        width:'100%',
        borderRadius:10,
      }

      ]}>

            
          <Picker
           style={[globalStyles.pickerInputAddNewProject,
            {
              backgroundColor:'white',
              width:"100%",
              borderRadius:10,
            }
            ]}
           selectedValue={LengoLaKufuga}
          onValueChange={(itemValue) => setLengoLaKufuga(itemValue)}
          >

            {LengoLaKufugaChoices.map((choice) => (
              <Picker.Item
                key={choice.id}
                label={choice.label}
                value={choice.value}
                color="green"
              />
            ))}
          </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}









{/*  mwanzo wa picker*/}
 <View style={{ marginTop: 20 }}>

 <View style={{
          width:'90%',
          //height:100
          marginHorizontal:20,
         }}>
            <Text style={[globalStyles.haippo,
              {
                //width:'90%',
                color:'wheat',
              }
              ]}>
                 Je unatumia mfumo gani katika kufuga ?
            </Text>
            </View>
        

        < View style={[globalStyles.inputTax,
          {
            backgroundColor:'rgba(0,0,0,0)',
            width:'100%',
            marginHorizontal:0,
          }

          ]}>
        

     <View style={[globalStyles.picker,
      {
        backgroundColor:'rgba(0,0,0,0)',
        //backgroundColor:'red',
        width:'100%',
        borderRadius:10,
      }

      ]}>

            
          <Picker
           style={[globalStyles.pickerInputAddNewProject,
            {
              backgroundColor:'white',
              width:"100%",
              borderRadius:10,
            }
            ]}
           selectedValue={MfumoWaKufuga}
          onValueChange={(itemValue) => setMfumoWaKufuga(itemValue)}
          >

            {MfumoWaKufugaChoices.map((choice) => (
              <Picker.Item
                key={choice.id}
                label={choice.label}
                value={choice.value}
                color="green"
              />
            ))}
          </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}









{/*  mwanzo wa picker*/}
 <View style={{ marginTop: 20 }}>

 <View style={{
          width:'90%',
          //height:100
          marginHorizontal:20,
         }}>
            <Text style={[globalStyles.haippo,
              {
                //width:'90%',
                color:'wheat',
              }
              ]}>
                 Je unahitaji kumbusho lije muda gani ?
            </Text>
            </View>
        

        < View style={[globalStyles.inputTax,
          {
            backgroundColor:'rgba(0,0,0,0)',
            width:'100%',
            marginHorizontal:0,
          }

          ]}>
        

     <View style={[globalStyles.picker,
      {
        backgroundColor:'rgba(0,0,0,0)',
        //backgroundColor:'red',
        width:'100%',
        borderRadius:10,
      }

      ]}>

            
          <Picker
           style={[globalStyles.pickerInputAddNewProject,
            {
              backgroundColor:'white',
              width:"100%",
              borderRadius:10,
            }
            ]}
           selectedValue={MudaWaKumbusho}
          onValueChange={(itemValue) => setMudaWaKumbusho(itemValue)}
          >

            {MudaWaKumbushoChoices.map((choice) => (
              <Picker.Item
                key={choice.id}
                label={choice.label}
                value={choice.value}
                color="green"
              />
            ))}
          </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}







{/*
{!displayContentsState && (

<TouchableOpacity 
  onPress={() => {
    
setIsModalVisible(true); // Update state when modal opens
setModalVisible(true);
}}

style={styles.ButtonContainerUpdate2}>

<View style={{
  width:'80%'
}}>
<Text style={styles.ButtonTextUpdate2}>
Bonyeza hapa kuchagua aina za chanjo </Text>
</View>

<View style={{
  width:'10%'
}}>
<MaterialCommunityIcons 
name="gesture-tap-button"
 size={30} 
 color="green"
style={{

}}

 />

</View>
</TouchableOpacity>
)}

*/}



                  {!isLoading && (
                    <TouchableOpacity onPress={handleSubmit} style={styles.ButtonContainerUpdate}>
                      <Text style={styles.ButtonTextUpdate}>Kusanya</Text>
                    </TouchableOpacity>
                  )}


</Pressable>
)}



{displayContentsState &&(
<View style={{
  marginTop:50,
  width:'90%',
  marginHorizontal:20,
  justifyContent:'center',
  alignItems:'center',
  flex:1,
}}>
  <Text style={{
    color:'white',
    fontFamily:'Medium',
  }}>
    Hongera! Kumbusho lako la mabadiliko ya lishe limefanikiwa, 
    utakumbushwa muda sahihi wa kubadilisha lishe.

  </Text>

   <TouchableOpacity 
   onPress={() => {
   setdisplayContentsState(false);
  }}
     style={styles.ButtonContainerUpdate}>
  <Text style={styles.ButtonTextUpdate}>Weka tena kumbusho</Text>
</TouchableOpacity>

</View>


  )}


  <View style={{
  marginBottom:120,
}}>
 {/* <Text style={{
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
            backgroundColor: "rgba(0,0,0,0,)",
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
        onPress ={() => navigation.navigate('Historia Za Kumbusho Za Mabadiliko Ya Lishe')}
           
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
              Angalia kumbusho zako nyingine za mabadiliko ya lishe 
               ulizowahi kuweka
            </Text>
          </TouchableOpacity>
          

        </Pressable>
   










              </ImageBackground>






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
    
   
        <View style={{ 
         flex: 1,
         marginTop:height/4,
         //justifyContent: 'center', 
         alignItems: 'center',
          //backgroundColor: 'red' 
        }}>
          <View style={[
            globalStyles.ModalViewViewProduct,
            {
              backgroundColor:'green',
              justifyContent: 'center', 
             alignItems: 'center',
             //height:height/4,
             width:'90%',


            }



            ]}>

         

                
{/*hamna kitu*/}

          
            

            <View style={[globalStyles.ButtonConatinerViewProduct,

              {
                'marginTop':100,
              }

              ]}>
                    
                    <TouchableOpacity 
                    style={[globalStyles.ButtonAddViewProduct,
                      {
                            backgroundColor:'black'
                          }
                      ]}  
                    //onPress={addCartItem}
                    onPress={() => {
                      setModalVisible(false);
                      setIsModalVisible(false); // Reset state when modal closes
                     setdisplayContentsState(true);
                    }}
                                 >
                        <Text 
                        style={[
                          globalStyles.ConfirmCancelButtonTextViewProduct,
                          {
                            //backgroundColor:'black'
                          }
                          ]}>Endelea</Text>
                    </TouchableOpacity>
            </View>
          </View>
        </View>
        
        
      </Modal>













              <AwesomeAlert
                show={showAlert}
                showProgress={false}
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
            </View>
          ) : (
            <LotterViewScreen />
          )}
        </>
      )}
    </>
  );
};

export default MabadilikoYaLisheForm;

const styles = StyleSheet.create({
  MyTextInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 8,
    color: 'white',
    marginHorizontal: 10,
    borderBottomColor: 'white',
    marginVertical: 0,
  },
  // haippo:{
  //   marginTop:30,

  // },
  ButtonContainerUpdate: {
    padding: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  ButtonTextUpdate: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Medium',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  ButtonContainerUpdate2: {
    padding: 5,
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    width:'90%',
    flexDirection:'row',
    justifyContent:'space-around',
     backgroundColor: 'wheat',
     borderRadius: 10,
    marginHorizontal:20,
  },
  ButtonTextUpdate2: {
    color: 'green',
    textAlign: 'center',
    fontFamily: 'Medium',
    // backgroundColor: 'wheat',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    //width:'100%'
  },
  title: {
    color: COLORS.white,
    fontFamily: 'Regular',
    fontSize: 25,
  },
  subtitle: {
    color: 'green',
    paddingTop: 3,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Medium',
  },
  dataContainerFormTitle: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Medium',
  },
  ImageAccountContainer: {
    alignItems: 'center',
  },
});
