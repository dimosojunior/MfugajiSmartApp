import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Alert, Linking, Text,SafeAreaView,Button,Platform, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import Test from './Screens/Test';

//import MyDrawer from './Drawer/drawer';
import MyTab from './Tab/MyTab';
import MyStack from './Stack/MyStack';

import { NavigationContainer } from '@react-navigation/native';

import React, { useState,useRef, useEffect } from 'react';
import { EndPoint } from './Constant/links';
//import * as Application from 'expo-application';
import AwesomeAlert from 'react-native-awesome-alerts';
//import registerNNPushToken, { getPushDataObject } from 'native-notify';
import * as Notifications from 'expo-notifications';
import * as RootNavigation from './RootNavigation';
import { navigationRef } from './RootNavigation'; // Create this file if needed

import * as Device from 'expo-device';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// async function sendPushNotificationHandler(expoPushToken){
//   const message = {
//   to: expoPushToken,
//   sound: 'default',
//   title: 'Karibu Mfugaji Smart!',
//   body: 'Asante kwa kujisajili. Tunakukaribisha kwenye Mfugaji Smart!',
//   data: { someData: 'goes here' }

//   };
//   await fetch('https://exp.host/--/api/v2/push/send', {

//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
  
// }




function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
   if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
 
 const projectId = '8c8e8cdf-bdf4-4df2-8993-1f7614db109d';
 if(!projectId) {
  handleRegistrationError('Project ID not found');
 }
 try {
    const pushTokenString = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    console.log('My New Push Token', pushTokenString);
    return pushTokenString;
 } catch (e) {
  handleRegistrationError(`${e}`);
 }


}else {
  handleRegistrationError('Must use physical device for push notification');
}



// hili ni bano la kufunga registerForPushNotificationsAsync function
}





export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
    .then((token) => setExpoPushToken(token ?? ""))
    .catch((error) => setExpoPushToken('${error}'));

    notificationListener.current = 
    Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = 
    Notifications.addNotificationResponseReceivedListener(
      (response)  => {
      console.log(response);
    });

    return () => {
      notificationListener.current && 
      Notifications.removeNotificationSubscription(
        notificationListener.current
        );
      Notifications.removeNotificationSubscription(
        responseListener.current
        );
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
    
    </View>
  );
}

