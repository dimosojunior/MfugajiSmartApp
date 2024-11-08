import React, { useState, useEffect } from 'react';
import { View, Dimensions,ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { EndPoint } from '../Constant/links';//import { useNavigation } from '@react-navigation/native';
// Inside Test.js
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import COLORS from '../Constant/colors';


import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import {globalStyles} from '../Styles/GlobalStyles';

import Background from '../AccountScreens/PageStyling/Background';
import Btn from '../AccountScreens/PageStyling/Btn';
import { black } from '../AccountScreens/PageStyling/Constants';
import LoginField from '../AccountScreens/PageStyling/LoginField';
import LotterViewScreen from '../Screens/LotterViewScreen';

import PreloaderLotterView from '../Screens/PreloaderLotterView';

export default function PreLoaderScreen({ navigation }) {
  //const navigation = useNavigation();
  const [userToken, setUserToken] = useState('');
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [errorMessage404, setErrorMessage404] = useState(false);
  const [errorMessage401, setErrorMessage401] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const updateUserToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token || '');
      };

      updateUserToken();

      const unsubscribe = navigation.addListener('updateUserToken', updateUserToken);

      return unsubscribe;
    }, [navigation])
  );

  useEffect(() => {
    setTimeout(() => {
      checkLoggedIn();
    }, 1000);
  }, [userToken]);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      navigation.replace('Signup Stack');
    } else if (token !== null) { //else if (token !== null) {
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
        // navigation.navigate('Home Stack', { userData });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home Stack' }],
        });
      } catch (error) {
        setError(error);
        handleErrorMessage(error);
      }
    }
  };

  const handleErrorMessage = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code
      if (error.response.status === 401) {
        setErrorMessage('Uhakiki wa taarifa zako, umeshindikana.');
      } else if (error.response.status === 404) {
        setErrorMessage('Not Found: The requested resource was not found.');

      } else {
        setErrorMessage('Kuna tatizo wakati wa uchakataji wa taarifa zako.');
      }
    } else if (error.message === 'Network Error') {
      setErrorMessage('Tatizo la mtandao, washa data na ujaribu tena..');
    } else {
      setErrorMessage('An unexpected error occurred.');
    }
  };

  const { width, height } = Dimensions.get('window');

  if (errorMessage) {
    return (
      <ImageBackground

                source={require('../assets/bc1.png')}
                style={{
                    flex: 1,
                    opacity:1,
                }}
                resizeMode= "cover"
            >

      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMessage}</Text>

        <TouchableOpacity
          onPress={() => navigation.replace('Signup Stack')}
        >
          <Btn textColor='white' bgColor={black} btnLabel="Jaribu Tena" />
        </TouchableOpacity>
      </View>
      </ImageBackground>

    );
  }


  return (
     <ImageBackground

                source={require('../assets/p.jpg')}
                style={{
                    flex: 1,
                    opacity:1,
                    width:'100%',
                }}
                resizeMode= "contain"
            >

    <View style={styles.container}>


  

      {/*<PreloaderLotterView />*/}
        












    </View>
    </ImageBackground>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red', // Customize the button's style
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 30,
  },
});
