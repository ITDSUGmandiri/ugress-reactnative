import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert,TouchableHighlight,PermissionsAndroid } from 'react-native'
import {token,host,Link_list_biaya,Link_biaya_perbaikan,Link_delete_list_biaya} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_,Gr_} from '../style/Style_assets';
import {Picker} from '@react-native-picker/picker';


import { DataTable } from 'react-native-paper';

const lebar ='100%';
const lebar_tombol = '70%';
const lebar_tombol1 = '90%';
const Input_value = ({navigation,route}) => {
  //qr
const [notif, setNotif] = useState('');

const { incident_id } = route.params;
const itbs = token;
const [usid, setUid] = useState('');
const [loading, isLoading] = useState(true);

const [list_biaya, setdata] = useState([]);


const [qty, setQTy] = useState('');


const [biaya, setBiaya] = useState();

const [desk, setDesk] = useState('');
const [jumlah, setJumlah] = useState('');


 useEffect(() => {
   // ascdata();
    const unsubscribe = navigation.addListener('focus', () => {
    ascdata();
    });
   // ascdata();
    return unsubscribe;
      }, [navigation]);

const ascdata = async () => 
{
  isLoading(true);
const result = await AsyncStorage.getItem('usnm');

    if (result != null) 
    {

    setUid(result);
    setQTy('');
    setBiaya('');
    setDesk('');
    Cek_value();
    isLoading(false); 
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };

const Cek_value = async () => {
   isLoading(true);
fetch(Link_list_biaya, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
                  user:usid,
              incident_id:incident_id,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>{
        
          if(responseJson.status == 1)
          {
        
setdata(responseJson.data);
isLoading(false);  
          }
          else 
          {
            
          isLoading(false);
          setNotif(responseJson.status);
          }
           }).catch((error) =>
           {
            
            isLoading(false);
            console.error(error);
            setNotif('Upps ada kesalahan mohon coba lagi !!');
           });
          };

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



const  Submit = async () => {

if (desk =='' ) 
{Alert.alert("deskripsi tidak boleh kosong");
isLoading(false); }
else {
   isLoading(true);
fetch(Link_biaya_perbaikan, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body:JSON.stringify({
              user:usid,
              incident_id:incident_id,
              desc:desk,
              qty:qty,
              harga:biaya,
              itbs:itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {isLoading(false); 

          if(responseJson.status == '1')
          {
        
           isLoading(false);
              Alert.alert('Berhasil');
          ascdata();

       
         
          
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


    


  const sumlembar =(value) => {
setBiaya(value);

  setJumlah(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));


  };




  

 const conf =  (id) => {
    return Alert.alert(
      "Konfirmasi",
      "Apakah anda yakin ingin menghapus biaya?",
      [
        {
          text: "Yes",
          onPress: () => {
          
            Delete_val(id);
          },
        },
    
        {
          text: "No",
        },
      ]
    );
  };


  const Delete_val = (id) => {

  if (id =="")
{
  isLoading(false);
  alert("Gagal hapus data");
}
else {

  isLoading(true);
fetch(Link_delete_list_biaya, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body:JSON.stringify({
              user:usid,
              incident_id:incident_id,
              id:id,
              itbs:itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {isLoading(false); 

          if(responseJson.status == '1')
          {
        
           isLoading(false);
              Alert.alert('Berhasil Delete');
          ascdata();
          
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
            alert("Gagal Delete");
           });
          };
};


  const Biaya_perbaikan = () => {
return (
   <View style={styles.Card1} >

          
 <View>


<View style={styles.cont1_}>


<DataTable>
        <DataTable.Header> 
          <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',justifyContent:'center'}}>Deskripsi</DataTable.Title>
          <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',flex:2,justifyContent:'center'}}>Qty</DataTable.Title>
          <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',justifyContent:'center'}}>Biaya</DataTable.Title>
            <DataTable.Title style={{fontSize:14,color:'grey',fontWeight:'normal',justifyContent:'center'}}>Delete</DataTable.Title>
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

      <DataTable.Cell style={{flex: 1,justifyContent:'flex-end'}}>
<TouchableOpacity style={{
width: 20,
Height:20,
borderRadius:55,
flex: 1,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
backgroundColor:"red",
textAlign:'right',
padding:5 }}
onPress={() => conf(us.id)}>

<Text numberOfLines={2}
style={{ color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12}}>X
</Text>
   </TouchableOpacity>
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
        }>


<View style={styles.Card1}>
 <Text style={{color:'grey',fontSize:16,fontWeight:'bold',textAlign:'left',marginVertical:5}} >Deskripsi</Text>
 <View style={styles.cont1_}>
           <TextInput style={styles.input1}
      placeholder="Deskripsi"
      spellCheck={false}
      autoCorrect={false}
      numberOfLines={4}
      multiline = {true}
      onChangeText={value => setDesk(value)}
    />
</View>
    <Text style={{color:'grey',fontSize:16,fontWeight:'bold',textAlign:'left',marginVertical:5}} >Qty</Text>
<View style={styles.cont1_}>
 <TextInput style={styles.input1}
      placeholder="Qty"
      spellCheck={false}
      autoCorrect={false}
       keyboardType="numeric"
      onChangeText={value => setQTy(value)}
      defaultValue={qty}
    />
    </View>


 <Text style={{color:'grey',fontSize:16,fontWeight:'bold',textAlign:'left',marginVertical:5}} >Biaya</Text>
<View style={styles.cont1_}>
 <TextInput style={styles.input1}
      placeholder="Biaya"
      spellCheck={false}
      autoCorrect={false}
       keyboardType="numeric"
      onChangeText={value => sumlembar(value)}
      defaultValue={biaya}
    />
    </View>
    <Text style={{fontFamily: "sans-serif", margin:10,color:'green', fontSize: 20}}>Nominal : {jumlah}</Text>
  



<Biaya_perbaikan/>








   


</View>

 <View style={styles.Sadle}></View>

</ScrollView>
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button} 
       onPress={Submit}
       activeOpacity={0.6}>
<Text style={styles.buttonText}>Simpan</Text>
</TouchableOpacity> 
</View>
        </View>
    )
}

export default Input_value


const styles = StyleSheet.create({
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
      paddingVertical: 35,
      paddingHorizontal:15,
      elevation: 8,
      flexDirection: 'column',
      margin: 10,
      marginBottom: 5,
      borderRadius:15,
      },
       input: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    width:lebar_tombol,
    padding: 10,
    borderColor:'grey',
    color:'grey'
  },
  input1: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    width:lebar_tombol1,
    padding: 10,
    borderColor:'grey',
        borderStyle: 'solid',
      color:'grey'
  },
      buttonText: {
      fontSize:20,
      fontWeight:'600',
      color:Cl_,
      textAlign:'center',
      
      },
      button: {
        width:lebar_tombol,
        backgroundColor:Bg2_,
        borderRadius: 8,
        marginVertical: 10,
        paddingVertical: 13,
        elevation: 8,
        
        },
          Card: { 
        backgroundColor: Bg_,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 10,
        marginRight: 10,
        alignItems:"center",
      },
        Sadle: { 
                  bottom:10,
                  left : 20,
                  right :20,
                  backgroundColor:'transparent',
                  borderRadius:15,
                  height : 80,
                  flexDirection:'row',
                  justifyContent:'space-around'
      },

         Box_: {
     backgroundColor:Bg_,
     width:55,height:60,
     borderRadius:15,
     alignItems: "center",
     marginRight:10,
     marginLeft:10,
     color : Cl1_,
     flex:0,
    },
    Box: {
      flex:0,
     backgroundColor:'#ffffff',
     width:60,height:60,
     borderRadius:15,
     alignItems: "center",
     elevation: 5,
     color : Cl1_,
    },
    Imgbox: { 
     backgroundColor:'transparent',
     resizeMode:"cover",
     width:30,
     height:30,
     justifyContent: "center",
     top:15, 
    },
      cont1_: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
     backgroundColor:'transparent',
    },

       inputBox: {
      borderColor: Bg1_,
      borderStyle: 'solid',
      width:lebar_tombol,
      borderWidth:1,
      backgroundColor:Bg_,
      paddingHorizontal:2,
      fontSize:14,
      color:'grey',
      borderColor:'grey',
      marginTop:10,
      paddingHorizontal:10,
      },

      picker: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    width:"100%",
    padding: 10,
    borderColor:'grey',
    backgroundColor:'#000060',
    color:'#fff'
  },
  });
