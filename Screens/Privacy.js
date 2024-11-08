

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
export default function Privacy() {

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
<MinorHeader title="Privacy"/>


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
        <Text style={[globalStyles.aboutSubHeader,{color:theme.color}]}> Amendments </Text>
        <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>
            This Privacy Policy may be amended by us at any time and without notice, but only by amending this policy as posted on this website. Any amendments will become effective 30 days after being posted on the website unless circumstances require that a change is immediately implemented.
        
         </Text>
      </View>



       <View style={[globalStyles.aboutLayout,{backgroundColor:theme.backgroundColor}]}>
        <Text style={[globalStyles.aboutSubHeader,{color:theme.color}]}> Analytics, Log Files and Reading History </Text>
        <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>
We gather certain information automatically and store it in log files. this information may include IP addresses, browser type, operating system and other useful information about the use of our Services, including  a history of the pages you view.  
         </Text>
      </View>


       <View style={[globalStyles.aboutLayout,{backgroundColor:theme.backgroundColor}]}>
        <Text style={[globalStyles.aboutSubHeader,{color:theme.color}]}> Cookies, Beacons,  Local  Storage, and Other Similar Technologies </Text>
        <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>
We use "cookies," Web beacons, HTML5 local storage, and other similar technologies. These technologies allow us to manage access to and use of the Services, recognize you and provide personalization, and help us understand how  people use our services. You may not be able to access certain areas of our websites.
         </Text>
      </View>




 <View style={[globalStyles.aboutLayout,{backgroundColor:theme.backgroundColor}]}>
        <Text style={[globalStyles.aboutSubHeader,{color:theme.color}]}>Third-Party Vendors </Text>
        <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>
In providing our products and services, we use various third-party vendors who may either directly or indirectly collect information from you, including, but not limited to, Facebook, Twitter, Google , and Microsoft. You should review the relevant privacy policies (for further information on how each third party handles your personal information. If you would like a list of all third-party vendors who we currently use, please request the "current third-party vendor list" by emailing us at D-Trader@gmail.com.
         </Text>
      </View>




 <View style={[globalStyles.aboutLayout,{backgroundColor:theme.backgroundColor}]}>
        <Text style={[globalStyles.aboutSubHeader,{color:theme.color}]}>Link To Other Websites </Text>
        <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>

This Privacy Policy does not address, and we are not responsible for, the privacy, information or other practices of any third parties, including any third-part site or service used in connection with our products and services. The inclusion of a link does not imply endorsement of the linked site  or service by us.
         </Text>
      </View>







 <View style={[globalStyles.aboutLayout,{backgroundColor:theme.backgroundColor}]}>
        <Text style={[globalStyles.aboutSubHeader,{color:theme.color}]}>Social Media Features </Text>
        <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>
Our products and services may use social media features provided by third parties, such as the Facebook Like button. These features may collect your IP address, which page you are visiting on our website, and may set cookie to enable the feature to function properly.
         </Text>
      </View>




<View style={[globalStyles.aboutLayout,{backgroundColor:theme.backgroundColor}]}>
        <Text style={[globalStyles.aboutSubHeader,{color:theme.color}]}>Security of Your Information </Text>
        <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>

The security of personal information is a high priority for us. We seek to use reasonable technical, administrative and  physical safeguards to protect Personal information within our organization. Unfortunately, no data transmission or storage system can be guaranteed to be 100% secure. You transmit and receive all such information at your own risk.
         </Text>
      </View>




<View style={[globalStyles.aboutLayout,{backgroundColor:theme.backgroundColor}]}>
        <Text style={[globalStyles.aboutSubHeader,{color:theme.color}]}>Data Retention </Text>
        <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>
We will retain your personal information for as long as needed or permitted in light of the purposes(s) for which it was obtained and consistent with applicable law.
         </Text>
      </View>






<View style={[globalStyles.aboutLayout,{backgroundColor:theme.backgroundColor}]}>
        <Text style={[globalStyles.aboutSubHeader,{color:theme.color}]}>Account Registration Information </Text>
        <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>

In some instances, use of the Clients on Demand Website and Services may require that you disclose certain personal information for identification, including a unique email address and demographic information (including, for example, ZIP code, age, phone number) to register.
         </Text>
      </View>





<View style={[globalStyles.aboutLayout,{backgroundColor:theme.backgroundColor}]}>
        <Text style={[globalStyles.aboutSubHeader,{color:theme.color}]}>Personal Identifiable Information that You Provide to Us</Text>
        <Text style={[globalStyles.paraStyle, globalStyles.aboutPara,{color:theme.color}]}>
.We do not collect personally identifiable information e.g., username, e-mail address, contact or similar information unless you choose to provide it to us. If you voluntarily provide us with personal information, for example by sending an e-mail or by filling out a form and submitting it through our Website, we may use that information only to respond to your message and to help us provide you with the information or services that you request.
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

