import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {List_incident_leader,List_kategory_leader,Leader_assign,token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons/faTicketAlt'
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_, Kn, Gr_} from '../style/Style_assets';
import {Picker} from '@react-native-picker/picker';
const lebar ='100%';
const lebar_tombol = '80%';
const List_job = ({navigation}) => {
const itbs = token;
const [iudstrg, setUid] = useState('');
const [loading, isLoading] = useState(true);
const [load, setload] = useState(true);
const [data, setdata] = useState([]);
const [halaman, sethalaman] = useState(false);
const [notif, setNotif] = useState('');
const [vinput, setInput] = useState(false);
const [pic1, setPic1] = useState('');
const [pic2, setPic2] = useState('');
const [data_user, setdatauser] = useState([]);
const [incident_id, setIncident] = useState('');


const [limit, setlimit] = useState(1);
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
 useEffect(() => {
    //ascdata();
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
    { setPic1('');
            setPic2('');
            setIncident('');
        sethalaman(false);
     setNotif('');
     setUid(result)
     Cek_kategory();
     Cek(result);
     setdata('');
   isLoading(true);
   setInput(false);
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };



const Cek = async (usr) => {
   //lm = parseInt(limit);
    isLoading(true);
fetch(List_incident_leader, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : usr,
              limit:0,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {isLoading(false); 
          if(responseJson.status == '1')
          {
          isLoading(false); 
           setdata(responseJson.data);
          //setlimit(limit);
          }
          else 
          {
          isLoading(false);
          setNotif(responseJson.status);
          //setlimit(0);
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            setNotif('Upps ada kesalahan mohon coba lagi !!');
           });
          };

          const Cek_kategory = async (usr) => {
 
    isLoading(true);
fetch(List_kategory_leader, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : iudstrg,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {isLoading(false); 
          if(responseJson.status == '1')
          {
          isLoading(false); 
           setdatauser(responseJson.data);
          //setlimit(limit);
          }
          else 
          {
          isLoading(false);
          setNotif(responseJson.status);
          //setlimit(0);
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            setNotif('Upps ada kesalahan mohon coba lagi !!');
           });
          };



const Load_more = async (usr) => {
sethalaman(true);
setload(false);
setlimit(limit+1);
alert("Halaman "+limit);
fetch(List_incident_leader, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : usr,
              limit:limit,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {isLoading(false); 
          if(responseJson.status == '1')
          {
          isLoading(false); 
           setdata([...data,...responseJson.data]);
          //setlimit(limit+1);
           setload(true);
           sethalaman(false);
          }
          else 
          {
          isLoading(false);
          setNotif(responseJson.status);
           sethalaman(false)
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            setNotif('Upps ada kesalahan mohon coba lagi !!');
           });
          };
    
const Pindah_halaman = (us) => {
if (us.status==1)
{
navigation.navigate('Teknisi_pengecekan',{incident_id:us.id});
}
else if  (us.status==2) {
navigation.navigate('Teknisi_progres',{incident_id:us.id});
}
else {
navigation.navigate('Detail_tiket_update',{incident_id:us.id});

}
};

const  Simpan = async () => {

if ( pic1 =='' || pic2 =='') 
{Alert.alert("Pic1 dan pic 2 tidak boleh kosong");
isLoading(false); }
else {
   isLoading(true);
fetch(Leader_assign, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body:JSON.stringify({
              user:iudstrg,
              incident_id:incident_id,
              teknisi1:pic1,
              teknisi2:pic2,
              itbs:itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {isLoading(false); 

          if(responseJson.status == '1')
          {
           isLoading(false);
           setInput(false);
           setPic1('');
            setPic2('');
            setIncident('');
          Alert.alert('Berhasil');
         
          
          }
          else 
          {
          isLoading(false);
           Alert.alert(responseJson.status);
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.error(error);
            alert("Gagal input");
           });
         }

       };
const datamodal = (id) => {
setInput(true);
setIncident(id);
 };

const All = ({tiket,last_status,id,problem,blok,no_unit,create_date,detail,nama_lokasi,pic_name1,pic_name2,tanggal}) => {
return (
<View>  
<TouchableOpacity    onPress={() => datamodal(id)} style={styles.Card1}>
  <FontAwesomeIcon icon={ faTicketAlt } style={styles.Imgbox} size={ 32 } />
  <View style={styles.Box}>
<Text numberOfLines={2}
style={{width: lebar,left:10,fontSize:24,color:'#56c0e0',fontWeight:'bold',marginBottom:2}}>{last_status}
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Area : {nama_lokasi}
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Unit : {blok}. {no_unit}
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>No Tiket : {tiket} 
</Text>
<Text numberOfLines={4}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Laporan : {problem} 
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Create Date : {create_date} 
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Create Date : {tanggal} 
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Pic 1 : {pic_name1} 
</Text>
<Text numberOfLines={1}
style={{width: lebar,fontSize:16,color:Cl3_,fontWeight:'bold',marginBottom:2}}>Pic 2 : {pic_name2} 
</Text>

</View>
</TouchableOpacity>
</View>

)};

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

<Modal animationType="none" visible={vinput}>
<View style={{padding:10,paddingVertical:30}} >

<Text style={{fontFamily: "sans-serif",color:'#000060', margin:1, fontSize: 20}}>Pic 1 </Text>

<Picker style={styles.inputBox}
  selectedValue={pic1}
  onValueChange={(itemValue, itemIndex) =>
    setPic1(itemValue)
  }>
    <Picker.Item label="Pilih Pic" value="" />
   {Array.isArray(data_user)
    ? data_user.map((us, index) => (
       <Picker.Item key={index} label={us.username} value={us.user_id} />
      ))
    : null}
</Picker>

<Text style={{fontFamily: "sans-serif",color:'#000060', margin:1, fontSize: 20}}>Pic 2</Text>
<Picker style={styles.inputBox}
  selectedValue={pic2}
  onValueChange={(itemValue, itemIndex) =>
    setPic2(itemValue)
  }>
    <Picker.Item label="Pilih Pic" value="" />
   {Array.isArray(data_user)
    ? data_user.map((us, index) => (
        <Picker.Item key={index} label={us.username} value={us.user_id} />
      ))
    : null}
</Picker>

</View>
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button2} 
       onPress={() => setInput(false)}
       activeOpacity={0.6}>
<Text style={styles.buttonText}>Kembali</Text>
</TouchableOpacity> 
<TouchableOpacity style={styles.button1} 
       onPress={() => Simpan()}
       
       activeOpacity={0.6}>
<Text style={styles.buttonText}>Simpan</Text>
</TouchableOpacity> 
</View>
</Modal>

<ScrollView
contentContainerStyle={styles.scrollView}
refreshControl={
          <RefreshControl
            refreshing={loading}
             onRefresh={ascdata}
          />
        }
        
         onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
      if(load)
      {
        Load_more(iudstrg);
      }

      }
    }}
    scrollEventThrottle={100}
        >
{Array.isArray(data)
        ? data.map((us,index) => {
return <All 
key={index}
tiket={us.tiket} 
last_status={us.stat} 
id={us.id} 
problem={us.job_detail} 
create_date={us.create_date} 
blok={us.blok} 
no_unit={us.no_unit}
nama_lokasi={us.nama_lokasi}
tanggal={us.tanggal}
pic_name1={us.pic_name1}
pic_name2={us.pic_name2}

detail={() => Pindah_halaman(us)}
/>
}) : null}
<View style={{ margin: 10}}>
<Text numberOfLines={2}
style={{width: lebar,fontSize:12,color:Cl2_,marginBottom:2}}> 
{notif}
</Text>
</View>
{halaman?
<View style={styles.cnt}>
<ActivityIndicator size="large" color={Bg1_} />
 </View>
 :
 <View>

<Text></Text>

 </View>
  }
 <View style={styles.Sadle}></View>
</ScrollView>
{/*
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button} 
 onPress={() => navigation.navigate('Flm_create_pm')}
activeOpacity={0.6}>
<Text style={styles.buttonText}>Buat Tiket PM</Text>
</TouchableOpacity> 
</View>
*/
}
        </View>
    )
}

export default List_job


const styles = StyleSheet.create({

     Container: {
      fontFamily: "sans-serif",
      backgroundColor:Bg_,
      flex: 1,
      // remove width and height to override fixed static size
      width: null,
      height: null,
      justifyContent: "center",
      
    },
    
      Card1: { 
       fontFamily: "sans-serif",
      justifyContent: "center",
      //alignItems:"center",
      backgroundColor:Bg_,
      flex: 1,
      paddingVertical: 15,
      elevation: 8,
      flexDirection: 'column',
      padding: 10,
      color:'blue',
      margin: 10,
      marginBottom: 5,
      borderRadius:15,
      },
       button: {
        width:lebar_tombol,
        backgroundColor:Bg2_,
        borderRadius: 8,
        marginVertical: 10,
        paddingVertical: 13,
        elevation: 8,
        
        },
      cnt: {
      fontFamily: "sans-serif",
      justifyContent: "center",
      alignItems:"center",
      position :"absolute",
      bottom:10,
      flex: 1,
      // remove width and height to override fixed static size
      width: lebar,
      height: null,
      flexDirection:'row',
      justifyContent:'space-around'
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
        Box: {
    
      flex: 1,
    flexDirection: 'column',
  
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:35
   

    
    },
       Imgbox: { 
        flex:0,
     backgroundColor:'transparent',
     resizeMode:"cover",
     width:30,
     height:30,
     top:25, 
     right:0
    
    },
         button1: {
        width:'50%',
        backgroundColor:Bg2_,
        marginVertical: 10,
        paddingVertical: 13,
        },
         button2: {
        width:'50%',
        backgroundColor:Cl2_,
        marginVertical: 10,
        paddingVertical: 13,
        },
           inputBox: {
      borderColor: '#000060',
      borderStyle: 'solid',
      width:lebar,
      borderWidth:1,
      backgroundColor:'#000060',
      paddingHorizontal:2,
      fontSize:16,
      color:'#fff',
      marginTop:10,
      paddingHorizontal:10,
      },
  });
