
import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,
  ImageBackground,
   
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
import Checkbox from 'expo-checkbox'; // Make sure to install this package

const { width, height } = Dimensions.get('window');

const VyakulaVyote = ({navigation, route}) => {

  const { 

    StaterFeed,
   FinisherFeed,
   LayerFeed,
   GrowerFeed,
    AinaYaKuku,
    UmriKwaWiki,
   UmriKwaSiku,
   Interval,
  
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


    //IdadiYaKilos,
    
   KukuId,
   inputi,
    UmriwaKukuId //id ya umri wa kuku

   } = route.params

  // const UmriwaKukuId = id;
  // const UnaKiasiGaniChaChakula = IdadiYaKilos;
   const UnaKiasiGaniChaChakula = inputi;


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



useEffect(() => {
  const loadSelectedProductIds = async () => {
    const storedProductIds = await AsyncStorage.getItem('selectedProductIds');
    if (storedProductIds) {
      setSelectedProductIds(JSON.parse(storedProductIds));
    }
  };

  loadSelectedProductIds();
}, []);


//FOR SEARCHING
const [input, setInput] = useState('');

const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable


const [cart, setCart] = useState([]);
const [userToken, setUserToken] = useState('');
const [shouldReload, setShouldReload] = useState(false);
const [userData, setUserData] = useState({});

const [selectedProduct, setSelectedProduct] = useState(null);

const InitialQuantityValue = "1";
const quantity = "1";
//const [quantity, setQuantity] = useState(InitialQuantityValue);
// const [isPending, setPending] = useState(false);
const [selectedProductIds, setSelectedProductIds] = useState([]); // Array for selected product IDs

 const titles = [
    "Vyanzo vya Protini na Mafuta",
    "Vyanzo vya Wanga",
    "Vyanzo vya Madini na Vitamini",
    "Vihifadhi Vyakula na Vimeng'enya"
  ];




const [queryset, setQueryset] = useState([]);
  const [queryset2, setQueryset2] = useState([]);
  const [queryset3, setQueryset3] = useState([]);
  const [queryset4, setQueryset4] = useState([]);
  const [currentQueryset, setCurrentQueryset] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    loadQueryset(1);
  }, []);

  const loadQueryset = async (querysetNumber) => {
    if (endReached) return;

    setIsLoading(true);
    let url = '';

    switch (querysetNumber) {
      case 1:
        url = EndPoint + `/GetAllVyakulaView/?page=1&page_size=150`;
        break;
      case 2:
        url = EndPoint + `/GetAllVyakulaWangaView/?page=1&page_size=150`;
        break;
      case 3:
        url = EndPoint + `/GetAllVyakulaMadiniNaVitaminiView/?page=1&page_size=150`;
        break;
      case 4:
        url = EndPoint + `/GetAllVyakulaVimengenyaView/?page=1&page_size=150`;
        break;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      switch (querysetNumber) {
        case 1:
          setQueryset(data.queryset);
          break;
        case 2:
          setQueryset2(data.queryset2);
          break;
        case 3:
          setQueryset3(data.queryset3);
          break;
        case 4:
          setQueryset4(data.queryset4);
          break;
      }
      setIsLoading(false);

    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const renderProducts = () => {
    let dataToRender = [];
    switch (currentQueryset) {
      case 1:
        dataToRender = queryset;
        break;
      case 2:
        dataToRender = queryset2;
        break;
      case 3:
        dataToRender = queryset3;
        break;
      case 4:
        dataToRender = queryset4;
        break;
    }








 // const handleScroll = (event) =>{
 //    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
 //    const scrollEndY = layoutMeasurement.height + contentOffset.y
 //    const contetHeight = contentSize.height

 //    if (scrollEndY >= contetHeight - 50) {
 //      getItems()
 //      getItems2()
 //      getItems3()
 //      getItems4()
      
 //    }
 //  }














useEffect(() => {

   
    checkLoggedIn();
    // Fetch cart items only if the user is authenticated
    // if (userToken) {
    //   fetchCartItems();
    // }

  }, [userToken]);

const checkLoggedIn = async () => {
const token = await AsyncStorage.getItem('userToken');
setUserToken(token);
 
};


 const [isPending2, setPending2] = useState(false);


const addCartItem = async () => {
  if (!selectedProduct) {
    setPending2(false);
    
    //Alert.alert('Error', 'Please enter a quantity of product(s) you want to order');
    showAlertFunction("Tafadhali, chagua aina ya chakula ulichonacho");
    return;
  }

  // Check if the selected quantity is greater than available stock
  // if (parseInt(quantity) > ProductQuantity) {
  //   setPending(false);
  //   //Alert.alert('Error', 'Not enough quantity in stock');
  //   showAlertFunction("Not enough quantity in stock");
  //   return;
  // }

  setPending2(true);
//navigation.replace('View Products', { id }); 
  // Find the selected product's price
  const productPrice = selectedProduct.price;

  // Calculate the total price for the cart item
 // const itemPrice = productPrice * parseInt(quantity);
 const itemPrice = productPrice * parseInt(quantity);

  setModalVisible(false);
   setIsModalVisible(false);
   

  try {
    const response = await axios.post(

      EndPoint + '/VyakulaCart/',
      {
        product: selectedProduct.id,
        quantity: parseInt(quantity),


      },

      {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      }
    );
    

    
     
    // showAlertFunction("Umefanikiwa kuchagua chakula");

  
      // Ongeza ID ya bidhaa kwenye selectedProductIds
    //  const newSelectedProductIds = [...selectedProductIds, selectedProduct.id];
    // setSelectedProductIds(newSelectedProductIds);
    // await AsyncStorage.setItem('selectedProductIds', JSON.stringify(newSelectedProductIds));



      // Update the local cart items list with the new item
      const newItem = {
        id: response.data.id, // Use the 'id' from the response data
        product: selectedProduct,
        quantity: parseInt(quantity),
        price: itemPrice,
      };
      // const updatedCart = [...cart, newItem];
      // setCart(updatedCart);




      // Close the modal and reset the selected product and quantity
      // setModalVisible(false);
      setSelectedProduct(null);
      setPending2(false);
      //setQuantity(InitialQuantityValue);

     // Increment the displayedItemsCount
    //setDisplayedItemsCount((prevCount) => prevCount + 1);

   


   
  } catch (error) {
     setPending2(false);
     console.log("ERROR", error);
    //Alert.alert('Error', 'Failed to add item to cart');
     if (error.response && error.response.data && error.response.data.error) {
      showAlertFunction(error.response.data.error);
    } else {
      showAlertFunction("Imeshindikana kuchagua chakula");
    }
    
    
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
      // Item was successfully deleted
      const updatedCart = cart.filter((item) => item.id !== cartId);
      setCart(updatedCart);

      // Update selectedProductIds
      const updatedSelectedIds = selectedProductIds.filter((id) => id !== cartId);
      setSelectedProductIds(updatedSelectedIds);
      await AsyncStorage.setItem('selectedProductIds', JSON.stringify(updatedSelectedIds));

      setPending(false);
      showAlertFunction("Umefanikiwa kuondoa chakula kimoja");
    } else {
      setPending(false);
      showAlertFunction("Imeshindikana kuondoa chakula");
    }
  } catch (error) {
    console.log('ERROR', error.response || error.message);
    setPending(false);
    showAlertFunction("Imeshindikana kuondoa chakula");
  }
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


// const calculateTotalPrice = () => {
//   let total = 0;
//   cart.forEach((item) => {
//     total += item.price;
//   });
//   return total;
// };

// const totalCartPrice = calculateTotalPrice();







const CartCard = ({ item }) => {
  const isSelected = selectedProductIds.includes(item.id);


  const handleCheckBoxToggle = async () => {
    if (isSelected) {
      // If already selected, remove from selectedProductIds and the cart
      const updatedSelectedProductIds = selectedProductIds.filter(id => id !== item.id);
      setSelectedProductIds(updatedSelectedProductIds);
      await AsyncStorage.setItem('selectedProductIds', JSON.stringify(updatedSelectedProductIds));

      // Optionally: Implement logic to remove the item from the cart
      //await removeCartItem(item.id);
       
        navigation.navigate('All Cart Items', 
          { KukuId,UnaKiasiGaniChaChakula,
            selectedProductIds, 
            setSelectedProductIds,
             UmriwaKukuId,
            

             AinaYaKuku,  
             StaterFeed,
             GrowerFeed, 
             LayerFeed, 
             FinisherFeed,
             UmriKwaSiku,
             UmriKwaWiki,
             Interval,

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
       TotalMEPercentageRequired_Finisher
           })

    } else {

      setSelectedProduct(item); // Set the selected product
      setModalVisible(true);
      setIsModalVisible(true);
      const newSelectedProductIds = [...selectedProductIds, item.id];
      setSelectedProductIds(newSelectedProductIds);
      await AsyncStorage.setItem('selectedProductIds', JSON.stringify(newSelectedProductIds));
      //await addCartItem(); // Add the item to the cart
    }
  };

  if (input === "") {
    return (
      <Pressable style={[
        globalStyles.VyakulaCartItemsContainerKubwa,
        {
          //width:'90%',
        }

        ]}>
        { (item.product_name === "Mashudu ya alizeti" || item.product_name === "Pumba za mahindi") && (
           <Text style={[globalStyles.VyakulaItemNameCartItemsText,
           
         {
          //width:'70%',
          marginLeft:20,
          color:'red',
          fontSize:10,
         }

            ]}>
            lazima uchague
          </Text>
          )}
      
      <Pressable style={[
        globalStyles.VyakulaCartItemsContainer,
        {
          //width:'90%',
        }

        ]}>


        <View style={[
          globalStyles.VyakulaLeftCartItemsContainer,
          {
            flexDirection:'row',
            //justifyContent:'space-between',
            alignItems:'center',
           // backgroundColor:'red',
            width:'50%'
          }


        ]}>
          <Checkbox
            // onPress={() => {
            // setSelectedProduct(item);
            // setModalVisible(true);
            // setIsModalVisible(true); // Update state when modal opens
            // }}

          value={isSelected}
          onValueChange={handleCheckBoxToggle}

            // containerStyle={{
            //  padding: 0, margin: 0,
            //   backgroundColor: 'transparent' ,
            //  // width:'10%',
            // // height:200,

            // }}
            style={{
               marginRight: 10,
               height:30,
               width:30,
              // backgroundColor:'green',
                }}
          />
          <Text style={[globalStyles.VyakulaItemNameCartItemsText,
           
         {
          //width:'70%',
          marginLeft:20,
         }

            ]}>
            {item.product_name}
          </Text>

         
        </View>

        <Pressable style={[
          globalStyles.VyakulaImageContainerCartItems,
          {
           // backgroundColor:'green',
           width:'20%'
          }

          ]}>
          {item.ProductImage ? (
            <Image
              style={globalStyles.VyakulaImageCartItems}
              source={{ uri: EndPoint + '/' + item.ProductImage }}
            />
          ) : (
            <Image
              style={globalStyles.VyakulaImageCartItems}
              source={require('../assets/500.png')}
            />
          )}
        </Pressable>
      </Pressable>


      </Pressable>
    );
  }






if(item.product_name.toLowerCase().includes(input.toLowerCase())){






  return (
      <Pressable style={[
        globalStyles.VyakulaCartItemsContainerKubwa,
        {
          //width:'90%',
        }

        ]}>
        { (item.product_name === "Mashudu ya alizeti" || item.product_name === "Pumba za mahindi") && (
           <Text style={[globalStyles.VyakulaItemNameCartItemsText,
           
         {
          //width:'70%',
          marginLeft:20,
          color:'red',
          fontSize:10,
         }

            ]}>
            lazima uchague
          </Text>
          )}
      
      <Pressable style={[
        globalStyles.VyakulaCartItemsContainer,
        {
          //width:'90%',
        }

        ]}>


        <View style={[
          globalStyles.VyakulaLeftCartItemsContainer,
          {
            flexDirection:'row',
            //justifyContent:'space-between',
            alignItems:'center',
           // backgroundColor:'red',
            width:'50%'
          }


        ]}>
          <Checkbox
            // onPress={() => {
            // setSelectedProduct(item);
            // setModalVisible(true);
            // setIsModalVisible(true); // Update state when modal opens
            // }}

          value={isSelected}
          onValueChange={handleCheckBoxToggle}

            // containerStyle={{
            //  padding: 0, margin: 0,
            //   backgroundColor: 'transparent' ,
            //  // width:'10%',
            // // height:200,

            // }}
            style={{
               marginRight: 10,
               height:30,
               width:30,
              // backgroundColor:'green',
                }}
          />
          <Text style={[globalStyles.VyakulaItemNameCartItemsText,
           
         {
          //width:'70%',
          marginLeft:20,
         }

            ]}>
            {item.product_name}
          </Text>

         
        </View>

        <Pressable style={[
          globalStyles.VyakulaImageContainerCartItems,
          {
           // backgroundColor:'green',
           width:'20%'
          }

          ]}>
          {item.ProductImage ? (
            <Image
              style={globalStyles.VyakulaImageCartItems}
              source={{ uri: EndPoint + '/' + item.ProductImage }}
            />
          ) : (
            <Image
              style={globalStyles.VyakulaImageCartItems}
              source={require('../assets/500.png')}
            />
          )}
        </Pressable>
      </Pressable>


      </Pressable>
    );





  

// hili bano la chini ni la if ya pili mwisho
  }





}










  return (

    <>{!fontsLoaded ? (<View/>):(


    <>


 {/*{!isPending ? (*/}

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
         
     



  <MinorHeader title="Vyakula"/>

      





    <View style={globalStyles.searchbarOtherPages}>

                 <View style={globalStyles.searchbarIconContainerOtherPages}>
                    <Ionicons name="search-outline" 
                    size={25} 
                    color={COLORS.black} 

                    style={globalStyles.AppIConHomeScreenOtherPages}

                      />
                    </View>

                    <View style={globalStyles.searchbarInputContainerOtherPages}>
                    <TextInput 
                    value={input} onChangeText ={(text) => setInput(text)}
                    placeholder="Tafuta chakula" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>





 <Text
  style={globalStyles.AppChaguaHudumaTextHomeScreen}  
  
  >Chagua mchanganyiko wa vyakula vya kuku unavyotaka kutengeneza</Text>





<Text
  style={[globalStyles.AppChaguaHudumaTextHomeScreen,
    {
      color:'green',
    }

    ]}  
  
  >{titles[currentQueryset - 1]}</Text>


   {isPending2 && (
        <View style={styles.loaderContainer}>
        {/*<Text style={{
          color:'white',
          fontFamily:'Bold',
          textAlign:'center',
        }}>Subiria inachakata .....</Text>*/}
          <ActivityIndicator size="large" 
          color="green" 
          size = {100}
          />
        </View>
      )}


       <FlatList
          data={dataToRender}
           keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
         // style={{marginTop: 12, width: '100%'}}
          renderItem={CartCard}
          ListFooterComponent={renderLoader}
        onEndReached={handleScroll}
        onEndReachedThreshold={0.5}
        />















<View style={{
  marginBottom:15,
}}>
  
</View>




{/*mwanzo kwaajili ya kupress order*/}




{/*
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
          <View style={{
            width:'50%',
          }}>
            <Text style={{ 
              fontFamily:'Medium'
            }}>
              Mchanganuo wa vyakula ulivyovichagua
            </Text>
           
          </View>

          <TouchableOpacity
        //   onPress={() =>
        // navigation.navigate('All Cart Items', { KukuId, UmriwaKukuId,setSelectedProductIds, selectedProductIds })}
         onPress={() =>
        navigation.navigate('All Cart Items', 
          { KukuId,UnaKiasiGaniChaChakula,
            selectedProductIds, 
            setSelectedProductIds,
             UmriwaKukuId,

             AinaYaKuku,  
             StaterFeed,
             GrowerFeed, 
             LayerFeed, 
             FinisherFeed,
             UmriKwaWiki,
             UmriKwaSiku
           })}
       

           
            style={{
              
              padding: 10,
              width:'50%',
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
              Tazama
            </Text>
          </TouchableOpacity>
        </Pressable>
   

*/}







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
                    <Text style={[globalStyles.alertMessage,
                      {
                        color:'white',
                        fontFamily:'Bold',
                      }

                      ]}>
                    {alertMessage}</Text>
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
     
   
      
          <ImageBackground

                source={require('../assets/bc1.png')}
                style={{
                    flex: 1,
                    opacity:1,
                   // height:height/4,
                    alignItems: 'center',
                   // marginTop:height/4,
                    //marginHorizontal:7,
                    //width:'98%'
                    justifyContent:'center',
                }}
                resizeMode= "cover"
            >
    
    <View style={{
      borderWidth:1,
      borderColor:'white',
      padding:30,
      justifyContent:'center',
      alignItems:'center',
    }}>
           
          {selectedProduct &&
            <Text style={[globalStyles.ModalTitleViewProduct,
              {
                textAlign:'center',
                fontFamily:'Medium',
                color:'white',
                marginBottom:0,

              }
              ]}>
              
            
              Umechagua {selectedProduct.product_name}.
            
            
            </Text>}


                  


          
            

            <View style={[globalStyles.ButtonConatinerViewProduct,
              {
                marginTop:0,
                //backgroundColor:'red',
                flexDirection: 'row',
                marginTop: 20,
                alignItems:'space-around',
                flex:0,
              }

              ]}>
                   {/* <TouchableOpacity 
                    style={globalStyles.ButtonCloseViewProduct} 
                      onPress={() => {
    
                        setIsModalVisible(false); // Update state when modal opens
                        setModalVisible(false);
                      }}
                     >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Sitisha</Text>
                    </TouchableOpacity>*/}
                    <TouchableOpacity 
                    style={[globalStyles.ButtonAddViewProduct,
                      {
                            backgroundColor:'green',
                            borderWidth:1,
                            borderColor:'white',
                          }
                      ]}  
                    onPress={addCartItem} >
                        <Text 
                        style={[
                          globalStyles.ConfirmCancelButtonTextViewProduct,
                          {
                            //backgroundColor:'black'
                          }
                          ]}>Sawa</Text>
                    </TouchableOpacity>
           


          </View>


          </View>
           </ImageBackground> 
        
        
      
      </Modal>














     </View> 

{/*
            ):(

<LotterViewScreen />

)}

   */} 

    </>



    )}</>
  );
};


  const renderLoader = () => {
    return isLoading ? (
      <View style={globalStyles.loaderStyle}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : null;
  };

  const handleScroll = () => {
    loadQueryset(currentQueryset);
  };

  const handleQuerysetChange = (querysetNumber) => {
    setCurrentQueryset(querysetNumber);
    loadQueryset(querysetNumber);
  };





  return (
    <View style={globalStyles.container}>
      {renderProducts()}

{/*      <View style={styles.buttonsContainer}>
        {currentQueryset > 1 && (
          <Button
          color="green"
          title={titles[currentQueryset - 1]}
          // title={`See queryset${currentQueryset - 1} products`}

             // title={`Vyanzo vya wanga`}
            onPress={() => handleQuerysetChange(currentQueryset - 1)}
          />
        )}
        {currentQueryset < 4 && (
          <Button
          color="green"
          title={titles[currentQueryset + 1]}
          
            // title={`See queryset${currentQueryset + 1} products`}
            onPress={() => handleQuerysetChange(currentQueryset + 1)}
          />
        )}
      </View>*/}


<View style={styles.buttonsContainer}>
  {currentQueryset > 1 && (
    <Pressable 
      style={({ pressed }) => [
        styles.pressableButton1,
        { 
          opacity: pressed ? 0.5 : 1,
          flex: currentQueryset === 1 ? 1 : 0.45, // Cover full width if only one button
          // height: currentQueryset === 1 && 200,
          // textAlign: currentQueryset === 1 && 'center',
          // justifyContent: currentQueryset === 1 && 'center',
        }
      ]}
      onPress={() => handleQuerysetChange(currentQueryset - 1)}
    >
      <Text style={styles.pressableButtonText}>
        {titles[currentQueryset - 2]}
      </Text>
    </Pressable>
  )}
  {currentQueryset < 4 && (
    <Pressable 
      style={({ pressed }) => [
        styles.pressableButton2,
        { 
          opacity: pressed ? 0.5 : 1,
         // flex: currentQueryset === 4 ? 1 : 0.45, // Cover full width if only one button
           flex: currentQueryset === 4 ? 0.45 : 0.45, // Cover full width if only one button
        }
      ]}
      onPress={() => handleQuerysetChange(currentQueryset + 1)}
    >
      <Text style={styles.pressableButtonText}>
        {titles[currentQueryset]}
      </Text>
    </Pressable>
  )}


 {currentQueryset === 4 && (
          <Pressable
          style={({ pressed }) => [
        styles.pressableButton2,
        { 
          opacity: pressed ? 0.5 : 1,
          paddingVertical:30,
          backgroundColor:'green',
          flexDirection:'row',
          justifyContent:'space-between',
         // flex: currentQueryset === 4 ? 1 : 0.45, // Cover full width if only one button
           flex: currentQueryset === 4 ? 0.45 : 0.45, // Cover full width if only one button
              }
            ]}
            onPress={() => {
           navigation.navigate('All Cart Items', 
          { KukuId,UnaKiasiGaniChaChakula,
            selectedProductIds, 
            setSelectedProductIds,
             UmriwaKukuId,
            

             AinaYaKuku,  
             StaterFeed,
             GrowerFeed, 
             LayerFeed, 
             FinisherFeed,
             UmriKwaWiki,
             UmriKwaSiku,
             Interval,

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
       TotalMEPercentageRequired_Finisher
           })
       
            }}
            
          >
            <Text style={styles.buttonText}>
            Endelea</Text>
         <Ionicons name='arrow-forward-circle' 
      size={28}
      color='white'  
      
       />
          </Pressable>
        )}





</View>




    </View>
  );
};




export default VyakulaVyote;

const styles = StyleSheet.create({
 buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginVertical: 20,
    backgroundColor:'white',
  },
  pressableButton1: {
    backgroundColor: 'black',
    borderRadius: 10,
    //paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5, // Adds space between buttons
    flex: 1, // Ensures buttons cover full width if only one is present
    alignItems: 'center',
    height:height/8,
    textAlign:'center',
    justifyContent:'center',
    borderColor:'green',
    borderWidth:1,
  },
  pressableButton2: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5, // Adds space between buttons
    flex: 1, // Ensures buttons cover full width if only one is present
    alignItems: 'center',
    borderColor:'yellow',
    borderWidth:1,
  },
  pressableButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText:{
    color:'white',
    fontFamily:'Medium',
  },






  //---------SPINING---------
   contentText: {
    fontSize: 18,
    marginBottom: 20,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2,
  },

});
