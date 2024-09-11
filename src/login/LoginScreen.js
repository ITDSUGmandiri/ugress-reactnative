import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Modal, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../Component/Background'
import Logo from '../Component/Logo'
import Header from '../Component/Header'
import Button from '../Component/Button'
import TextInput from '../Component/TextInput'
import { theme } from '../../assets/helper/theme'
import { Link_login, token } from '../style/Link'
import { emailValidator } from '../../assets/helper/emailValidator'
import { passwordValidator } from '../../assets/helper/passwordValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';

import messaging from '@react-native-firebase/messaging';

export default function LoginScreen({ navigation }) {
  const [notif, setNotif] = useState('');
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [loading, isLoading] = useState(true);
  const [registerToken, setRegisterToken] = useState('');
  console.log(registerToken,"UG");
  const itbs = token;



  useEffect(() => {
    setTimeout(() => {
      ascdata();
      isLoading(false);

    }, 1000);
  }, []);

  const ascdata = async () => {

    const result = await AsyncStorage.getItem('username')
    cektoken();
    
    if (result != null) {
      navigation.replace('Bottom_navigasi');
    }
    else {
      AsyncStorage.clear();
    }

  };

  const lupapass = () => {
    navigation.navigate('Lupapassword');
  }

  const onLoginPressed = () => {
    const emailError = emailValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (username.value == undefined && password.value == undefined) {
      setUser({ ...username, error: "Silahkan isi Username!" })
      setPass({ ...password, error: "Silahkan isi Password!" })
      return
    }else if (emailError || passwordError) {
      setUser({ ...username, error: emailError })
      setPass({ ...password, error: passwordError })
      return
    }else{
      isLoading(true);
      fetch(Link_login, {
        method: 'POST',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        
        
        body: JSON.stringify({
          user: username.value,
          password: password.value,
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
            navigation.replace('Bottom_navigasi');
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
   
  }

  const cektoken = async () => {
    try {
      const fcmToken = await messaging().getToken();

      if (fcmToken) {
        
        setRegisterToken(fcmToken);
        //alert(fcmToken);
      } else {
        await messaging().registerDeviceForRemoteMessages();
        const fcmToken1 = await messaging().getToken();
        setRegisterToken(fcmToken1);
        //alert(fcmToken1);
      }
    } catch (error) {
      console.log("Error while fetching FCM token:", error);
    }
  };

  

  return (
    <Background>
       <Modal animationType="none"
          visible={loading}>
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: '#FFF'
          }}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        </Modal>
      <Logo /> 
      <Header>Selamat datang...</Header>
      <TextInput
        label="Username"
        value={username.value}
        onChangeText={(text) => setUser({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        autoCompleteType="username"
      />
      <TextInput
        label="Password"
        value={password.value}
        onChangeText={(text) => setPass({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={true}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={lupapass}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
      <Text style={{  top: 45, fontSize: 12, color: 'white', fontStyle: "italic", fontWeight: 'bold', textAlign: 'center' }} >powered by ITBS UG MANDIRI</Text>
          
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  row: {
    justifyContent: 'flex-end',
  },
  forgot: {
    fontSize: 13,
    color: 'white',
  },
  link: {
    fontWeight: 'bold',
    color: '#FEA812',
  },
})