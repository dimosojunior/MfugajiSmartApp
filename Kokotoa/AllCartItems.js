
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

 

const { width, height } = Dimensions.get('window');

const AllCartItems = ({navigation, route}) => {







  const { 
    selectedProductIds,  // Received from previous page
    setSelectedProductIds, // Received from previous page
    
   KukuId,
   UmriwaKukuId,
   UnaKiasiGaniChaChakula,

   TotalCPPercentageRequired_Starter,
   TotalWangaPercentageRequired_Starter,
   TotalMafutaPercentageRequired_Starter,

   TotalCPPercentageRequired_Grower,
   TotalWangaPercentageRequired_Grower,
   TotalMafutaPercentageRequired_Grower,

   TotalCPPercentageRequired_Layer,
   TotalWangaPercentageRequired_Layer,
   TotalMafutaPercentageRequired_Layer,

   TotalCPPercentageRequired_Finisher,
   TotalWangaPercentageRequired_Finisher,
   TotalMafutaPercentageRequired_Finisher,

   TotalMEPercentageRequired_Starter,
   TotalMEPercentageRequired_Grower,
   TotalMEPercentageRequired_Layer,
   TotalMEPercentageRequired_Finisher,



     StaterFeed,
   FinisherFeed,
   LayerFeed,
   GrowerFeed,
    AinaYaKuku,
    UmriKwaWiki,
   UmriKwaSiku,
   Interval,
  // setSelectedProductIds
    //id //id ya Chakula
   } = route.params

  //const ChakulaId = id;
  //const UnaKiasiGaniChaChakula = 100;



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





//FOR SEARCHING
const [input, setInput] = useState('');

const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable



const [totalPercentageRequired, setTotalPercentageRequired] = useState(0); // Ongeza state hii

const [cart, setCart] = useState([]);
const [userToken, setUserToken] = useState('');
const [shouldReload, setShouldReload] = useState(false);
const [userData, setUserData] = useState({});

const [selectedProduct, setSelectedProduct] = useState(null);
const [quantity, setQuantity] = useState('');
// const [isPending, setPending] = useState(false);

//Load more
const [queryset, setQueryset] = useState([]);

const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);


const goBackPage = () => {
    //navigation.navigate(screenName);
    navigation.goBack();
  }




useEffect(() => {

   
    checkLoggedIn();
    // Fetch cart items only if the user is authenticated
    if (userToken) {
      fetchCartItems();
    }

  }, [userToken]);

const checkLoggedIn = async () => {
const token = await AsyncStorage.getItem('userToken');
setUserToken(token);
 
};



const fetchCartItems = async () => {

  setPending(true);
  try {
    const response = await axios.get(
      EndPoint + '/VyakulaCart/',
      {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      }
    );

    // Check if the response data is an empty array (cart is empty)
    if (Array.isArray(response.data) && response.data.length === 0) {
      // Handle the case when the cart is empty here
      setPending(false);
      setCart([]); // Set cart to an empty array
    } else {
      // Cart is not empty, update the cart state with the data
      setPending(false);
      setCart(response.data);
       
      // Set isOrderButtonVisible to true after adding an item to the cart
     // Check if the displayedItemsCount is greater than 1 and show the order button
   
     // setIsOrderButtonVisible(true);

     //Hii tutaitumia wkt tunaweka order
      // Hesabu jumla ya TotalPercentageRequired na uhifadhi kwenye state
      let total = response.data.reduce((acc, item) => acc + item.product.TotalPercentageRequired, 0);
      setTotalPercentageRequired(total);
    


    }
  } catch (error) {
    //console.error('Error fetching cart items:', error);
    setPending(false);
    showAlertFunction("Kuna tatizo kwenye utafutaji wa vyakula ulivyovichagua");
  }
};












const removeCartItem = async (cartId) => {
  setPending(true);
  const apiUrl = `${EndPoint}/VyakulaDeleteCartItem/?cartId=${cartId}`;
  
  try {
    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Token ${userToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      setCart(cart.filter((item) => item.id !== cartId));

     


      
      setPending(false);
      showAlertFunction("Umefanikiwa kuondoa chakula kimoja");

      goBackPage();

    } else {
      setPending(false);
      showAlertFunction("Imeshindikana kuondoa chakula");
    }
  } catch (error) {
    setPending(false);
    showAlertFunction("Imeshindikana kuondoa chakula");
  }
};





 // const clearAllSelectedProducts = async () => {
 //    try {
 //      await AsyncStorage.clear();
 //      //Alert.alert("Success", "All selected products have been cleared.");
 //      // Optionally navigate back or refresh the current screen
 //     // navigation.goBack();
 //     console.log("ITEMS IS CLEARED");
 //    } catch (error) {
 //      console.error("Error clearing selected products: ", error);
 //      //Alert.alert("Error", "Failed to clear selected products.");
 //    }
 //  };









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


const calculateTotalPrice = () => {
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
  });
  return total;
};

const totalCartPrice = calculateTotalPrice();



const calculateTotalKilos = () => {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total;
};

const totalCartKilos = calculateTotalKilos();






const makeOrder = async () => {

 setPending(true);
  //navigation.replace('Restaurant Products');
  //call the print Receipt function
    // navigation.replace('Restaurant Products', { id });

  if (totalPercentageRequired < 100) {
    setPending(false);
    showAlertFunction("Vyakula ulivyovichagua havitoshi kutengeneza mchanganyiko sahihi wa chakula cha kuku, tafadhali ongeza vyakula vingine");
    return;
  }
 
  //setIsOrderButtonVisible(false);
  try {
    const response = await axios.post(
      EndPoint + `/VyakulaOrder/?TotalMEPercentageRequired_Starter=${TotalMEPercentageRequired_Starter}&TotalMEPercentageRequired_Grower=${TotalMEPercentageRequired_Grower}&TotalMEPercentageRequired_Layer=${TotalMEPercentageRequired_Layer}&TotalMEPercentageRequired_Finisher=${TotalMEPercentageRequired_Finisher}&TotalCPPercentageRequired_Finisher=${TotalCPPercentageRequired_Finisher}&TotalWangaPercentageRequired_Finisher=${TotalWangaPercentageRequired_Finisher}&TotalMafutaPercentageRequired_Finisher=${TotalMafutaPercentageRequired_Finisher}&TotalCPPercentageRequired_Layer=${TotalCPPercentageRequired_Layer}&TotalWangaPercentageRequired_Layer=${TotalWangaPercentageRequired_Layer}&TotalMafutaPercentageRequired_Layer=${TotalMafutaPercentageRequired_Layer}&TotalCPPercentageRequired_Grower=${TotalCPPercentageRequired_Grower}&TotalWangaPercentageRequired_Grower=${TotalWangaPercentageRequired_Grower}&TotalMafutaPercentageRequired_Grower=${TotalMafutaPercentageRequired_Grower}&TotalCPPercentageRequired_Starter=${TotalCPPercentageRequired_Starter}&TotalWangaPercentageRequired_Starter=${TotalWangaPercentageRequired_Starter}&TotalMafutaPercentageRequired_Starter=${TotalMafutaPercentageRequired_Starter}&UnaKiasiGaniChaChakula=${UnaKiasiGaniChaChakula}&AinaYaKuku=${AinaYaKuku}&StaterFeed=${StaterFeed}&GrowerFeed=${GrowerFeed}&LayerFeed=${LayerFeed}&FinisherFeed=${FinisherFeed}&UmriKwaWiki=${UmriKwaWiki}&Interval=${Interval}&UmriKwaSiku=${UmriKwaSiku}`,
      { 
        total_price: totalCartPrice,
        total_Kilos: totalCartKilos,
        //table: selectedTable, // Include the selected table
        // CustomerFullName: CustomerFullName,
        // PhoneNumber: PhoneNumber,
        // CustomerAddress: CustomerAddress,
        //room: selectedRoom,
        //Customer: selectedCustomer,
         },

      {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      }
    );
    
   
  //setModalVisibleMakeOrder(false);
    // Clear the cart items from the local state
    setCart([]);
    //setSelectedProductIds([]);
    await AsyncStorage.removeItem('selectedProductIds'); // Futa selectedIds baada ya oda kufanikiwa
    

    // Set isOrderPlaced to true to hide the "Make Order" button and total price text
     // Set isOrderButtonVisible to false after placing the order
    
    //print();
     //printToFile();

    // After a successful order, update your UI or show a confirmation message
    setPending(false);
    //Alert.alert('Success', 'Order placed successfully!');
    showAlertFunction("Hongera!, taarifa zako zimekusanywa kikamilifu");


    // Optionally, you can navigate to a screen to display the PDF or HTML table.
    // For example, you can set a state variable to control the visibility of a modal.
    //setModalVisibleReceipt(true);


  } catch (error) {
    setPending(false);
    console.log("ERROR", error);
    if (error.response && error.response.data && error.response.data.error) {
      showAlertFunction(error.response.data.error);
    } else {
      showAlertFunction("Imeshindikana kukusanya taarifa zako");
    }
  }
};








const CartCard = ({item, index}) => {
  


 return (



      <Pressable
      style={[
        globalStyles.VyakulaCartItemsContainerHistoria,
        
      ]} >

{/*OverdoseCartItemsContainer*/}
        <View 
        style={globalStyles.VyakulaLeftCartItemsContainer}
        >

         {cart && item.product && item.product.product_name && ( 
          <Text 
           style={globalStyles.VyakulaItemNameCartItemsText}
         >
            {item.product.product_name}
          </Text>)}


      

       {item && item.product.FoodGroup && item.product.FoodGroup.Jina && item.product.FoodGroup.Jina && (
          <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
       Kundi la chakula:  <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {item.product.FoodGroup.Jina}
            </Text> 
          </Text>
          )}
          

{/*
  {item && item.product.TotalPercentageRequired_Starter  && (
          <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
       Asilimia za Starter:  <Text style={{
              color:'green',
              fontFamily:'Bold'
            }}>
             {item.product.TotalPercentageRequired_Starter}
            </Text> 
          </Text>
          )}*/}
          

         
          
          
        

       {/*mwanzo wa button*/}
          <TouchableOpacity
            onPress={() => removeCartItem(item.id)}
           //onPress={goBackPage}
            style={[
              globalStyles.VyakulaAddButtonContainerCartItems,
              {
                //width:'100%',
              }
              ]}
                 >
              <Text
               style={[
                globalStyles.VyakulaAddButtonTextCartItems,
                {
                  backgroundColor:'brown',
                 // width:'100%',
                }
              ]}
            
              >
                Ondoa
              </Text>
            </TouchableOpacity>
             {/*mwisho wa button*/}
          
        </View>



        <Pressable 

        style={globalStyles.VyakulaImageContainerCartItems}
        >
        {/* <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Bei Ya jumla: Tsh. {formatToThreeDigits(item.price)}/=
          </Text>
*/}
        {cart && item.product && item.product.ProductImage ?  
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


 {!isPending ? (

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
         
     



  <MinorHeader title="Vyakula Vyako"/>

      





<ScrollView>









{cart && cart.length > 0 && (
 <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Mchanganuo wa vyakula ulivyovichagua</Text>

)}
  
   {cart && cart.length > 0 ? (


      <>
      {cart.map((item, index) => {
        return <CartCard item={item} key={item.id || index} />;
      })}
         </>        




   ) :(
   <View style={[globalStyles.noitemTextContainer,
    {backgroundColor:COLORS.white,
      marginTop:0,
      paddingTop:0,

    }]}>
 {/* <Text style={globalStyles.noitemText}>hujachagua chakula chochote kwa sasa! !
  </Text>
*/}

  <View style={globalStyles.ErrorImageContainerHomePage}>
      <Image 
          source={require('../assets/p.jpg')}  
           style={[globalStyles.ErrorImageHomePage,
            {
              height:height,
              width:width,
              borderRadius:0,
            }

            ]}
          
          //source={item.ArticleImage} 
          //resizeMode='contain'
          contentContainerStyle={{ padding: 0 }}
          
          />
  </View>




</View>

  )} 



{cart && cart.length > 0 && (

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
              Kiasi cha chakula unachohitaji kutengeneza
            </Text>

            {/* <Text style={{ 
              fontFamily:'Medium'
            }}>
             Tsh. {formatToThreeDigits(totalCartPrice)}/=
            </Text>*/}
           
          </View>

         

          <View style={{
            width:'30%',
          }}>
            <Text style={{ 
              fontFamily:'Medium'
            }}>
              {/*Kiasi Cha jumla*/}
            </Text>

             <Text style={{ 
              fontFamily:'Medium',
              color:'green',
            }}>
             {UnaKiasiGaniChaChakula} Kg
            </Text>
           
          </View>

        </Pressable>
   
 )}


</ScrollView>



<View style={{
  marginBottom:100,
}}>
  <Text style={{
    color:'white',
  }}>Vuta juu</Text>
</View>


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

          {totalCartPrice > 0 ? (

          <TouchableOpacity
         onPress={makeOrder}
           
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
              Kusanya
            </Text>
          </TouchableOpacity>












          ):(

        <TouchableOpacity
         //onPress={makeOrder}
              onPress={() =>
        navigation.navigate('All Orders', { 
          KukuId, 
          UmriwaKukuId, 
          totalCartKilos, 
          totalCartPrice, 

           AinaYaKuku,  
           StaterFeed,
           GrowerFeed, 
           LayerFeed, 
           FinisherFeed,
           UmriKwaWiki,
           UmriKwaSiku,
           Interval,
           UnaKiasiGaniChaChakula
        })

      }


       
           
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
              Tazama matokeo
            </Text>
          </TouchableOpacity>

          )}
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
                        value={quantity}
                  onChangeText={text => setQuantity(text)}
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

export default AllCartItems;

const styles = StyleSheet.create({});
