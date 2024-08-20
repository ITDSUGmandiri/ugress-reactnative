import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Absen_masuk_wfh,
  Absen_keluar_wfh,
  Cek_absen,
  token,
} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
//import { ScrollView } from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';
//import ref from '../.././Img/refresh.png';
import {Bg_, Cl_, Bg1_, Cl1_, Bg2_, Cl2_, Cl3_} from '../style/Style_assets';
const lebar = '100%';
const lebar_tombol = '80%';
const Wfh = ({navigation}) => {
  const itbs = token;
  const [iudstrg, setUid] = useState('');
  const [loading, isLoading] = useState(true);
  const [imageSource, setImageSource] = useState(null);
  const [imagemime, setImageMime] = useState(null);
  const [ket, setKet] = useState('');
  const [t_in, setTin] = useState('');
  const [t_out, setTout] = useState('');
  const [notif, setNotif] = useState('');
  const [telat, setTel] = useState('');
  const [pul_cepat, setPul] = useState('');
  useEffect(() => {
    isLoading(true);
    setTimeout(() => {
      ascdata();
    }, 1000);
  }, []);

  const ascdata = async () => {
    isLoading(true);
    const result = await AsyncStorage.getItem('usnm');
    if (result != null) {
      Cek(result);
      setUid(result);
      isLoading(false);
    } else {
      isLoading(true);
      AsyncStorage.clear();
      navigation.replace('Login');
    }
  };

  const Cek = async usr => {
    //isLoading(true);
    fetch(Cek_absen, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: usr,
        itbs: itbs,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === '1') {
          isLoading(false);
          setTin(responseJson.in);
          setTout(responseJson.out);
          setKet('');
          setImageSource(null);
          setImageMime(null);
          setTel(responseJson.telat);
          setPul(responseJson.pul_cepat);
        } else {
          isLoading(false);
          setTin('');
          setTout('');
          setKet('');
          setImageSource(null);
          setImageMime(null);
          setTel('');
          setPul('');
        }
      })
      .catch(error => {
        isLoading(false);
        console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const add_Wfh = async () => {
    setNotif('');
    isLoading(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 50000,
    })
      .then(location => {
        if (ket == '') {
          Alert.alert('Keterangan tidak boleh kosong');
          isLoading(false);
        } else {
          fetch(Absen_masuk_wfh, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: iudstrg,
              ket: ket,
              lat: location.latitude,
              long: location.longitude,
              itbs: itbs,
            }),
          })
            .then(response => response.json())
            .then(responseJson => {
              //isLoading(false);
              if (responseJson.status == '1') {
                isLoading(false);
                Alert.alert('Berhasil absen');
                Cek(iudstrg);
              } else {
                isLoading(false);
                Alert.alert('Gagal absen');
                Cek(iudstrg);
              }
            })
            .catch(error => {
              isLoading(false);
              //Alert.alert('Mohon maaf anda gagal melakukan tambah foto');
              console.error(error);
              //this.setState({ loading: false, disabled: false });
            });
        }
      })
      .catch(error => {
        isLoading(false);
        Alert.alert('Upss', 'Untuk melanjutkan mohon aktifkan lokasi anda');
      });
  };

  const out_Wfh = async () => {
    setNotif('');
    isLoading(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 50000,
    })
      .then(location => {
        if (ket == '') {
          Alert.alert('Keterangan tidak boleh kosong');
          isLoading(false);
        } else {
          fetch(Absen_keluar_wfh, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: iudstrg,
              ket: ket,
              lat: location.latitude,
              long: location.longitude,
              itbs: itbs,
            }),
          })
            .then(response => response.json())
            .then(responseJson => {
              //isLoading(false);
              if (responseJson.status == '1') {
                /*      
            const nm = responseJson.nama;
            const dataa = new FormData();
            dataa.append('image', {
                type: "image/jpeg",
                name: nm,
                uri: imageSource
              })
         fetch(Wfh_in_pic, {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            },
              body:dataa
           }
           )
           .then((response) => response.json())
           .then((responseJson) =>
           {
             isLoading(false);
             Alert.alert(responseJson.status);
              Cek(iudstrg);
           }).catch((error) =>
           {
            isLoading(false);
            Alert.alert(responseJson.status);
           Cek(iudstrg);
            //console.error(error);
             
           });
           */
                isLoading(false);
                Alert.alert('Berhasil absen');
                Cek(iudstrg);
              } else {
                isLoading(false);
                Alert.alert('Gagal absen');
                Cek(iudstrg);
              }
            })
            .catch(error => {
              isLoading(false);
              //Alert.alert('Mohon maaf anda gagal melakukan tambah foto');
              console.error(error);

              //this.setState({ loading: false, disabled: false });
            });
        }
      })
      .catch(error => {
        isLoading(false);
        Alert.alert('Upss', 'Untuk melanjutkan mohon aktifkan lokasi anda', [
          // {
          //  text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          //  style: "cancel"
          // },
          {text: 'OK', onPress: () => GetLocation.openGpsSettings()},
        ]);
      });
  };

  const Ambilfoto = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        noData: true,
      },
    };
    ImagePicker.openCamera({
      //ImagePicker.openPicker({
      width: 300,
      height: 340,
      maxHeight: 1000,
      cropping: true,
    })
      .then(image => {
        //console.log(image);
        setImageSource(image.path);
        setImageMime(image.mime);
      })
      .catch(e => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          //console.log(e);
          Alert.alert(
            'Sorry, there was an issue attempting to get the image/video you selected. Please try again',
          );
        }
      });
  };

  return (
    <View style={styles.Container}>
      <Modal animationType="none" visible={loading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Bg1_,
          }}>
          <ActivityIndicator size="large" color={Cl_} />
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={ascdata} />
        }>
        <View>
          {/*
<View style={styles.Card}>
<TouchableOpacity onPress={Ambilfoto}>
<View style={{backgroundColor:Bg_,width:180,height:220,alignItems:'center',justifyContent:'center'}} 
activeOpacity={0.5}>
<Image source={{uri : imageSource}} 
style={{width:180,height:220,borderWidth:2,borderColor:'#5DCAED',resizeMode:'contain'}}/>
</View>
<Text style={{color:'grey',fontSize:16,fontWeight:'bold',textAlign:'center'}} >Foto Selfie</Text> 
</TouchableOpacity>
</View>
*/}

          <Text style={{fontSize: 14, color: 'grey', fontWeight: 'normal'}}>
            Absen Masuk :
          </Text>
          {telat == '1' ? (
            <Text style={{fontSize: 16, color: 'red', fontWeight: 'normal'}}>
              {t_in}
            </Text>
          ) : (
            <Text style={{fontSize: 16, color: 'green', fontWeight: 'normal'}}>
              {t_in}
            </Text>
          )}
          <Text style={{fontSize: 14, color: 'grey', fontWeight: 'normal'}}>
            Absen Pulang :
          </Text>
          {pul_cepat == '1' ? (
            <Text style={{fontSize: 16, color: 'red', fontWeight: 'normal'}}>
              {t_out}
            </Text>
          ) : (
            <Text style={{fontSize: 16, color: 'green', fontWeight: 'normal'}}>
              {t_out}
            </Text>
          )}

          <Text style={styles.label}>Keterangan</Text>
          <TextInput
            style={styles.inputBox}
            placeholder=""
            multiline={true}
            numberOfLines={8}
            value={ket}
            onChangeText={ket => setKet(ket)}
          />

          {(t_in == '' && t_out == '') ||
          (t_in == '00:00:00' && t_out == '00:00:00') ? (
            <View style={styles.cont2}>
              <TouchableOpacity
                style={styles.button}
                onPress={add_Wfh}
                activeOpacity={0.6}>
                <Text style={styles.buttonText}>Absen Masuk</Text>
              </TouchableOpacity>
            </View>
          ) : (t_in != '' && t_out == '00:00:00') ||
            (t_in != '' && t_out == '') ? (
            <View style={styles.cont2}>
              <TouchableOpacity
                style={styles.button}
                onPress={out_Wfh}
                activeOpacity={0.6}>
                <Text style={styles.buttonText}>Absen Keluar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cont2}></View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Wfh;

const styles = StyleSheet.create({
  Container: {
    fontFamily: 'sans-serif',
    backgroundColor: Bg_,
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    padding: 10,
  },
  Card: {
    backgroundColor: Bg_,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  Card1: {
    backgroundColor: Bg_,
    borderRadius: 15,
    elevation: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  label: {
    marginTop: 5,
    fontFamily: 'sans-serif',
    fontSize: 14,
    margin: 1,
    color: 'grey',
    fontWeight: 'normal',
  },
  inputBox: {
    borderColor: Bg1_,
    borderStyle: 'solid',
    width: lebar,
    borderWidth: 1,
    backgroundColor: Bg_,
    paddingHorizontal: 2,
    fontSize: 14,
    color: 'grey',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Bg_,
    textAlign: 'center',
  },
  button: {
    width: lebar_tombol,
    backgroundColor: Bg2_,
    borderRadius: 8,
    paddingVertical: 13,
    elevation: 8,
  },
  cont2: {
    //position :'absolute',
    bottom: 0,
    marginTop: 15,
    elevation: 0,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
