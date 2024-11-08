
import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,
  
   
  KeyboardAvoidingView 
   } from 'react-native';
import React, {useState,useRef, useEffect, useContext} from 'react';

import {globalStyles} from '../Styles/GlobalStyles';

import { EndPoint } from "../Constant/links";
import useFetch from '../useFetch';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import LotterViewScreen from '../Screens/LotterViewScreen';
import Header from '../Header/header';
import MinorHeader from '../Header/MinorHeader';

// import theme from '../theme/theme';
// import themeContext from '../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

import COLORS  from '../Constant/colors';
import { useFocusEffect } from '@react-navigation/native';
// import { getFormatedDate } from "react-native-modern-datepicker";
// import DatePicker from "react-native-modern-datepicker";
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const KukokotoaRipoti = ({navigation, route}) => {

  const { 

   
   //  UmriKwaWiki,
   // 
   // total_price,
   //  total_Kilos,

    
   // KukuId,
   // UmriwaKukuId,
   // totalCartKilos,
   // totalCartPrice,
   id,//id ya order
    
    StaterFeed,
   FinisherFeed,
   LayerFeed,
   GrowerFeed,
    AinaYaKuku,
    UmriKwaSiku,
    UmriKwaWiki,
    Interval,
    

    TotalFoodMixerPercentage,
    TotalFoodAmount,
    UnaKiasiGaniChaChakula,

    //hizi zintoka kwenye model ya VyakulaOrder
    TotalCPPercentageRequired,
     TotalWangaPercentageRequired,
     TotalMafutaPercentageRequired,
     TotalMEPercentageRequired,

     TotalConstantFoodMixerPercentage,
     TotalMixerKios_ForConstantFoodGroups

   } = route.params

  //const ChakulaId = id;



    // To change color
// const theme = useContext(themeContext)
// const [darkMode, setdarkMode] = useState(false)
 
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







 const [modalVisible, setModalVisible] = useState(false);
 const [isModalVisible, setIsModalVisible] = useState(false); // New state variable

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [queryset, setQueryset] = useState([]);
  const [mainTotalPrice, setMainTotalPrice] = useState(null);
  const [refresh, setRefresh] = useState(false);

//const [isPending, setisPending] = useState(false);
const [isRange, setisRange] = useState(false);

const [calculatedItems, setCalculatedItems] = useState([]);


//Load more
 // const [queryset, setOrders] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
//const [isPending, setPending] = useState(true);
const [isPending, setisPending] = useState(false);
const [userData, setUserData] = useState({});

  

 const pullMe =() => {
    setRefresh(true)

    setTimeout (() => {
      setRefresh(false)
    }, 10)
  }


 const [userToken, setUserToken] = useState('');

//UPDATE USER TOKEN
useFocusEffect(
    React.useCallback(() => {
      const updateUserToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token || '');
      };

      updateUserToken();

      // Listen for the 'updateUserToken' event
      const unsubscribe = navigation.addListener('updateUserToken', updateUserToken);

      // Cleanup the listener when the component unmounts
      return unsubscribe;
    }, [navigation])
  );






useEffect(() => {

   
    checkLoggedIn();
    // Fetch cart items only if the user is authenticated
    if (userToken) {
     setLoading(true)
     //getProducts();;
    }

  }, [userToken]);


 useEffect(() => {
    fetchUserData();
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const parsedUserData = JSON.parse(userDataJSON);
        setUserData(parsedUserData);
        
        //console.log("USERDATA ARE");
        //console.log(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };



const checkLoggedIn = async () => {
  const token = await AsyncStorage.getItem('userToken');
  setUserToken(token);
  
  
 
};



const [TotalCPValue, setTotalCPValue] = useState(0);
const [TotalWangaValue, setTotalWangaValue] = useState(0);
const [TotalMafutaValue, setTotalMafutaValue] = useState(0);
const [TotalDCPValue, setTotalDCPValue] = useState(0);
const [TotalPREMIXValue, setTotalPREMIXValue] = useState(0);
const [TotalLysinValue, setTotalLysinValue] = useState(0);
const [TotalMETHValue, setTotalMETHValue] = useState(0);
const [TotalTryptophanValue, setTotalTryptophanValue] = useState(0);
const [TotalUngaWaMifupaValue, setTotalUngaWaMifupaValue] = useState(0);
const [TotalChumviValue, setTotalChumviValue] = useState(0);
const [TotalMEValue, setTotalMEValue] = useState(0);

 useEffect(() => {
    // Make a GET request to fetch queryset and main total price
   
 axios.get(`${EndPoint}/GetAllVyakulaOrderItemsView/?id=${id}&TotalMixerKios_ForConstantFoodGroups=${TotalMixerKios_ForConstantFoodGroups}&TotalConstantFoodMixerPercentage=${TotalConstantFoodMixerPercentage}&TotalMEPercentageRequired=${TotalMEPercentageRequired}&TotalCPPercentageRequired=${TotalCPPercentageRequired}&TotalWangaPercentageRequired=${TotalWangaPercentageRequired}&TotalMafutaPercentageRequired=${TotalMafutaPercentageRequired}&UmriKwaWiki=${UmriKwaWiki}&Interval=${Interval}&AinaYaKuku=${AinaYaKuku}&StaterFeed=${StaterFeed}&GrowerFeed=${GrowerFeed}&LayerFeed=${LayerFeed}&FinisherFeed=${FinisherFeed}&UmriKwaSiku=${UmriKwaSiku}&TotalFoodAmount=${TotalFoodAmount}&TotalFoodMixerPercentage=${TotalFoodMixerPercentage}&UnaKiasiGaniChaChakula=${UnaKiasiGaniChaChakula}`)
 
    //axios.get(`${EndPoint}/GetAllVyakulaOrderItemsView/?id=${id}&TotalFoodMixerPercentage=${TotalFoodMixerPercentage}&TotalFoodAmount=${TotalFoodAmount}`)




      .then((response) => {
        const { 
          queryset,
          calculated_items, 
          main_total_price,
          TotalCP,
          TotalWanga,
          TotalMafuta,
          TotalDCP,
          TotalPREMIX,
          TotalLysin,
          TotalMETH,
          TotalTryptophan,
          TotalUngaWaMifupa,
          TotalChumvi,
           TotalME, 
        } = response.data;
        setQueryset(queryset);
        setCalculatedItems(calculated_items);

        setTotalCPValue(TotalCP);
        setTotalWangaValue(TotalWanga);
        setTotalMafutaValue(TotalMafuta);
        setTotalDCPValue(TotalDCP);
        setTotalPREMIXValue(TotalPREMIX);
        setTotalLysinValue(TotalLysin);
        setTotalMETHValue(TotalMETH);
        setTotalTryptophanValue(TotalTryptophan);
        setTotalUngaWaMifupaValue(TotalUngaWaMifupa);
        setTotalChumviValue(TotalChumvi);
        setTotalMEValue(TotalME);

        setisPending(true);
         setisRange(false);
        setMainTotalPrice(main_total_price);
        
        
      })
      .catch((error) => {
       
        
        setisPending(true);
      });
  }, []);







  // Utility function to format the date as "YYYY-MM-DD"
  const formatDate = (dateString) => {
    if (!dateString) {
      return null;
    }
    const [year, month, day] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };



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



 //calculate total kilos per week based on the number of kuku 
const TotalCPPercentageRequired_value = TotalCPPercentageRequired ? (TotalCPPercentageRequired / 100) * TotalFoodAmount : 0;
const TotalCPPercentageRequired_Displayed = TotalCPPercentageRequired_value;


 //calculate total kilos per week based on the number of kuku 
const TotalMafutaPercentageRequired_value = TotalMafutaPercentageRequired ? (TotalMafutaPercentageRequired / 100) * TotalFoodAmount : 0;
const TotalMafutaPercentageRequired_Displayed = TotalMafutaPercentageRequired_value;




const TotalVyakulaCard = () => {
  




 return (

   <View style={globalStyles.TaarifaMainContainerLaZote}>

  
  
      <TouchableOpacity
       // onPress={() =>
       //  navigation.navigate('Taarifa Za Kuku', item)}
       
     
      
      style={globalStyles.TaarifaOverdoseCartItemsContainer} >


  







{/*mwanzo wa mgawanyo wa chakula kwa siku ulizozichagua*/}

{TotalCPValue >= 1 &&  (
   <View style={{
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10,
   }}>


   <Text style={{
    width:'30%',
    color:'green',
    fontFamily:'Medium',
   }}>
   Virutubisho
     
   </Text>

    <Text style={{
    width:'30%',
    color:'green',
    fontFamily:'Medium',
   }}>
   Vilivyopo
     
   </Text>

    <Text style={{
    width:'30%',
    color:'green',
    fontFamily:'Medium',
   }}>
   Vilivyohitajika
     
   </Text>

     
</View>
)}


{/*mwanzo wa mstari*/}
 <View style={{
  borderBottomColor:'green',
  borderBottomWidth:1,
  marginTop:0,
  marginBottom:10,
 }}>
   {/*<Text>
     
   </Text>*/}
 </View>
{/*mwiso wa mstari*/}


{/*mwzanzo wa kirutubisho*/}

{TotalCPValue >= 1 &&  (
   <View style={{
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
   }}>


   <Text style={{
    width:'30%',
    color:'black',
    fontFamily:'Light',
   }}>
   Protini
     
   </Text>

    <Text style={{
    width:'30%',
    color:'black',
    fontFamily:'Light',
   }}>
    {TotalCPValue.toFixed(1)} Kg 
     
   </Text>

    <Text style={{
    width:'30%',
    color:'black',
    fontFamily:'Light',
   }}>
   
     {TotalCPPercentageRequired_Displayed.toFixed(1)} Kg
   </Text>

     
</View>
)}
{/*mwisho wa kirutubisho*/}







{/*mwzanzo wa kirutubisho*/}

{TotalMafutaValue >= 1 &&  (
   <View style={{
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
   }}>


   <Text style={{
    width:'30%',
    color:'black',
    fontFamily:'Light',
   }}>
   Mafuta
     
   </Text>

    <Text style={{
    width:'30%',
    color:'black',
    fontFamily:'Light',
   }}>
    {TotalMafutaValue.toFixed(1)} Kg 
     
   </Text>

    <Text style={{
    width:'30%',
    color:'black',
    fontFamily:'Light',
   }}>
   
     {TotalMafutaPercentageRequired_Displayed.toFixed(1)} Kg
   </Text>

     
</View>
)}
{/*mwisho wa kirutubisho*/}







{/*mwzanzo wa kirutubisho*/}

{TotalMEValue >= 1 &&  (
   <View style={{
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
   }}>


   <Text style={{
    width:'30%',
    color:'black',
    fontFamily:'Light',
   }}>
   Nishati
     
   </Text>

    <Text style={{
    width:'30%',
    color:'green',
    fontFamily:'Light',
   }}>
    {TotalMEValue.toFixed(1)} Kcal/kg 
     
   </Text>

    <Text style={{
    width:'30%',
    color:'green',
    fontFamily:'Light',
   }}>
   
     {TotalMEPercentageRequired} Kcal/kg
   </Text>

     
</View>
)}
{/*mwisho wa kirutubisho*/}









      </TouchableOpacity>

</View>




)
}



const ReportCard = ({item,calculatedItem , index}) => {
  


 return (




      <Pressable
      style={[
        globalStyles.VyakulaCartItemsContainer,
        {
          display:'none',
        }
        
      ]} >

{/*OverdoseCartItemsContainer*/}
        <View 
        style={globalStyles.VyakulaLeftCartItemsContainer}
        >

         {item.product.product_name && (
          <Text 
           style={globalStyles.VyakulaItemNameCartItemsText}
         >
            {item.product.product_name}
          </Text>)}

         


          <Text 
          style={[globalStyles.VyakulaPriceCartItemsText,
            {
              fontFamily:'Bold',
            }

            ]}
        >
          
            Kiasi cha chakula unachotakiwa kuchanganya: <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {calculatedItem.Amount_For_Each_Product.toFixed(1)} Kg
            </Text>  
            
          </Text>


          {item && item.product && item.product.FoodGroup && item.product.FoodGroup.Jina && (
          <Text 
           style={globalStyles.VyakulaItemNameCartItemsText}
         >
           Kundi la chakula : <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {item.product.FoodGroup.Jina}
            </Text>  
          </Text>)}




      {/*     <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Asilimia za chakula kwenye mchanganyiko wa chakula: <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {calculatedItem.NewPercentage.toFixed(1)}%
            </Text>  
            
          </Text>*/}
          


     {/* <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            CP: {TotalCPValue.toFixed(1)}
            
          </Text>*/}
          
         
          
          
        

       {/*mwanzo wa button*/}
         {/* <TouchableOpacity
               onPress={() =>
        navigation.navigate('All Ordered Items', { KukuId, UmriwaKukuId, totalCartKilos, totalCartPrice })}
       
           style={globalStyles.VyakulaAddButtonContainerCartItems}
                 >
              <Text
               style={[
                globalStyles.VyakulaAddButtonTextCartItems,
                {
                  backgroundColor:'brown',
                }
              ]}
            
              >
                Matokeo
              </Text>
            </TouchableOpacity>*/}
             {/*mwisho wa button*/}
          
        </View>



        <Pressable 

        style={globalStyles.VyakulaImageContainerCartItems}
        >
       {/*  <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Bei Ya Jumla:  Tsh. <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {formatToThreeDigits(item.price)}/=
            </Text> 
          </Text>*/}

        {item && item.product && item.product.ProductImage ?  
          <Image
           style={globalStyles.VyakulaImageCartItems}
        source={{
          uri: EndPoint + '/' + item.product.ProductImage
        }}
          />:

           <Image
           style={globalStyles.VyakulaImageCartItems}
        
            source={require('../assets/500.png')} 
          />}



 

        </Pressable>
      </Pressable>

)







}
  









  return (

    <>{!fontsLoaded ? (<View/>):(


    <>


 {isPending ? (

     <View style={[
      globalStyles.container
     ,
         { 
          backgroundColor: isModalVisible ? 
          COLORS.black : COLORS.white,

           opacity: isModalVisible ? 
          0.1 : 1
           }
     ]}>
         
     



  <MinorHeader title="Ripoti"/>

      


<ScrollView>








{/* <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Mchanganuo wa vyakula vyako ulivyovichagua na kiasi 
unachotakiwa kuweka</Text>

*/}

{/*

        <Pressable
          style={[{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "white",
            // position:'absolute',
            // bottom:0,
            width:'100%',

          },
           
          ]}
        >
          <View style={{
            width:'60%',
          }}>
            <Text style={{ 
              fontFamily:'Medium'
            }}>
            Jumla ya kiasi cha chakula
            </Text>

           
           
          </View>

         

          <View style={{
            width:'30%',
          }}>
          

             <Text style={{ 
              fontFamily:'Medium',
              color:'green',
            }}>
             {TotalFoodAmount} Kg
            </Text>
           
          </View>

        </Pressable>
   
 
*/}


  
     {queryset && queryset.length > 0 ? (


      <>
                {queryset.map((item, index) => {
                  const calculatedItem = calculatedItems[index];
                  return (
                    <ReportCard
                      item={item}
                      calculatedItem={calculatedItem}
                      key={item.id || index}
                    />
                  );
                })}





<Text
    style={globalStyles.AppChaguaHudumaTextHomeScreen}  
    
    >Mchanganuo wa virutubisho na kiasi chake kinachoweza 
    kupatikana kwenye mchanganyiko wa chakula cha kilo {TotalFoodAmount} kwa {AinaYaKuku}  umri kuanzia siku {Interval}.

     </Text>
    


<TotalVyakulaCard />






              </>       











   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>hujachagua chakula chochote kwa sasa! !
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






{/*<Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Maoni</Text>
*/}


<View style={{
  marginBottom:100,
}}>
  <Text style={{
    color:'white',
  }}>Vuta juu</Text>
</View>






</ScrollView>







{/*mwanzo kwaajili ya kupress order*/}





        <Pressable
          style={[{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "white",
            position:'absolute',
            bottom:0,
            width:'100%',

          },
           
          ]}
        >
        {/*  <View style={{
            width:'50%',
          }}>
            <Text style={{ 
              fontFamily:'Medium'
            }}>
              Bei ya jumla
            </Text>

             <Text style={{ 
              fontFamily:'Medium'
            }}>
              Tsh. {formatToThreeDigits(totalCartPrice)}/=
            </Text>
           
          </View>*/}

         

          <TouchableOpacity
        onPress ={() => navigation.navigate('Home Stack')}
           
            style={{
              
              padding: 10,
              width:'100%',
              borderRadius: 6,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            
            <Text style={{
             //fontSize: 16, 
             //fontWeight: "500", 
             color: "white" ,
            // padding:13,
             backgroundColor: "green",
             borderColor:'white',
             borderWidth:1,
             textAlign:'center',
             borderRadius:8,
             width:'100%',
             fontFamily:'Light',
             paddingVertical:10,

           }}>
              Rudi Mwanzo
            </Text>
          </TouchableOpacity>
          

        </Pressable>
   









     <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="Vyakula Stores"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="green"
                onConfirmPressed={hideAlert}
                 confirmButtonStyle={globalStyles.alertButton}
                contentContainerStyle={globalStyles.alertContainer}
                customView={
                  <View style={globalStyles.alertContent}>
                    <Image source={require('../assets/i2.jpg')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>Mfugaji Smart</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />










{/*MODAL FOR MAKING ORDER*/}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsModalVisible(false); // Reset state when modal closes
        }}
      >
    
    <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1,marginTop:height/4,
         justifyContent: 'center', alignItems: 'center',
          //backgroundColor: 'red' 
        }}>
          <View style={globalStyles.ModalViewViewProduct}>
            <Text style={globalStyles.ModalTitleViewProduct}>
            Ingiza kiasi cha chakula ulichonacho</Text>

                    <Text 
                    style={globalStyles.EnterQuntityTextViewProduct}
                    > Kiasi (Kwa Kilo)</Text>
                    < View style={globalStyles.inputViewProduct}>
                        <FontAwesome style={globalStyles.InputIconViewProduct} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputViewProduct}  
                        placeholder=' Kiasi' 
                  //       value={quantity}
                  // onChangeText={text => setQuantity(text)}
                  keyboardType="numeric"
                  placeholderTextColor="black"
                        />
                    </View>
                



          
            

            <View style={globalStyles.ButtonConatinerViewProduct}>
                    <TouchableOpacity 
                    style={globalStyles.ButtonCloseViewProduct} 
                      onPress={() => {
    
                        setIsModalVisible(false); // Update state when modal opens
                        setModalVisible(false);
                      }}
                     >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Funga</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={globalStyles.ButtonAddViewProduct}  
                   // onPress={addCartItem}
                     >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Kubali</Text>
                    </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
        
      </Modal>














     </View> 


            ):(

<LotterViewScreen />

)}

    

    </>



    )}</>
  );
};

export default KukokotoaRipoti;

const styles = StyleSheet.create({});
