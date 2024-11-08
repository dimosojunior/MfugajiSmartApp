import React, { useState, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

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

export default function DukaLakoHomeScreen ({navigation}) {

   //  const { 
    
   //  id,
   //  JinaLaHuduma 
   // } = route.params


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



  // const nav = useNavigation();
  const DATA = [
    {
      id: 1,
      name: "Ongeza Huduma Yako",
      imagesrc:require('../assets/icon.png')
      
    },
    {
      id: 2,
      name: "Duka Lako",      
      imagesrc:require('../assets/icon.png')
    }
  ];




//FOR SEARCHING
const [input, setInput] = useState('');

//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);








 









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

                 >{item.name}</Text>


               <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.imagesrc ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={item.imagesrc} 
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

             {item.name === 'Duka Lako' ? (
                  <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreen}

                   // onPress={() => 
                   //  navigation.navigate('Angalia Huduma', item)}
                    onPress={() => {
          
          
            navigation.navigate('Get All Duka Lako Items', item);    
        }}
                >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreen}
                  >Ingia</Text>
                  </TouchableOpacity>
                  ):(

                   <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreen}

                   // onPress={() => 
                   //  navigation.navigate('Angalia Huduma', item)}
                    onPress={() => {
          
          
            navigation.navigate('Duka Lako Form', item);    
        }}
                >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreen}
                  >Ingia</Text>
                  </TouchableOpacity>

                  )}



                </View>
                <View>
                 
                </View>
              </View>
           </CustomCard>


           )




     // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if(item.name.toLowerCase().includes(input.toLowerCase())){
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

                 >{item.name}</Text>


               <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.imagesrc ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={item.imagesrc} 
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

             {item.name === 'Duka Lako' ? (
                  <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreen}

                   // onPress={() => 
                   //  navigation.navigate('Angalia Huduma', item)}
                    onPress={() => {
          
          
            navigation.navigate('Get All Duka Lako Items', item);    
        }}
                >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreen}
                  >Ingia</Text>
                  </TouchableOpacity>
                  ):(

                   <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreen}

                   // onPress={() => 
                   //  navigation.navigate('Angalia Huduma', item)}
                    onPress={() => {
          
          
            navigation.navigate('Duka Lako Form', item);    
        }}
                >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreen}
                  >Ingia</Text>
                  </TouchableOpacity>

                  )}



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





<MinorHeader title="Duka Lako" />



    <View style={globalStyles.searchbarOtherPages}>

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
                    placeholder="Chagua huduma" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>

                  </View>



              <View style={globalStyles.bottomview}>
            



                <Text
                style={globalStyles.AppChaguaHudumaTextHomeScreen}  
                
                >Chagua Huduma</Text>


            {/*mwanzo wa Item View*/}
                <View 
                style={globalStyles.AppFlatListContainerHomeScreen} 
               
                >


                    <FlatList
                    data={DATA}
                    renderItem={transportItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}

                  />



              </View>

          {/*Mwisho wa item View*/}





               
                </View>







          </View>


          )}</>

          );
}

const styles = StyleSheet.create({
 
});