import React from 'react';
import { StyleSheet, Text,Dimensions, View, Button,Platform } from 'react-native';




const {height, width} = Dimensions.get('window');

const marginBottomItem = 10;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;
import COLORS  from '../Constant/colors';

 
const GlobalStyles =() => {



  return(

    <View>
      <Text>Gloal Styles</Text>
    </View>
    );


}
export default GlobalStyles;


export const globalStyles = StyleSheet.create({

//    ---------------------- ALL HOMESCREEN STYLES------------------------------------------
    
container: {
    flex:1,
    //backgroundColor:'red',
    width:'100%'
  },


SignupImageJuu:{

  width:'100%',
  height:height/2 - 50,
  borderRadius:8,
  opacity:1,

},
UmriInitialImage:{

  width:'100%',
  height:height/2,
  borderRadius:8,
  opacity:1,

},

tuambieSiku:{
  fontFamily:'Medium',
  marginLeft:20,
  width:'90%',
  marginTop:15,
  marginBottom:15,
  color:'white',

},

ImagePosterColor:{
  backgroundColor: '#233329',

},

SenderProfileImage:{
  width:'50%',
  height:height/14,
  borderRadius:40,

},

//-----------------AWERESOME  ALERT----------------------

alertContainer:{
  backgroundColor:'#233329',
  borderWidth:1,
  borderColor:'white',
  alignItems:'center',
  justifyContent:'center',

},
alertContent:{
  alignItems:'center',
  justifyContent:'center',

},

alertImage:{
  width:60,
  height:60,
  borderRadius:30,
  marginTop:0,

},
alertTitle:{
  //fontSize:25,
  fontFamily:'Medium',
  color:'green',

},
alertMessage:{
  //fontSize:16,
  fontFamily:'Light',
  color:'white',
  fontFamily:'Medium',

},
alertButton:{
  width:width/4,
  textAlign:'center',
  alignItems:'center',
  justifyContent:'center',
  height:50,
  //fontSize:18,
  backgroundColor:'#1f1f1f',
  borderWidth:1,
  borderColor:'white',
  marginBottom:15,
  fontFamily:'Light',


},


 bottomview2:{
    //flex:2,
    backgroundColor:COLORS.white,
    // borderTopLeftRadius:50,
    // borderTopRightRadius:50,

    borderWidth:.2,
    borderColor:COLORS.green,
    elevation: 3,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
    shadowOpacity: 1,
    shadowRadius: 2,
    padding:10,
  },
  



  //---------------------MODAL STYLE-----------------

  ModalView: {
    padding: 2,
    paddingHorizontal:20,
    // width: 340,
    width:'90%',
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 3,
    shadowColor: Platform.OS === "android" ? 'white' : "Lightgrey",
    shadowOpacity: 1,
    paddingBottom:30,
    marginTop:10,

  },
  ButtonClose: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "red",
    borderRadius: 5,

  },
  TaxTypeAddNewProject:{
    color:'white',
    fontFamily:"Medium",

  },


ProjectBodyinput:{
  //width: Dimensions.get('window').width,
  //flexDirection: "row",
    width: '90%',
    height: 200,
    borderColor: "white",
    borderWidth: 1,
    //alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    //justifyContent:'flex-start',
    marginHorizontal:20,



},

ProjectBodyInputIcon:{
  marginLeft: 10,

    color: 'white',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 80,
    //backgroundColor: 'red',
    //height:180,
    //paddingVertical:20,
    //justifyContent:'center',
    //alignItems:'center',
    
    borderRadius: 10,
    // justifyContent:'flex-start',


},





  ButtonAdd: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "green",
    borderRadius: 5,


  },
  ButtonScan: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 5,

  },
  ButtonBarcode: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    //  backgroundColor:"green",
    borderRadius: 5,
    borderWidth: 1,

  }, ButtonConatiner: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: "space-between"
  },
  input: {
    flexDirection: "row",
    width: 300,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },
  inputTax: {
    flexDirection: "row",
    width: '90%',
    height: 50,
    marginHorizontal:20,
    backgroundColor: 'green',
    // borderColor:"black",
    // borderWidth:1,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  picker: {
    width: "60%",
    height: 48,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  pickerInput: {
   // top: -7
  },

  textInput: {
    // fontSize: 20
     
    marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'white',
    
    borderRadius: 10,
  },
  form: {
   // marginTop: 10,
    alignItems: 'center'
  },
  Inputicon: {
    fontSize: 29,
    marginRight: 10

  },
  TaxType: {
     fontFamily:'Light',
    color: "white",
    fontWeight: '400'
  },
  open: {
    width: 200,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,

  },


  ButtonAddText: {
    color: 'white',
     fontFamily:'Light',
  },



  



  //-----------------------HEADER.JS------------------


    headerHeaderFile: {
    //width:Dimensions.get('window').width,     
    width: '100%',
    // height: 60,
    paddingVertical: 10,
    flexDirection: 'row',
   //backgroundColor: '#233329',
    // borderBottomWidth: 1,
    // borderBottomColor: 'black',
    // borderTopWidth: 1,
    // borderTopColor: 'black',
    // borderLeftWidth: 1,
    // borderLeftColor: 'black',
    // borderRightWidth: 1,
    // borderRightColor: 'black',

   // paddingTop: Dimensions.get("window").height * 0.04,

    // alignItems: 'flex-start',
    marginLeft: 0,
    paddingLeft: 0,
    backgroundColor: 'white',  //"#2B3856",
    //marginBottom: 8,

    justifyContent: 'space-between',
    elevation: 0,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? 'green' : "green",
    shadowOpacity: 1,
    shadowRadius: 2,
    marginHorizontal: 0,
    marginVertical: 0,
    paddingHorizontal: 0,
    alignItems:'center',
    borderBottomColor:'green',
    borderBottomWidth:.5,

    //paddingVertical:15,




  },
    headerTextHeaderFile: {
      //fontWeight: 'bold',
      //fontSize: 18,
      fontFamily:'Medium',
      color: 'white',
      letterSpacing: 1,

      // flex:1,
      alignItems:"center",
      marginTop:10,
      // fontFamily:'SerifRegular',

      
    },
    iconHeaderFile: {
      position: 'relative',
      marginLeft:10,
      
      //flex:1,
      
      fontWeight:'bold',
      marginTop:5,

      fontSize:30,
      

    },

    headerImageHeaderFile:{
      width:40,
      height:40,
      // marginHorizontal:10,
      marginTop:10,
      borderRadius:20,
      marginRight:10,
      marginBottom:0
    },

 headerTextHeaderFile1:{
    fontFamily:'Medium',
     // fontFamily:'Light',
    // color: 'white',
    letterSpacing: 1,

    // flex:1,
    alignItems: "center",
    marginTop: 10,
    // fontFamily:'SerifRegular',

  },




noitemTextContainer:{
  justifyContent:'center',
  alignItems:'center',
  marginTop:50,


},

noitemText:{
  textAlign:'center',
  color:'red',
  fontFamily:'Medium'


},


ErrorImageContainer:{
  justifyContent:'center',
  alignItems:'center',
  width:'90%',
  marginTop:20,

},
ErrorImage:{
  width:'60%',
  height:height/2,
  borderRadius:10,

},

ErrorImageContainerHomePage:{
  justifyContent:'center',
  alignItems:'center',
  width:'90%',
  marginTop:10,

},
ErrorImageHomePage:{
  width:'100%',
  height:height/2,
  borderRadius:30,

},








AppItemContainerHomeScreen:{
   //flexDirection:"row",
 // overflow:"hidden",
  //justifyContent:"space-between",
  padding:15,
  backgroundColor:COLORS.white,
  marginHorizontal:0,
  marginBottom:10,
  borderRadius:10,
  //borderColor:COLORS.green,
  borderWidth:0,
   elevation: 3,

shadowOffset: { width: 1, height: 1 },
shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
shadowOpacity: 1,
shadowRadius: 2,
padding:10,
width:'100%',

},


AppItemNameHomeScreen:{
  color:COLORS.black,
  fontFamily:'Medium',
  //fontWeight:"bold",
  //fontSize:18,

},

AppItemImageContainerHomeScreen:{
  width:'100%',
  //flex:1,
   //backgroundColor:'red',
   marginTop:8,

},

AppItemImageHomeScreen:{
   //position:"absolute",
  width:'100%',
  //height:150,
  height:height/4,
  borderRadius:10,
},

AppItemButtonHomeScreen:{
   width:'50%',
    //padding:5,
   // borderRadius:6,
    marginTop:20,
    // flexDirection:'row',
    // justifyContent:'space-between',

},
LeftBtnContainer:{
  //width:'50%',

},
RightBtnContainer:{
  //width:'30%',
  alignItems:'center',
  justifyContent:'space-between',
  flexDirection:'row',

},
AppItemButtonTextHomeScreen:{
   backgroundColor:COLORS.green,
  textAlign:"center",
  //fontWeight:"bold",
  fontFamily:'Light',
  color:COLORS.white,
  paddingVertical:7,
  paddingHorizontal:10,
  borderRadius:6,
  borderWidth:1,
  borderColor:COLORS.black,

},
AppWelcomeMsgContainerHomeScreen:{
  flexDirection:'column',

},

AppWelcomeHeaderTextHomeScreen:{
  //fontSize:20,
  //fontWeight:'bold',
  color:COLORS.white,
  fontFamily:'Bold',

},
AppWelcomeHeaderText2HomeScreen:{
   //fontSize:16,
  marginTop:7,
  marginLeft:5,
  color:COLORS.green,
  fontFamily:'Medium',

},

AppIConHomeScreen:{
  
  transform: [{rotateY: '180deg'}],
  width:'10%',
  
},
AppInputHomeScreen:{
   color:COLORS.black,
  marginLeft:15,
  opacity:1,
  //fontSize:16,
  fontFamily:'Light',
  width:'70%',
  //backgroundColor:'red',
  //flex:1,

},

AppCustomCardContainerHomeScreen:{
    backgroundColor:COLORS.wheat,
    //marginHorizontal:24,
    marginTop:-60,
    padding:10,
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"space-around",
    width:'100%',
    alignItems:"center",
  },

AppCustomSimuContainerHomeScreen:{
  alignItems:"center",
  width:'60%'
},
AppCustomSimuTextHomeScreen:{
   //fontWeight:"bold", 
  marginBottom:0,
  fontFamily:'Medium',
},

AppCustomSimuTextValueHomeScreen:{
  //fontSize:16
  fontFamily:'Light',
},

AppCustomMahaliContainerHomeScreen:{
  alignItems:"center",
  width:'40%'
},

AppCustomMahaliTextHomeScreen:{
   //fontWeight:"bold", 
  marginBottom:0,
  fontFamily:'Medium',
},

AppCustomMahaliTextValueHomeScreen:{
  //fontSize:16
  fontFamily:'Light',
},

AppChaguaHudumaTextHomeScreen:{
   marginHorizontal:26,
  marginVertical:10,
  fontFamily:'Bold',
  //fontWeight:"bold",
  //fontSize:18
},

AppFlatListContainerHomeScreen:{
  width:'100%',
  //marginHorizontal:20,
  paddingHorizontal:2,
  flex:1,
},

 topview:{
    marginTop:20,
    //marginHorizontal:10,
    //backgroundColor:'green',
    flex:1,
    justifyContent:"space-between",
    width:'100%',
    elevation: 3,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
    shadowOpacity: 1,
    shadowRadius: 2,
    padding:10,
  },
  welcomemessage:{
    color:COLORS.black,
    //fontSize:20,
    //fontWeight:"bold",
    fontFamily:'Bold',
  },
  searchbar:{
    flexDirection:"row",
    backgroundColor:COLORS.white,
    alignItems:"center",
    width:"100%",
    height:40,
    borderRadius:10,
    marginBottom:65,
    borderColor:COLORS.black,
    borderWidth:1,
  },

  circle:{
    borderRadius:25,
    height:50,
    width:"14%",
    //backgroundColor:COLORS.black
  },
  RightHeaderImage:{
    height:47,
    width:'100%',
    borderRadius:25,


  },


  welcomecontainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    //backgroundColor:'wheat'
  },
  bottomview:{
    flex:2,
    backgroundColor:COLORS.white,
    // borderTopLeftRadius:50,
    // borderTopRightRadius:50,

    borderWidth:.2,
    borderColor:COLORS.green,
    elevation: 3,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
    shadowOpacity: 1,
    shadowRadius: 2,
    padding:10,
  },
  













//-------------SEARCH FOR OTHER PAGES----------
 searchbarOtherPages:{
    flexDirection:"row",
    backgroundColor:COLORS.white,
    alignItems:"center",
    width:"90%",
    height:40,
    borderRadius:10,
    marginBottom:10,
    borderColor:COLORS.black,
    borderWidth:1,
    //paddingHorizontal:20,
    //flex:1,
    marginLeft:15,
  },
searchbarIconContainerOtherPages:{
  width:'10%',

},
searchbarInputContainerOtherPages:{
  width:'70%',

},


AppIConHomeScreenOtherPages:{
  width:'100%',
  transform: [{rotateY: '180deg'}]
},
AppInputHomeScreenOtherPages:{
  color:COLORS.black,
  marginLeft:15,
  opacity:1,
  //fontSize:16,
  fontFamily:'Light',
  width:'100%',
  //backgroundColor:'red',
  //flex:1,

},















//----------FLAT LIST 2 COMPONENTS FOR OTHER PAGES--



AppItemContainerHomeScreenOtherPages:{
   //flexDirection:"row",
 // overflow:"hidden",
  //justifyContent:"space-between",
  //padding:15,
  //backgroundColor:COLORS.red,
  marginHorizontal:0,
  marginBottom:10,
  //borderRadius:10,
  //borderColor:COLORS.green,
  borderWidth:0,
   elevation: 3,

//shadowOffset: { width: 1, height: 1 },
shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
shadowOpacity: 1,
shadowRadius: 2,
padding:10,
width:width/2 - 11,
flex:1,

},


AppItemNameHomeScreenOtherPages:{
  color:COLORS.black,
  fontFamily:'Medium',
  //fontWeight:"bold",
  //fontSize:18,

},

AppItemImageContainerHomeScreenOtherPages:{
  width:'100%',
  //flex:1,
   //backgroundColor:'red',
   marginTop:8,

},

AppItemImageHomeScreenOtherPages:{
   //position:"absolute",
  width:'100%',
  height:150,
  borderRadius:10,
},

AppItemButtonHomeScreenOtherPages:{
   width:'50%',
    //padding:5,
   // borderRadius:6,
    marginTop:20,

},
AppItemButtonTextHomeScreenOtherPages:{
   backgroundColor:'green',
  textAlign:"center",
  //fontWeight:"bold",
  fontFamily:'Light',
  color:COLORS.white,
  paddingVertical:7,
  borderRadius:6,
  borderWidth:1,
  borderColor:'white',

},
AppWelcomeMsgContainerHomeScreenOtherPages:{
  flexDirection:'column',

},

AppWelcomeHeaderTextHomeScreenOtherPages:{
  //fontSize:20,
  //fontWeight:'bold',
  color:COLORS.white,
  fontFamily:'Bold',

},
AppWelcomeHeaderText2HomeScreenOtherPages:{
   //fontSize:16,
  marginTop:7,
  marginLeft:5,
  color:COLORS.green,
  fontFamily:'Medium',

},

AppIConHomeScreenOtherPages:{
  width:40,
  transform: [{rotateY: '180deg'}]
},
AppInputHomeScreenOtherPages:{
  color:COLORS.black,
  marginLeft:15,
  opacity:1,
  //fontSize:16,
  fontFamily:'Light',

},

AppCustomCardContainerHomeScreenOtherPages:{
    backgroundColor:COLORS.wheat,
    //marginHorizontal:24,
    marginTop:-60,
    padding:10,
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"space-around",
    width:'100%',
    alignItems:"center",
  },

AppCustomSimuContainerHomeScreenOtherPages:{
  alignItems:"center",
  width:'60%'
},
AppCustomSimuTextHomeScreenOtherPages:{
   //fontWeight:"bold", 
  marginBottom:0,
  fontFamily:'Medium',
},

AppCustomSimuTextValueHomeScreenOtherPages:{
  //fontSize:16
  fontFamily:'Light',
},

AppCustomMahaliContainerHomeScreenOtherPages:{
  alignItems:"center",
  width:'40%'
},

AppCustomMahaliTextHomeScreenOtherPages:{
   //fontWeight:"bold", 
  marginBottom:0,
  fontFamily:'Medium',
},

AppCustomMahaliTextValueHomeScreenOtherPages:{
  //fontSize:16
  fontFamily:'Light',
},

AppChaguaHudumaTextHomeScreenOtherPages:{
   marginHorizontal:26,
  marginVertical:10,
  fontFamily:'Bold',
  //fontWeight:"bold",
  //fontSize:18
},

AppFlatListContainerHomeScreenOtherPages:{
  width:'100%',
  //marginHorizontal:20,
  paddingHorizontal:2,
  flex:1,
},

 topviewOtherPages:{
    marginTop:20,
    //marginHorizontal:10,
    //backgroundColor:'white',
    flex:1,
    justifyContent:"space-between",
    width:'100%',
    elevation: 3,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
    shadowOpacity: 1,
    shadowRadius: 2,
    padding:10,
  },
 
 

  circleOtherPages:{
    borderRadius:25,
    height:50,
    width:"14%",
    //backgroundColor:COLORS.black
  },
  RightHeaderImageOtherPages:{
    height:47,
    width:'100%',
    borderRadius:25,


  },


  welcomecontainerOtherPages:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    //backgroundColor:'wheat'
  },
  bottomviewOtherPages:{
    flex:2,
    backgroundColor:COLORS.white,
    // borderTopLeftRadius:50,
    // borderTopRightRadius:50,

    borderWidth:.2,
    borderColor:COLORS.green,
    elevation: 3,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
    shadowOpacity: 1,
    shadowRadius: 2,
    padding:10,
  },
  













//-----------UMRI WA KUKU-------------

//-------------OVERDOSE CART ITEMS ---------------------

 OverdoseCartItemsContainer:{
      margin: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    marginVertical: 4,
    borderColor:'black',
    borderWidth:.2,
     elevation: 2,
     paddingHorizontal:10,
     paddingVertical:10,
  

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'black' : "black",
  shadowOpacity: 0,
  shadowRadius: 0,
  width:width/2 - 15,
  marginHorizontal:10,
  flex:1,


  },

OverdoseLeftCartItemsContainer:{
  width:'50%',
},
OverdoseItemNameCartItemsText:{
   //fontSize: 18,
 //fontWeight: "600", 
 //width: '100%' ,
 fontFamily:'Medium',
},
OverdosePriceCartItemsText:{
  marginTop: 4, 
 //fontSize: 15, 
 fontFamily:'Light',
},
OverdoseIconCartItemsText:{
  marginTop: 5,
  borderRadius: 4,
},
OverdoseIcon1CartItems:{
  paddingHorizontal: 3,
},

OverdoseDescriptionCartItems:{
  width: 200, 
 marginTop: 8, 
 color: "black", 
 fontFamily:'Light',
 //fontSize: 16 
},

OverdoseAddButtonContainerCartItems:{
     // position: "absolute",
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    width:'50%',
    justifyContent:'center',
    marginTop:15,
  },

  OverdoseAddButtonTextCartItems:{
    //fontSize: 18,
    //fontWeight: "600", 
    color: "white",
    padding:6 ,
    fontFamily:'Medium',
  },

  OverdoseImageContainerCartItems:{
    marginRight: 10,
   width:'50%'
 },

 OverdoseImageCartItems:{
  //width: 120, 
    height: 120, 
    borderRadius: 8 
  },

  OverdoseCreateOrderContainerCartItems:{
    position: "absolute",
    bottom:10,
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    
    borderRadius: 5,
    width:'100%',
    justifyContent:'center',
    marginTop:15,
  },
OverdoseCreateOrderTextCartItems:{
  //  fontSize: 18,
  // fontWeight: "600", 
  color: "white",
  padding:12 ,
  backgroundColor: "green",
  width:'100%',
  textAlign:'center',
  borderRadius:8,
  borderColor: "white",
borderWidth: 1,
fontFamily:'Light',
},








//---------------------ORDER MESSAGE------------------

OverdoseContinueTextOrderMessage:{
  marginVertical: 0,

},


OverdoseMessageContainerOrderMessage:{
 width: "100%",
  backgroundColor: "white",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
OverdoseMessageSecondContainerOrderMessage:{
  padding: 10,

},
OverdoseMessageThirdContainerOrderMessage:{
  flexDirection: "row",
   marginTop: 20 ,
   width:'100%',
 },

 OverdoseMessageLeftImageContainerOrderMessage:{
  width:'30%',
},

OverdoseMessageLeftImageOrderMessage:{
   width: '100%', 
   height: 100, 
   borderRadius: 8, 
 },

 OverdoseMessageRightOrderMessage:{
   marginLeft: 10, 
   width:'70%',
 },


 OverdoseMessageMainTitleOrderMessage:{
  //  fontSize: 18,
  // fontWeight: "500",
  paddingHorizontal: 2,
  marginBottom: 6,
  fontFamily:'Medium',

 },

 OverdoseMessageThanksMsgOrderMessage:{
  //fontSize: 16,
  //fontWeight: "600",
  color: "#696969",
  marginRight: 10,
  paddingHorizontal: 2,
  fontFamily:'Light',
},


OverdoseFourtContainerOrderMessage:{
  paddingTop: 20,
flexDirection: "row",
alignItems: "center",
},

OverdoseFourtTouchableContainerOrderMessage:{
  backgroundColor: "#F5F5F5",
  marginHorizontal: 10,
  paddingHorizontal: 10,
  borderRadius: 7,
},

OverdoseFourthText1OrderMessage:{
  padding: 10,
  color: "#002D62",
  //fontWeight: "bold",
  fontFamily:'Medium',
},



OverdosePleaseContinueTextOrderMessage:{
  color: "#fc8019",
  padding: 10,
  marginLeft: 10,
  marginRight: 10,
  // fontSize: 16,
  // fontWeight: "600",
  width:'100%',
  marginTop:20,
  fontFamily:'Light',
},

OverdosePleaseContinueTouchableBtnOrderMessage:{
  padding: 10,
marginLeft: 10,
marginRight: 10,


paddingBottom: 40,
},

OverdosePleaseContinueWithPaymentTextOrderMessage:{
// fontSize: 18,
// fontWeight: "600", 
color: "white",
padding:12 ,
backgroundColor: "green",
width:'50%',
textAlign:'center',
borderRadius:8,
borderColor: "white",
borderWidth: 1,
fontFamily:'Light',
},




OverdoseFiftyTouchableContainerOrderMessage:{
   alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginHorizontal: 10,
    borderRadius: 7,
    // paddingHorizontal: 10,
  },

  OverdoseFifty1TextOrderMessage:{
    padding: 4,
    color: "#002D62",
    fontWeight: "bold",
  },



  OverdoseFifty2TextOrderMessage:{
     backgroundColor: "orange",
    paddingHorizontal: 10,
    //fontSize: 14,
    //fontWeight: "bold",
    color: "white",
    fontFamily:'Light',

  },

OverdoseSixtyContainerOrderMessage:{
  backgroundColor: "#F5F5F5",
  marginHorizontal: 10,
  paddingHorizontal: 10,
  borderRadius: 7,
},

OverdoseSixty1TextOrderMessage:{
   padding: 10,
  color: "#002D62",
  //fontWeight: "bold",
  fontFamily:'Light',
},









//-----------TAARIFA KUKU-------------

//-------------OVERDOSE CART ITEMS ---------------------

 TaarifaOverdoseCartItemsContainer:{
      margin: 0,
    //flexDirection: "row",
    justifyContent: "center",
    //alignItems:'center',
    marginVertical: 4,
    borderColor:'black',
    borderWidth:.2,
     elevation: 2,
     paddingHorizontal:10,
     paddingVertical:10,
  

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'black' : "black",
  shadowOpacity: 0,
  shadowRadius: 0,
  width:width - 15,
  marginHorizontal:10,
  flex:1,


  },



TaarifaLeft:{
  width:'60%',
  flexDirection:'row',
},

TaarifaRight:{
  width:'25%',
},




TaarifaOverdoseLeftCartItemsContainer:{
  width:'100%',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
},
TaarifaOverdoseItemNameCartItemsText:{
   //fontSize: 18,
 //fontWeight: "600", 
 //width: 220 ,
 fontFamily:'Light',
},

TaarifaOverdoseItemNameCartItemsText2:{
   //fontSize: 18,
 //fontWeight: "600", 
 //width: 220 ,
 fontFamily:'Medium',
 color:'green',
},

TaarifaOverdoseItemNameCartItemsMshale:{
  color:'green',
  marginRight:10,
  fontFamily:'Bold'

},

TaarifaOverdosePriceCartItemsText:{
  marginTop: 4, 
 //fontSize: 15, 
 fontFamily:'Light',
},
TaarifaOverdoseIconCartItemsText:{
  marginTop: 5,
  borderRadius: 4,
},
TaarifaOverdoseIcon1CartItems:{
  paddingHorizontal: 3,
},

TaarifaOverdoseDescriptionCartItems:{
  width: 200, 
 marginTop: 8, 
 color: "black", 
 fontFamily:'Light',
 //fontSize: 16 
},

TaarifaOverdoseAddButtonContainerCartItems:{
     // position: "absolute",
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    width:'50%',
    justifyContent:'center',
    marginTop:15,
  },

  TaarifaOverdoseAddButtonTextCartItems:{
    //fontSize: 18,
    //fontWeight: "600", 
    color: "white",
    padding:6 ,
    fontFamily:'Medium',
  },

  TaarifaOverdoseImageContainerCartItems:{
    marginRight: 10,
   width:'20%'
 },

 TaarifaOverdoseImageCartItems:{
  width: 120, 
    height: 120, 
    borderRadius: 8 
  },

  TaarifaOverdoseCreateOrderContainerCartItems:{
    position: "absolute",
    bottom:10,
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    
    borderRadius: 5,
    width:'100%',
    justifyContent:'center',
    marginTop:15,
  },
TaarifaOverdoseCreateOrderTextCartItems:{
  //  fontSize: 18,
  // fontWeight: "600", 
  color: "white",
  padding:12 ,
  backgroundColor: "green",
  width:'100%',
  textAlign:'center',
  borderRadius:8,
  borderColor: "white",
borderWidth: 1,
fontFamily:'Light',
},













VyakulaCartItemsContainerHistoria:{
     margin: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 4,
    borderColor:'black',
    borderWidth:.2,
     elevation: 2,
     paddingHorizontal:10,
     paddingVertical:10,
  

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'black' : "black",
  shadowOpacity: 0,
  shadowRadius: 0,
  width:width - 19,
  flex:1,
  marginLeft:10,

},




//-----------------------VYAKULA VYOTE-------------------

VyakulaCartItemsContainerKubwa:{
     margin: 0,
   // flexDirection: "row",
    //justifyContent: "space-around",
    marginVertical: 4,
    borderColor:'black',
    borderWidth:.2,
     elevation: 2,
     paddingHorizontal:10,
     paddingVertical:10,
  

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'black' : "black",
  shadowOpacity: 0,
  shadowRadius: 0,
  width:width - 19,
  flex:1,
  marginLeft:10,

},

 VyakulaCartItemsContainer:{
      margin: 0,
    flexDirection: "row",
    justifyContent: "space-around",
  //   marginVertical: 4,
  //   borderColor:'black',
  //   borderWidth:.2,
  //    elevation: 2,
  //    paddingHorizontal:10,
  //    paddingVertical:10,
  

  // shadowOffset: { width: 1, height: 1 },
  // shadowColor: Platform.OS === "android" ? 'black' : "black",
  // shadowOpacity: 0,
  // shadowRadius: 0,
  // width:width - 19,
  // flex:1,
  // marginLeft:10,


  },

VyakulaLeftCartItemsContainer:{
  width:'50%',
},
VyakulaItemNameCartItemsText:{
   //fontSize: 18,
 //fontWeight: "600", 
 //width: 220 ,
 fontFamily:'Medium',
},
VyakulaPriceCartItemsText:{
  marginTop: 4, 
 //fontSize: 15, 
 fontFamily:'Light',
},
VyakulaIconCartItemsText:{
  marginTop: 5,
  borderRadius: 4,
},
VyakulaIcon1CartItems:{
  paddingHorizontal: 3,
},

VyakulaDescriptionCartItems:{
 // width: 200, 
 marginTop: 8, 
 color: "black", 
 fontFamily:'Light',
 //fontSize: 16 
},

VyakulaAddButtonContainerCartItems:{
     // position: "absolute",
    // top: 95,
    // left: 20,
    // borderColor: "white",
    // borderWidth: 1,
    flexDirection: "row",
    // paddingHorizontal: 25,
    // paddingVertical: 5,
    alignItems: "center",
    //backgroundColor: "#1f1f1f",
    // borderRadius: 5,
    width:'90%',
    //justifyContent:'center',
    marginTop:15,
  },

  VyakulaAddButtonTextCartItems:{
    //fontSize: 18,
    //fontWeight: "600", 
    color: "white",
    padding:6 ,
    fontFamily:'Medium',
    backgroundColor: "green",
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
  },

  VyakulaImageContainerCartItems:{
    marginRight: 10,
   width:'30%'
 },

 VyakulaImageCartItems:{
  width: '100%', 
    height: 50, 
    borderRadius: 8 
  },

  VyakulaCreateOrderContainerCartItems:{
    position: "absolute",
    bottom:10,
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    
    borderRadius: 5,
    width:'100%',
    justifyContent:'center',
    marginTop:15,
  },
VyakulaCreateOrderTextCartItems:{
  //  fontSize: 18,
  // fontWeight: "600", 
  color: "white",
  padding:12 ,
  backgroundColor: "green",
  width:'100%',
  textAlign:'center',
  borderRadius:8,
  borderColor: "white",
borderWidth: 1,
fontFamily:'Light',
},












  ModalViewViewProduct: {
    padding: 2,
    paddingHorizontal:20,
    // width: 340,
    //width:'100%',
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 3,
    shadowColor: Platform.OS === "android" ? 'green' : "green",
    shadowOpacity: 1,
    paddingBottom:30,
    marginTop:10,
    // borderWidth:1,
    // borderColor:'black',


  },
  ConfirmCancelButtonTextViewProduct:{
    color:'white',
    fontFamily:'Light',

  },

  inputViewProduct: {
    flexDirection: "row",
    //width: 300,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    marginBottom:20,
  },
   textInputViewProduct: {
    // fontSize: 20
     
    marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: 250,
    //backgroundColor: 'white',
    
    borderRadius: 10,
    // borderColor: "black",
    // borderWidth: 1,
    //padding:12,
    height: 50,
  },


  ButtonCloseViewProduct: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "red",
    borderRadius: 5,
    marginRight:10,

  },
  ButtonAddViewProduct: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "green",
    borderRadius: 5,


  },
  ButtonScanViewProduct: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 5,

  },
  ButtonBarcodeViewProduct: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    //  backgroundColor:"green",
    borderRadius: 5,
    borderWidth: 1,

  }, 
  ButtonConatinerViewProduct: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems:'space-around',
    flex:1,
    //justifyContent: "space-between"
  },

  inputTaxViewProduct: {
    flexDirection: "row",
    width: 300,
    height: 50,
    backgroundColor: 'green',
    // borderColor:"black",
    // borderWidth:1,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  pickerViewProduct: {
    width: 170,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  pickerInputViewProduct: {
    top: -7
  },

 
  formViewProduct: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection:'row',
    alignItems:'space-around',
    width:width,
    
  },
  



  InputiconViewProduct: {
    fontSize: 29,
    marginRight: 10

  },
  TaxTypeViewProduct: {
     fontFamily:'Light',
    color: "white",
    fontWeight: '400'
  },
  openViewProduct: {
    width: 200,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,

  },


  ButtonAddTextViewProduct: {
    color: 'white',
     fontFamily:'Light',
  },



















//----------------------MODAL YA IDADI YA SIKU-----





KeyboardAvoidingViewModalIdadiYaSiku:{
  flex: 1,
  //backgroundColor:'white',
  justifyContent:'center',
  alignItems:'center',
  width:'100%',




},
ModalTitleIdadiYaSiku:{
  textAlign:'center',
  fontFamily:'SemiBold',
  textAlign:'center'
},
ConfirmCancelButtonTextIdadiYaSiku:{
  color:'white',
  fontFamily:'Light',
  margin:10,
},

EnterQuntityTextIdadiYaSiku:{
  color:'black',
   fontFamily:'Light',
},
 inputIdadiYaSiku: {
    flexDirection: "column",
    width: '100%',
    
    //alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },


  
  ModalViewIdadiYaSiku: {
    padding: 2,
    paddingHorizontal:20,
    // width: 340,
    //width:'100%',
   // backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: Platform.OS === "android" ? 'white' : "white",
    shadowOpacity: 1,
    paddingBottom:30,
    marginTop:10,
    //backgroundColor:'red',
    width:'98%',
    borderColor:'white',
    borderWidth:1,


  },


   textInputIdadiYaSiku: {
    // fontSize: 20
     
    marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: 250,
    //backgroundColor: 'white',
    
    borderRadius: 10,
    // borderColor: "black",
    // borderWidth: 1,
    //padding:12,
    height: 50,
  },


  ButtonCloseIdadiYaSiku: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "red",
    borderRadius: 5,
    marginRight:10,

  },
  ButtonAddIdadiYaSiku: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "green",
    borderRadius: 5,


  },
  ButtonScanIdadiYaSiku: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 5,

  },
  ButtonBarcodeIdadiYaSiku: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    //  backgroundColor:"green",
    borderRadius: 5,
    borderWidth: 1,

  }, 
  ButtonConatinerIdadiYaSiku: {
    flexDirection: 'column',
    marginTop: 20,
    // alignItems:'space-around',
    alignItems:'center',
    flex:1,
    //justifyContent: "space-between"
  },

  inputTaxIdadiYaSiku: {
    flexDirection: "row",
    width: 300,
    height: 50,
    backgroundColor: 'green',
    // borderColor:"black",
    // borderWidth:1,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  pickerIdadiYaSiku: {
    width: 170,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  pickerInputIdadiYaSiku: {
    top: -7
  },

 
  formIdadiYaSiku: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection:'row',
    alignItems:'space-around',
    width:width,
    
  },
  



  InputiconIdadiYaSiku: {
    fontSize: 29,
    marginRight: 10

  },
  TaxTypeIdadiYaSiku: {
     fontFamily:'Light',
    color: "white",
    fontWeight: '400'
  },
  openIdadiYaSiku: {
    width: 200,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,

  },


  ButtonAddTextIdadiYaSiku: {
    color: 'white',
     fontFamily:'Light',
  },


ModalDescriptionTextIdadiYaSiku:{
  fontFamily:'Light',
},




















//---------------------------MAKTABA YA LISHE----------------






MainContainerMaktabaYaLishe:{
  width:'95%',
  flexDirection:'row',
  justifyContent:'space-between',
  //alignItems:'center',
   elevation: 3,
    borderColor: 'black',
    borderWidth: .2,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? 'black' : "black",
    shadowOpacity: 1,
    shadowRadius: 2,
    padding:15,
    marginHorizontal:10,
    //backgroundColor:'red',
    //flex:1,
    //height:height,


},

MainLeftContainerMaktabaYaLishe:{
  width:'80%',
  flex:1,

},


MainRightContainerMaktabaYaLishe:{
  width:'20%',
  justifyContent:'center',
  alignItems:'center'

},

MainLeftContainerMainImageMaktabaYaLishe:{
  width:'90%',
  height:120,
  //resizeMode:'contain',
  marginBottom:10,
  borderRadius:10,

},

MainLeftContainerNameTextMaktabaYaLishe:{
  color:'black',
  //fontSize:18,
  marginBottom:10,
  width:'100%',
  fontFamily:'Medium',
},

MainLeftContainerDescriptionMaktabaYaLishe:{
  color:'black',
  //fontSize:16,
  marginBottom:10,
  width:'90%',
  fontFamily:'Light',

},


PriceContainerPriceMaktabaYaLishe:{

  width:'100%',
  marginBottom:10,
  elevation:3,
  flexDirection:'row',
  justifyContent:'space-around',
},

MaktabaYaLisheDiscountProductsText:{
  color:'black',
  fontFamily:'Light',

},

MainRightAddToCartMaktabaYaLishe:{
  backgroundColor:'#1f1f1f',
  color:'white',
  textAlign:'center',
  padding:20,
  borderRadius:8,
  //fontSize:16,
  fontFamily:'Light',
  borderColor:'green',
  borderWidth:1,
},

BottomContainerMoreTextMaktabaYaLishe:{
  marginTop:20,
  //fontSize:18,
  marginBottom:15,
  width:'100%',
  // alignItems:'center',
  justifyContent:'space-between',
  fontFamily:'Medium'



},
BottomContainerImageMaktabaYaLishe:{
  width:'100%',
  height:height/4 + 80,
  borderRadius:10,



},




PriceContainerPriceMaktabaYaLishe2:{
  width:'100%',
  marginBottom:10,
  elevation:3,
  

},
MaktabaYaLisheDiscountProductsText2:{
  color:'black',
  marginTop:15,
  color:'green',
  fontFamily:'Medium'

},



MainRightDescriptionIconMaktabaYaLishe:{
  borderWidth:1,
  borderColor:'green',
  borderRadius:4,
},














//----------------------------WAFUGAJI WOTE------------------


 WafugajiCartItemsContainer:{
      margin: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    borderColor:'black',
    borderWidth:.2,
     elevation: 2,
     paddingHorizontal:10,
     paddingVertical:10,
  

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'black' : "black",
  shadowOpacity: 0,
  shadowRadius: 0,
  width:'95%',
  marginHorizontal:10,


  },

WafugajiLeftCartItemsContainer:{
  width:'70%',
},
WafugajiItemNameCartItemsText:{
   //fontSize: 18,
 //fontWeight: "600", 
 width: 220 ,
 fontFamily:'Medium',
},
WafugajiPriceCartItemsText:{
  marginTop: 4, 
 //fontSize: 15, 
 fontFamily:'Light',
},
WafugajiIconCartItemsText:{
  marginTop: 5,
  borderRadius: 4,
},
WafugajiIcon1CartItems:{
  paddingHorizontal: 3,
},

WafugajiDescriptionCartItems:{
  width: 200, 
 marginTop: 5, 
 color: "black", 
 fontFamily:'Light',
 //fontSize: 16 
},

WafugajiAddButtonContainerCartItems:{
     // position: "absolute",
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    width:'50%',
    justifyContent:'center',
    marginTop:15,
  },

  WafugajiAddButtonTextCartItems:{
    //fontSize: 18,
    //fontWeight: "600", 
    color: "white",
    padding:6 ,
    fontFamily:'Medium',
  },

  WafugajiImageContainer2CartItems:{
    width:'100%',
  },

  WafugajiImageContainerCartItems:{
    marginRight: 10,
   width:'30%'
 },

 WafugajiImageCartItems:{
  width: "100%", 
    height: 120, 
    borderRadius: 8 
  },

  WafugajiCreateOrderContainerCartItems:{
    position: "absolute",
    bottom:10,
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    
    borderRadius: 5,
    width:'100%',
    justifyContent:'center',
    marginTop:15,
  },
WafugajiCreateOrderTextCartItems:{
  //  fontSize: 18,
  // fontWeight: "600", 
  color: "white",
  padding:12 ,
  backgroundColor: "green",
  width:'100%',
  textAlign:'center',
  borderRadius:8,
  borderColor: "white",
borderWidth: 1,
fontFamily:'Light',
},



















//-----------------------------YOUTUBE CHANNEL---------------



AppItemContainerYoutubeChannel:{
   //flexDirection:"row",
 // overflow:"hidden",
  //justifyContent:"space-between",
  padding:15,
  backgroundColor:COLORS.white,
  marginHorizontal:0,
  marginBottom:10,
  borderRadius:10,
  //borderColor:COLORS.green,
  borderWidth:0,
   elevation: 3,

shadowOffset: { width: 1, height: 1 },
shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
shadowOpacity: 1,
shadowRadius: 2,
padding:10,
width:'100%',

},


AppItemNameYoutubeChannel:{
  color:COLORS.black,
  fontFamily:'Medium',
  //fontWeight:"bold",
  //fontSize:18,

},

AppItemImageContainerYoutubeChannel:{
  width:'100%',
  //flex:1,
   //backgroundColor:'red',
   marginTop:8,
   justifyContent:'center',
   alignItems:'center',
   borderWidth:0,
   elevation: 3,

shadowOffset: { width: 1, height: 1 },
shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
shadowOpacity: 1,
shadowRadius: 2,
//paddingVertical:10,

},

AppItemImageYoutubeChannel:{
   //position:"absolute",
  width:'100%',
  height:height/4,
  borderRadius:10,
},

AppItemButtonYoutubeChannel:{
   width:'50%',
    //padding:5,
   // borderRadius:6,
    marginTop:20,

},
AppItemButtonTextYoutubeChannel:{
   backgroundColor:COLORS.black,
  textAlign:"center",
  //fontWeight:"bold",
  fontFamily:'Light',
  color:COLORS.white,
  paddingVertical:7,
  borderRadius:6,
  borderWidth:1,
  borderColor:COLORS.green,

},
AppWelcomeMsgContainerYoutubeChannel:{
  flexDirection:'column',

},

AppWelcomeHeaderTextYoutubeChannel:{
  //fontSize:20,
  //fontWeight:'bold',
  color:COLORS.white,
  fontFamily:'Bold',

},
AppWelcomeHeaderText2YoutubeChannel:{
   //fontSize:16,
  marginTop:7,
  marginLeft:5,
  color:COLORS.green,
  fontFamily:'Medium',

},

AppIConYoutubeChannel:{
  
  transform: [{rotateY: '180deg'}],
  width:'10%',
  
},
AppInputYoutubeChannel:{
   color:COLORS.black,
  marginLeft:15,
  opacity:1,
  //fontSize:16,
  fontFamily:'Light',
  width:'70%',
  //backgroundColor:'red',
  //flex:1,

},

AppCustomCardContainerYoutubeChannel:{
    backgroundColor:COLORS.wheat,
    //marginHorizontal:24,
    marginTop:-60,
    padding:10,
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"space-around",
    width:'100%',
    alignItems:"center",
  },

AppCustomSimuContainerYoutubeChannel:{
  alignItems:"center",
  width:'60%'
},
AppCustomSimuTextYoutubeChannel:{
   //fontWeight:"bold", 
  marginBottom:0,
  fontFamily:'Medium',
},

AppCustomSimuTextValueYoutubeChannel:{
  //fontSize:16
  fontFamily:'Light',
},

AppCustomMahaliContainerYoutubeChannel:{
  alignItems:"center",
  width:'40%'
},

AppCustomMahaliTextYoutubeChannel:{
   //fontWeight:"bold", 
  marginBottom:0,
  fontFamily:'Medium',
},

AppCustomMahaliTextValueYoutubeChannel:{
  //fontSize:16
  fontFamily:'Light',
},

AppChaguaHudumaTextYoutubeChannel:{
   marginHorizontal:26,
  marginVertical:10,
  fontFamily:'Bold',
  //fontWeight:"bold",
  //fontSize:18
},

AppFlatListContainerYoutubeChannel:{
  width:'100%',
  //marginHorizontal:20,
  paddingHorizontal:2,
  flex:1,
},

 topviewYoutubeChannel:{
    marginTop:20,
    //marginHorizontal:10,
    //backgroundColor:'white',
    flex:1,
    justifyContent:"center",
    alignItems:'center',
    width:'100%',
    elevation: 3,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
    shadowOpacity: 1,
    shadowRadius: 2,
    padding:10,
  },
  welcomemessage:{
    color:COLORS.black,
    //fontSize:20,
    //fontWeight:"bold",
    fontFamily:'Bold',
  },
  searchbar:{
    flexDirection:"row",
    backgroundColor:COLORS.white,
    alignItems:"center",
    width:"100%",
    height:40,
    borderRadius:10,
    marginBottom:65,
    borderColor:COLORS.black,
    borderWidth:1,
  },

  circle:{
    borderRadius:25,
    height:50,
    width:"14%",
    //backgroundColor:COLORS.black
  },
  RightHeaderImage:{
    height:47,
    width:'100%',
    borderRadius:25,


  },


  welcomecontainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    //backgroundColor:'wheat'
  },
  bottomview:{
    flex:2,
    backgroundColor:COLORS.white,
    // borderTopLeftRadius:50,
    // borderTopRightRadius:50,

    borderWidth:.2,
    borderColor:COLORS.green,
    elevation: 3,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
    shadowOpacity: 1,
    shadowRadius: 2,
    padding:10,
  },
  






 menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 0,
  },
  menuItemText: {
    color: 'blue',
    marginLeft: 20,
    //fontWeight: '600',
    //fontSize: 16,
    fontFamily:'Medium',
    lineHeight: 26,
  },







MaelezoContainer1TaarifaZaKuku:{
  width:'90%',
  marginHorizontal:20,

},

MaelezoText1TaarifaZaKuku:{
  fontFamily:'Medium',

},

MaelezoText2TaarifaZaKuku:{
  fontFamily:'Light',
  marginTop:20,
  marginBottom:15,

},

MaelezoValue1TaarifaZaKuku:{
  marginLeft:10,
  color:'green'
},







//---------------TAARIFA ZA KUKU MAELEZO-------------------


 TaarifaZaKukuMaelezoOverdoseCartItemsContainer:{
      margin: 0,
    //flexDirection: "row",
    justifyContent: "center",
    //alignItems:'center',
    marginVertical: 4,
    borderColor:'black',
    borderWidth:.2,
     elevation: 2,
     paddingHorizontal:10,
     paddingVertical:10,
  

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'black' : "black",
  shadowOpacity: 0,
  shadowRadius: 0,
  width:width - 15,
  marginHorizontal:10,
  flex:1,


  },



TaarifaZaKukuMaelezoLeft:{
  width:'50%',
  flexDirection:'row',
  //backgroundColor:'red',
},

TaarifaZaKukuMaelezoRight:{
  width:'20%',
  //backgroundColor:'green'
},




TaarifaZaKukuMaelezoOverdoseLeftCartItemsContainer:{
  width:'100%',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
},
TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText:{
   //fontSize: 18,
 //fontWeight: "600", 
 //width: 220 ,
 fontFamily:'Light',

},

TaarifaZaKukuMaelezoOverdoseItemNameCartItemsText2:{
   //fontSize: 18,
 //fontWeight: "600", 
 //width: 220 ,
 fontFamily:'Medium',
 color:'green',
},

TaarifaZaKukuMaelezoOverdoseItemNameCartItemsMshale:{
  color:'green',
  marginRight:10,
  fontFamily:'Bold'

},

TaarifaZaKukuMaelezoOverdosePriceCartItemsText:{
  marginTop: 4, 
 //fontSize: 15, 
 fontFamily:'Light',

},
TaarifaZaKukuMaelezoOverdoseIconCartItemsText:{
  marginTop: 5,
  borderRadius: 4,
},
TaarifaZaKukuMaelezoOverdoseIcon1CartItems:{
  paddingHorizontal: 3,
},

TaarifaZaKukuMaelezoOverdoseDescriptionCartItems:{
  width: 200, 
 marginTop: 8, 
 color: "black", 
 fontFamily:'Light',
 //fontSize: 16 
},

TaarifaZaKukuMaelezoOverdoseAddButtonContainerCartItems:{
     // position: "absolute",
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    width:'50%',
    justifyContent:'center',
    marginTop:15,
  },

  TaarifaZaKukuMaelezoOverdoseAddButtonTextCartItems:{
    //fontSize: 18,
    //fontWeight: "600", 
    color: "white",
    padding:6 ,
    fontFamily:'Medium',
  },

  TaarifaZaKukuMaelezoOverdoseImageContainerCartItems:{
    marginRight: 10,
   width:'20%'
 },

 TaarifaZaKukuMaelezoOverdoseImageCartItems:{
  width: 120, 
    height: 120, 
    borderRadius: 8 
  },

  TaarifaOverdoseCreateOrderContainerCartItems:{
    position: "absolute",
    bottom:10,
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    
    borderRadius: 5,
    width:'100%',
    justifyContent:'center',
    marginTop:15,
  },
TaarifaOverdoseCreateOrderTextCartItems:{
  //  fontSize: 18,
  // fontWeight: "600", 
  color: "white",
  padding:12 ,
  backgroundColor: "green",
  width:'100%',
  textAlign:'center',
  borderRadius:8,
  borderColor: "white",
borderWidth: 1,
fontFamily:'Light',
},





WafugajiCardContainer:{
  width:"90%",
  marginHorizontal:20,

},


UserInfoContainer:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
width:'100%',
// borderBottomColor:'green',
// borderBottomWidth:1,
marginBottom:10,
},
UserInfoUsername:{
  fontFamily:'Medium',

},

UserInfoLeftContainer:{
  width:'20%',
  //backgroundColor:'red',

},

UserInfoLeftImage:{
  width:'95%',
  // height:60,
  height:height/11 - 5,
  borderRadius:50,


},
UserInfoRightContainer:{
  width:'60%',
  //backgroundColor:'green',

},

UserInfoMiddleContainer:{
  width:'10%',
  //backgroundColor:'green',

},

ItselfMajorContainer:{
  backgroundColor:'lightgreen',
  paddingVertical:10,
  borderRadius:5,
  alignItems:'center',
  justifyContent:'space-between',
  flexDirection:'row',
  width:'100%',
  paddingHorizontal:10,

},

ItselfLeftMinorContainer:{
 width:'80%',

},
ItselfRightMinorContainer:{
 width:'10%',
 //backgroundColor:'red',
},

ItselfLeftMinorText:{
  fontFamily:'Bold',
  backgroundColor:'green',
  paddingHorizontal:10,
  borderRadius:6,
  //width:'100%',
  paddingVertical:10,
  color:'white',
  textAlign:'center',

},




  });

