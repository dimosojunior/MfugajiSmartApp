import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground,Pressable, Text, ScrollView, SafeAreaView, View, Image, TouchableOpacity, Dimensions } from 'react-native';

import { useFonts } from 'expo-font';
import {globalStyles} from '../Styles/GlobalStyles';
import { Ionicons, FontAwesome,AntDesign, FontAwesome5} from '@expo/vector-icons';

import COLORS  from '../Constant/colors';


const SeraScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  const [routes, setRoutes] = useState([
    {
      RouteName: 'Mfugaji Smart inakusaidia Kukokotoa uwiano sahihi wa viungo kwa kuchanganya vyakula mbalimbali vya kuku. Pia Mfugaji Smart inakusaidia kukokotoa hesabu za matumizi ya chakula kwa muda Fulani',
      RouteImage: require('../assets/Loading/l1.json'),
      id: '1',
    },
    {
      RouteName: 'Mfugaji Smart inakusaidia kukupa kumbusho la mabadiliko ya lishe, kumbusho la chanjo, kumbusho la usafishaji wa banda na kumbusho la muda wa kuatamiwa mayai kwenye incubator au kuku mwenyewe',
      RouteImage: require('../assets/Loading/l2.json'),
      id: '2',
    },
    {
      RouteName: 'Programu hii itawaunganisha watumiaji wake na ukurasa wake wa youtube uitwao Mfugaji Smart App Youtube Channel moja kwa moja kwa elimu zaidi',
      RouteImage: require('../assets/Loading/l2.json'),
      id: '3',
    },

    {
      RouteName: 'Programu hii itawaunganisha watumiaji wake na ukurasa wake wa youtube uitwao Mfugaji Smart App Youtube Channel moja kwa moja kwa elimu zaidi',
      RouteImage: require('../assets/Loading/l2.json'),
      id: '4',
    },

    {
      RouteName: 'Programu hii itawaunganisha watumiaji wake na ukurasa wake wa youtube uitwao Mfugaji Smart App Youtube Channel moja kwa moja kwa elimu zaidi',
      RouteImage: require('../assets/Loading/l2.json'),
      id: '5',
    },

     {
      RouteName: 'Sera na faragha za watumiaji',
      RouteImage: require('../assets/Loading/l2.json'),
      id: '6',
    },

    {
      RouteName: 'Kwa maelekezo zaidi',
      RouteImage: require('../assets/Loading/l2.json'),
      id: '7',
    },



  
  ]);

  const { width, height } = Dimensions.get('window');
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== routes.length) {
      const offset = nextSlideIndex * width;
      ref.current.scrollTo({ x: offset, animated: true });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

   const skip = () => {
    const lastSlideIndex = routes.length - 1;
    const offset = lastSlideIndex * width;
    ref.current.scrollTo({ x: offset, animated: true });
    setCurrentSlideIndex(lastSlideIndex);
  };


  const Footer = () => {
    return (
      <View style={{
        height: height * 0.25,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
          {routes.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && {
                  backgroundColor: 'green',
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex === routes.length - 1 ? (
            <View style={{
              height: height/8,
              right: 5,
              position: 'absolute',
              bottom: 10
            }}>
              <TouchableOpacity
                style={styles.getstarted}
                onPress={() => navigation.navigate('PreLoader Stack')}>
                <Text style={{
                  backgroundColor: 'green',
                  color: 'white',
                  padding: 10,
                  borderRadius: 10,
                  fontFamily: 'Medium',
                }}>
                  Nakubaliana na Masharti
                </Text>
                <Ionicons name='arrow-forward-circle' size={28} color='white' />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                style={styles.getstarted3}
                activeOpacity={0.8}
                onPress={skip}
                >
                
                <Text style={{
                 // backgroundColor: 'green',
                  color: 'white',
                  padding: 10,
                  borderRadius: 10,
                  fontFamily: 'Medium',
                }}>
                  Ruka
                </Text>
                <Ionicons name='arrow-up-circle' size={28} color='white' />
                
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.getstarted2}
                activeOpacity={0.8}
                onPress={goToNextSlide}>
                <Text style={{
                  backgroundColor: 'green',
                  color: 'white',
                  padding: 10,
                  borderRadius: 10,
                  fontFamily: 'Medium',
                }}>
                  Endelea
                </Text>
                <Ionicons name='arrow-forward-circle' size={28} color='white' />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      {!fontsLoaded ? (<View />) : (
        <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            source={require('../assets/bc1.png')}
            style={{ flex: 1, opacity: 1 }}
            resizeMode="cover"
          >
            <ScrollView
              ref={ref}
              horizontal
              pagingEnabled
              onMomentumScrollEnd={updateCurrentSlideIndex}
              showsHorizontalScrollIndicator={false}
            >
              {routes.map((item, index) => (
                <View key={index} style={{ width: width }}>
                 <ScrollView>

                  <View style={{
                    width: width - 10,
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                   <TouchableOpacity>
                   {item.id != "7" ? (
                      <Text style={{
                        textAlign: 'center',
                        fontSize: 18,
                        marginTop: height / 15,
                        color: 'green',
                        fontFamily: 'Bold'
                      }}>VIGEZO NA MASHARTI</Text>
                      ):(

                      <Text style={{
                        textAlign: 'center',
                        fontSize: 18,
                        marginTop: height / 15,
                        color: 'green',
                        fontFamily: 'Bold'
                      }}>WASILIANA NASI</Text>

                      )}
                    </TouchableOpacity>
                    <View style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.id == "1" && (
                      <Text style={[styles.title, {
                        marginTop: 10,
                        color: 'wheat',
                        lineHeight: 25,
                      }]}>
                        Karibu kwenye programu ya Mfugaji Smart. 
                        Kwa kutumia programu hii, unakubaliana na masharti na sera zifuatazo. 
                        Sera hizi zimeundwa ili kulinda haki za watumiaji na wamiliki wa programu, 
                        pamoja na kuhakikisha usalama na uaminifu katika soko hili.
                      </Text>
                      )}
                    </View>


                    {/*mwanzo wa ITEM ya ID ya 1*/}
                    {item.id == "1" && (
                      <>
                   
                    <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>{item.id}. </Text>Masharti ya Malipo
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 1*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                        - Watumiaji wanatakiwa kufanya malipo ya ada ya kuunganishwa na wanunuzi kabla ya kupatiwa huduma.
                      </Text>
                    {/*mwisho wa text ya 1/1*/}

                      {/*mwanzo wa text ya 1/2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                        Ada ya kuunganishwa na wanunuzi ni kama ifuatavyo:
                      </Text>
                    {/*mwisho wa text ya 1/2*/}
                      
                      {/*mwanzo wa View text ya ndani 1*/}
                      <View>
                        <Text style={{ marginBottom: 10, color: 'wheat', fontFamily: 'Light', marginLeft: 10 }}>
                          - Kwa kila *kuku au treyi la mayai* litakalouzwa chini ya TZS 10,000: *TZS 100*.
                        </Text>
                        <Text style={{ marginBottom: 10, color: 'wheat', fontFamily: 'Light', marginLeft: 10 }}>
                          - Kwa kila *kuku au treyi la mayai* litakalouzwa kati ya TZS 10,000 hadi TZS 15,000: *TZS 200*.
                        </Text>

                         <Text style={{ marginBottom: 10, color: 'wheat', fontFamily: 'Light', marginLeft: 10 }}>
                          - Kwa kila *kuku au treyi la mayai* litakalouzwa zaidi ya TZS 15,000: *TZS 300*.
                        </Text>

                      </View>
                       {/*mwisho wa View text ya ndani 1*/}


               {/*mwanzo wa text ya 1/3*/}
              <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                - Mtumiaji hataruhusiwa kutuma pesa au kutoa huduma/bidhaa kabla ya makubaliano ya ana kwa ana na mnunuzi. Huduma ya kuunganishwa na wanunuzi itapatikana katika baadhi ya maeneo ya Tanzania pekee, na sio kila kona ya nchi.
              </Text>
            {/*mwisho wa text ya 1/3*/}

                    </View>
                   </>
                   )}

                  {/*mwisho wa ITEM ya ID ya 1*/}









  {/*mwanzo wa ITEM ya ID ya 2*/}
                    {item.id == "2" && (
                      <>
                   
                    <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>{item.id}. </Text>Jukumu na Mamlaka ya Programu
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                        - Programu ya Mfugaji Smart ni jukwaa la kuunganisha wauzaji (wafugaji) na wanunuzi. Programu hii haifanyi ununuzi wa kuku, mayai, au bidhaa nyingine zozote.
                      </Text>
                    {/*mwisho wa text ya 2/1*/}

                      {/*mwanzo wa text ya 1/2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                       - Watumiaji wanahusika kikamilifu kuthibitisha uaminifu wa wanunuzi au wauzaji kabla ya kuingia kwenye muamala wowote. Inashauriwa watumiaji kufanya biashara na wauzaji au wanunuzi waliothibitishwa na kuwa na alama ya vema (tick) ya kijani itakayoonekana juu kwenye ukurasa wa mtu binafi, kama ishara ya uaminifu.
                      </Text>
                    {/*mwisho wa text ya 1/2*/}
                      


               {/*mwanzo wa text ya 1/3*/}
              <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                - Iwapo kutatokea mgogoro kati ya mnunuzi na muuzaji, wamiliki wa programu hawatahusika kwa hasara yoyote au uharibifu. Wajibu wa programu ni kuwezesha muunganiko kati ya pande husika tu.
              </Text>
            {/*mwisho wa text ya 1/3*/}



                    </View>
                   </>
                   )}

                  {/*mwisho wa ITEM ya ID ya 2*/}




     


  {/*mwanzo wa ITEM ya ID ya 3*/}
                    {item.id == "3" && (
                      <>
                   
                    <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>{item.id}. </Text>Sera ya Urejeshaji wa Ada
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                        - Iwapo mtumiaji atapata mnunuzi wa kwanza na muamala kushindikana, mtumiaji atapewa wanunuzi wawili wa rufaa bila malipo ya ziada.
                      </Text>
                    {/*mwisho wa text ya 2/1*/}

                    {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                       - Baada ya wanunuzi wawili wa rufaa kupatiwa, wamiliki wa programu hawatawajibika kwa kurejesha ada yoyote ya huduma iliyolipwa kwa ajili ya kuunganishwa na wanunuzi.
                      </Text>
                    {/*mwisho wa text ya 2/1*/}

                      </View>

                    <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>4. </Text>Usalama wa Malipo na Taarifa za Kibinafsi
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                       - Programu inatumia mbinu za hali ya juu za kiusalama kama usimbaji fiche (encryption) na uthibitisho wa utambulisho (authentication) ili kulinda malipo na taarifa binafsi za watumiaji.
                        </Text>
                    {/*mwisho wa text ya 2/1*/}

                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                       - Taarifa za watumiaji zitahifadhiwa kwa siri na hazitashirikishwa na wahusika wengine bila ridhaa ya watumiaji, isipokuwa inapolazimishwa na sheria.
                      </Text>
                    {/*mwisho wa text ya 2/1*/}

                      </View>




                           <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>5. </Text>Usimamizi wa Migogoro
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                      - Katika tukio la mgogoro, mtumiaji anaweza kuwasiliana na timu ya msaada wa wateja ya Mfugaji Smart kwa kutumia namba maalum ya huduma kwa wateja au kupitia barua pepe maalum iliyotolewa.
                        </Text>
                    {/*mwisho wa text ya 2/1*/}

                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                      - Timu ya msaada wa wateja itafanya juhudi za kutosha kupatanisha pande zote bila upendeleo wowote.
                      </Text>
                    {/*mwisho wa text ya 2/1*/}

                      </View>


                   </>
                   )}

                  {/*mwisho wa ITEM ya ID ya 3*/}








  {/*mwanzo wa ITEM ya ID ya 4*/}
                    {item.id == "4" && (
                      <>
                   
                    <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>6. </Text>Kipengele cha Marejesho ya Fedha kwa Matatizo ya Kiufundi
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                        - Iwapo kutakuwa na tatizo la kiufundi upande wa programu ambalo litathibitishwa kusababisha mtumiaji kutopewa huduma alizolipia, marejesho ya ada yanaweza kufanywa kulingana na utaratibu maalum. Watumiaji wanapaswa kuripoti tatizo ndani ya masaa 48 kupitia njia rasmi za mawasiliano.
                      </Text>
                    {/*mwisho wa text ya 2/1*/}

                   

                      </View>

                    <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>7. </Text>Matumizi Sahihi na Uzingatiaji wa Sheria
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                     - Watumiaji wanapaswa kufuata sheria na kanuni zote zinazohusika wakati wa kutumia programu hii. Jaribio lolote la udanganyifu au kutapeli watumiaji wengine litasababisha kusimamishwa kwa akaunti mara moja na hatua za kisheria kuchukuliwa.
                        </Text>
                    {/*mwisho wa text ya 2/1*/}

                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                         - Programu inafuata miongozo ya sheria za mtandaoni za Tanzania, ikiwa ni pamoja na Sheria ya Uhalifu wa Mtandao ya mwaka 2015 na Sheria ya Miamala ya Kielektroniki ya mwaka 2015                   

                         </Text>
                    {/*mwisho wa text ya 2/1*/}

                      </View>




                           <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>8. </Text>Maelezo kuhusu Eneo la Huduma
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                      - Huduma ya kuunganishwa na wanunuzi itapatikana katika baadhi ya maeneo ya Tanzania pekee na sio kila kona ya nchi. Maeneo yanayohudumiwa yatatangazwa kwenye programu mara kwa mara.

                        </Text>
                    {/*mwisho wa text ya 2/1*/}

                    

                      </View>


                   </>
                   )}

                  {/*mwisho wa ITEM ya ID ya 4*/}


                





                {/*mwanzo wa ITEM ya ID ya 5*/}
                    {item.id == "5" && (
                      <>
                   
                    <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>9. </Text>Marekebisho ya Sera
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                    - Marekebisho yoyote ya sera hizi yatatangazwa kupitia vyombo vya habari vya kampuni, ikiwa ni pamoja na channel ya WhatsApp na YouTube au kwenye programu moja kwa moja, ikiwa itakubalika hivyo
                      </Text>
                    {/*mwisho wa text ya 2/1*/}

                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                    -  Watumiaji watajulishwa kuhusu mabadiliko haya kupitia njia hizo.
                     </Text>
                    {/*mwisho wa text ya 2/1*/}

                   

                      </View>

                    <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>10. </Text>Uthibitisho wa Makubaliano
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                     Kwa kubonyeza kitufe cha <Text style={{
                      color:'green',
                      fontFamily:'Medium'
                     }}> "Nakubaliana na Masharti Haya,"</Text> unakubaliana kuwa umesoma, umeelewa, na unakubali kufuata sera na masharti yaliyotajwa hapo juu. Programu ya Mfugaji Smart inahifadhi haki ya kubadilisha sera hizi wakati wowote, na watumiaji watajulishwa mabadiliko hayo kupitia vyombo vya habari vya kampuni kama ilivyoelezwa hapo juu.
                      </Text>
                    {/*mwisho wa text ya 2/1*/}

                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                         - Programu inafuata miongozo ya sheria za mtandaoni za Tanzania, ikiwa ni pamoja na Sheria ya Uhalifu wa Mtandao ya mwaka 2015 na Sheria ya Miamala ya Kielektroniki ya mwaka 2015                   

                         </Text>
                    {/*mwisho wa text ya 2/1*/}

                      </View>




                           <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>11. </Text>Maelezo kuhusu Eneo la Huduma
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                      - Huduma ya kuunganishwa na wanunuzi itapatikana katika baadhi ya maeneo ya Tanzania pekee na sio kila kona ya nchi. Maeneo yanayohudumiwa yatatangazwa kwenye programu mara kwa mara.

                        </Text>
                    {/*mwisho wa text ya 2/1*/}

                    

                      </View>


                   </>
                   )}

                  {/*mwisho wa ITEM ya ID ya 5*/}






                {/*mwanzo wa ITEM ya ID ya 6*/}
                    {item.id == "6" && (
                      <>
                   
                    <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>12. </Text>Sera na faragha za watumiaji
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                    - Mfugaji Smart inaheshimu na kulinda faragha ya watumiaji wake. Taarifa zako za mawasiliano kama vile namba ya simu, eneo ulilojisajili, na barua pepe zitatumika kwa malengo yafuatayo:
                      </Text>
                    {/*mwisho wa text ya 2/1*/}

                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15,marginLeft:15, color: 'white', fontFamily: 'Light' }}>
                      1. Kukupa Kumbusho: Taarifa muhimu zinazohusiana na huduma unazohitaji, kulingana na mipangilio uliyochagua katika akaunti yako.

                     </Text>
                    {/*mwisho wa text ya 2/1*/}

                    {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15,marginLeft:15, color: 'white', fontFamily: 'Light' }}>
                      2. Habari za Masoko: Ikiwa utachagua kupokea, tutakutumia taarifa za soko na mabadiliko ya bei kupitia mpangilio wa kipengele cha "Taarifa za Masoko."
                     </Text>
                    {/*mwisho wa text ya 2/1*/}



                   

                      </View>

                    <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>13. </Text>Uonyeshaji wa Taarifa kwa Watumiaji Wengine
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                    

                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                         - Mfugaji: Ukijisajili kama mfugaji, namba yako ya simu, eneo ulilotaja, na mawasiliano yako yataonekana kwa watumiaji wengine.
                         </Text>
                    {/*mwisho wa text ya 2/1*/}

                      {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                         - 
                         Mfanyabiashara: Ukijisajili kama mfanyabiashara, mawasiliano yako, eneo, na picha ya wasifu (DP) zitaonekana pale unapoweka chapisho kwenye kipengele cha “Duka Lako” au unapopenda chapisho la watumiaji wengine.</Text>
                    {/*mwisho wa text ya 2/1*/}

                      </View>




                           <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text>14. </Text>Uhuru wa Kujitoa
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                      - Unaweza kujitoa kwenye huduma hizi wakati wowote kupitia mipangilio ya akaunti yako.

Kwa maswali zaidi au ufafanuzi, tafadhali wasiliana na huduma kwa wateja wetu.
                        </Text>
                    {/*mwisho wa text ya 2/1*/}

                    

                      </View>


                   </>
                   )}

                  {/*mwisho wa ITEM ya ID ya 6*/}








                {/*mwanzo wa ITEM ya ID ya 6*/}
                    {item.id == "7" && (
                      <>
                   
                    <Text style={[styles.title, { fontFamily: 'Medium' }]}>
                      <Text> </Text>Msaada wakati wa kujisajili
                    </Text>

                    <View style={[styles.title, { marginTop: 10 }]}>
                     {/*mwanzo wa text ya 2*/}
                      <Text style={{ marginBottom: 15, color: 'white', fontFamily: 'Light' }}>
                    - Ili kuweza kuwasiliana nasi moja kwa moja ili kupata msaada kutoka kwetu tumia namba hiyo hapo chini.
                      </Text>
                    {/*mwisho wa text ya 2/1*/}


                      </View>




          {/*  mwanzo wa Itself container*/}
              <View style={[globalStyles.ItselfMajorContainer,

                  {
                  backgroundColor:'green',
                  marginHorizontal:10,
                  width:'95%',
                  marginTop:50,
                }

                ]}>
             
             <View style={globalStyles.ItselfLeftMinorContainer}>
             <Pressable 
           // onPress={() => {   Linking.openURL(`tel:${HudumaKwaWatejaNumber}`)}}
            
             >
              <Text style={[globalStyles.ItselfLeftMinorText,
                 {
                  backgroundColor:'yellow',
                  color:'black'
                }

                ]}>0759 536 085</Text>
              </Pressable>
              </View>
             
              
            <Pressable 
           // onPress={() => {   Linking.openURL(`tel:${HudumaKwaWatejaNumber}`)}}
            
              style={globalStyles.ItselfRightMinorContainer}>
              <View >
                  <FontAwesome name='phone' 
                  size={30}
                  color='white'  
                  
                   />
              </View>
              </Pressable>
                
              </View>
             {/*  mwisho wa Itself container*/}
            

                  

                   





                   </>
                   )}

                  {/*mwisho wa ITEM ya ID ya 6*/}



                  </View>
                   </ScrollView>
                </View>
              ))}
            </ScrollView>
            <Footer />
          </ImageBackground>
        </SafeAreaView>
      )}
    </>
  );
}

export default SeraScreen;

const styles = StyleSheet.create({
  subtitle: {
    color: 'white',
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: 'white',
    marginTop: 20,
    fontFamily: 'Regular',
    width: '95%'
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 5,
  },
  getstarted: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  getstarted2:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    position:'absolute',
    right:2,
    bottom:5,

  },

   getstarted3:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    position:'absolute',
    left:2,
    bottom:5,
    borderColor:'white',
    borderWidth:1,

  },

});
