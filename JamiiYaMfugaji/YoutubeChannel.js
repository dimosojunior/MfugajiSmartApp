import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Linking,Alert,
  Dimensions,

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
import React, {useState,useCallback, useEffect, useContext} from 'react';

import Html from 'react-native-render-html';
import { FontAwesome} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function YoutubeChannel ({navigation, route}) {

   const { 
    
    CategoryName,
    id,
    JinaLaHuduma
   } = route.params


  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});




const {width, height} = Dimensions.get('window');
 


  const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Programu imeshindwa kufungua hii linki: ${url}`);
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


const htmlContent = ' <h1>This is the html document</h1> <img src="../assets/me.jpg" /> ';
const htmlContent2 = '<p style=\"text-align:center\"><span style=\"color:#fff\"><strong>SMART INVIGILATION SYSTEM</strong></span></p>\r\n\r\n<p>Examination cheating activities like face movement, head movements, hand movements, or hand contact are extensively involved, and the rectitude and worthiness of fair and unbiased examination are prohibited by such cheating activities. The aim of this project is to develop a model to supervise or control unethical activities in real-time examinations. Exam supervision is fallible due to limited human abilities and capacity to handle students in examination rooms, and these errors can be reduced with the help of the Smart Invigilation System.</p>\r\n\r\n<p>This work presents an automated system for exams invigilation using machine learning and computer vision approaches i.e., Dlib and Opencv . Dlib is an object detection algorithm that is implemented to detect the suspicious activities of students during examinations based on their face movements, and for starting capturing the video of students Opencv is used.</p>\r\n\r\n<p>The model is fully efficient in detecting and monitoring students in one frame during examinations. Different real-time scenarios are considered to evaluate the performance of the Automatic Invigilation System. The proposed invigilation model can be implemented in colleges, universities, and schools to detect and alert student suspicious activities. Hopefully, through the implementation of the proposed invigilation system, we can prevent and solve the problem of cheating because it is unethical.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/media/media/2023/04/10/3q.jpeg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><em>Click the link below to view more information about this project</em></p>'








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
  // const DATA = [
  //   {
  //     id: 1,
  //     name: "Bajeti Ya Chakula",
  //     backgroundColor:"#6BC5E8",
  //     imagesrc:im1
      
  //   },
  //   {
  //     id: 2,
  //     name: "Kumbusho La Shamba",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im2
  //   },

  //   {
  //     id: 3,
  //     name: "Kitabu Shamba",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im3
  //   },

  //   {
  //     id: 4,
  //     name: "Jamii Ya Mfugaji",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im4
  //   }


  // ];




//FOR SEARCHING
const [input, setInput] = useState('');

//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);




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
    // console.log(url);
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




  const handleScroll = (event) =>{
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const scrollEndY = layoutMeasurement.height + contentOffset.y
    const contetHeight = contentSize.height

    if (scrollEndY >= contetHeight - 50) {
      getItems()
    }
  }








  const TransportItem = ({item}) => {

    if (input === ""){

    return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerYoutubeChannel}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameYoutubeChannel}

                 >{item.JinaLaHuduma}</Text>

         <TouchableOpacity 
             onPress={() => {Linking.openURL(item.Youtube)}}>
     
               <View 
                style={globalStyles.AppItemImageContainerYoutubeChannel}
              >
              {item.Picha ? ( 
                  <Image

                  style={globalStyles.AppItemImageYoutubeChannel}
                   source={{
                      uri: EndPoint + '/' + item.Picha
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageYoutubeChannel}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>
               </TouchableOpacity>


                </View>
                <View>
                 
                </View>




<View>
  
      <View style={[globalStyles.menuWrapper, 
        {backgroundColor:COLORS.white}]}>
       
       
<Text style={{
  marginTop:50,
  fontFamily:'Medium',

}}>
  Unaweza kuwasiliana nasi kwenye mitandao ya kijamii kupitia njia zifuatazo
</Text>

{/*{item.Phone && (
        <TouchableOpacity 
        onPress={() => { Linking.openURL(`whatsapp://send?phone=${item.Phone}&text=${message}`)}}>
          <View style={[globalStyles.menuItem, 
            {backgroundColor:COLORS.white}]}>
            <FontAwesome name="whatsapp" color="green" size={25}/>
            <Text style={[globalStyles.menuItemText, 
              {}]}>Ukurasa Wa Whatsapp</Text>
          </View>
        </TouchableOpacity>)}*/}

 {item.WhatsappLink && (
        <TouchableOpacity onPress={() => {openUrl(item.WhatsappLink)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:COLORS.white}]}>
            <FontAwesome name="whatsapp" color="green" size={25}/>
            <Text style={[globalStyles.menuItemText,{}]}>Ukurasa wa Whatsapp</Text>
          </View>
        </TouchableOpacity>)}

 {item.FaceBook && (
        <TouchableOpacity onPress={() => {openUrl(item.FaceBook)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:COLORS.white}]}>
            <FontAwesome name="facebook" color="blue" size={25}/>
            <Text style={[globalStyles.menuItemText,{}]}>Ukurasa wa Facebook</Text>
          </View>
        </TouchableOpacity>)}

 {item.Instagram && (
        <TouchableOpacity onPress={() => {openUrl(item.Instagram)}}>
          <View style={[globalStyles.menuItem, {backgroundColor:COLORS.backgroundColor}]}>
            <FontAwesome name="instagram" color="red" size={25}/>
            <Text style={[globalStyles.menuItemText,{}]}>Ukurasa wa Instagram</Text>
          </View>
        </TouchableOpacity>)}




      </View>

</View>




              </View>
           </CustomCard>


           )




     // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if(item.FullName.toLowerCase().includes(input.toLowerCase())){



    return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerYoutubeChannel}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameYoutubeChannel}

                 >{item.JinaLaHuduma}</Text>

         <TouchableOpacity 
             onPress={() => {Linking.openURL(item.Youtube)}}>
     
               <View 
                style={globalStyles.AppItemImageContainerYoutubeChannel}
              >
              {item.Picha ? ( 
                  <Image

                  style={globalStyles.AppItemImageYoutubeChannel}
                   source={{
                      uri: EndPoint + '/' + item.Picha
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageYoutubeChannel}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>
               </TouchableOpacity>


                </View>
                <View>
                 
                </View>




<View>
  
      <View style={[globalStyles.menuWrapper, 
        {backgroundColor:COLORS.white}]}>
       
       
<Text style={{
  marginTop:50,
  fontFamily:'Medium',

}}>
  Unaweza kuwasiliana nasi kwenye mitandao ya kijamii kupitia njia zifuatazo
</Text>

{item.Phone && (
        <TouchableOpacity 
        onPress={() => { Linking.openURL(`whatsapp://send?phone=${item.Phone}&text=${message}`)}}>
          <View style={[globalStyles.menuItem, 
            {backgroundColor:COLORS.white}]}>
            <FontAwesome name="whatsapp" color="green" size={25}/>
            <Text style={[globalStyles.menuItemText, 
              {}]}>Ukurasa Wa Whatsapp</Text>
          </View>
        </TouchableOpacity>)}


{item.Phone && (
        <TouchableOpacity 
        onPress={() => { Linking.openURL(`whatsapp://send?phone=${item.Phone}&text=${message}`)}}>
          <View style={[globalStyles.menuItem, 
            {backgroundColor:COLORS.white}]}>
            <FontAwesome name="facebook" color="blue" size={25}/>
            <Text style={[globalStyles.menuItemText, 
              {}]}>Ukurasa Wa Facebook</Text>
          </View>
        </TouchableOpacity>)}


{item.Phone && (
        <TouchableOpacity 
        onPress={() => { Linking.openURL(`whatsapp://send?phone=${item.Phone}&text=${message}`)}}>
          <View style={[globalStyles.menuItem, 
            {backgroundColor:COLORS.white}]}>
            <FontAwesome name="instagram" color="#FF6347" size={25}/>
            <Text style={[globalStyles.menuItemText, 
              {}]}>Ukurasa Wa Instagram</Text>
          </View>
        </TouchableOpacity>)}

      </View>

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

           <MinorHeader title={JinaLaHuduma}/>

           <ScrollView
keyboardShouldPersistTaps="handled" 
// refreshControl={
//         <RefreshControl
//         refreshing={refresh}
//         onRefresh={() => pullMe()}
//         />
//        }
      showsVerticalScrollIndicator={false}
       
 onScroll={handleScroll} scrollEventThrottle={16}
      >




    

           <ImageBackground

                source={require('../assets/bc1.png')}
                style={{
                    flex: 1,
                    opacity:1,
                    height:height/4,
                }}
                resizeMode= "cover"
            >

              <View style={globalStyles.topviewYoutubeChannel}>
                  <View style={globalStyles.welcomecontainer}>
                     
                     <View
                      style={globalStyles.AppWelcomeMsgContainerYoutubeChannel} 
                     
                     >
                        <Text 
                         
                     
                        style={[
                          styles.welcomemessage,
                          
                          globalStyles.AppWelcomeHeaderTextHomeScreen ,
                          {
                            fontSize:25,
                          } 

                          
                        ]}
                        >
                      MFUGAJI SMART</Text>

                       <Text 
                         style={[
                          styles.welcomemessage,
                          
                          globalStyles.AppWelcomeHeaderText2HomeScreen,
                          {
                            fontSize:18,

                          }  

                          
                        ]} 
                     
                       >
                      Chaneli Ya Youtube
                      </Text>
                     </View>
                     
                  


                  </View>

                 {/* <Text style={{color:"black"}}> 
                  Where will you go</Text>*/}
                  

                


                  {/*mwisho wa topview*/}
              </View>
</ImageBackground>


              <View style={globalStyles.bottomview}>
            



                <Text
                style={[
                  globalStyles.AppChaguaHudumaTextYoutubeChannel,
                  {
                    fontFamily:'Medium',
                    width:'95%',
                    marginLeft:0,

                  }
                ]}  
                
                >
                Tazama videos zenye masomo yanayohusu ufugaji wa kuku kwa kubonyeza 
                picha hapo chini
                </Text>
              
              
            {/*mwanzo wa Item View*/}
                <View 
                style={globalStyles.AppFlatListContainerYoutubeChannel} 
               
                >

{ !isPending ? (
  <>
      
      { queryset && queryset.length > 0 ? (
        <>

         {setLoading===true?(<ActivityIndicator/>):(

             <>

          {queryset.map((item, index) => {
          return <TransportItem item={item} key={item.id || index} />;
          })}

          {isLoading&&(<ActivityIndicator/>)}
          </>
          )}


         </>



      ) : (
       

 <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>Hakuna huduma iliyopo kwasasa!! !
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
 </>

):(
<LotterViewScreen />


)} 
                </View>

          {/*Mwisho wa item View*/}





               
                </View>




</ScrollView>


          </View>


          )}</>

          );
}

const styles = StyleSheet.create({
 
});