import React,{useState,useEffect} from 'react';
import { RefreshControl,StyleSheet,ScrollView, Text, View,TouchableOpacity,Modal,Image,TextInput,ActivityIndicator,Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bg_,Cl_,Bg1_,Cl1_,Bg2_,Cl2_,Cl3_,Gr_} from '../style/Style_assets';
//import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import GetLocation from 'react-native-get-location';
import {token,Link_ttd} from '../style/Link';
import Signature from "react-native-signature-canvas";
import Rating from './startrating';

//import * as RNFS from 'react-native-fs';
const lebar ='100%';
const lebar_tombol = '80%';
const Ttd = ({navigation,route}) => {

const { incident_id } = route.params;
//const { status } = route.params;
const itbs = token;
const [user, setUid] = useState('');
const [loading, isLoading] = useState(true);
const [rating, setRating] = useState(0);
const [nama, setNama] = useState(true);



const [imageSource, setImageSource] =  useState(null);
const [imagemime, setImageMime] =  useState(null);



  const [signature, setSign] = useState(null);
 const handleOK = (signature) => {
    //console.log(signature);

   // isLoading(true);
if (signature == null) 
{Alert.alert("Signature tidak boleh kosong");
isLoading(false); }
else if (nama == '') 
{Alert.alert("Deskripsi nama tidak boleh kosong");
isLoading(false); }
else if (rating == '') 
{Alert.alert("Anda belum pilih rating");
isLoading(false); }
else {
    setSign(signature);
    //setImageSource(signature);
    Simpan(signature);
}
  };

  const handleEmpty = () => {
    console.log("Empty");
  };


 const handleRatingChange = (newRating) => {
    setRating(newRating);
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
      // console.log(status);
    setUid(result)
    setImageSource(null);
    setImageMime(null);
     //Cek_lokasi();  
    isLoading(false);  
    
    }
   else
   {
     isLoading(true);
     AsyncStorage.clear ()
     navigation.replace('Login');
    }
  };



 const clean_cache = () => {
  ImagePicker.clean().then(() => {
  console.log('removed all tmp images from tmp directory');
}).catch(e => {
 console.log(e);
});

 }

 
const  Simpan = async (sg) => {

   isLoading(true);
            const dataa = new FormData();
            dataa.append('user',user);
            dataa.append('foto',sg);
            dataa.append('incident_id',incident_id);
            dataa.append('rating',rating);
            dataa.append('nama',nama);
                
         fetch(Link_ttd, {
            method: 'POST',
            headers: 
            {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
                 'x-api-key': token,
            },
              body:dataa
           }
           )
           .then((response) => response.json())
           .then((responseJson) =>
           {
            console.log(responseJson);
  if(responseJson.status == 1)
          {
         clean_cache();
         // navigation.replace('Detail_tiket_update',{incident_id:incident_id});
          navigation.replace('Detail_helpdesk',{incident_id:incident_id});
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
          console.log(error);
            Alert.alert('Gagal upload');
              //isLoading(false);
           });  
          

        
        };







return (

  <View  style={styles.Container}> 



      
    <View  style={styles.Card}> 
        <View
style={styles.preview}>
        {/*signature ? (
          <Image
            resizeMode={"contain"}
            style={{ width: '100%', height: 114 }}
            source={{ uri: signature }}
          />
        ) : null*/}
          <Text style={{color:'#000060'}}>Rating: {rating==1?'Tidak Puas':rating==2?'Cukup Puas':rating==3?'Puas':rating==4?'Sangat Puas':''}</Text>
      <Rating rating={rating} onRatingChange={handleRatingChange} />
<Text style={{color:'grey',fontSize:16,fontWeight:'bold',textAlign:'left',marginVertical:5}} >Deskripsi Nama</Text>

          <TextInput style={styles.inputBox}
      placeholder="Deskripsi"
      spellCheck={false}
      autoCorrect={false}
      numberOfLines={1}
      multiline = {true}
     onChangeText={value => setNama(value)}
    />
       
        </View>
      
    <Signature
        onOK={handleOK}
        onEmpty={handleEmpty}
        descriptionText="Sign"
        clearText="Clear"
        confirmText="Save"
        webStyle={styles.Card}
      />
   
         
     
  
   </View>
    </View>
    )
}

export default Ttd


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
       width:'100%',
       flex:1
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
      width:'90%',
      borderWidth:1,
      backgroundColor:Bg_,
      paddingHorizontal:2,
      fontSize:14,
      color:'grey',
      marginTop:10,
      paddingHorizontal:10,
      },


        preview: {
    width: '100%',
    height: 164,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  previewText: {
    color: "black",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10,
  },

  
  });
