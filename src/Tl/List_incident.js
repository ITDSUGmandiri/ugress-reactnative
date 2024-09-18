import React, { useState, useEffect } from 'react';
import { RefreshControl, StyleSheet, ScrollView, Text, View, TouchableOpacity, Modal, Image, FlatList, ActivityIndicator, Alert, Button } from 'react-native'
import { List_incident_leader, List_kategory_leader, Leader_assign, token, List_tipe_insiden } from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons/faTicketAlt'
import { Bg_, Cl_, Bg1_, Cl1_, Bg2_, Cl2_, Cl3_, Kn, Gr_ } from '../style/Style_assets';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const lebar = '100%';
const lebar_tombol = '80%';

const List_job = ({ navigation }) => {

  const itbs = token;
  const [iudstrg, setUid] = useState('');
  const [loading, isLoading] = useState(true);
  const [load, setload] = useState(true);
  const [data, setdata] = useState([]);
  const [halaman, sethalaman] = useState(false);
  const [notif, setNotif] = useState('');
  const [vinput, setInput] = useState(false);
  
  const [id_tipe_insiden, setIDTipeInsiden] = useState('');
  const [pic1, setPic1] = useState('');
  const [pic2, setPic2] = useState('');
  
  const [data_user, setdatauser] = useState([]);
  const [data_tipe_insiden, settipeinsiden] = useState([]);

  const [incident_id, setIncident] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [limit, setlimit] = useState(1);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
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

  const ascdata = async () => {

    isLoading(true);

    const result = await AsyncStorage.getItem('usnm')

    if (result != null) {

      setIDTipeInsiden('');
      setPic1('');
      setPic2('');
      setIncident('');
      sethalaman(false);
      setNotif('');
      setUid(result)
      Cek_kategory();
      // load type_incident disini, assign to picker di list insiden
      Cek(result, '');
      load_tipe_insiden();
      setdata('');

      isLoading(true);
      setInput(false);

    }
    else {
      isLoading(true);
      AsyncStorage.clear()
      navigation.replace('Login');
    }
  };

  const Cek = async (usr, id_tipe_insiden) => {
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
          user: usr,
          limit: 0,
          itbs: itbs,
          id_tipe_insiden: id_tipe_insiden
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        isLoading(false);
        if (responseJson.status == '1') {
          //alert(id_tipe_insiden);
          isLoading(false);
          setdata(responseJson.data);
          //setlimit(limit);
        }
        else {
          //alert(id_tipe_insiden);
          isLoading(false);
          setNotif(responseJson.status);
          setdata('');
          //setlimit(0);
        }
      }).catch((error) => {
        isLoading(false);
        console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const load_tipe_insiden = async () => {

    isLoading(true);
    fetch(List_tipe_insiden,
      {
        method: 'POST',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: iudstrg,
          itbs: itbs
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        isLoading(false);
        if (responseJson.status == '1') {
          isLoading(false);
          settipeinsiden(responseJson.data);
          //setlimit(limit);
        }
        else {
          isLoading(false);
          setNotif(responseJson.status);
          //setlimit(0);
        }
      }).catch((error) => {
        isLoading(false);
        console.error(error);
        setNotif('Upps ada kesalahan saat load data tipe insiden, mohon coba lagi !!');
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
          user: iudstrg,
          itbs: itbs
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        isLoading(false);
        if (responseJson.status == '1') {
          isLoading(false);
          setdatauser(responseJson.data);
          //setlimit(limit);
        }
        else {
          isLoading(false);
          setNotif(responseJson.status);
          //setlimit(0);
        }
      }).catch((error) => {
        isLoading(false);
        console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const Load_more = async (usr) => {

    sethalaman(true);
    setload(false);
    setlimit(limit + 1);

    alert("Halaman " + limit);

    fetch(List_incident_leader,
      {
        method: 'POST',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: usr,
          limit: limit,
          itbs: itbs
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        isLoading(false);

        if (responseJson.status == '1') {
          isLoading(false);
          setdata([...data, ...responseJson.data]);
          //setlimit(limit+1);
          setload(true);
          sethalaman(false);
        }
        else {
          isLoading(false);
          setNotif(responseJson.status);
          sethalaman(false)
        }

      }).catch((error) => {
        isLoading(false);
        console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });

  };

  const Pindah_halaman = (us) => {
    navigation.navigate('Detail_helpdesk', { incident_id: us.id });
  };

  const Simpan = async () => {

    //alert(formatDate(selectedDate))

    if (pic1 == '' || pic2 == '') {
      Alert.alert("Petugas 1 dan Petugas 2 tidak boleh kosong");
      isLoading(false);
    }
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
          body: JSON.stringify({
            user: iudstrg,
            incident_id: incident_id,
            teknisi1: pic1,
            teknisi2: pic2,
            tanggal: formatDate(selectedDate),
            itbs: itbs
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          isLoading(false);

          if (responseJson.status == '1') {
            isLoading(false);
            setInput(false);
            setPic1('');
            setPic2('');
            setIncident('');
            Alert.alert('Berhasil');


          }
          else {
            isLoading(false);
            Alert.alert(responseJson.status);
          }
        }).catch((error) => {
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

  const handleDateChange = (event, date) => {
    setShowDatePicker(false); // Close the date picker
    if (date !== undefined) {
      setSelectedDate(date);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true); // Show the date picker
  };

  const formatDate = (date) => {
    return date.toISOString().slice(0, 10); // Format to "YYYY-MM-DD"
  };

  const filterInsiden = (id_tipe_insiden) => {
    //setIDTipeInsiden(id);
    setIDTipeInsiden(id_tipe_insiden);
    //alert('haloo');
    Cek(iudstrg, id_tipe_insiden);
  };

  const ExpandableListItem = ({item}) => {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpand = () => {
      setExpanded(!expanded);
    };
  
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
        <View
        style={[
          styles.container,
          {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems:'center'
          },
        ]}>
        <View>
        <Text style={styles.itemTitle}>No Tiket #{item.tiket}</Text>
        <Text style={styles.itemDate}>{item.create_date}</Text>
        <Text style={{textDecorationLine: 'underline', fontSize:10}}>klik untuk detail</Text>
        </View>
        <Text onPress={()=>Pindah_halaman(item)} style={{backgroundColor: item.status == 1 ? 'green' : 'blue', color:'white', padding:5, fontWeight:'600'}}>{item.stat}</Text>
      </View>
          
        </TouchableOpacity>
        {expanded && <Text onPress={()=>Pindah_halaman(item)} style={styles.itemContent}>Lokasi : {item.nama_lokasi}{'\n'}Pelapor : {item.pelapor}{'\n'}Masalah : {item.job_detail}</Text>
        }
      </View>
    );
  };
  
  const ExpandableList = ({data}) => {
    const renderItem = ({item}) => <ExpandableListItem item={item} />;
  
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  };

  return (

    <View style={styles.Container}>

      <Modal animationType="none" visible={loading}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Bg1_
          }}>
          <ActivityIndicator size="large" color={Cl_} />
        </View>
      </Modal>

      <Modal animationType="none" visible={vinput}>

        <View style={{ padding: 10, paddingVertical: 30 }} >

          <Text style={{ fontFamily: "sans-serif", color: '#000060', margin: 1, fontSize: 20 }}>Petugas 1 </Text>

          <Picker style={styles.inputBox}
            selectedValue={pic1}
            onValueChange={(itemValue, itemIndex) =>
              setPic1(itemValue)
            }>
            <Picker.Item label="Pilih Petugas 1" value="" />
            {Array.isArray(data_user)
              ? data_user.map((us, index) => (
                <Picker.Item key={index} label={us.username} value={us.user_id} />
              ))
              : null}
          </Picker>

          <Text style={{ fontFamily: "sans-serif", color: '#000060', margin: 1, fontSize: 20 }}>Petugas 2</Text>
          <Picker style={styles.inputBox}
            selectedValue={pic2}
            onValueChange={(itemValue, itemIndex) =>
              setPic2(itemValue)
            }>
            <Picker.Item label="Pilih Petugas 2" value="" />
            {Array.isArray(data_user)
              ? data_user.map((us, index) => (
                <Picker.Item key={index} label={us.username} value={us.user_id} />
              ))
              : null}
          </Picker>

          <Text style={{ fontFamily: "sans-serif", color: '#000060', margin: 1, fontSize: 20 }}>
            Tanggal yang dipilih: {formatDate(selectedDate)}
          </Text>
          <Text style={{ fontFamily: "sans-serif", color: '#000060', margin: 1, fontSize: 20 }}>Pilih Tanggal:</Text>
          <Button title="Buka Pilih Tanggal" onPress={showDatepicker} />
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

        </View>

        <View style={styles.cnt} >

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

      <View>

        <Picker
        selectedValue={id_tipe_insiden}
        onValueChange={filterInsiden}
        >       

            <Picker.Item label="Semua Insiden" value="" />
    
            {
              Array.isArray(data_tipe_insiden)?data_tipe_insiden.map((val, index) => (
                <Picker.Item key={index} label={val.type} value={val.id} />
              ))
              : null
            }
    
        </Picker>

      </View>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={ascdata}
          />
        }

        onScroll={({ nativeEvent }) => {

          if (isCloseToBottom(nativeEvent)) {

            if (load) {
              Load_more(iudstrg);
            }

          }

        }}

        scrollEventThrottle={100}
      >

        {
        Array.isArray(data)
          ? data.map((us, index) => {
            return <View style={styles.container}>
            <ExpandableList data={data} />
          </View>
          }) : null
        }

        <View style={{ margin: 10 }}>
          <Text numberOfLines={2}
            style={{ textAlign:'center', width: lebar, fontSize: 12, color: Cl2_, marginBottom: 2 }}>
            {notif}
          </Text>
        </View>

        {
        halaman?
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

      {
      /*
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
    backgroundColor: Bg_,
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
    backgroundColor: Bg_,
    flex: 1,
    paddingVertical: 15,
    elevation: 8,
    flexDirection: 'column',
    padding: 0,
    paddingBottom: 0,
    color: 'blue',
    margin: 10,
    marginBottom: 5,
    borderRadius: 15,
  },
  button: {
    width: lebar_tombol,
    backgroundColor: Bg2_,
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 13,
    elevation: 8,

  },
  cnt: {
    fontFamily: "sans-serif",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    flex: 1,
    // remove width and height to override fixed static size
    width: lebar,
    height: null,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: Cl_,
    textAlign: 'center',

  },
  Sadle: {
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: 'transparent',
    borderRadius: 15,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  Box: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 35

  },
  Imgbox: {
    flex: 0,
    backgroundColor: 'transparent',
    resizeMode: "cover",
    width: 30,
    height: 30,
    top: 25,
    right: 0,
    margin: 5

  },
  button1: {
    width: '50%',
    backgroundColor: Bg2_,
    marginVertical: 10,
    paddingVertical: 13,
  },
  button2: {
    width: '50%',
    backgroundColor: Cl2_,
    marginVertical: 10,
    paddingVertical: 13,
  },
  inputBox: {
    borderColor: '#000060',
    borderStyle: 'solid',
    width: lebar,
    borderWidth: 1,
    backgroundColor: '#000060',
    paddingHorizontal: 2,
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectedDate: {
    fontSize: 16,
    marginTop: 16,
  },
  Card3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  //new listview css
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
  },
  itemTouchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemTitle: {
    fontFamily: 'lucida grande',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDate: {
    fontSize: 12,
    color: '#333',
  },
  itemContent: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "600",
    color: '#666',
  },
});
