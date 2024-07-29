import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
//import Geolocation from '@react-native-community/geolocation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping'
import Bg from '../.././Img/centang.png';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_,Gr_,Kn} from '../style/Style_assets';
import { DataTable } from 'react-native-paper';
const lebar ='100%';

const Detail = ({navigation,route}) => {
const itbs = token;
const { incident_id } = route.params;


const [usid, setUid] = useState('');
const [loading, isLoading] = useState(true);
const [data, setdata] = useState([]);
const [notif, setNotif] = useState('');



 useEffect(() => {
   // ascdata();
    const unsubscribe = navigation.addListener('focus', () => {
    ascdata();
    });
    //ascdata();
    return unsubscribe;
      }, [navigation]);

const ascdata = async () => 
{
  isLoading(true);
const result = await AsyncStorage.getItem('usnm')
    if (result != null) 
    {
     setNotif('');
     isLoading(false);
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };


return (
<View  style={styles.Container}> 
<Modal animationType="none" visible={loading}>
<View 
    style={{  flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Bg1_
    }}>
<ActivityIndicator size="large" color={Cl_} />
</View>
</Modal>
<ScrollView
contentContainerStyle={styles.Card}
refreshControl={
          <RefreshControl
            refreshing={loading}
             onRefresh={ascdata}
          />
        }>


<View style={styles.wrapper}>
    
          <Image source={Bg} style={styles.logo}></Image>
            <Text style={{fontSize:20, color:Gr_}}>Laporan anda sudah di terima dengan tiket {incident_id}</Text>
            
     </View>

</ScrollView>


        </View>
    )
}

export default Detail


const styles = StyleSheet.create({
Container: {
      fontFamily: "sans-serif",
      backgroundColor:Bg_,
      flex: 1,
      padding: 0,
      // remove width and height to override fixed static size
      width: null,
      height: null
    },
     Card: { 
      fontFamily: "sans-serif",
      backgroundColor: Bg_,
      flex:1,
      justifyContent: "center",
      alignItems:'center' 
      },

 wrapper: {
      justifyContent: "center",
      alignItems:'center' ,
      backgroundColor: Bg_,
      borderRadius: 15,
      flexDirection: 'column',
      padding: 10,
      color:'grey',
      margin: 5,
      width:lebar   
  },

            logo: {
      alignItems:"center",
      height: 110,
      padding:20,
      width: 160,
      marginBottom:10,
      marginTop:20
    },

      
  });
