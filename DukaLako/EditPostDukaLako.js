import React, { useState, useEffect } from 'react';
import { View, SafeAreaView,Modal,Pressable, ImageBackground, TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
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

const EditPostDukaLako = ({ navigation, route }) => {

  const { postId } = route.params;
  // const [postDetails, setPostDetails] = useState({
  //   Title: '',
  //   Maelezo: '',
  //   // PichaYaPost: '',
  //   // PichaYaPost2: '',
  //   // PichaYaPost3: '',
  //   // PichaYaPost4: '',
  //   // PichaYaPost5: '',
  // });

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

const [OngezaPichaOpen, setOngezaPichaOpen] = useState(false);
const [OngezaPichaClose, setOngezaPichaClose] = useState(false);





const [PichaYaPost, setPichaYaPost] = useState(null);
const [PichaYaPost2, setPichaYaPost2] = useState(null);
const [PichaYaPost3, setPichaYaPost3] = useState(null);
const [PichaYaPost4, setPichaYaPost4] = useState(null);
const [PichaYaPost5, setPichaYaPost5] = useState(null);

const [Maelezo, setMaelezo] = useState('');
const [Title, setTitle] = useState('');
const [IsPicked, setIsPicked] = useState(false);
const [IsPicked2, setIsPicked2] = useState(false);
const [IsPicked3, setIsPicked3] = useState(false);
const [IsPicked4, setIsPicked4] = useState(false);
const [IsPicked5, setIsPicked5] = useState(false);
  


//MWANZO WA PICK IMAGE FROM THE PHONE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
      setPichaYaPost(result.assets[0].uri); // Use assets array
      setIsPicked(true);
      //console.log("PROJECT IMAGE", PichaYaPost)
     // processImage(); // Use assets array
    // console.log("RESULT 1" ,result);
  };


 const pickImage2 = async () => {
    let result2 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
      setPichaYaPost2(result2.assets[0].uri); // Use assets array
      setIsPicked2(true);
      //console.log("PROJECT IMAGE", PichaYaPost)
     // processImage(); // Use assets array
    // console.log("RESULT 2" ,result2);
  };


   const pickImage3 = async () => {
    let result3 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
      setPichaYaPost3(result3.assets[0].uri); // Use assets array
      setIsPicked3(true);
      //console.log("PROJECT IMAGE", PichaYaPost)
     // processImage(); // Use assets array
     //console.log("RESULT 3" ,result3);
  };




 const pickImage4 = async () => {
    let result4 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
      setPichaYaPost4(result4.assets[0].uri); // Use assets array
      setIsPicked4(true);
      //console.log("PROJECT IMAGE", PichaYaPost)
     // processImage(); // Use assets array
     //console.log("RESULT 4" ,result4);
  };




 const pickImage5 = async () => {
    let result5 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
      setPichaYaPost5(result5.assets[0].uri); // Use assets array
      setIsPicked5(true);
      //console.log("PROJECT IMAGE", PichaYaPost)
     // processImage(); // Use assets array
     //console.log("RESULT 5" ,result5);
  };

  //MWISHO WA PICK IMAGE FROM THE PHONE







// const [Title, setTitle] = useState('');
// const [Maelezo, setMaelezo] = useState('');

  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');

  const [Location, setLocation] = useState('');
  //const [Maelezo, setMaelezo] = useState('');


  const [profileImage, setProfileImage] = useState('');
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
        setEmail(userData.email);
        setUsername(userData.username);
        setPhone(userData.phone);
        setcompany_name(userData.company_name);
         //setMaelezo(userData.Maelezo);
          setLocation(userData.Location);
        
       

      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  //console.log("PichaYaPost", PichaYaPost);

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setIsLoading(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading(false);
    } else {
      showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
      setIsLoading(false);
    }
  };







useEffect(() => {
  const fetchPostDetails = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setUserToken(token);  // Set the token before making the API call
      try {
        const response = await axios.get(`${EndPoint}/RetrieveDukaLakoPostView/${postId}/`, {
          headers: {
            Authorization: `Token ${token}`,  // Use the retrieved token
          },
        });
        const data = response.data;
       setTitle(data.Title);
       setMaelezo(data.Maelezo);
       setPichaYaPost(data.PichaYaPost);
       setPichaYaPost2(data.PichaYaPost2);
       setPichaYaPost3(data.PichaYaPost3);
       setPichaYaPost4(data.PichaYaPost4);
       setPichaYaPost5(data.PichaYaPost5);
         setIsPicked(false);
         setIsPicked2(false);
         setIsPicked3(false);
         setIsPicked4(false);
         setIsPicked5(false);

        //console.log("Data fetched successfully");
      } catch (error) {
        handleErrorMessage(error);
        //console.log("Error fetching post details:", error);
      }
    }
  };
  
  // Ensure token is available first before making the API call
  if (userToken) {
    fetchPostDetails();
  }
}, [postId, userToken]);

// Fetch user token first in a separate useEffect
useEffect(() => {
  const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);  // Token is set here
  };
  getToken();
}, []);  // Run this only once when the component is mounted












  // const handleUpdatePost = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   try {
  //     const response = await axios.put(EndPoint + `/UpdateDukaLakoPostView/${postId}/edit/`, postDetails, {
  //       headers: {
  //         Authorization: `Token ${userToken}`,
  //       },
  //     });
  //     showAlertFunction('Success', 'Post updated successfully');
  //     navigation.goBack();
  //   } catch (error) {
  //     showAlertFunction('Error', 'Failed to update post');
  //     console.log(error);
  //   }
  // };



  const handleUpdatePost = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();
      formData.append('Title', Title);
      formData.append('Maelezo', Maelezo);
      
      

      if (Title) {
            formData.append('Title', Title);
        } else {
            showAlertFunction('Tafadhali tuambie posti yako inahusiana na nini ?.');
            setIsLoading(false);
            return;
        }


        if (Maelezo) {
            formData.append('Maelezo', Maelezo);
        } else {
            showAlertFunction('Tafadhali andika maelezo ya posti yako.');
            setIsLoading(false);
            return;
        }



     if (PichaYaPost && IsPicked) {
  console.log("Image URI:", PichaYaPost.uri || PichaYaPost);
  formData.append('PichaYaPost', {
    uri: PichaYaPost.uri || PichaYaPost,
    name: 'PichaYaPost.jpg',
    type: 'image/jpeg',
  });
} else {
  console.log("No image selected or uri not found");
}


  if (PichaYaPost2 && IsPicked2) {
  console.log("Image URI:", PichaYaPost2.uri || PichaYaPost2);
  formData.append('PichaYaPost2', {
    uri: PichaYaPost2.uri || PichaYaPost2,
    name: 'PichaYaPost2.jpg',
    type: 'image/jpeg',
  });
} else {
  console.log("No image selected or uri not found");
}

if (PichaYaPost3 && IsPicked3) {
  console.log("Image URI:", PichaYaPost3.uri || PichaYaPost3);
  formData.append('PichaYaPost3', {
    uri: PichaYaPost3.uri || PichaYaPost3,
    name: 'PichaYaPost3.jpg',
    type: 'image/jpeg',
  });
} else {
  console.log("No image selected or uri not found");
}


if (PichaYaPost4 && IsPicked4) {
  console.log("Image URI:", PichaYaPost4.uri || PichaYaPost4);
  formData.append('PichaYaPost4', {
    uri: PichaYaPost4.uri || PichaYaPost4,
    name: 'PichaYaPost4.jpg',
    type: 'image/jpeg',
  });
} else {
  console.log("No image selected or uri not found");
}


if (PichaYaPost5 && IsPicked5) {
  console.log("Image URI:", PichaYaPost5.uri || PichaYaPost5);
  formData.append('PichaYaPost5', {
    uri: PichaYaPost5.uri || PichaYaPost5,
    name: 'PichaYaPost5.jpg',
    type: 'image/jpeg',
  });
} else {
  console.log("No image selected or uri not found");
}







 
      axios.put(EndPoint + `/UpdateDukaLakoPostView/${postId}/edit/`, formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setIsLoading(false);
        showAlertFunction("Umefanikiwa Kubadilisha taarifa zako");
        navigation.replace('Your Posts');
        //console.log("Well");
      }).catch(error => {
        setIsLoading(false);
        console.log(error);
        handleErrorMessage(error);
      });
    }
  };






  return (
    <>
      {!fontsLoaded ? (<View />) : (
        <>
          {!isLoading ? (
            <View style={{ flex: 1 }}>
              <MinorHeader title="Ongeza Huduma" />
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


{!displayContentsState && (

<Pressable>


                  <Text style={styles.dataContainerFormTitle}>
                  Jaza sehemu zote hapo chini ili kuweza kuweka huduma
                  mpya </Text>




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
            Tuambie posti yako inahusiana na nini ?
            </Text>
            </View>

 <TextInput
  //placeholder='Kiasi Cha Mayai'
 value={Title}
   onChangeText={setTitle}
  placeholderTextColor={COLORS.white}
  style={styles.MyTextInput}
/>

{/*mwisho wa input*/}






{/*mwanzo wa picha yako*/}

<View style={{ 
  marginTop: 20,
  marginHorizontal:20,
  width:'90%'
   }}>
  
{/*mwanzo wa display flex*/}
<View style={{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
}}>
   <Text style={[globalStyles.haippo,
  {
    //width:'90%',
    color:'wheat',
    width:'50%',
  }
  ]}>
Weka picha ya kwanza
</Text>

{!OngezaPichaOpen && (
<TouchableOpacity 
 onPress={() => {
  setOngezaPichaOpen(true);
}}
style={{
  width:'40%',
}}>
   <Text style={[globalStyles.haippo,
  {
    //width:'90%',
    color:'wheat',
    backgroundColor:'green',
    paddingHorizontal:10,
    paddingVertical:10,
    textAlign:'center',
    borderRadius:8,
  }
  ]}>
Ongeza picha
</Text>
</TouchableOpacity>
)}



{OngezaPichaOpen && (
<TouchableOpacity 
 onPress={() => {
  setOngezaPichaOpen(false);
}}
style={{
  width:'40%',
}}>
   <Text style={[globalStyles.haippo,
  {
    //width:'90%',
    color:'white',
    backgroundColor:'brown',
    paddingHorizontal:10,
    paddingVertical:10,
    textAlign:'center',
    borderRadius:8,
  }
  ]}>
Funga
</Text>
</TouchableOpacity>
)}


</View>
{/*mwisho wa display flex*/}

  <View style={[globalStyles.input,
    {
     // backgroundColor:'green',
     backgroundColor:'rgba(0,0,0,0)',
      //marginHorizontal:20,
      width:'100%',
      borderColor:'white',
      borderWidth:1,

    }

    ]}>

  

     <TouchableOpacity
      
      onPress={pickImage}
    >
    <FontAwesome
     style={globalStyles.InputIcon} 
     name='image' 
     size ={30}
     color="white"
     />
     </TouchableOpacity>

    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickImage}
    >
      <Text style={{ 
        color: 'white',
        marginLeft:15, 
      }}>Chagua picha ya kwanza</Text>
    </TouchableOpacity>
  </View>


<View style={{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
}}>

   {!IsPicked && PichaYaPost && (
<Image 
 source={{
uri: EndPoint + '/' + PichaYaPost
}}
style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}



   {IsPicked && PichaYaPost && (
<Image 
source={{ uri: PichaYaPost }} 
style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}




</View>


</View>

{/*mwisho wa picha yako*/}







{/*mwanzo wa container lenye images 4*/}

{OngezaPichaOpen && (
<View>






{/*mwanzo wa picha yako*/}

<View style={{ 
  marginTop: 20,
  marginHorizontal:20,
  width:'90%'
   }}>
 
   <Text style={[globalStyles.haippo,
  {
    //width:'90%',
    color:'wheat',
    width:'90%',
  }
  ]}>
Weka picha ya pili
</Text>


  <View style={[globalStyles.input,
    {
     // backgroundColor:'green',
     backgroundColor:'rgba(0,0,0,0)',
      //marginHorizontal:20,
      width:'100%',
      borderColor:'white',
      borderWidth:1,

    }

    ]}>

  

     <TouchableOpacity
      
      onPress={pickImage2}
    >
    <FontAwesome
     style={globalStyles.InputIcon} 
     name='image' 
     size ={30}
     color="white"
     />
     </TouchableOpacity>

    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickImage2}
    >
      <Text style={{ 
        color: 'white',
        marginLeft:15, 
      }}>Chagua picha ya pili</Text>
    </TouchableOpacity>
  </View>


<View style={{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
}}>


   {!IsPicked2 && PichaYaPost2 && (
<Image 
 source={{
uri: EndPoint + '/' + PichaYaPost2
}}
style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}



   {IsPicked2 && PichaYaPost2 && (
<Image 
source={{ uri: PichaYaPost2 }}  
style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}


</View>


</View>

{/*mwisho wa picha yako*/}










{/*mwanzo wa picha yako*/}

<View style={{ 
  marginTop: 20,
  marginHorizontal:20,
  width:'90%'
   }}>
 
   <Text style={[globalStyles.haippo,
  {
    //width:'90%',
    color:'wheat',
    width:'90%',
  }
  ]}>
Weka picha ya tatu
</Text>


  <View style={[globalStyles.input,
    {
     // backgroundColor:'green',
     backgroundColor:'rgba(0,0,0,0)',
      //marginHorizontal:20,
      width:'100%',
      borderColor:'white',
      borderWidth:1,

    }

    ]}>

  

     <TouchableOpacity
      
      onPress={pickImage3}
    >
    <FontAwesome
     style={globalStyles.InputIcon} 
     name='image' 
     size ={30}
     color="white"
     />
     </TouchableOpacity>

    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickImage3}
    >
      <Text style={{ 
        color: 'white',
        marginLeft:15, 
      }}>Chagua picha ya tatu</Text>
    </TouchableOpacity>
  </View>


<View style={{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
}}>

   {!IsPicked3 && PichaYaPost3 && (
<Image 
 source={{
uri: EndPoint + '/' + PichaYaPost3
}}
style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}



   {IsPicked3 && PichaYaPost3 && (
<Image 
source={{ uri: PichaYaPost3 }}  
style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}


</View>


</View>

{/*mwisho wa picha yako*/}













{/*mwanzo wa picha yako*/}

<View style={{ 
  marginTop: 20,
  marginHorizontal:20,
  width:'90%'
   }}>
 
   <Text style={[globalStyles.haippo,
  {
    //width:'90%',
    color:'wheat',
    width:'90%',
  }
  ]}>
Weka picha ya nne
</Text>


  <View style={[globalStyles.input,
    {
     // backgroundColor:'green',
     backgroundColor:'rgba(0,0,0,0)',
      //marginHorizontal:20,
      width:'100%',
      borderColor:'white',
      borderWidth:1,

    }

    ]}>

  

     <TouchableOpacity
      
      onPress={pickImage4}
    >
    <FontAwesome
     style={globalStyles.InputIcon} 
     name='image' 
     size ={30}
     color="white"
     />
     </TouchableOpacity>

    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickImage4}
    >
      <Text style={{ 
        color: 'white',
        marginLeft:15, 
      }}>Chagua picha ya nne</Text>
    </TouchableOpacity>
  </View>


<View style={{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
}}>

   {!IsPicked4 && PichaYaPost4 && (
<Image 
 source={{
uri: EndPoint + '/' + PichaYaPost4
}}
style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}



   {IsPicked4 && PichaYaPost4 && (
<Image 
source={{ uri: PichaYaPost4 }} 
style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}


</View>


</View>

{/*mwisho wa picha yako*/}













{/*mwanzo wa picha yako*/}

<View style={{ 
  marginTop: 20,
  marginHorizontal:20,
  width:'90%'
   }}>
 
   <Text style={[globalStyles.haippo,
  {
    //width:'90%',
    color:'wheat',
    width:'90%',
  }
  ]}>
Weka picha ya tano
</Text>


  <View style={[globalStyles.input,
    {
     // backgroundColor:'green',
     backgroundColor:'rgba(0,0,0,0)',
      //marginHorizontal:20,
      width:'100%',
      borderColor:'white',
      borderWidth:1,

    }

    ]}>

  

     <TouchableOpacity
      
      onPress={pickImage5}
    >
    <FontAwesome
     style={globalStyles.InputIcon} 
     name='image' 
     size ={30}
     color="white"
     />
     </TouchableOpacity>

    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickImage5}
    >
      <Text style={{ 
        color: 'white',
        marginLeft:15, 
      }}>Chagua picha ya tano</Text>
    </TouchableOpacity>
  </View>


<View style={{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
}}>

   {!IsPicked5 && PichaYaPost5 && (
<Image 
 source={{
uri: EndPoint + '/' + PichaYaPost5
}}
style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}



   {IsPicked5 && PichaYaPost5 && (
<Image 
source={{ uri: PichaYaPost5 }} 
style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}


</View>


</View>

{/*mwisho wa picha yako*/}





</View>
)}

{/*mwisho wa container lenye images 4*/}




{/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{
                     //fontSize:16,
                      marginLeft:20,
                      color:'white',
                       }}>
                     Andika maelezo ya posti yako</Text>
                    < View style={globalStyles.ProjectBodyinput}>
                        {/*<FontAwesome style={globalStyles.InputIcon} name='pencil'/>*/}
                        <TextInput 
                        style={globalStyles.ProjectBodyInputIcon}  
                        placeholder='weka maelezo yako'
                        placeholderTextColor={COLORS.white}
                    value={Maelezo}
   onChangeText={setMaelezo}
         multiline={true}  // Enable multiline
          numberOfLines={50}  // Set a maximum number of lines
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}










                  {!isLoading && (
                    <TouchableOpacity onPress={handleUpdatePost} style={styles.ButtonContainerUpdate}>
                      <Text style={styles.ButtonTextUpdate}>Badili Posti</Text>
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
     Hongera! posti yako imepokelewa. Tafadhali subiri
     ihakikiwe, itakuwa hewani hivi punde.
  </Text>

   <TouchableOpacity 
   onPress={() => {
   setdisplayContentsState(false);
  }}
     style={styles.ButtonContainerUpdate}>
  <Text style={styles.ButtonTextUpdate}>Weka posti mpya</Text>
</TouchableOpacity>

</View>


  )}







                </ScrollView>
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

export default EditPostDukaLako;

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
