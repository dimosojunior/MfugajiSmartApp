

import { StyleSheet,Alert,Linking, Text,ScrollView, View, Button, Image,  TouchableOpacity} from 'react-native';
import {globalStyles} from '../Styles/GlobalStyles';
import Card from '../Shared/card';
import Header from '../Header/header';
import MinorHeader from '../Header/MinorHeader';
import { MaterialIcons} from '@expo/vector-icons';
import { Ionicons, FontAwesome} from '@expo/vector-icons';

// This import used to change color
import { EventRegister } from 'react-native-event-listeners';
import theme from '../theme/theme';
import themeContext from '../theme/themeContext';
import React, {useState, useEffect, useContext} from 'react';
import { useFonts } from 'expo-font'
//import AppLoading from "expo-app-loading";

// kila navigation tunayoicreate kwenye routes/homeStack.js huwa inakuwa na 
  // props by default ko tunaitumia hiyo ili kupata page zilizopo kule
export default function AboutUsScreen() {

  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


    // To change color
const theme = useContext(themeContext)
const [darkMode, setdarkMode] = useState(false)




const MyNumber = '+255628431507'
MyName = "Dimoso Junior"
const message = "Chat with Dimoso El junior!!"
const MyEmail = "juniordimoso8@gmail.com"
const MyGithub = "https://github.com/dimosojunior/"
const MyWhatsapp = "juniordimoso8@gmail.com"
const MyYoutube = "www.youtube.com"

const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this url: ${url}`);
        }
    }


 // if (!fontsLoaded) {
 //    <AppLoading />;
 //  }
 
  return (

    <>{!fontsLoaded ? (<View/>):(
  	

    <View style={[globalStyles.container,{backgroundColor:theme.backgroundColor}]}>
<MinorHeader title="About App"/>


    <ScrollView>

    <View style={[globalStyles.aboutContainer,{backgroundColor:theme.backgroundColor}]}>
    

      <Text style={[globalStyles.mainHeader,{color:theme.color}]}>Students Projects Share</Text>
      <Text style={[globalStyles.paraStyle,{color:theme.color},{
        color:'green',
        marginTop:20,
      }]}> Free Projects Share</Text>

      <View>
        <Image
          style={globalStyles.imgStyle}
          source={require('../assets/pp2.png')}
        />
      </View>

      <View style={[globalStyles.aboutLayout,{backgroundColor:theme.backgroundColor}]}>
        <Text style={[globalStyles.aboutSubHeader,{color:theme.color}]}> About App </Text>
        <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>
           This is an android and IOS mobile application designed to empower students, especially those in universities, and others interested in technology-related issues such as system development, mobile application development, graphics design, etc.
Within this application, users can learn and view projects from students across various universities in Tanzania.
Users can read various articles prepared by others relating to technology issues.
                 </Text>



          <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>

Also there's a section for experts in various fields, especially engineering fields, where users can view and even communicate with them if they need their services.
There will also be a section within this application that enables people to post their work and other information so that if a user of this application likes it, they can contact them.
                  </Text>
      </View>

      <Text style={[globalStyles.mainHeaderAboutUs,{color:theme.color}]}> Follow us on Social Network </Text>

      <View style={[globalStyles.menuContainer,{backgroundColor:theme.backgroundColor}]}>
        
        <TouchableOpacity
          style={globalStyles.buttonStyle}
          onPress={() =>
            Linking.openURL(`mailto:${MyEmail}?subject=Hello ${MyName}&body=${message}`)
          }>
        <MaterialIcons name='email' 
      size={35} color='red' style={globalStyles.iconStyle} />
        </TouchableOpacity>


        <TouchableOpacity
          style={globalStyles.buttonStyle}
          onPress={() =>
            openUrl(MyGithub)
          }>
          {/*<Image
            style={globalStyles.iconStyle}
            source={require('../assets/2q.jpeg')}
          />*/}

          <FontAwesome name='github' 
      size={35} color='blue' style={globalStyles.iconStyle} />
        </TouchableOpacity>


        <TouchableOpacity
          style={globalStyles.buttonStyle}
          onPress={() => {Linking.openURL(`whatsapp://send?phone=${MyNumber}&text=${message}`)}}>
        <FontAwesome name='whatsapp' 
      size={35} color='green' style={globalStyles.iconStyle} />
        </TouchableOpacity>


        <TouchableOpacity
          style={globalStyles.buttonStyle}
          onPress={() => {Linking.openURL(MyYoutube)}}>
        <FontAwesome name='youtube' 
      size={35} color='red' style={globalStyles.iconStyle} />
        </TouchableOpacity>





      </View>
    </View>

</ScrollView>









    </View>

 )}</>   
  );
}



const styles = StyleSheet.create({
 
});

