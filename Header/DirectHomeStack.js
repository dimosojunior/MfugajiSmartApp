
import { StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


// This import used to change color
import { EventRegister } from 'react-native-event-listeners';
// import theme from '../theme/theme';
// import themeContext from '../theme/themeContext';
import React, {useState, useEffect, useContext} from 'react';
import {globalStyles} from '../Styles/GlobalStyles';
import {useFonts} from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import COLORS  from '../Constant/colors';

export default function DirectHomeStack(  {title} ) {

    let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


  // To change color
// const theme = useContext(themeContext)
// const [darkMode, setdarkMode] = useState(false)


 const navigation = useNavigation();

  const goBackPage = () => {
    navigation.navigate("Home Stack");
    //navigation.goBack();
  }



  const [greeting, setGreeting] = useState('');

  // Function to get the current time and set the greeting based on the time
  const setGreetingBasedOnTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour <= 15) {
      setGreeting('Good Afternoon');
    } else if (currentHour > 15 && currentHour <= 18) {
      setGreeting('Good Evening');
    } else {
      setGreeting('Good Night');
    }

  };

  // Use useEffect to set the initial greeting and update it when needed
  useEffect(() => {
    setGreetingBasedOnTime();
  }, []);

  return (
  
<View style={globalStyles.headerHeaderFile}>
 

      <Ionicons name='arrow-back' 
      size={28} onPress={goBackPage} style={globalStyles.iconHeaderFile} />

        <Text style={globalStyles.headerTextHeaderFile1}>{title}</Text>
{/*<Image source={require('../assets/i2.jpg')} 
  style={globalStyles.headerImageHeaderFile} />*/}

  <FontAwesome 
   onPress={goBackPage}

   name='home' 
      size={28} 
      style={[globalStyles.iconHeaderFile,
        {
          marginRight:10,
          color:'green',
        }

        ]} 
      />


        </View>  
    
  );
}

const styles = StyleSheet.create({
  
     });

