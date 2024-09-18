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
  ActivityIndicator,
  Alert,
  Pressable,
} from 'react-native';
import {
  Cek_profile,
  Foto_profile,
  Link_ganti_password,
  token,
} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import {Bg_, Cl_, Bg1_, Cl1_, Bg2_, Cl2_, Cl3_} from '../style/Style_assets';
import ImagePicker from 'react-native-image-crop-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons/faGear';
import {faSignature} from '@fortawesome/free-solid-svg-icons/faSignature';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


import TextInput from '../Component/TextInput';

import {theme} from '../../assets/helper/theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {width} from '@fortawesome/free-solid-svg-icons/faTicketAlt';

const lebar = '100%';
const lebar_tombol = '80%';
const Profile = ({navigation}) => {
  const itbs = token;
  const [user, setUid] = useState('');
  const [loading, isLoading] = useState(false);
  const [nip, setnip] = useState('');
  const [jabatan, setjabatan] = useState('');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [reg, setreg] = useState('');
  const [telp, settelp] = useState('');
  const [notif, setNotif] = useState('');
  const [vinput, setInput] = useState(false);
  const [lama, setpasslama] = useState('');
  const [baru, setpassbaru] = useState('');
  useEffect(() => {
    isLoading(true);
    setTimeout(() => {
      ascdata();
    }, 1000);
  }, []);
  const [imageSource, setImageSource] = useState(null);
  const [imagemime, setImageMime] = useState(null);
  const ascdata = async () => {
    isLoading(true);
    const result = await AsyncStorage.getItem('usnm');
    if (result != null) {
      Cek(result);
      setUid(result);
      //isLoading(false);
    } else {
      isLoading(true);
      AsyncStorage.clear();
      navigation.replace('Login');
    }
  };

  const Cek = async usr => {
    fetch(Cek_profile, {
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
        if (responseJson.status == '1') {
          console.log(responseJson);
          isLoading(false);
          setnip(responseJson.nip);
          setjabatan(responseJson.jabatan);
          setemail(responseJson.email);
          setusername(responseJson.username);
          settelp(responseJson.telp);
          setreg(responseJson.regional);
          setImageSource(null);
        } else {
          isLoading(false);
          alert('Gagal load profil');
        }
      })
      .catch(error => {
        isLoading(false);
        console.error(error);
        alert('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const Simpan = async () => {
    isLoading(true);
    if (baru == '' || lama == '') {
      isLoading(false);
      alert('Password lama dan baru tidak boleh kosong');
    } else if (baru == lama) {
      isLoading(false);
      alert('Password lama dan baru tidak boleh sama');
    } else {
      fetch(Link_ganti_password, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
          lama: lama,
          baru: baru,
          itbs: itbs,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.status == '1') {
            alert('Berhasil');
            setInput(false);
            isLoading(false);
          } else {
            isLoading(false);
            alert(responseJson.status);
          }
        })
        .catch(error => {
          isLoading(false);
          //console.error(error);
          alert('Upps ada kesalahan mohon coba lagi !!');
        });
    }
  };

  /*
const Submit = () => {

  if (imageSource == null)
{
  isLoading(false);
   alert("Gambar Kosong");
}

else {

  isLoading(true);
    const nm = iudstrg+'.png';
            const dataa = new FormData();
            dataa.append('image', {
                type: "image/jpeg",
                name: nm,
                uri: imageSource
              })
         fetch(Foto_profile, {
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
  if(responseJson.status == '1')
          {
          ascdata();
    
          isLoading(false);
     
                Alert.alert('Berhasil terupload');
          }
          else{
          ascdata();
          Alert.alert(responseJson.status);
          } 
           }).catch((error) =>
           {
            ascdata();
            
              isLoading(false);
             
                Alert.alert(' Foto gagal terupload');
           });
          }
          };

 */
  const gantipass = () => {
    setInput(true);
    setpasslama('');
    setpassbaru('');
  };

  const Ambilfoto = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        noData: true,
      },
    };
    //ImagePicker.openCamera({
    ImagePicker.openPicker({
      width: 350,
      height: 350,
      maxHeight: 1000,
      compressImageMaxWidth: 350,
      compressImageMaxHeight: 350,
      compressImageQuality: 1,
      //compressVideoPreset: 'HightQuality',
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
            backgroundColor: 'transparent',
          }}>
          <ActivityIndicator size="large" color={Cl_} />
        </View>
      </Modal>

      {/* <Modal animationType="none" visible={vinput}>
        <View style={{padding: 10, paddingVertical: 30}}>
          <Text style={{fontFamily: 'sans-serif', margin: 1, fontSize: 20}}>
            Password lama
          </Text>

          <TextInput
            style={styles.inputBox}
            placeholder="password lama"
            spellCheck={false}
            value={lama}
            autoCorrect={false}
            secureTextEntry={true}
            keyboardType="text"
            onChangeText={value => setpasslama(value)}
          />

          <Text style={{fontFamily: 'sans-serif', margin: 1, fontSize: 20}}>
            Password baru
          </Text>

          <TextInput
            style={styles.inputBox}
            placeholder="password baru"
            value={baru}
            spellCheck={false}
            autoCorrect={false}
            secureTextEntry={true}
            keyboardType="text"
            onChangeText={value => setpassbaru(value)}
          />
        </View>
        <View style={styles.cnt}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => setInput(false)}
            activeOpacity={0.6}>
            <Text style={styles.buttonText}>Kembali</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => Simpan()}
            activeOpacity={0.6}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={{flex: 1}}>
            <Text style={styles.name}>Selamat Datang</Text>
            <Text style={styles.userInfo}>
              {username} / {jabatan}
            </Text>
            <Text style={{fontSize: 14, color: 'white'}}>{email}</Text>
          </View>
          <View>
            <Image style={styles.avatar} source={require('../../Img/qr.png')} />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={ascdata} />
        }>
        <View style={styles.Card1}>
          <Text>
            Halaman Profil Sedang Dalam Perbaikan{' '}
            <FontAwesomeIcon icon={faExclamationTriangle} size={20} />
          </Text>
          
          {/* <TextInput
              label="NIP"
              value={nip}
              onChangeText={text => setUser({value: text, error: ''})}
              autoCapitalize="none"
              autoCompleteType="username"
            />
            
            <TextInput
              label="USERNAME"
              value={username}
              // onChangeText={text => setPass({value: text, error: ''})}
            />

            <TextInput
              label="E-mail"
              value={email}
              // onChangeText={text => setPass({value: text, error: ''})}
            />

            <TextInput
              label="Telepone"
              value={telp}
              // onChangeText={text => setPass({value: text, error: ''})}
            />

            <TextInput
              label="Regional"
              value={reg}
              // onChangeText={text => setPass({value: text, error: ''})}
            />


           
          
            <View style={styles.BoxPass}>
            <TextInput
              label="Password"
              value={reg}
              style={{width:165}}
              // onChangeText={text => setPass({value: text, error: ''})}
            />
              <TouchableOpacity onPress={() => gantipass()}>
                <FontAwesomeIcon
                  icon={faGear}
                  style={styles.Imgbox}
                  size={32}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.Box_}>
              <TouchableOpacity
                style={styles.Box}
                onPress={() => navigation.navigate('User_signature')}>
                <FontAwesomeIcon
                  icon={faSignature}
                  style={styles.Imgbox}
                  size={32}
                />
              </TouchableOpacity>
              <Text style={styles.Judulbox}>Tambah Signature</Text>
            </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.surface,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
  Container: {
    fontFamily: 'sans-serif',
    backgroundColor: Bg_,
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    justifyContent: 'center',
  },

  Card: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif-light',
    fontWeight: 'normal',
    marginBottom: 20,
  },

  Card1: {
    fontFamily: 'sans-serif',
    justifyContent: 'center',
    //alignItems:"center",
    // flex: 1,
    margin: 10,
    backgroundColor: 'white',
    paddingVertical: 15,
    elevation: 5,
    flexDirection: 'column',
    padding: 10,
    color: 'grey',
    borderRadius: 15,
  },
  button: {
    width: lebar_tombol,
    backgroundColor: Bg2_,
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 13,
    elevation: 8,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Cl_,
    textAlign: 'center',
  },
  BoxPass: {
    flex: 1,
    right: 0,
    flexDirection: 'row',
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
    backgroundColor: '#ffffff',
    height: 60,
    borderRadius: 15,
    color: Cl1_,
  },
  Imgbox: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',

    height: 30,
    justifyContent: 'center',
    top: 15,
  },
  Judulbox: {
    fontSize: 10,
    color: 'grey',
    marginTop: 5,
    width: 65,
    height: 60,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    //fontWeight: 'normal',
    margin: 10,
  },
  button1: {
    width: '50%',
    backgroundColor: Bg2_,
    marginVertical: 10,
    paddingVertical: 13,
  },
  button2: {
    width: '50%',
    backgroundColor: Cl2_,
    marginVertical: 10,
    paddingVertical: 13,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: Cl_,
    textAlign: 'center',
  },
  cnt: {
    fontFamily: 'sans-serif',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    flex: 1,
    // remove width and height to override fixed static size
    width: lebar,
    height: null,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  // new design

  header: {
    backgroundColor: '#000060',
    backgroundSize: 'contain',
    height: 150,
  },

  headerContent: {
    padding: 30,
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatar: {
    width: 100,
    height: 100,
    color: Colors.white,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 10,
    // float: "right"
  },

  name: {
    fontSize: 22,
    color: 'white',
    // fontWeight: "600",
    fontFamily: 'Helvetica',
  },
  headtText: {
    fontFamily: 'Helvetica',
    color: 'grey',
    // fontWeight: "600",
    // float: "left",
    marginLeft: 20,
    marginTop: 10,
  },
  SubjectText: {
    color: 'white',
    // fontWeight: "550",
    fontSize: 16,
    fontFamily: 'Helvetica',
    // float: "left",
    marginLeft: 20,
    marginTop: 10,
  },
  userInfo: {
    fontSize: 16,
    color: 'white',
    // fontWeight: "600"
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#3B525F',
    borderRadius: 10,
    width: 200,
    height: 50,
    alignItems: 'center',
    padding: '6px',
    elevation: 3,
  },

  text: {
    color: 'white',
    margin: 10,
  },
  RectangleShapeView: {
    marginTop: 20,
    // width: '80%',
    height: 80,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    elevation: 3,
  },
});
