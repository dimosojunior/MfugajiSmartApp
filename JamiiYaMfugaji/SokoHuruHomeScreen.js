import { StyleSheet,ScrollView,Image,

  Pressable,Linking, TextInput,ActivityIndicator,
  TouchableOpacity,
  Text, View, ImageBackground } from "react-native";
import Top from "./Top";
import Middle from "./Middle";
import Bottom from "./Bottom";
import Sizes from "./Sizes";
import {useFonts} from 'expo-font';

import React, {useState,useCallback,useRef, useEffect, useContext} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from "../Constant/links";
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../Styles/GlobalStyles';
import LotterViewScreen from '../Screens/LotterViewScreen';

import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';
import COLORS  from '../Constant/colors';
import MinorHeader from '../Header/MinorHeader';

export default function SokoHuruHomeScreen() {

let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});



    //const theme = useContext(themeContext)
const navigation = useNavigation();
const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
const [isLoading2, setIsLoading2] = useState(false);






 const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

   const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };




const handleErrorMessage = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code
      // if (error.response.status === 401) {
      //   showAlertFunction('Registration error. Please try again later.');
      // } else if (error.response.status === 404) {
      //   showAlertFunction('Not Found: The requested resource was not found.');

      // } 
      // else {
      //   showAlertFunction('An error occurred while processing your request.');
      // }
    }  if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading2(false);
    } else {
      showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
      setIsLoading2(false);
    }
  };



  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
    //fetchUserData();
  }, [userData]);


 useEffect(() => {
    checkLoggedIn();


  }, [userToken]);


  const checkLoggedIn = async () => {
    setIsLoading2(true);
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

        const userData1 = userResponse.data;
        setUserData(userData1);
       
      // setEmail(userData.email);
      // setUsername(userData.username);
      // setPhone(userData.phone);
      // setcompany_name(userData.company_name);
      setIsLoading2(false);
       
      } catch (error) {
        handleErrorMessage(error);
        
      }
    }
  };








//FOR SEARCHING
const [input, setInput] = useState('');

//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);
const [isClicked, setisClicked] = useState(false);




const getItems = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetAllMyUserView/?page=${current_page}&page_size=2`
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
          <ActivityIndicator size="large" color="red" />
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


 const handleScroll = (event) =>{
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const scrollEndY = layoutMeasurement.height + contentOffset.y
    const contetHeight = contentSize.height

    if (scrollEndY >= contetHeight - 50) {
      getItems()
    }
  }





 // Track the ID of the item that is currently expanded
  const [expandedItemId, setExpandedItemId] = useState(null);

  // Function to toggle the bottom component for a specific item
  const toggleItemExpansion = (itemId) => {
    if (expandedItemId === itemId) {
      setExpandedItemId(null); // Close if already opened
    } else {
      setExpandedItemId(itemId); // Open the specific item
    }
  };












const WafugajiCard = ({item, index}) => {
  const propertySuffix = `phone`;
  const phoneValue = item[`${propertySuffix}`];
  //console.log("Gggggg",phoneValue);

 const isItemExpanded = expandedItemId === item.id; // Check if this item is expanded

  
//mwanzo wa search
   if (input === ""){


 return (



      <Pressable
      style={globalStyles.WafugajiCardContainer}
      
      >


 {/*<Top item={item} userData={userData} setUserData={setUserData} isLoading={isLoading} setIsLoading={setIsLoading} />
 */}

   <Middle
          isClicked={isItemExpanded}
          setisClicked={() => toggleItemExpansion(item.id)}
          item={item}
          userData={userData}
          setUserData={setUserData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />


 {isItemExpanded && (
          <Bottom
            isClicked={isItemExpanded}
            setisClicked={() => toggleItemExpansion(item.id)}
            phoneValue={phoneValue}
            item={item}
            userData={userData}
            setUserData={setUserData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )} 

<View style={{
  backgroundColor:'black',
  borderColor:'white',
  borderWidth:1,
  marginBottom:50,
}}>
  {/*<Text>
    
  </Text>*/}
</View>
    </Pressable>


)






  // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if(item.Location.toLowerCase().includes(input.toLowerCase())){






 return (



      <Pressable
      style={globalStyles.WafugajiCardContainer}
      
      >


 {/*<Top item={item} userData={userData} setUserData={setUserData} isLoading={isLoading} setIsLoading={setIsLoading} />
 */}

  <Middle item={item} userData={userData} setUserData={setUserData} isLoading={isLoading} setIsLoading={setIsLoading}/>
 
{!isClicked && (
  <TouchableOpacity 
       onPress={() => {

        setisClicked(true);
      }} 
      >  

      <Text style={{
    color:'white',
    marginTop:20,
    marginBottom:20,
    backgroundColor:'green',
    textAlign:'center',
    width:'50%',
    paddingVertical:10,
    borderRadius:8,
   }}>Taarifa zaidi</Text>


 </TouchableOpacity>
 )}

{isClicked && (
  <TouchableOpacity 
       onPress={() => {

        setisClicked(false);
      }} 
      >  

      <Text style={{
    color:'black',
    marginTop:20,
    marginBottom:20,
    backgroundColor:'yellow',
    textAlign:'center',
    width:'50%',
    paddingVertical:10,
    borderRadius:8,
   }}>Taarifa zaidi</Text>


 </TouchableOpacity>
 )}




 {isClicked && (

  <Bottom isClicked={isClicked} setisClicked={setisClicked} phoneValue={phoneValue} item={item} userData={userData} setUserData={setUserData} isLoading={isLoading} setIsLoading={setIsLoading}/>
  )}    

<View style={{
  backgroundColor:'white',
}}>
  <Text>
    
  </Text>
</View>
    </Pressable>


)







// hili bano la chini ni la if ya pili mwisho
  }




}
  





  return (

      <>
 {!isPending ? (

    <>
     

        <View style={globalStyles.container}>

        <MinorHeader title="Jamii Huru" />

         <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/bc1.png")}
        // blurRadius={1}
      >
      <ScrollView
keyboardShouldPersistTaps="handled" 
// refreshControl={
//         <RefreshControl
//         refreshing={refresh}
//         onRefresh={() => pullMe()}
//         />
//        }
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll} scrollEventThrottle={16}
       
 
      >



    <View style={[globalStyles.searchbarOtherPages,
      {
        marginTop:10,
      }

      ]}>

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
                    placeholder="Ingiza wilaya" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>





 <Text
  style={[globalStyles.AppChaguaHudumaTextHomeScreen,
    {
      color:'white',
      backgroundColor:'black',
      borderColor:'white',
      borderWidth:1,
      width:'80%',
      textAlign:'center',
      paddingVertical:6,
      borderRadius:8,
    }

    ]}  
  
  >Tafuta mfugaji wa karibu</Text>

      

   {queryset && queryset.length > 0 ? (
    <>

       {setLoading===true?(<ActivityIndicator/>):(

             <>

          {queryset.map((item, index) => {
          return <WafugajiCard item={item} key={item.id || index} />;
          })}

          {isLoading&&(<ActivityIndicator/>)}
          </>
          )}
       

</>


   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>hakuna mfugaji yeyote kwasasa! !
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





</ScrollView>

</ImageBackground>

        </View>


        


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



      
    </>

       ):(

<LotterViewScreen />

)}

    </>

  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    marginHorizontal: Sizes.medium,
    marginTop: Sizes.safe,
  },
});
