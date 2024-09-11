import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../Img/sp_masiin.png';
import { Bg_, Cl1_, Bg1_ } from '../style/Style_assets';
import { PermissionsAndroid, BackHandler } from 'react-native';
const lebar = '100%';

const Splash_screen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      lok();
    }, 2000);
  }, []);

  const ascdata = async () => {

    try {

      const result = await AsyncStorage.getItem('usnm')
      console.log(result,"NN");
      if (result !== null) {
        navigation.replace('Bottom_navigasi');
      }
      else {
        AsyncStorage.clear();
        navigation.replace('Login');

      }
    } catch (e) {
      AsyncStorage.clear();
      navigation.replace('Login');
    }

  }

  const lok = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permintaan akses lokasi",
          message:
            "Aplikasi akan mengakses lokasi anda",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("You can use the location")
        // alert("You can use the location");
        ascdata();
      } else {
        //console.log("location permission denied")
        alert("Mohon berikan akses lokasi");
        BackHandler.exitApp();
      }
    } catch (err) {
      //console.warn(err)
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={Logo} style={styles.image}></Image>
      </View>
    </View>
  )

}

export default Splash_screen

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({

  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Bg_,
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    fontFamily: "sans-serif"
  },
  logo: {
    height: windowHeight,
    width: windowWidth,
    borderWidth: 2,
    borderColor: '#000',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },

});