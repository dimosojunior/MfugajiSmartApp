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

const RatibaYaChanjoForm = ({ navigation, route }) => {

  const { 
    
    // id,
    // UmriKwaWiki,
    // UmriKwaSiku,
    JinaLaHuduma,
    input
   } = route.params

//set UmriKwaWiki=0, kwasababu kule kwenye views ni lazima iipokee hii

const UmriKwaWiki = 0;
const UmriKwaSiku = input;
// const UmriKwaWiki_value =  input / 7;

const UmriWaKukuKwaSiku = input;
// console.log("UmriWaKukuKwaSiku", UmriWaKukuKwaSiku);



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




const [KundiLaKukuWake, setKundiLaKukuWake] = useState('');

// State variable to store the RoomClasses data
  const [AinaYaChanjo, setAinaYaChanjo] = useState([]);
 const [selectedAinaYaChanjo, setSelectedAinaYaChanjo] = useState([]);
 
  // Fetch Chanjos
  // useEffect(() => {
  //   fetch(`${EndPoint}/Add/AinaZaChanjoViewSet`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAinaYaChanjo(data);
        
  //       // Set the default selectedRoomClass if needed
  //       //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
  //     })
  //     .catch((error) => {
  //       //console.error('Error fetching Product categories:', error);
  //       //showAlertFunction("Error fetching Universities");
  //     });
  // }, []);


useEffect(() => {
    // Make a GET request to fetch queryset and main total price
    axios.get(`${EndPoint}/GetAinaZaChanjoView/?UmriWaKukuKwaSiku=${UmriWaKukuKwaSiku}`)

      .then((response) => {
        const { 
          AinaYaChanjo
          
        } = response.data;
        setAinaYaChanjo(AinaYaChanjo);
        //console.log("Weell");
            
        
      })
      .catch((error) => {
        
        //console.log("Error", error);
      });
  }, []);












 const [AinaYaKuku, setAinaYaKuku] = useState([]);
 const [selectedAinaYaKuku, setSelectedAinaYaKuku] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/AinaZaKukuViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setAinaYaKuku(data);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);


 const [UmriWaKuku, setUmriWaKuku] = useState([]);
 const [selectedUmriWaKuku, setSelectedUmriWaKuku] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/UmriWaKukuViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setUmriWaKuku(data);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);








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


    const handleCheckboxChange = (id) => {
        setSelectedAinaYaChanjo((prev) => {
            if (prev.includes(id)) {
                return prev.filter((chanjoId) => chanjoId !== id);
            } else {
                return [...prev, id];
            }
        });
    };



  const handleSubmit = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();


         if (KundiLaKukuWake) {
            formData.append('KundiLaKukuWake', KundiLaKukuWake);
        } else {
            showAlertFunction('Tafadhali ingiza kundi la kuku wako.');
            setIsLoading(false);
            return;
        }




     
         // Hakikisha kuwa selectedMkoa na selectedAinaYaKuku sio null
        if (selectedAinaYaKuku && selectedAinaYaKuku.id) {
            formData.append('AinaYaKuku', selectedAinaYaKuku.id);
        } else {
            showAlertFunction('Tafadhali chagua Aina Ya Kuku.');
            setIsLoading(false);
            return;
        }


        //  if (selectedUmriWaKuku && selectedUmriWaKuku.id) {
        //     formData.append('UmriWaKuku', selectedUmriWaKuku.id);
        // } else {
        //     showAlertFunction('Tafadhali chagua Umri Wa Kuku.');
        //     setIsLoading(false);
        //     return;
        // }


             // Append the array of AinaYaChanjo IDs
        if (selectedAinaYaChanjo.length > 0) {
            selectedAinaYaChanjo.forEach((id) => {
                formData.append('AinaYaChanjo', id);
            });
        } else {
            showAlertFunction('Tafadhali chagua Aina za Chanjo.');
            setIsLoading(false);
            return;
        }


       


       // Append the image file
    // formData.append('profile_image', {
    //   uri: profile_image,
    //   name: 'profile_image.jpg',
    //   type: 'image/jpeg',
    // });

    // formData.append('pdf', {
    //   uri: pdf,
    //   name: 'project.pdf',
    //   type: 'application/pdf',
    // });

      axios.post(EndPoint + `/AddKumbushoLaChanjoView/?UmriKwaWiki=${UmriKwaWiki}&UmriKwaSiku=${UmriKwaSiku}`, formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setIsLoading(false);
        showAlertFunction("Umefanikiwa kuweka kumbusho la Ratiba ya chanjo");
        //console.log("Well");
         setModalVisible(false);
        setIsModalVisible(false); // Reset state when modal closes
       setdisplayContentsState(false);
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



  


  return (
    <>
      {!fontsLoaded ? (<View />) : (
        <>
          {!isLoading ? (
            <View style={{ 
              flex: 1,


            }}

              >
              <MinorHeader title={JinaLaHuduma} />
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

                  <Text style={styles.dataContainerFormTitle}>
    Karibu {username}, tafadhali jaza taarifa muhimu hapo chini </Text>


{/*
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
                 Unataka kumbusho lijirudie au Maramoja tu ?
            </Text>
            </View>
                  <TextInput
                    placeholder='Awamu za kumbusho'
                    value={Awamu}
                    onChangeText={setAwamu}
                    placeholderTextColor={COLORS.white}
                    style={[styles.MyTextInput,

                      {
                        marginTop:0,
                      }

                      ]}
                  />
*/}




<TextInput
  placeholder='Sajili kundi la kuku wako'
  value={KundiLaKukuWake}
  onChangeText={setKundiLaKukuWake}
  placeholderTextColor= "wheat"
  //keyboardType="numeric"
  style={styles.MyTextInput}
/>











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
                 Chagua aina ya kuku wako
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
            selectedValue={selectedAinaYaKuku}
            onValueChange={(itemValue) => setSelectedAinaYaKuku(itemValue)}
          >

            {AinaYaKuku.map((x) => (
              <Picker.Item
                key={x.id}
                label={x.AinaYaKuku}
                value={x}
                color="green"
              />
            ))}
          </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}
















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




{displayContentsState && (
    <View style={{ marginTop: 20 }}>
      <View style={{ width: '90%', marginHorizontal: 20 }}>
        <Text style={[globalStyles.haippo, { color: 'wheat' }]}>
          Hizi ndizo chanjo ulizobakisha kutokakana na umri 
          wa kuku wako wenye umri wa siku {UmriWaKukuKwaSiku}
        </Text>
      </View>
      <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
        {AinaYaChanjo.map((x) => (
          <View key={x.id} style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
             marginHorizontal: 20,
             width:'90%',
              marginVertical: 15 }}>
            <Checkbox
              value={selectedAinaYaChanjo.includes(x.id)}
              onValueChange={() => handleCheckboxChange(x.id)}
              style={{
               marginRight: 10,
               height:30,
               width:30,
                }}
            />
            <Text style={{
             color: 'white',
             marginLeft:20, 
             fontFamily:'Bold',
             width:'85%',
           }}>{x.JinaLaChanjo}, <Text style={{
            color:'green',
           }}>  Siku:  {x.Kutolewa}</Text></Text>
          </View>
        ))}
      </View>
    </View>

)}



                  {!isLoading && (
                    <TouchableOpacity onPress={handleSubmit} style={styles.ButtonContainerUpdate}>
                      <Text style={styles.ButtonTextUpdate}>Kusanya</Text>
                    </TouchableOpacity>
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
        onPress ={() => navigation.navigate('Historia Za Kumbusho Za Ratiba Ya Chanjo')}
           
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
              Angalia kumbusho zako nyingine za ratiba ya chanjo 
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
              backgroundColor:'wheat',
              justifyContent: 'center', 
             alignItems: 'center',
             //height:height/4,
             width:'90%',


            }



            ]}>
          
            <Text style={[globalStyles.ModalTitleViewProduct,
              {
                textAlign:'center',
                fontFamily:'Medium',

              }
              ]}>
              
            
              Chanjo ya siku ya kwanza (Marek's), hutolewa 
              mara tu vifaranga wakianguliwa. Mara nyingi hutolewa 
              na wazalishaji wa vifaranga
            
            
            </Text>


                


          
            

            <View style={[globalStyles.ButtonConatinerViewProduct,

              {
                'marginTop':100,
              }

              ]}>
                    
                    <TouchableOpacity 
                    style={[globalStyles.ButtonAddViewProduct,
                      {
                            backgroundColor:'green'
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

export default RatibaYaChanjoForm;

const styles = StyleSheet.create({
  MyTextInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 8,
    color: 'white',
    marginHorizontal: 10,
    borderBottomColor: 'white',
    marginVertical: 15,
  },
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
