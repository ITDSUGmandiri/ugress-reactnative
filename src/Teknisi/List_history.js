import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {List_history_teknisi,token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons/faTicketAlt'
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_, Kn, Gr_} from '../style/Style_assets';
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
    {
        sethalaman(false);
     setNotif('');
     setUid(result)
     Cek(result);
     setdata('');
   isLoading(true);
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
fetch(List_history_teknisi, 
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



           const Load_more = async (usr) => {
sethalaman(true);
setload(false);
setlimit(limit+1);
alert("Halaman "+limit);
fetch(List_history_teknisi, 
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
navigation.navigate('Detail_helpdesk',{incident_id:us.id});

};

const All = ({tiket,last_status,id,problem,blok,no_unit,create_date,detail,nama_lokasi}) => {
return (
<View>  
<TouchableOpacity  onPress={detail} style={styles.Card1}>
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
    
    }
  });
