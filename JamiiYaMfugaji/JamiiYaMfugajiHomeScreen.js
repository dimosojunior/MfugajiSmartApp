import React, { useState,useCallback, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  Linking,
  Alert,
  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';



import COLORS  from '../Constant/colors';

import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import LotterViewScreen from '../Screens/LotterViewScreen';

import {CustomCard} from '../RenderedComponents/CustomCard';
import MinorHeader from '../Header/MinorHeader';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

export default function JamiiYaMfugajiHomeScreen ({navigation, route}) {

   const { 
    
    id,
    JinaLaHuduma 
   } = route.params


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

const HudumaKwaWatejaNumber = "0759536085";

  // const nav = useNavigation();
  // const DATA = [
  //   {
  //     id: 1,
  //     name: "Bajeti Ya Chakula",
  //     backgroundColor:"#6BC5E8",
  //     imagesrc:im1
      
  //   },
  //   {
  //     id: 2,
  //     name: "Kumbusho La Shamba",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im2
  //   },

  //   {
  //     id: 3,
  //     name: "Kitabu Shamba",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im3
  //   },

  //   {
  //     id: 4,
  //     name: "Jamii Ya Mfugaji",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im4
  //   }


  // ];




//FOR SEARCHING
const [input, setInput] = useState('');

//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);




const getItems = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetJamiiYaMfugajiCategoriesView/?page=${current_page}&page_size=2`
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











  const transportItem = ({item}) => {

    if (input === ""){

    return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameHomeScreen}

                 >{item.CategoryName}</Text>


               <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.Picha ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={{
                      uri: EndPoint + '/' + item.Picha
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>


                  <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreen}

                   // onPress={() => 
                   //  navigation.navigate('Angalia Huduma', item)}
                  onPress={() => {
          
          if (item.CategoryName === 'Mfugaji Wa Karibu Yako') {
            navigation.navigate('Soko Huru HomeScreen', {...item, JinaLaHuduma });
          } 

           if (item.CategoryName === 'Duka Lako') {
            navigation.navigate('Duka Lako HomeScreen', {...item, JinaLaHuduma });
          } 

           if (item.CategoryName === 'Youtube Channel Ya Wafugaji') {
            navigation.navigate('Youtube Channel', {...item, JinaLaHuduma });
          } 


         
          
        }}



                   >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreen}
                  >Ingia</Text>
                  </TouchableOpacity>
                </View>
                <View>
                 
                </View>
              </View>
           </CustomCard>


           )




     // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if(item.CategoryName.toLowerCase().includes(input.toLowerCase())){


    return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameHomeScreen}

                 >{item.CategoryName}</Text>


               <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.Picha ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={{
                      uri: EndPoint + '/' + item.Picha
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>


                  <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreen}

                   // onPress={() => 
                   //  navigation.navigate('Angalia Huduma', item)}
                          onPress={() => {
          
          if (item.CategoryName === 'Mfugaji Wa Karibu Yako') {
            navigation.navigate('Soko Huru HomeScreen', {...item, JinaLaHuduma });
          } 

           if (item.CategoryName === 'Duka Lako') {
            navigation.navigate('Duka Lako HomeScreen', {...item, JinaLaHuduma });
          } 

           if (item.CategoryName === 'Youtube Channel Ya Wafugaji') {
            navigation.navigate('Youtube Channel', {...item, JinaLaHuduma });
          } 


         
          
        }}



                   >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreen}
                  >Ingia</Text>
                  </TouchableOpacity>
                </View>
                <View>
                 
                </View>
              </View>
           </CustomCard>


           )





// hili bano la chini ni la if ya pili mwisho
  }



// mwisho wa render
  };




  return (

       <>{!fontsLoaded ? (<View/>):(

          <View style={globalStyles.container}>





<MinorHeader title={JinaLaHuduma} />



    {/*<View style={globalStyles.searchbarOtherPages}>

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
                    placeholder="Tafuta" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>

                  </View>
*/}







          {/*  mwanzo wa Itself container*/}
              <View style={[globalStyles.ItselfMajorContainer,

                  {
                  backgroundColor:'green',
                  marginHorizontal:10,
                  width:'95%'
                }

                ]}>
             
             <View style={globalStyles.ItselfLeftMinorContainer}>
             <TouchableOpacity 
           onPress={() => {   Linking.openURL(`tel:${HudumaKwaWatejaNumber}`)}}
            
             >
              <Text style={[globalStyles.ItselfLeftMinorText,
                 {
                  backgroundColor:'yellow',
                  color:'black'
                }

                ]}>Msaada kwa wateja</Text>
              </TouchableOpacity>
              </View>
             
              
            <TouchableOpacity 
           onPress={() => {   Linking.openURL(`tel:${HudumaKwaWatejaNumber}`)}}
            
              style={globalStyles.ItselfRightMinorContainer}>
              <View >
                  <FontAwesome name='phone' 
                  size={30}
                  color='white'  
                  
                   />
              </View>
              </TouchableOpacity>
                
              </View>
             {/*  mwisho wa Itself container*/}
            








              <View style={globalStyles.bottomview}>
            



                <Text
                style={globalStyles.AppChaguaHudumaTextHomeScreen}  
                
                >Chagua Huduma</Text>


            {/*mwanzo wa Item View*/}
                <View 
                style={globalStyles.AppFlatListContainerHomeScreen} 
               
                >

{ !isPending ? (
  <>
      
      { queryset && queryset.length > 0 ? (
        <>

         {setLoading===true?(<ActivityIndicator/>):(
      <>

                    <FlatList
                    data={queryset}
                    renderItem={transportItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}

                    ListFooterComponent={renderLoader}
                    onEndReached={getItems}
                    onEndReachedThreshold={0.5}
                  />


                        </>
      )}

         </>



      ) : (
       

 <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>Hakuna taarifa yoyote kuhusu jamii ya wafugaji!! !
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
 </>

):(
<LotterViewScreen />


)} 
                </View>

          {/*Mwisho wa item View*/}





               
                </View>







          </View>


          )}</>

          );
}

const styles = StyleSheet.create({
 
});