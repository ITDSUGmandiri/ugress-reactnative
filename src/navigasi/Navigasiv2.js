import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './tabs/HomeScreen';
import {Image} from 'react-native-svg';
import {HomeImg} from '../../Img/home.png';

import {ListImg} from '../../Img/jam.png';
import {height, width} from '@fortawesome/free-solid-svg-icons/faTicketAlt';
import ListJob from './tabs/ListJob';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackNavigation = () =>{
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


const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <Image source={HomeImg} style={{height: 30, width: 30}} />
          ),
        }}
      />

      <Tab.Screen
        name="Job"
        component={ListJob}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <Image source={ListImg} style={{height: 30, width: 30}} />
          ),
        }}
      />

      <Tab.Screen
        name="Pesan"
        component={ListJob}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <Image source={ListImg} style={{height: 30, width: 30}} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ListJob}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <Image source={ListImg} style={{height: 30, width: 30}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default StackNavigation;