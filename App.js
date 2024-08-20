import React,{Component,useEffect} from 'react';
import { StyleSheet,View,SafeAreaView } from 'react-native';
import Navigasi from './src/navigasi/Navigasi';
//import { NavigationContainer } from '@react-navigation/native';
import GlobalStyles from './src/style/GlobalStyles';

import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { LogBox } from 'react-native';
//import PushNotification, {Importance} from 'react-native-push-notification';
//import { ReactNativeFirebase } from '@react-native-firebase/app';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); 


const App = ({navigation}) => {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

      Alert.alert(
        //title
        'Tiket Laporan',
        //body
        'Tanggal : '+remoteMessage.data.date+'\n'+
        'Detail : '+remoteMessage.data.other_data+'\n',
        [
          {
            text: 'Lihat',
            // onPress: () => navigation.replace('Leader_list_incident')
          },
          {
            text: 'Tutup',
            onPress: () => console.log('No Pressed'), style: 'cancel'
          },
        ],
        {cancelable: false},
        // clicking out side of alert will not cancel
        
      );
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
    
  
    <View style={styles.cnt_app}>
    <Navigasi/>
     
   </View>
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
cnt_app: {
  backgroundColor:'#ffffff',
  flex: 1,
  // remove width and height to override fixed static size
  resizeMode: 'cover',
  color:'#000060'

},


});
export default App;


