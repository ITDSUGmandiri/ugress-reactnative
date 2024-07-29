import React, {useState, useEffect} from 'react';
//import Geolocation from '@react-native-community/geolocation';
import {
  RefreshControl,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  Modal,
  Linking,
  ImageBackground,
} from 'react-native';
import {Link_Permission, Link_outstanding, host, token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import GetLocation from 'react-native-get-location';
import {Bg_, Cl_, Bg1_, Cl1_, Bg2_, Cl2_, Cl3_} from '../style/Style_assets';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faSort} from '@fortawesome/free-solid-svg-icons/faSort';
import Logo from '../../Img/logofeat.png';
import {faHeadset} from '@fortawesome/free-solid-svg-icons/faHeadset';
import {faArrowRightArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowRightArrowLeft';
import {faTruckPickup} from '@fortawesome/free-solid-svg-icons/faTruckPickup';
import {faListCheck} from '@fortawesome/free-solid-svg-icons/faListCheck';
import {faMapPin} from '@fortawesome/free-solid-svg-icons/faMapPin';
import {faKeyboard} from '@fortawesome/free-solid-svg-icons/faKeyboard';
import {faKey} from '@fortawesome/free-solid-svg-icons/faKey';
import {faMoneyBillTransfer} from '@fortawesome/free-solid-svg-icons/faMoneyBillTransfer';
import {faExchange} from '@fortawesome/free-solid-svg-icons/faExchange';
import pp from '../.././Img/profile.png';
import Qr from '../.././Img/qr.png';
import moment from 'moment';
import 'moment/locale/id';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {DataTable} from 'react-native-paper';
const lebar_tombol = '80%';

//const wd = '100%';
const Home = ({navigation}) => {
  const itbs = token;
  const [loading, isLoading] = useState(true);
  const [usname, setUname] = useState('');
  const [type, setType] = useState('');
  const [uid, setUid] = useState('');
  const [notif, setNotif] = useState('');
  const [data, setdata] = useState([]);
  const [data_value, setdatavalue] = useState([]);
  const [location, setLocation] = useState({latitude: null, longitude: null});
  const imageURL = host + 'foto_user/' + uid + '.png?time=' + new Date();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const time = moment(new Date()).format('LLLL');
    setCurrentTime(time);

    const unsubscribe = navigation.addListener('focus', () => {
      ascdata();
      isLoading(false);
    });

    //ascdata();
    return unsubscribe;
  }, [navigation]);

  const PressableFeatureBox = ({name, icon, onPress}) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={name == '' ? true : false}
      style={styles.featureBox}>
      <Icon name={icon} size={50} color="#10104F" />
      <Text style={styles.Judulbox}>{name}</Text>
    </TouchableOpacity>
  );

  const ascdata = async () => {
    isLoading(true);
    const result = await AsyncStorage.getItem('usnm');
    const typ = await AsyncStorage.getItem('user_type');
    const usname = await AsyncStorage.getItem('username');
    const tk = await AsyncStorage.getItem('tk');

    if (typ != null) {
      setdatavalue('');
      Cek(typ, result, tk);

      setType(typ);
      setUid(result);
      setUname(usname);
      setNotif('');

      //cek_lokasi();
      isLoading(false);
    } else {
      isLoading(true);
      AsyncStorage.clear();
      navigation.replace('Login');
    }
  };

  /*
    const cek_lokasi = async () => {
       Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          alert(latitude, longitude);
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  */

  const Cek = async (typ, result, tk) => {
    fetch(Link_Permission, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: result,
        tk: tk,
        user_type: typ,
        itbs: 'itbs_v2_2',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == '1') {
          setdata(responseJson.data);
          isLoading(false);
        } else if (responseJson.status == '2') {
          isLoading(false);
          alert('Update tersedia');
          Linking.openURL(responseJson.msg);
        } else if (responseJson.status == '3') {
          isLoading(false);
          alert(responseJson.msg);
        } else if (responseJson.status == '4') {
          isLoading(false);
          alert(responseJson.msg);
          AsyncStorage.clear();
          navigation.replace('Login');
        } else if (responseJson.status == '5') {
          isLoading(false);
          alert(responseJson.msg);
          AsyncStorage.clear();
          navigation.replace('Login');
        } else {
          alert('Mohon login ulang');
          AsyncStorage.clear();
          navigation.replace('Login');
        }
      })
      .catch(error => {
        isLoading(false);
        console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const Cek_value = async result => {
    fetch(Link_outstanding, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: result,
        itbs: 'itbs_v1',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == '1') {
          setdatavalue(responseJson.data);
          isLoading(false);
        }
      })
      .catch(error => {
        isLoading(false);
        console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const Pindah_halaman = halaman => {
    navigation.navigate(halaman);
  };

  return (
   
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
       backgroundColor: '#10104F',
    }}
    >
         
      <Modal animationType="none" visible={loading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#fff',
          }}>
          <ActivityIndicator size="large" color={Cl_} />
        </View>
      </Modal>

      <View style={styles.Container}>
          <Image source={Logo} style={styles.logo}></Image>

          <Text>{currentTime}</Text>
         
        </View>

      <ScrollView
   
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={ascdata} />
        }>

<Text
            style={{
              top:10,
              textAlign:'center',
              color:'white',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            Selamat datang {usname}
          </Text>
        
        
          {type == '99' ? (
            <View style={styles.featuresContainer}>
              <PressableFeatureBox
                name="Helpdesk"
                icon="users-cog"
                onPress={() => Pindah_halaman('Helpdesk')}
              />
              <PressableFeatureBox
                name="Histori"
                icon="history"
                onPress={() => Pindah_halaman('History_tiket')}
              />
              <PressableFeatureBox
                name="Data Unit"
                icon="list-alt"
                onPress={() => Pindah_halaman('List_unit')}
              />
            </View>
          ) : type == '7' ? (
            <View style={styles.featuresContainer}>
              <PressableFeatureBox
                name="Insiden"
                icon="wrench"
                onPress={() => Pindah_halaman('Leader_list_incident')}
              />
              <PressableFeatureBox
                name="Pending"
                icon="history"
                onPress={() => Pindah_halaman('Leader_pending_incident')}
              />
              <PressableFeatureBox
                name="Histori"
                icon="list"
                onPress={() => Pindah_halaman('Leader_history_incident')}
              />
             
            </View>
          ) : type == '6' ? (
            <View style={styles.featuresContainer}>
              <PressableFeatureBox
                name="Insiden"
                icon="wrench"
                onPress={() => Pindah_halaman('Teknisi_incident')}
              />
              <PressableFeatureBox
                name="Pending"
                icon="history"
                onPress={() => Pindah_halaman('Teknisi_history')}
              />

              <PressableFeatureBox
                name=""
                icon="list"
                onPress={() => Pindah_halaman('Leader_history_incident')}
              />
             
            </View>
          ) : (
            <View style={styles.Card}>
              <View style={styles.cont2}>
                <Text
                  style={{fontSize: 12, color: 'red', fontWeight: 'normal'}}>
                  UG Mandiri
                </Text>
              </View>
            </View>
          )}

        <View style={styles.Card}>
          <View style={styles.cont2}>
            <Text style={{fontSize: 12, color: 'red', fontWeight: 'normal'}}>
              {notif}
            </Text>
          </View>
        </View>
        <View style={styles.sadle}></View>
      </ScrollView>
    </View>
  );
};
// end home

const styles = StyleSheet.create({
  featuresContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  featureBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  Container: {
    width:'100%',
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: 'sans-serif-light',
    fontWeight: 'bold',
    paddingBottom:10,
    color: 'black',
  },
  logo: {
    alignItems: 'center',
    height: 65,
    width: 260,
  },
  cont1: {
    fontFamily: 'sans-serif',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Bg_,
    paddingVertical: 10,
    elevation: 5,
    flexDirection: 'column',
    color: 'grey',
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 15,
    flex: 1,
    //height:120
  },
  Card: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    flexDirection: 'column',
    padding: 10,
    color: 'grey',
    marginBottom: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  cont1_: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  cont2: {
    fontFamily: 'sans-serif',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    paddingVertical: 10,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },

  button: {
    width: lebar_tombol,
    backgroundColor: Bg_,
    borderRadius: 8,
    paddingVertical: 13,
    borderColor: Bg1_,
    borderWidth: 2,
    //elevation: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Bg1_,
    textAlign: 'center',
    fontWeight: 'bold',
    elevation: 8,
  },
  Box_: {
    backgroundColor: Bg_,
    width: 55,
    height: 100,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    color: Cl1_,
    flex: 0,
    padding: 10,
  },
  Box: {
    flex: 0,
    backgroundColor: '#ffffff',
    width: 60,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    marginRight: 10,
    marginLeft: 10,
    color: Cl1_,
  },
  Imgbox: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    width: 30,
    height: 30,
    justifyContent: 'center',
    top: 15,
  },
  Judulbox: {
    fontSize: 10,
    color: 'grey',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  sadle: {
    backgroundColor: 'transparent',
    height: 50,
    width: 'auto',
    bottom: 0,
  },
  Judul_table: {
    fontSize: 18,
    color: 'red',
    marginTop: 5,
    textAlign: 'left',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 10,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderColor: 'grey',
    padding: 10,
    elevation: 1,
  },
});

export default Home;
