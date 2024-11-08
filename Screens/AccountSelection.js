import { Image, StyleSheet,ScrollView,Dimensions,ImageBackground, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import {useFonts} from 'expo-font';

const {height, width} = Dimensions.get('window');
const Test = ({navigation}) => {

    let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});



 // const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Signin Stack");
  };

  const handleSignup = () => {
    navigation.navigate("Signup Stack");
  };
  return (

     <>{!fontsLoaded ? (<View/>):(



    <View style={styles.container}>

     <ImageBackground

                source={require('../assets/bc1.png')}
                style={{
                    flex: 1,
                    opacity:1,

                }}
                resizeMode= "cover"
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
       
 
      >


      {/*<Image 
      source={require("../assets/i2.jpg")} 
      style={styles.logo} />*/}
      <View style={{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        opacity:.5
      }}>
      {/*<Image 
      source={require("../assets/i2.jpg")} 
      style={styles.bannerImage} />*/}

      </View>


      <Text style={styles.title}>Mfugaji Smart App</Text>
      <View style={styles.subTitle1Container}>
      <Text style={styles.subTitle}>
       Mfugaji Smart ni programu ambayo inatumika na wafugaji pamoja na 
       wafanyabiashara wote wanaohusika 
       na ufugaji wa wanyama, ndege, au uuzaji wa vyakula, vyombo vya ufugaji, 
       na maeneo ya mifugo. Programu inajumuisha vipengele kama vile;
      </Text>
       </View>

      <View style={styles.subTitle2Container}>
        <Text style={styles.subTitle2}>
      1. Kukokotoa uwiano sahihi wa viungo vya kuchanganya kwenye vyakula vya kuku
       </Text>

      <Text style={styles.subTitle2}>
      2. Hesabu za matumizi ya chakula kwa muda Fulani
       </Text>

        <Text style={styles.subTitle2}>
      3. kumbusho la mabadiliko ya lishe, kumbusho la chanjo, kumbusho la usafishaji wa banda 
na kumbusho la muda wa kuatamiwa mayai kwenye incubator au kuku (ndege)
mwenyewe.
       </Text>

        <Text style={styles.subTitle2}>
      4. Elimu ya ufugaji wa kuku kwa kuweka vitabu vitakavyokuwa  na masomo yahusuyo lishe, 
matumizi ya incubator Pamoja na kuzijua aina za uzao wa kuku na malengo yake 
kibiashara

       </Text>


         <Text style={styles.subTitle2}>
      5. Programu hii itawaunganisha watumiaji wake na ukurasa wake wa youtube uitwao Mfugaji 
Smart App Youtube Channel pamoja na kuwaunganisha wauzaji wa bidhaa za mifugo na wanunuzi.

       </Text>


      </View>




      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButtonWrapper,
            { backgroundColor: 'green' },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Ingia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButtonWrapper]}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Jisajili</Text>
        </TouchableOpacity>
      </View>







</ScrollView>


</ImageBackground>
    </View>
    )}</>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems: "center",
    justifyContent:'center',
  },
  subTitle1Container:{
    alignItems: "center",
    justifyContent:'center',

  },

  subTitle2Container:{
    marginHorizontal:20,

  },
  subTitle2:{
    fontFamily:"Light",
    color:'white',

  },
  logo: {
    height: 40,
    width: 140,
    marginVertical: 30,
  },
  bannerImage: {
    marginVertical: 20,
    height: height/3+ 20,
    width: '80%',
    borderRadius:10,

  },
  title: {
    fontSize: 20,
    fontFamily: 'SemiBold',
    paddingHorizontal: 20,
    textAlign: "center",
    color: 'green',
    marginTop: 20,
  },
  subTitle: {
    //fontSize: 16,
    paddingHorizontal: 20,
    //textAlign: "center",
    color: 'white',
    fontFamily: 'Medium',
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: 'green',
    width: "88%",
    height: 50,
    borderRadius: 50,
    justifyContent:'center',
    //alignItems:'center',
    marginHorizontal:20,
    marginBottom:20,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 98,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SemiBold',
  },
  signupButtonText: {
    fontSize: 18,
    fontFamily: 'SemiBold',
    color:'white',
  },
});
