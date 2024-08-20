
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, TextInput, View, Text, TouchableOpacity, Image, Modal, Alert, ScrollView, RefreshControl,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Bg_, Cl_, Bg1_, Cl1_, Bg2_, Cl2_, Kn } from '../style/Style_assets';

// const token = 'itbs_v1';
import { Link_login, token } from '../style/Link';

import Logo from '../../Img/logofeat.png';
//import GetLocation from 'react-native-get-location';
import messaging from '@react-native-firebase/messaging';

const lebar = '90%';
const tinggi = '36%';
const lebar_logo = '100%';
const lebar_tombol = '80%';

const Login = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {

      ascdata();
      isLoading(false);

    }, 1000);
  }, []);

  const ascdata = async () => {

    const result = await AsyncStorage.getItem('usnm');
    if (result != null) {
      navigation.replace('Bottom_navigasi');
    }else {
      cektoken();
      AsyncStorage.clear();
    }

  };

  const [registerToken, setRegisterToken] = useState('');

  // const cektoken = async () => {
  //   try {
  //     // const fcmToken = await messaging().getToken();
    
  //     if (fcmToken) {
  //       console.log(fcmToken,"CC");
  //       setRegisterToken(fcmToken);
  //       //alert(fcmToken);
  //     } else {
  //       console.log(result,"OOO");
  //       await messaging().registerDeviceForRemoteMessages();
  //       const fcmToken1 = await messaging().getToken();
  //       setRegisterToken(fcmToken1);
  //       //alert(fcmToken1);
  //     }
  //   } catch (error) {
  //     console.log("Error while fetching FCM token:", error);
  //   }
  // };

  const itbs = token;
  const [notif, setNotif] = useState('');
  const [usnm, setText] = useState('');
  const [pass, setPass] = useState('');
  const [iudstrg, setUid] = useState('');

  const [loading, isLoading] = useState(true);

  const daftar = () => {
    navigation.navigate('Formdaftar');
  }

  const lupapass = () => {
    navigation.navigate('Lupapassword');
  }

  const onsub = () => {
    //  GetLocation.getCurrentPosition({
    //  enableHighAccuracy: false,
    // timeout: 15000,
    //   })
    // .then(location => {
    if (usnm == "") {
      setNotif("Username tidak boleh kosong");
    }
    else if (pass == "") {
      setNotif("Password tidak boleh kosong");
    }
    else {
      console.log(registerToken,"RR");
      isLoading(true);
      fetch(Link_login, {
        method: 'POST',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: usnm,
          password: pass,
          tok_ken: registerToken,
          itbs: itbs
        })
      }).then((response) => response.json())
        .then((responseJson) => {

          if (responseJson.status === 'Berhasil') {

            AsyncStorage.setItem('usnm', responseJson.usid);
            AsyncStorage.setItem('username', responseJson.nama);
            AsyncStorage.setItem('tk', responseJson.srt);
            AsyncStorage.setItem('user_type', responseJson.type);

            navigation.replace('Splash_screen');

          }
          else {
            isLoading(false);
            setNotif(responseJson.status);
          }
        }).catch((error) => {
          isLoading(false);
          setNotif('Mohon maaf anda gagal masuk');
          console.error(error);
        });

    }

  

  };

  return (

    <View style={styles.container}>
      <ScrollView style={styles.scview}>

      

        <View style={styles.Card}>
          
          <View style={styles.logo}>
            <Image source={Logo} style={{
              width: 290, height: 270,

              justifyContent: "center",
            }}></Image>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center", width: lebar_logo, }}>
            <Text style={{ color: Cl_, fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 25 }} >Residence System</Text>
            <Text style={{ margin: 5, fontSize: 12, color: Cl2_, fontWeight: 'normal' }}>{notif}</Text>

            <TextInput style={styles.inputBox}
              placeholder="Username"
              spellCheck={false}
              autoCorrect={false}
              onChangeText={text => setText(text)}
            />

            <TextInput style={styles.inputBox}
              placeholder="Password"
              secureTextEntry={true}
              //value={pass}
              onChangeText={pass => setPass(pass)}
            />

            <TouchableOpacity style={styles.button}
              onPress={onsub}
              activeOpacity={0.6}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            {
            /*<TouchableOpacity 
            onPress={daftar}
            activeOpacity={0.6}>
            <Text style={{fontFamily: "sans-serif",color: Cl_,fontWeight:'bold',}}> Belum punya akun ? Daftar di sini </Text>
            </TouchableOpacity> */
            }

            <TouchableOpacity style={{
              //borderStyle: 'solid',
              //borderWidth: 1,
              borderColor: Cl1_,
              backgroundColor: Bg1_,
              borderRadius: 10,
              marginVertical: 5,
              padding: 5,
              }}

              onPress={lupapass}
              activeOpacity={0.6}
            >

            {/*<Text style={{  fontFamily: "sans-serif",color: Cl_,fontWeight:'bold'}}>Lupa password</Text> */}

            </TouchableOpacity>

          </View>

          <Text style={{ color: Bg_, fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginTop: 25 }} >powered by ITBS UG MANDIRI</Text>
          
        </View>
      </ScrollView>
    </View>

  );

}
// end login component

const styles = StyleSheet.create({
  container: {
    fontFamily: "sans-serif",
    backgroundColor: Bg_,
    flex: 1,
    padding: 0,
    // remove width and height to override fixed static size
    width: null,
    height: null

  },
  scview: {
    fontFamily: "sans-serif",
    backgroundColor: Bg_,
    backgroundColor: Bg1_,
    borderBottomRightRadius: 100,
  },
  logo: {
    alignItems: "center",
    //borderBottomRightRadius:50,
    borderBottomLeftRadius: 100,
    justifyContent: "center",
    height: 310,
    width: lebar_logo,
    backgroundColor: Bg_,
    top: 0,
  },
  Card: {

    fontFamily: "sans-serif",
    alignItems: "center",
    backgroundColor: Bg1_,
    flex: 1,
    margin: 0,
    borderBottomRightRadius: 100,
    height: '100%',
    // borderBottomLeftRadius:100,  


  },

  inputBox: {
    width: lebar,
    backgroundColor: Bg_,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Cl1_,
    marginVertical: 10,
    elevation: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Cl_,
    textAlign: 'center',

  },
  button: {
    width: lebar_tombol,
    backgroundColor: Bg2_,
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 13,
    elevation: 8,
  },

});

export default Login;