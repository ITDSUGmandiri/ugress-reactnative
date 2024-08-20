import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {Detail_unit_link,token,host} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
//import Geolocation from '@react-native-community/geolocation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons/faTicketAlt'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import Bg from '../.././Img/centang.png';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_,Gr_,Kn} from '../style/Style_assets';
import { DataTable } from 'react-native-paper';
import {ImageFullscreen} from '../pages/Pages';

const lebar ='100%';

const Detail_unit = ({navigation,route}) => {
const itbs = token;
const { unit_id } = route.params;

  const [fullscreenVisible, setFullscreenVisible] = useState(false);

  const handleImagePress = () => {
    setFullscreenVisible(true);
  };

    const handleCloseFullscreen = () => {
    setFullscreenVisible(false);
  };

const [usid, setUid] = useState('');
const [loading, isLoading] = useState(true);
const [data, setdata] = useState([]);
const [notif, setNotif] = useState('');
//const [timelineEvents, settimeline] = useState([]);
const [foto, setfoto] = useState([]);


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
     isLoading(true);
     Cek();
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };

  

const Cek = async () => {
   //lm = parseInt(limit);

   isLoading(true);
fetch(Detail_unit_link, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : usid,
              unit:unit_id,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {isLoading(false); 
          if(responseJson.status == '1')
          {
          isLoading(false); 
           setdata(responseJson.data);
        
           setfoto(responseJson.foto);
          //setlimit(limit);
          // alert(responseJson.status);
          }
          else 
          {
          isLoading(false);
          alert(responseJson.status);
          //setlimit(0);
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            setNotif('Upps ada kesalahan mohon coba lagi !!');
           });
          };





const Foto = () => {
return (
   <View style={styles.wrapper} >
        
<View>
{Array.isArray(foto)
        ? foto.map((us,i) => {
          return ( 
          <View key={i}>
              <View style={{alignItems: 'flex-end'}}>
        
   </View>
        <TouchableOpacity onPress={handleImagePress}>
      <Image source={{uri:host+"cfm_ug/Doc/incident/"+us.foto}} style={styles.logo}></Image>
       </TouchableOpacity>


         <Modal animationType="none" visible={fullscreenVisible}>
<View 
    style={{  flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Bg1_
    }}>
  <Image source={{uri:host+"cfm_ug/Doc/incident/"+us.foto}} style={styles.image}></Image>
   
   <TouchableOpacity style={{
width: 30,
Height:30,
borderRadius:30,

flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
backgroundColor:"red",
textAlign:'right',
position:'absolute',
top:10,
right:10,
padding:5 }}
 onPress={handleCloseFullscreen}>

<Text numberOfLines={2}
style={{ color: '#fff',
    fontWeight: '800',
    fontSize: 12}}>X
</Text>

   </TouchableOpacity>
</View>
</Modal>
      </View>)
}) : <View></View>}
</View>

        
          </View> 
          
  );
}










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
     {Array.isArray(data)
        ? data.map((us,index) => {
          return (
<ScrollView key={index}
contentContainerStyle={styles.Card}
refreshControl={
          <RefreshControl
            refreshing={loading}
             onRefresh={ascdata}
          />
        }>

     
            
          <View style={styles.Card_atas}>
    <FontAwesomeIcon icon={ faHome } style={styles.Imgbox} size={ 50 } />
    <View style={styles.Card_sub}>
    <Text numberOfLines={1}
style={{width: lebar,fontSize:18,color:'#fff',fontWeight:'400',marginBottom:2}}>Lokasi Unit : {us.nama_lokasi} 
</Text>

  <Text numberOfLines={1}
style={{width: lebar,fontSize:18,color:'#fff',fontWeight:'400',marginBottom:2}}>Blok : {us.blok} 
</Text>
 <Text numberOfLines={1}
style={{width: lebar,fontSize:18,color:'#fff',fontWeight:'400',marginBottom:2}}>No Unit : {us.no_unit} 
</Text>
  <Text numberOfLines={1}
style={{width:lebar,fontSize:18,color:'#fff',fontWeight:'400',marginBottom:2}}>Status : {us.status_detail} 
</Text>
  <Text numberOfLines={1}
style={{width:lebar,fontSize:18,color:'#fff',fontWeight:'400',marginBottom:2}}>Status : {us.nama_penghuni} 
</Text>
   </View>  
            
     </View>




    <View style={{ flex: 1 }}>
   <Text numberOfLines={4}
style={{width: lebar,fontSize:18,color:'#000060',fontWeight:'400',marginLeft:10,top:5}}>Foto : 
</Text>
      <Foto />
    </View>




   

</ScrollView>

          )
}) : null}
        </View>
    )
}

export default Detail_unit


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

       Card_atas: { 
 
      fontFamily: "sans-serif",
      backgroundColor: '#56c0e0',
      width:lebar ,
      padding: 10,
      flexDirection: 'row',
      },
       Card_sub: { 
               flex: 1,
      fontFamily: "sans-serif",
      backgroundColor: 'transparent',
      padding: 10,
      flexDirection: 'column',
      marginLeft:10
      },

        Card_sub_row: { 
      fontFamily: "sans-serif",
      backgroundColor: 'transparent',
      padding: 10,
      flexDirection: 'row',
      marginLeft:10
      },

         Imgbox: { 
        flex:0,
     backgroundColor:'transparent',
     resizeMode:"cover",
     color:'#000060',
     width:30,
     height:30,
     top:10, 
     right:0
    
    }
,

 logo: { 
    flex:0,
     width:80,
     height:80,
     margin:5,
    
    }
,
      image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
      
  });
