import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import {Unit_cek,Helpdesk_add,token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_,Gr_} from '../style/Style_assets';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
const lebar ='100%';
const lebar_tombol = '80%';
const Helpdesk = ({navigation}) => {



const itbs = token;
const [user, setUid] = useState('');
const [loading, isLoading] = useState(true);

const [notif, setNotif] = useState('');
const [desc, setDesc] = useState('');

const [imageSource, setImageSource] =  useState(null);
const [imagemime, setImageMime] =  useState(null);

const [data_picker, setdatapicker] = useState([]);
const [unit, setUnit] = useState('');
const [label_unit, setlabelunit] = useState('Pilih');
const [type, settype] = useState('');



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
     
    setUid(result);
    settype('');
    setlabelunit('');
    setUnit('');
    setImageSource(null);
    setImageMime(null);
    setDesc('');
  Cek(result);

    isLoading(false);  
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };



  const Cek = async (result) => {
fetch(Unit_cek, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({
              user : result,
              itbs :itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {isLoading(false); 
                console.log(responseJson);
                 
          if(responseJson.status == '1')
          { 
                  
          isLoading(false); 
     
          setdatapicker(responseJson.data);
      
          }
          else 
          {
          isLoading(false);
          setNotif(responseJson.status);
          }
           }).catch((error) =>
           {
            isLoading(false);
            console.log(error);
    
            setNotif('Upps ada kesalahan mohon coba lagi !!');
           });
          };


 const clean_cache = () => {
  ImagePicker.clean().then(() => {
  console.log('removed all tmp images from tmp directory');
}).catch(e => {
 console.log(e);
});

 }


const  Simpan = async () => {
/*
isLoading(true);
if (lat !='' || lon !='') {*/
if (imagemime == null || desc =='' || type =='' || unit =='') 
{Alert.alert("Foto,unit,prioritas dan laporan tidak boleh kosong");
isLoading(false); }
else {
   isLoading(true);
fetch(Helpdesk_add, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body:JSON.stringify({
              user:user,
              id:unit,
              type:type,
              foto:imagemime,
              desc:desc,
          
              itbs:itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {isLoading(false); 

          if(responseJson.status == '1')
          {
          clean_cache();
           isLoading(false);
            navigation.navigate('Detail_helpdesk',{incident_id:responseJson.tiket});

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

        /*    }
            else{
        isLoading(false);
        Alert.alert(
          "Upss",
          "Sedang mencari lokasi anda, mohon aktifkan GPS",
          [
          
            { text: "OK", onPress: () => 
Cek_lokasi()
          }
          ]
        );
    }*/
       };

 /*

const  Simpan = async () => {

isLoading(true);
GetLocation.getCurrentPosition({
enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 
      })
.then(location => {
if (imageSource == null) 
{Alert.alert("Foto tidak boleh kosong");
isLoading(false); }
else {
   isLoading(true);
fetch(Link_slm_data_foto, 
        {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
              body:JSON.stringify({
              user:user,
              id:incident_id,
              tk:tiket,
              lat:location.latitude,
              lon:location.longitude,
              itbs:itbs
            })
           }).then((response) => response.json())
           .then((responseJson) =>
           {
          if(responseJson.status == '1')
          {

            if (imageSource == null)
            {
                navigation.navigate('Slm_input_progres',{ incident_id : incident_id});
            Alert.alert(' Berhasil namun tidak ada foto');
              //isLoading(false);
            }
            else{

  const nm = responseJson.nama;
            const dataa = new FormData();
            dataa.append('image', {
                type: "image/jpeg",
                name: nm,
                uri: imageSource
              })
         fetch(Link_slm_pic, {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            },
              body:dataa
           }
           )
           .then((response) => response.json())
           .then((responseJson) =>
           {
  if(responseJson.status == '1')
          {
          //ascdata();
            navigation.navigate('Slm_input_progres',{ incident_id : incident_id});
          Alert.alert('Berhasil');
            //isLoading(false);
          }
          else{
          ascdata();
          Alert.alert(responseJson.status);
          } 
           }).catch((error) =>
           {
            //ascdata();
              navigation.navigate('Slm_input_progres',{ incident_id : incident_id});
            Alert.alert(' Berhasil namun foto gagal terupload');
              //isLoading(false);
           });  
            }
          
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

            })
      .catch(error => {
        isLoading(false);
        Alert.alert(
          "Upss",
          "Sedang mencari lokasi anda, mohon aktifkan GPS",
          [
          
            { text: "OK", onPress: () => 
Simpan()
          }
          ]
        );
      })
       };
*/



  const Ambilfoto = () => {

        const  options = {
           
            storageOptions: {
                skipBackup:true,
              path: 'images',
              noData : true,
            },
       
          };
          ImagePicker.openCamera({
          //ImagePicker.openPicker({
            width: 595,
            height: 842,
            compressImageMaxWidth: 893 ,
            compressImageMaxHeight: 1347 ,
              compressImageQuality: 0.8,
        includeBase64:true,
          //compressVideoPreset: 'HightQuality',
            //cropping: true,
          }).then(image => {
            //console.log(image);
            setImageSource(image.path);
            setImageMime(`data:${image.mime};base64,${image.data}`);
          }).catch(e => {
            if (e.code !== 'E_PICKER_CANCELLED') {
              //console.log(e);
              Alert.alert('Sorry, there was an issue attempting to get the image/video you selected. Please try again');
            }
          });

        
        };

        const changepicker = (us) => {
setUnit(us.id);
setlabelunit(us.blok+"."+us.no_unit);

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
contentContainerStyle={styles.scrollView}
refreshControl={
          <RefreshControl
            refreshing={loading}
             onRefresh={ascdata}
          />
        }>

        
<View style={{padding:10,paddingVertical:30}} >

{/*
<Text style={{fontFamily: "sans-serif", margin:1, fontSize: 12,color:'red'}}>Koordinat {lat},{lon}</Text>
      */}
<View style={styles.Card}>
  <Text style={{color:'grey',fontSize:16,fontWeight:'bold',textAlign:'center'}} >Foto</Text> 
<TouchableOpacity onPress={Ambilfoto}>
<View style={{backgroundColor:Bg_,height:330,alignItems:'center',justifyContent:'center'}} 
activeOpacity={0.5}>
<Image source={{uri : imageSource}} 
style={{width:245,height:330,borderWidth:2,borderColor:'#5DCAED',resizeMode:'contain'}}/>
</View>

</TouchableOpacity>

</View>


  <Text style={{color:'grey',fontSize:16,fontWeight:'bold',textAlign:'left',marginVertical:5}} >Unit</Text>

<Picker style={styles.picker}
  selectedValue=''
      itemStyle={{ backgroundColor: "grey", color: "blue", fontSize:17 }}

  onValueChange={(itemValue, itemIndex) =>
    changepicker(itemValue)
  }>
     <Picker.Item label={label_unit}  value=""  />
{Array.isArray(data_picker)
        ? data_picker.map((us,index) => {
          return(
  <Picker.Item key={index} label={us.blok+" . "+ us.no_unit}  value={us}  />
          ) 
}) : null}
   </Picker>
  <Text style={{color:'grey',fontSize:20,fontWeight:'bold',textAlign:'left',marginVertical:5}} >Prioritas</Text>
<Picker style={styles.picker}
  selectedValue=''
      itemStyle={{ backgroundColor: "grey", color: "blue", fontSize:17 }}

  onValueChange={(itemValue, itemIndex) =>
    settype(itemValue)
  }>
     <Picker.Item label={type}  value=""  />
 <Picker.Item label={'High'}  value="High"  />
   <Picker.Item label={'Medium'}  value="Medium"  />
    <Picker.Item label={'Low'}  value="Low"  />
   </Picker>

  <Text style={{color:'grey',fontSize:16,fontWeight:'bold',textAlign:'left',marginVertical:5}} >Laporan</Text>
           <TextInput style={styles.inputBox}
      placeholder="Deskripsi"
      spellCheck={false}
      autoCorrect={false}
      numberOfLines={4}
      multiline = {true}
      onChangeText={value => setDesc(value)}
    />



</View>




<View style={styles.Sadle}></View>
</ScrollView>
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button} 
       onPress={() => Simpan()}
       activeOpacity={0.6}>
<Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity> 
</View>
        </View>
    )
}

export default Helpdesk


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
    
      Card: { 
       fontFamily: "sans-serif",
      justifyContent: "center",
      alignItems:"center",
      backgroundColor:Bg_,
      flex: 1,
      paddingVertical: 15,
      flexDirection: 'column',
      padding: 10,
      color:'blue',
      margin: 10,
      marginBottom: 5,
      borderRadius:15,
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
     bottom:5,
      flex: 1,
      // remove width and height to override fixed static size
      width: lebar,
      height: null,
       flexDirection:'row',
                  justifyContent:'space-around'
    },
       inputBox: {
      borderColor: Bg1_,
      borderStyle: 'solid',
      width:lebar,
      borderWidth:1,
      backgroundColor:Bg_,
      paddingHorizontal:2,
      fontSize:14,
      color:'grey',
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
    color:'#fff',
    itemTextStyle: { color: 'red' }
  },
  
  });
