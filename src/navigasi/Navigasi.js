// In App.js in a new project

import React, {useState} from 'react';
import { View, Image, Text, Modal, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useColorScheme } from 'react-native';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  Splash_screen,
  Login, Logout,
  Home,
  Chat,
  Profile, User_signature,
  Helpdesk,
  History_tiket,
  List_unit, Detail_unit_data,
  Detail_helpdesk,
  Teknisi_history, Teknisi_incident, Teknisi_pengecekan, Teknisi_progres, Detail_tiket_update, Teknisi_pending, Teknisi_finish, Teknisi_tambah_foto, Ttd, Teknisi_input_biaya,
  Leader_list_incident, Leader_history_incident, Leader_detail_incident, Leader_pending_incident
} from '../pages/Pages';

import logout from '../.././Img/logout.png';
import gm from '../.././Img/home.png';
import pg from '../.././Img/chat.png';
import pp from '../.././Img/profile.png';
import logoutIcon from '../.././Img/logout.png';
import { Bg_, Cl3_, Bg1_, Cl1_ } from '../style/Style_assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';


const Tabs = createMaterialBottomTabNavigator();





const Tab = createBottomTabNavigator();

const IconBottom = (warna) => {
  const { color, focused } = warna.data
  console.log(warna.name);
  let colorSelected = warna.name == 'logout' ? 'red' : focused ? Cl3_ : Bg1_
  return (
    <View>
      <Image source={warna.im} style={{  width: 30, height: 30, margin: 0, tintColor: colorSelected }} />
    </View>
  )
}


const Bottom_navigasi = ({navigation}) => {
  const [isVisible, setVisible] = useState(true);
  const toggleVisibility = () => setVisible(!isVisible);
  const staticImage = require("../../Img/exit.png");



const Modal = () => {
  return(
  <Modal visible={isVisible} animationType="fade" transparent={true} onRequestClose={() => toggleVisibility()}>
  <TouchableOpacity style={styles.modalContainer} onPressOut={() => toggleVisibility()}>
      <View style={styles.modalView}>
          <View style={styles.alert}>
            <Text style={styles.alertTitle}>Attention!</Text>
            <Text style={styles.alertMessage}>Your account has been activated.</Text>
            <View style={styles.alertButtonGroup}>
              <View style={styles.alertButton}>
                  <Button title="OK" onPress={() => toggleVisibility()} />
              </View>
            </View>
          </View>
      </View>
    </TouchableOpacity>
  </Modal>
  );
}


  return (
    <Tabs.Navigator
      initialRouteName="Feed"
    >
      <Tabs.Screen
        name="Feed"
        component={Home}
        options={{          
          tabBarLabel: 'Beranda',
          tabBarIcon: (warna) => (
            <IconBottom data={warna} im={gm}/>
        )
        }}
      />
       <Tabs.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Pesan',
          tabBarIcon: (warna) => (
            <IconBottom data={warna} im={pg}/>
        )
        }}
      />
      <Tabs.Screen
        name="Notifications"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: (warna) => (
            <IconBottom data={warna} im={pp}/>
        )
        }}
      />

<Tabs.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarLabel: 'Logout',
         
          tabBarIcon: (warna) => (
            <IconBottom data={warna} im={logoutIcon} name='logout'/>
        )
        }}
      />
     
    </Tabs.Navigator>
  );

};

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer theme={useColorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Splash_screen">

        <Stack.Screen name="Bottom_navigasi" component={Bottom_navigasi} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Splash_screen" component={Splash_screen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

        <Stack.Screen name="User_signature" component={User_signature} options={{
          headerShown: true,
          title: "Signature"
        }} />

        <Stack.Screen name="ChatRoom" component={Chat} options={{
          headerShown: true,
          title: "ChatRoom"
        }} />

        <Stack.Screen name="Helpdesk" component={Helpdesk} options={{
          headerShown: true,
          title: "Helpdesk"
        }} />

        <Stack.Screen name="Detail_helpdesk" component={Detail_helpdesk} options={{
          headerShown: true,
          title: "Detail"
        }} />

        <Stack.Screen name="History_tiket" component={History_tiket} options={{
          headerShown: true,
          title: "History Laporan"
        }} />

        <Stack.Screen name="List_unit" component={List_unit} options={{
          headerShown: true,
          title: "Unit"
        }} />

        <Stack.Screen name="Detail_unit_data" component={Detail_unit_data} options={{
          headerShown: true,
          title: "Unit"
        }} />

        <Stack.Screen name="Teknisi_history" component={Teknisi_history} options={{
          headerShown: true,
          title: "History"
        }} />

        <Stack.Screen name="Teknisi_incident" component={Teknisi_incident} options={{
          headerShown: true,
          title: "Incident"
        }} />

        <Stack.Screen name="Teknisi_pengecekan" component={Teknisi_pengecekan} options={{
          headerShown: true,
          title: "Pengecekan"
        }} />

        <Stack.Screen name="Teknisi_progres" component={Teknisi_progres} options={{
          headerShown: true,
          title: "Progres"
        }} />

        <Stack.Screen name="Detail_tiket_update" component={Detail_tiket_update} options={{
          headerShown: true,
          title: "Form progres"
        }} />

        <Stack.Screen name="Teknisi_pending" component={Teknisi_pending} options={{
          headerShown: true,
          title: "Pending"
        }} />

        <Stack.Screen name="Teknisi_finish" component={Teknisi_finish} options={{
          headerShown: true,
          title: "Finish"
        }} />

        <Stack.Screen name="Teknisi_tambah_foto" component={Teknisi_tambah_foto} options={{
          headerShown: true,
          title: "Tambah Foto"
        }} />

        <Stack.Screen name="Teknisi_input_biaya" component={Teknisi_input_biaya} options={{
          headerShown: true,
          title: "Input Biaya"
        }} />

        <Stack.Screen name="Leader_list_incident" component={Leader_list_incident} options={{
          headerShown: true,
          title: "List incident leader"
        }} />

        <Stack.Screen name="Leader_history_incident" component={Leader_history_incident} options={{
          headerShown: true,
          title: "History incident leader"
        }} />

        <Stack.Screen name="Leader_detail_incident" component={Leader_detail_incident} options={{
          headerShown: true,
          title: "Detail incident leader"
        }} />

        <Stack.Screen name="Leader_pending_incident" component={Leader_pending_incident} options={{
          headerShown: true,
          title: "Pending incident leader"
        }} />

        <Stack.Screen name="Ttd" component={Ttd} options={{
          headerShown: true,
          title: "Signature"
        }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  // container:{
  //     display:'flex',
  //     flex:1,
  //     justifyContent:'center',
  //     alignContent:'center',
  //     backgroundColor:'#fff'
  // },
  modalContainer:{
      backgroundColor:"#ccc",
      top:0,
      left:0,
      right:0,
      bottom:0,
      position:'absolute',
  },
  modalView:{
      flex:1,
      alignContent:'center',
      justifyContent:'center'
  },
  alert:{
      width:'100%',
      maxWidth:300,
      margin:48,
      elevation:24,
      borderRadius:2,
      backgroundColor:'#fff'
  },
  alertTitle:{
      margin:24,
      fontWeight:"bold",
      fontSize:24,
      color:"#000"
  },
  alertMessage:{
      marginLeft:24,
      marginRight:24,
      marginBottom:24,
      fontSize:16,
      color:"#000"
  },
  alertButtonGroup:{
      marginTop:0,
      marginRight:0,
      marginBottom:8,
      marginLeft:24,
      padding:10,
      display:"flex",
      flexDirection:'row',
      justifyContent:"flex-end"
  },
  alertButton:{
      marginTop:12,
      marginRight:8,
      width:100
  },
});

export default App;