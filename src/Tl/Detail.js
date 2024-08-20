import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {Detail_tiket,token,host} from '../style/Link';
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

const Detail = ({navigation,route}) => {
const itbs = token;
const { incident_id } = route.params;

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
const [timelineEvents, settimeline] = useState([]);
const [foto, setfoto] = useState([]);
const [list_biaya, setBiaya] = useState([]);


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
fetch(Detail_tiket, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : usid,
              incident_id:incident_id,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {isLoading(false); 
          if(responseJson.status == '1')
          {
          isLoading(false); 
           setdata(responseJson.data);
           settimeline(responseJson.time);
           setfoto(responseJson.foto);
               setBiaya(responseJson.biaya_perbaikan);
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

const TimelineEvent = ({ date, event, id,username }) => (
  <View style={{ flexDirection: 'row', marginBottom: 0 }}>
    <View style={{ width: 50, alignItems: 'center'}}>
   
       <View style={{ flex: 1, width: 1, backgroundColor: 'gray' }}/>
      
      
       {id =='0'?
   <View  style={{ width: 20, height: 20 ,backgroundColor: '#56c0e0' ,borderRadius:30,top:0,position:'absolute'}} ></View>
      :
     
      <View  style={{ width: 20, height: 20 ,backgroundColor: 'gray' ,borderRadius:30,top:0,position:'absolute'}} ></View>
      }
      

    </View>
    <View style={{ flex: 1 ,color:'black'}}>
      <Text style={{ fontWeight: 'bold', marginTop: 5 ,color:'black'}}>{date}</Text>
      <Text style={{ color:'black'}}>{username}</Text>
      <Text style={{ color:'black'}}>{event}</Text>
    </View>
  </View>
);
     
const Timeline = () => (
  <ScrollView style={{ padding: 20 }}>
    {timelineEvents.map((event, index) => (
      <TimelineEvent
        key={event.id}
         id={index}
        date={event.create_date}
        event={event.keterangan}
        username={event.username}
        isFirst={index === 0}
      />
    ))}
  </ScrollView>
);




const Foto = () => {
return (
 <View style={styles.Card1}>
<View style={styles.cont1}>


<View style={styles.cont1_}>
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
          </View> 
          
  );
}



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



 const Biaya_perbaikan = () => {
return (
   <View style={styles.Card1} >

      <TouchableOpacity style={{
width: 100,
Height:30,
borderRadius:30,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
backgroundColor:Gr_,
textAlign:'right',
padding:5 }}
onPress={() =>  navigation.navigate('Teknisi_input_biaya',{incident_id:incident_id})}>

<Text numberOfLines={2}
style={{ color: '#fff',
    fontWeight: '800',
    fontSize: 14}}>Tambah Biaya
</Text>

   </TouchableOpacity>
          
 <View style={styles.cont1}>


<View style={styles.cont1_}>


<DataTable>
        <DataTable.Header> 
          <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',justifyContent:'center'}}>Deskripsi</DataTable.Title>
          <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',flex:2,justifyContent:'center'}}>Qty</DataTable.Title>
          <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',justifyContent:'center'}}>Biaya</DataTable.Title>
  
        </DataTable.Header>
        
{
Array.isArray(list_biaya)
        ? list_biaya.map((us,i) => {
  
          return ( 
<DataTable.Row key={i} tyle={{textAlign:'right',alignItems:'flex-end',flex:1}}>
     
    <DataTable.Cell >
<Text style={{fontSize:12,color:'#000060',fontWeight:'normal'}}>{us.desk}</Text>
</DataTable.Cell>
     <DataTable.Cell style={{flex: 2,justifyContent:'flex-end'}}>
<Text style={{fontSize:12,color:'#000060',fontWeight:'normal'}}>{numberWithCommas(us.qty)}</Text>
</DataTable.Cell>
    <DataTable.Cell style={{flex: 2,justifyContent:'flex-end'}}>
<Text style={{fontSize:12,color:'#000060',fontWeight:'normal'}}>{numberWithCommas(us.biaya)}</Text>
</DataTable.Cell>

   

        </DataTable.Row>
)
}) : <Text numberOfLines={2} style={styles.statmerah}>Kosong
</Text>}

 <DataTable.Header> 

           <DataTable.Title style={{flex:4,justifyContent:'center'}}><Text style={{ fontSize:16,color:'green',fontWeight:'normal'}}>Total IDR : {  numberWithCommas(list_biaya.reduce((total, val) => total + parseInt(val.biaya),0)
)}</Text></DataTable.Title>
       
        </DataTable.Header>
      </DataTable>




</View>
          </View>
          </View> 
          

  );
}







const Ttd = () => {
return (
 <View style={styles.Card1}>



 
<View style={styles.cont1}>


<View style={styles.cont1_}>
{Array.isArray(data)
        ? data.map((us,i) => {
          return ( 
          <View key={i}>
        <TouchableOpacity 
   
        onPress={handleImagePress}>
        <Image source={{uri:host+"cfm_ug/Doc/sign/"+us.file_upload}} style={styles.image1}></Image>
        </TouchableOpacity>

    <Text numberOfLines={1}
style={{width: lebar,fontSize:18,color:Bg1_,fontWeight:'400',marginBottom:2}}>{us.nama_signature} 
</Text>

         <Modal animationType="none" visible={fullscreenVisible}>
<View 
    style={{  flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#fff'
    }}>
    <Image source={{uri:host+"cfm_ug/Doc/sign/"+us.file_upload}} style={styles.image}></Image>
    
   
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
    <FontAwesomeIcon icon={ faTicketAlt } style={styles.Imgbox} size={ 50 } />
    <View style={styles.Card_sub}>
    <Text numberOfLines={1}
style={{width: lebar,fontSize:18,color:'#fff',fontWeight:'400',marginBottom:2}}>No Tiket : {us.tiket} 
</Text>

  <Text numberOfLines={1}
style={{width: lebar,fontSize:18,color:'#fff',fontWeight:'400',marginBottom:2}}>Last Status : {us.desc_status} 
</Text>
 <Text numberOfLines={1}
style={{width: lebar,fontSize:18,color:'#fff',fontWeight:'400',marginBottom:2}}>Pelapor : {us.pelapor} 
</Text>
  <Text numberOfLines={4}
style={{width:lebar,fontSize:18,color:'#fff',fontWeight:'400',marginBottom:2}}>Laporan : {us.job_detail} 
</Text>
  <FontAwesomeIcon icon={ faHome } size={ 30 } />
  <Text numberOfLines={4}
style={{width: lebar,fontSize:18,color:'#fff',fontWeight:'bold',marginLeft:10,top:5}}>Unit : {us.blok}.{us.no_unit} 
</Text>
   </View>  
            
     </View>

      <View style={styles.Card_sub_row}>
 



   



   </View>  
  <View style={{ flex: 1 }}>
   <Text numberOfLines={4}
style={{width: lebar,fontSize:18,color:'#000060',fontWeight:'bold',marginLeft:10,top:5}}>Hasil Pekerjaan : 
</Text>
       <Text numberOfLines={4}
style={{width: lebar,fontSize:14,color:'grey',marginLeft:10,top:5}}>{us.result} 
</Text>  
    </View>


      <View style={{ flex: 1 }}>
   <Text numberOfLines={4}
style={{width: lebar,fontSize:18,color:'#000060',fontWeight:'bold',marginLeft:10,top:5}}>Solusi Problem : 
</Text>
        <Text numberOfLines={4}
style={{width: lebar,fontSize:14,color:'grey',marginLeft:10,top:5}}>{us.note} 
</Text> 
    </View>




    <View style={{ flex: 1 }}>
  <Text numberOfLines={4}
  style={{width: lebar,fontSize:18,color:'#000060',fontWeight:'bold',marginLeft:10,top:5}}>Foto : 
  </Text>
      <Foto />
    </View>

        <View style={{ flex: 1 }}>
  <Text numberOfLines={4}
  style={{width: lebar,fontSize:18,color:'#000060',fontWeight:'bold',marginLeft:10,top:5}}>Biaya Perbaikan : 
  </Text>
      <Biaya_perbaikan />
    </View>

      <View style={{ flex: 1 }}>
   <Text numberOfLines={4}
style={{width: lebar,fontSize:18,color:'#000060',fontWeight:'bold',marginLeft:10,top:5}}>Signature : 
</Text>
      <Ttd />
    </View>


 <View style={{ flex: 1 }}>
   <Text numberOfLines={4}
style={{width: lebar,fontSize:18,color:'#000060',fontWeight:'bold',marginLeft:10,top:5}}>Aktifitas : 
</Text>
      <Timeline />
    </View>

   

</ScrollView>

          )
}) : null}
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
      height: null, justifyContent: "center",
      
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

   image1: {
    width: 120,
    height: 120,
     resizeMode: 'contain',
  },
 cont1: {
      fontFamily: "sans-serif",
      justifyContent: "center",
      alignItems:'center',
      backgroundColor:Bg_,
      paddingVertical: 10,
      elevation: 5,
      flexDirection: 'column',
      color:'grey',
      marginTop: 10,
      marginBottom: 5,
      borderRadius:15,
      flex:1,
      //height:120
    },
   Card1:{
      backgroundColor: Bg_,
      borderRadius: 15,
      flexDirection: 'column',
      padding: 10,
      color:'grey',
      marginBottom: 0,
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
    },
  cont1_: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10
    },
   
 cont2: {
      fontFamily: "sans-serif",
      alignItems:"center",
      backgroundColor:Bg_,
      flex: 1,
      paddingVertical: 15,
      // remove width and height to override fixed static size
      width: null,
      height: null,
    },

      buttonText: {
      fontSize:20,
      fontWeight:'600',
      color:Cl_,
      textAlign:'center',
      
      },
         Sadle: { 
                  bottom:10,
                  left : 20,
                  right :20,
                  backgroundColor:'transparent',
                  borderRadius:15,
                  height : 70,
                  flexDirection:'row',
                  justifyContent:'space-around'
      },
       
          cnt: {
      fontFamily: "sans-serif",
      justifyContent: "center",
      alignItems:"center",
     position :"absolute",
     bottom:5,
      flex: 1,
      // remove width and height to override fixed static size
      width: lebar,
      height: null,
       flexDirection:'row',
                  justifyContent:'space-around'
    }
  });
