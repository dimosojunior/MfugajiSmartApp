
import * as React from 'react';
import {useState, useEffect, useContext} from 'react';

import {createStackNavigator} from '@react-navigation/stack';


import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SigninScreen from '../AccountScreens/SigninScreen';
import SignupScreen from '../AccountScreens/SignupScreen';
import UpdateScreen from '../AccountScreens/UpdateScreen';
import PreLoaderScreen from '../Screens/PreLoaderScreen';
import AccountSelection from '../Screens/AccountSelection';

import SendOTPScreen from '../AccountScreens/SendOTPScreen';
import VerifyOTPScreen from '../AccountScreens/VerifyOTPScreen';


import WelcomeScreen from '../Screens/WelcomeScreen';
import SeraScreen from '../Screens/SeraScreen';

import HomeScreen from '../Screens/HomeScreen';
import MgawanyoWaHuduma from '../Components/MgawanyoWaHuduma';

//MATUMIZI YA CHAKULA
import AinaZaKuku from '../MatumiziYaChakula/AinaZaKuku';
import UmriWaKuku from '../MatumiziYaChakula/UmriWaKuku';
import IngizaSiku from '../MatumiziYaChakula/IngizaSiku';
import TaarifaZaKuku from '../MatumiziYaChakula/TaarifaZaKuku';
import TaarifaZaKukuPerKukuNamba from '../MatumiziYaChakula/TaarifaZaKukuPerKukuNamba';
import IngizaIdadiYaKuku from '../MatumiziYaChakula/IngizaIdadiYaKuku';

//KOKOTOA UWIANO
import Kokotoa_AinaZaKuku from '../Kokotoa/Kokotoa_AinaZaKuku';
import Kokotoa_UmriWaKuku from '../Kokotoa/Kokotoa_UmriWaKuku';
import VyakulaVyote from '../Kokotoa/VyakulaVyote';
import AllCartItems from '../Kokotoa/AllCartItems';
import AllOrders from '../Kokotoa/AllOrders';
import AllOrderedItems from '../Kokotoa/AllOrderedItems';
import IngizaKiasi from '../Kokotoa/IngizaKiasi';
import KukokotoaRipoti from '../Kokotoa/KukokotoaRipoti';



import MaktabaYaLisheHomeScreen from '../MaktabaYaLishe/MaktabaYaLisheHomeScreen';
import MakundiYaMaktabaYaLishe from '../MaktabaYaLishe/MakundiYaMaktabaYaLishe';
import ViewMakundiYaMaktabaYaLishe from '../MaktabaYaLishe/ViewMakundiYaMaktabaYaLishe';



import MuongozoWaLisheHomeScreen from '../MuongozoWaLishe/MuongozoWaLisheHomeScreen';
import ViewMuongozoWaLishe from '../MuongozoWaLishe/ViewMuongozoWaLishe';


import MatumiziYaIndibataHomeScreen from '../MatumiziYaIndibata/MatumiziYaIndibataHomeScreen';
import ViewMatumiziYaIndibata from '../MatumiziYaIndibata/ViewMatumiziYaIndibata';


import JamiiYaMfugajiHomeScreen from '../JamiiYaMfugaji/JamiiYaMfugajiHomeScreen';
import WafugajiWote from '../JamiiYaMfugaji/WafugajiWote';
import YoutubeChannel from '../JamiiYaMfugaji/YoutubeChannel';
import SokoHuruHomeScreen from '../JamiiYaMfugaji/SokoHuruHomeScreen';




import KusafishaBandaHomeScreen from '../KumbushoLaShamba/KusafishaBandaHomeScreen';
import KusafishaBandaForm from '../KumbushoLaShamba/KusafishaBandaForm';
import HistoriaZaKumbushoZaKusafishaBanda from '../KumbushoLaShamba/HistoriaZaKumbushoZaKusafishaBanda';
import RatibaYaChanjoForm from '../KumbushoLaShamba/RatibaYaChanjoForm';
import HistoriaZaKumbushoZaRatibaYaChanjo from '../KumbushoLaShamba/HistoriaZaKumbushoZaRatibaYaChanjo';
import KumbushoLaUatamiajiForm from '../KumbushoLaShamba/KumbushoLaUatamiajiForm';
import HistoriaZaKumbushoZaUatamiajiWaMayai from '../KumbushoLaShamba/HistoriaZaKumbushoZaUatamiajiWaMayai';
import Chanjo_UmriWaKuku from '../KumbushoLaShamba/Chanjo_UmriWaKuku';
import KumbushoLaUatamiaji_AinaZaNdege from '../KumbushoLaShamba/KumbushoLaUatamiaji_AinaZaNdege';
import AinaYaKuku_MabadilikoYaLishe from '../KumbushoLaShamba/AinaYaKuku_MabadilikoYaLishe';
import UmriWaKukuMabadilikoYaLishe from '../KumbushoLaShamba/UmriWaKukuMabadilikoYaLishe';
import MabadilikoYaLisheForm from '../KumbushoLaShamba/MabadilikoYaLisheForm';
import HistoriaZaKumbushoZaMabadilikoYaLishe from '../KumbushoLaShamba/HistoriaZaKumbushoZaMabadilikoYaLishe';


import DukaLakoForm from '../DukaLako/DukaLakoForm';
import DukaLakoHomeScreen from '../DukaLako/DukaLakoHomeScreen';
import GetAllDukaLakoItems from '../DukaLako/GetAllDukaLakoItems';
import ViewDukaLako from '../DukaLako/ViewDukaLako';
import YourPosts from '../DukaLako/YourPosts';
import UzaAuNunuaKukuKwaHaraka from '../DukaLako/UzaAuNunuaKukuKwaHaraka';
import SeeNotifications from '../DukaLako/SeeNotifications';
import ViewNotification from '../DukaLako/ViewNotification';
import DeletePostDukaLako from '../DukaLako/DeletePostDukaLako';
import EditPostDukaLako from '../DukaLako/EditPostDukaLako';


import AllChattingScreen from '../Chatting/AllChattingScreen';

import MyTab from '../Tab/MyTab';


const Stack = createStackNavigator();

function MyStack( {navigation}){

  // hii ni kwa ajili ya zile slide za mwanzo km mtu ameshaingia na akaziona
// basi akiingia kwa mara ya pili asizione tena
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  
  useEffect(() => {
    async function check(){

     const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    console.log(appData);
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    }else {
      setIsAppFirstLaunched(false);
    }



    }
    check()
   
  }, []);

// mwisho hap wa hizo codes za slides za mwanzo

 


  return (

  isAppFirstLaunched != null &&(
  //kama unatumia drawer navigator na stack navigator haina haja ya kus
  //sorround hii stack.navigator na NavigationContainer ila km unatumia
  //stack navigation peke yake basi tumia NavigationContainer

 //<NavigationContainer>
    <Stack.Navigator
    //initialRouteName="Home Stack"
      screenOptions={{
      	headerShown:false,
        headerStyle:{
          backgroundColor:"green",
           //height:100,

        },
        headerTintColor:"white",
        headerTitleStyle: {
              fontWeight: 'bold',
            },
      }}
      >






{isAppFirstLaunched && (
<Stack.Screen
      name="Welcome Screen"
      component={WelcomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
)}

{isAppFirstLaunched && (
      <Stack.Screen
      name="Sera Screen"
      component={SeraScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
      
)}

{/*<Stack.Screen
      name="Account Selection"
      component={AccountSelection}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />*/}
<Stack.Screen
      name="PreLoader Stack"
      component={PreLoaderScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


 <Stack.Screen
      name="Signin Stack"
      component={SigninScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

       <Stack.Screen
      name="Signup Stack"
      component={SignupScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

         <Stack.Screen
      name="Update Stack"
      component={UpdateScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


     <Stack.Screen
      name="Send OTP Screen"
      component={SendOTPScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

           <Stack.Screen
      name="Verify OTP Screen"
      component={VerifyOTPScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />





       <Stack.Screen
      name="Home Stack"
      component={MyTab}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

    <Stack.Screen
      name="Mgawanyo Wa Huduma"
      component={MgawanyoWaHuduma}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


      <Stack.Screen
      name="Aina Za Kuku"
      component={AinaZaKuku}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



    <Stack.Screen
      name="Umri Wa Kuku"
      component={UmriWaKuku}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

       <Stack.Screen
      name="Ingiza Siku"
      component={IngizaSiku}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


       <Stack.Screen
      name="Taarifa Za Kuku"
      component={TaarifaZaKuku}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

          <Stack.Screen
      name="Taarifa Za Kuku Per Kuku Namba"
      component={TaarifaZaKukuPerKukuNamba}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


           <Stack.Screen
      name="Ingiza Idadi Ya Kuku"
      component={IngizaIdadiYaKuku}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />





  <Stack.Screen
      name="Kokotoa Aina Za Kuku"
      component={Kokotoa_AinaZaKuku}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


    <Stack.Screen
      name="Kokotoa Umri Wa Kuku"
      component={Kokotoa_UmriWaKuku}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

       <Stack.Screen
      name="Vyakula Vyote"
      component={VyakulaVyote}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


         <Stack.Screen
      name="All Cart Items"
      component={AllCartItems}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



           <Stack.Screen
      name="All Orders"
      component={AllOrders}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


             <Stack.Screen
      name="All Ordered Items"
      component={AllOrderedItems}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

               <Stack.Screen
      name="Ingiza Kiasi"
      component={IngizaKiasi}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



               <Stack.Screen
      name="Kukokotoa Ripoti"
      component={KukokotoaRipoti}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />








               <Stack.Screen
      name="Maktaba Ya Lishe HomeScreen"
      component={MaktabaYaLisheHomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


           <Stack.Screen
      name="Makundi Ya Maktaba Ya Lishe"
      component={MakundiYaMaktabaYaLishe}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



           <Stack.Screen
      name="View Makundi Ya Maktaba Ya Lishe"
      component={ViewMakundiYaMaktabaYaLishe}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


      <Stack.Screen
      name="Muongozo Wa Lishe HomeScreen"
      component={MuongozoWaLisheHomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


      <Stack.Screen
      name="View Muongozo Wa Lishe"
      component={ViewMuongozoWaLishe}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



  <Stack.Screen
      name="Matumizi Ya Indibata HomeScreen"
      component={MatumiziYaIndibataHomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


       <Stack.Screen
      name="View Matumizi Ya Indibata"
      component={ViewMatumiziYaIndibata}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



         <Stack.Screen
      name="Jamii Ya Mfugaji HomeScreen"
      component={JamiiYaMfugajiHomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

           <Stack.Screen
      name="Wafugaji Wote"
      component={WafugajiWote}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



         <Stack.Screen
      name="Youtube Channel"
      component={YoutubeChannel}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


           <Stack.Screen
      name="Soko Huru HomeScreen"
      component={SokoHuruHomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



       <Stack.Screen
      name="Kusafisha Banda HomeScreen"
      component={KusafishaBandaHomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

        <Stack.Screen
      name="Kusafisha Banda Form"
      component={KusafishaBandaForm}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


          <Stack.Screen
      name="Historia Za Kumbusho Za Kusafisha Banda"
      component={HistoriaZaKumbushoZaKusafishaBanda}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



      <Stack.Screen
      name="Ratiba Ya Chanjo Form"
      component={RatibaYaChanjoForm}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

        <Stack.Screen
      name="Historia Za Kumbusho Za Ratiba Ya Chanjo"
      component={HistoriaZaKumbushoZaRatibaYaChanjo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



          <Stack.Screen
      name="Kumbusho La Uatamiaji Form"
      component={KumbushoLaUatamiajiForm}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
    
         <Stack.Screen
      name="Historia Za Kumbusho Za Uatamiaji Wa Mayai"
      component={HistoriaZaKumbushoZaUatamiajiWaMayai}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

           <Stack.Screen
      name="Chanjo Umri Wa Kuku"
      component={Chanjo_UmriWaKuku}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

           <Stack.Screen
      name="Kumbusho La Uatamiaji AinaZaNdege"
      component={KumbushoLaUatamiaji_AinaZaNdege}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

            <Stack.Screen
      name="Aina Ya Kuku MabadilikoYaLishe"
      component={AinaYaKuku_MabadilikoYaLishe}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

              <Stack.Screen
      name="Umri Wa Kuku MabadilikoYaLishe"
      component={UmriWaKukuMabadilikoYaLishe}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

                <Stack.Screen
      name="Mabadiliko Ya Lishe Form"
      component={MabadilikoYaLisheForm}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

                <Stack.Screen
      name="Historia Za Kumbusho Za Mabadiliko Ya Lishe"
      component={HistoriaZaKumbushoZaMabadilikoYaLishe}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
      

    
       <Stack.Screen
      name="Duka Lako Form"
      component={DukaLakoForm}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

        <Stack.Screen
      name="Duka Lako HomeScreen"
      component={DukaLakoHomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


          <Stack.Screen
      name="Get All Duka Lako Items"
      component={GetAllDukaLakoItems}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



          <Stack.Screen
      name="View Duka Lako"
      component={ViewDukaLako}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


              <Stack.Screen
      name="Your Posts"
      component={YourPosts}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

               <Stack.Screen
      name="Uza Au Nunua Kuku Kwa Haraka"
      component={UzaAuNunuaKukuKwaHaraka}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

               <Stack.Screen
      name="See Notifications"
      component={SeeNotifications}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

                  <Stack.Screen
      name="View Notification"
      component={ViewNotification}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

                     <Stack.Screen
      name="Edit Post DukaLako"
      component={EditPostDukaLako}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

                     <Stack.Screen
      name="Delete Post DukaLako"
      component={DeletePostDukaLako}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />









       <Stack.Screen
      name="All Chatting Screen"
      component={AllChattingScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


 
 


      </Stack.Navigator>
      //	</NavigationContainer>

      ) 
//bano la kufunga if is first launched


    );
  }
  export default MyStack;