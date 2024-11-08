import React, { useState, useEffect } from 'react';
import { View, SafeAreaView,Pressable, ImageBackground, TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
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


const { width, height } = Dimensions.get('window');

const KusafishaBandaForm = ({ navigation, route }) => {

  const { 
    
    // id,
    // Siku,
    
    // Wiki,
    // Mwezi,
    JinaLaHuduma,
    input 
   } = route.params

const Wiki = 0;
const Mwezi = 0;

   const siku = input;






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






// State variable to store the RoomClasses data
  const [Muda, setMuda] = useState([]);
 const [selectedMuda, setSelectedMuda] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/MudaWaKumbushoUsafishajiBandaViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setMuda(data);
        
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

  const [Awamu, setAwamu] = useState('');
  const [selectedAwamu, setSelectedAwamu] = useState(null);
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

      if (Awamu) {
      formData.append('Awamu', Awamu);
      } else {
            showAlertFunction('Tafadhali chagua Awamu za kupewa Kumbusho.');
            setIsLoading(false);
            return;
        }
      

         // Hakikisha kuwa selectedMkoa na selectedAinaYaKuku sio null
        if (selectedMuda && selectedMuda.id) {
            formData.append('Muda', selectedMuda.id);
        } else {
            showAlertFunction('Tafadhali chagua Muda wa kukumbushwa.');
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

      axios.post(EndPoint + `/AddKumbushoUsafishajiBandaView/?siku=${siku}`, formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setIsLoading(false);
        showAlertFunction("Umefanikiwa kuweka kumbusho la kusafisha banda");
        //console.log("Well");
      }).catch(error => {
        setIsLoading(false);
        console.log(error);
        handleErrorMessage(error);
      });
    }
  };



    const AwamuChoices = [
    {id:1, label: 'Ijirudie', value: 'Ijirudie' },
    {id:2, label: 'Maramoja tu', value: 'Maramoja tu' }
  ];



  return (
    <>
      {!fontsLoaded ? (<View />) : (
        <>
          {!isLoading ? (
            <View style={{ flex: 1 }}>
              <MinorHeader title="Kusafisha Banda" />
              <ImageBackground
                source={require('../assets/bc1.png')}
                style={{ flex: 1, opacity: 1 }}
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
                 Unataka kukumbushwa
                  mara moja tu au ijirudie ?
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
           selectedValue={Awamu}
          onValueChange={(itemValue) => setAwamu(itemValue)}
          >

            {AwamuChoices.map((choice) => (
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
                 Chagua Muda Wa Kumbusho
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
            selectedValue={selectedMuda}
            onValueChange={(itemValue) => setSelectedMuda(itemValue)}
          >

            {Muda.map((x) => (
              <Picker.Item
                key={x.id}
                label={x.Muda + " " + x.StartingTime + " " + "-" + " " + x.EndingTime}
                value={x}
                color="green"
              />
            ))}
          </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}


















                  {!isLoading && (
                    <TouchableOpacity onPress={handleSubmit} style={styles.ButtonContainerUpdate}>
                      <Text style={styles.ButtonTextUpdate}>Kusanya</Text>
                    </TouchableOpacity>
                  )}





  <View style={{
  marginBottom:100,
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
        onPress ={() => navigation.navigate('Historia Za Kumbusho Za Kusafisha Banda')}
           
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
              Angalia kumbusho zako nyingine za usafishaji banda 
               ulizowahi kuweka
            </Text>
          </TouchableOpacity>
          

        </Pressable>
   










              </ImageBackground>

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

export default KusafishaBandaForm;

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
