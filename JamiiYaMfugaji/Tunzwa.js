
import { StyleSheet,Linking,Alert,Pressable, ScrollView,Platform, TextInput,ActivityIndicator,Switch, Text,Animated, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';
import {globalStyles} from '../Styles/GlobalStyles';

import useFetch from '../useFetch';
import axios from 'axios';

// import HomeScreenCard from '../Shared/HomeScreenCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {MotiView} from 'moti';





// This import used to change color
import { EventRegister } from 'react-native-event-listeners';

import React, {useState,useCallback, useEffect, useContext} from 'react';


import { MaterialIcons } from '@expo/vector-icons';

import { Ionicons, FontAwesome} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MinorHeader from '../Header/MinorHeader';
//import HTMLView from 'react-native-htmlview';
import Html from 'react-native-render-html';
import { EndPoint } from "../Constant/links";
import {useFonts} from 'expo-font';
import COLORS  from '../Constant/colors';




export default function YoutubeChannel({  route, navigation  }) {



const { 
    
    CategoryName,
    id,
    JinaLaHuduma
   } = route.params


 const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };


let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});
  const url2 = "abcd://abcd.com";
// const StudentPhoneNumber = '+255628431507'
// const StudentEmail = "juniordimoso8@gmail.com"
// const Email = "juniordimoso8@gmail.com"

// const Phone = "0628431507"


  //FUNCTION YA KURUDI KWENY HOME PAGE
const {width, height} = Dimensions.get('window');
  const goBackPage = () =>{
    navigation.goBack();

  }


  const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this url: ${url}`);
        }
    }

const sendTextMessage = useCallback(async (phNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])

const message = "Mfugaji Smart!!"


//KWA AJILI YA KURENDER HTML
const renderersProps ={
  img:{
    enableExperimentalPercentWidth:true
  }
}


  // Utility function to format the date as "YYYY-MM-DD"
  const formatDate = (dateString) => {
    if (!dateString) {
      return null;
    }
    const [year, month, day] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };
const htmlContent = ' <h1>This is the html document</h1> <img src="../assets/me.jpg" /> ';
const htmlContent2 = '<p style=\"text-align:center\"><span style=\"color:#fff\"><strong>SMART INVIGILATION SYSTEM</strong></span></p>\r\n\r\n<p>Examination cheating activities like face movement, head movements, hand movements, or hand contact are extensively involved, and the rectitude and worthiness of fair and unbiased examination are prohibited by such cheating activities. The aim of this project is to develop a model to supervise or control unethical activities in real-time examinations. Exam supervision is fallible due to limited human abilities and capacity to handle students in examination rooms, and these errors can be reduced with the help of the Smart Invigilation System.</p>\r\n\r\n<p>This work presents an automated system for exams invigilation using machine learning and computer vision approaches i.e., Dlib and Opencv . Dlib is an object detection algorithm that is implemented to detect the suspicious activities of students during examinations based on their face movements, and for starting capturing the video of students Opencv is used.</p>\r\n\r\n<p>The model is fully efficient in detecting and monitoring students in one frame during examinations. Different real-time scenarios are considered to evaluate the performance of the Automatic Invigilation System. The proposed invigilation model can be implemented in colleges, universities, and schools to detect and alert student suspicious activities. Hopefully, through the implementation of the proposed invigilation system, we can prevent and solve the problem of cheating because it is unethical.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/media/media/2023/04/10/3q.jpeg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><em>Click the link below to view more information about this project</em></p>'







//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);


//FOR SEARCHING
const [input, setInput] = useState('');


const getItems = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetJamiiYaMfugajiContentsView/?id=${id}&page=${current_page}&page_size=2`
    console.log(url);
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
















const formatToThreeDigits = (number) => {
  if (number !== null) {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 0, // Ensure two decimal places
      maximumFractionDigits: 2, // Limit to two decimal places
      minimumIntegerDigits: 1, // Ensure at least one integer digit
    });
  }
  return null;
};




const UserCard = ({item, index}) => {
  
return (

<Pressable>

      <View style={[globalStyles.userInfoSection,
       {backgroundColor:COLORS.white}]}>
        <View style={[globalStyles.ImageAndTitleContainer, 
          {backgroundColor:COLORS.white}]}
          >

          <View style={globalStyles.ImageArticleContainer}
          >
          { item.Picha ? (
          <Image 
            
            source={{uri: EndPoint + '/' + item.Picha}}
            style={globalStyles.ArticleMainImage}
            //source={StudentImage}
            />

            ):(
             
              <Image 
          source={require('../assets/500.png')} 
          style={globalStyles.ArticleMainImage} 
           />
            )}

            </View>
          
          <View style={globalStyles.TitleArticleContainer}>
            <Text style={[globalStyles.ArticleMainTitleText,
             {color:COLORS.black}]}>{item.FullName}</Text>
           {/* <Text style={[globalStyles.caption, {color:theme.color}]}>{CategoryName}</Text>
         */}
          </View>
        </View>
      </View>




{ item.Description && (
      <View style={[globalStyles.infoBoxWrapper,
        {backgroundColor:COLORS.white}]}>
         <Text 
         style={[globalStyles.AboutArticleText,
          {color:COLORS.black}]}
         >
            Kuhusu Chaneli Yetu
         </Text>
         
         <Html 
contentWidth={400}
source={{html: item.Description}}
renderersProps={renderersProps}
tagsStyles={{
  
  p:{
    color:COLORS.black,
    // fontSize:16
    fontFamily:'Light',
    lineHeight:25,

  },
  
  a:{
    color:COLORS.black,
    textDecoration:'none',
    fontFamily:'Light',
  },
  h1:{
    color:COLORS.black,
    textAlign:'center',
    
    fontFamily:'Medium',
  },
   h2:{
    color:COLORS.black,
    textAlign:'center',
    fontFamily:'Medium',
  },
   h3:{
    color:COLORS.black,
    textAlign:'center',
    
    fontFamily:'Light',
  },
   h4:{
    color:COLORS.black,
    textAlign:'center',
    fontFamily:'Light',
  },
  // img:{
  //   width:150,
  //   height:150,
  // }
}}


/>
      </View>

)}














      <View style={[globalStyles.menuWrapper, 
        {backgroundColor:COLORS.white}]}>
       
       


 {item.Phone && (
        <TouchableOpacity 
        onPress={() => { Linking.openURL(`whatsapp://send?phone=${item.Phone}&text=${message}`)}}>
          <View style={[globalStyles.menuItem, 
            {backgroundColor:COLORS.white}]}>
            <FontAwesome name="whatsapp" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, 
              {color:COLORS.black}]}>Kundi La Whatsapp</Text>
          </View>
        </TouchableOpacity>)}

  



      </View>


</Pressable>

)
}





 
  return (

    <>{!fontsLoaded ? (<View/>):(

   
    <View style={[globalStyles.container, 
      {backgroundColor:COLORS.white}]}>
  
   
   <MinorHeader title={JinaLaHuduma}/>

   
  


      
      { queryset && queryset.length > 0 ? (
        <>

         {setLoading===true?(<ActivityIndicator/>):(
      <>

   
      <FlatList
          data={queryset}
          showsVerticalScrollIndicator={false}
         // style={{marginTop: 12, width: '100%'}}
          renderItem={UserCard}
          ListFooterComponent={renderLoader}
          onEndReached={getItems}
          onEndReachedThreshold={0.5}
        />
                
 </>
      )}

         </>



   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>Hakuna Chaneli yoyote ya Youtube kwasasa! !
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








    </View>

    )}</>
    
  );
}

const styles = StyleSheet.create({
 
});