
import { StyleSheet,Dimensions, Switch,TouchableOpacity,ActivityIndicator, ScrollView, Text, View, Button, Image } from 'react-native';


import { EventRegister } from 'react-native-event-listeners';

import React, {useState, useEffect, useContext} from 'react';
import theme from '../theme/theme';
import themeContext from '../theme/themeContext';


import {globalStyles} from '../Styles/GlobalStyles';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFonts } from 'expo-font'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import LottieView from 'lottie-react-native';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import MinorHeader from '../Header/MinorHeader';

export default function AddScreen() {

    const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
      setSelectedImage(result.assets[0].uri); // Use assets array
      console.log(selectedImage)
      processImage(); // Use assets array
  };

 const  processImage = ()=>{
    console.log('Converted')
  }

  

    // To change color
const theme = useContext(themeContext)
const [darkMode, setdarkMode] = useState(false)


  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});

  const navigation = useNavigation();
  const {width, height} = Dimensions.get('window');
  
 
  return (
    
<>{!fontsLoaded ? (<View/>):(

    <View style={[globalStyles.container,{backgroundColor:theme.backgroundColor}]}>

<MinorHeader title="Upload" />

<ScrollView>

 {/* mwanzo wa card 1*/}
     <View style={globalStyles.itemView}>
           
            <View style={globalStyles.ImageListContainer}>
              <Image
               source={require('../assets/a1.jpeg')}
                //source = {item.CustomerImage}
                style={globalStyles.itemImage}
              /></View>

              <View style={globalStyles.nameView}>
                <Text style={[{color:theme.color},globalStyles.CustomernameText]}>
                New Project
                 </Text>
                
                  <TouchableOpacity

                  style={globalStyles.ClickableIconContainerOptions}
              onPress={() => navigation.navigate('Add New Project')}
              //onPress={removeCartItem}

               >
                <MaterialCommunityIcons 
                name="plus"
                 size={30} 
                 color="red"
                style={globalStyles.ClickableIcon}

                 />
                  
         </TouchableOpacity>
              </View>
              
              
             
            </View>
          {/* mwisho wa card 1*/}





{/* mwanzo wa card 2*/}
     <View style={globalStyles.itemView}>
           
            <View style={globalStyles.ImageListContainer}>
              <Image
               source={require('../assets/a3.jpeg')}
                //source = {item.CustomerImage}
                style={globalStyles.itemImage}
              /></View>

              <View style={globalStyles.nameView}>
                <Text style={[{color:theme.color},globalStyles.CustomernameText]}>
                New Article
                 </Text>
                
                  <TouchableOpacity

                  style={globalStyles.ClickableIconContainerOptions}
              onPress={() => navigation.navigate('Add New Article')}
              //onPress={removeCartItem}

               >
                <MaterialCommunityIcons 
                name="plus"
                 size={30} 
                 color="red"
                style={globalStyles.ClickableIcon}

                 />
                  
         </TouchableOpacity>
              </View>
              
              
             
            </View>
          {/* mwisho wa card 2*/}







{/* mwanzo wa card 3*/}
     <View style={globalStyles.itemView}>
           
            <View style={globalStyles.ImageListContainer}>
              <Image
               source={require('../assets/a2.jpeg')}
                //source = {item.CustomerImage}
                style={globalStyles.itemImage}
              /></View>

              <View style={globalStyles.nameView}>
                <Text style={[{color:theme.color},globalStyles.CustomernameText]}>
                New Expert
                 </Text>
                
                  <TouchableOpacity

                  style={globalStyles.ClickableIconContainerOptions}
              onPress={() => navigation.navigate('Add New Expert')}
              //onPress={removeCartItem}

               >
                <MaterialCommunityIcons 
                name="plus"
                 size={30} 
                 color="red"
                style={globalStyles.ClickableIcon}

                 />
                  
         </TouchableOpacity>
              </View>
              
              
             
            </View>
          {/* mwisho wa card 3*/}









{/* mwanzo wa card 4*/}
     <View style={globalStyles.itemView}>
           
            <View style={globalStyles.ImageListContainer}>
              <Image
               source={require('../assets/a4.png')}
                //source = {item.CustomerImage}
                style={globalStyles.itemImage}
              /></View>

              <View style={globalStyles.nameView}>
                <Text style={[{color:theme.color},globalStyles.CustomernameText]}>
                New Work
                 </Text>
                
                  <TouchableOpacity

                  style={globalStyles.ClickableIconContainerOptions}
              onPress={() => navigation.navigate('Add New Work')}
              //onPress={removeCartItem}

               >
                <MaterialCommunityIcons 
                name="plus"
                 size={30} 
                 color="red"
                style={globalStyles.ClickableIcon}

                 />
                  
         </TouchableOpacity>
              </View>
              
              
             
            </View>
          {/* mwisho wa card 4*/}











</ScrollView>

 </View>
)}</>

  );
}

const styles = StyleSheet.create({

  Profilecontainer:{
    // justifyContent:'center',
    // alignItems:'center',
     //flex:1,
     justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'wheat',
    zIndex:1,
  },


});