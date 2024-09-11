import React, {useState, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {List_incident_teknisi, token} from '../style/Link';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faSort} from '@fortawesome/free-solid-svg-icons/faSort';
import {faTicketAlt} from '@fortawesome/free-solid-svg-icons/faTicketAlt';
import {
  Bg_,
  Cl_,
  Bg1_,
  Cl1_,
  Bg2_,
  Cl2_,
  Cl3_,
  Kn,
  Gr_,
} from '../style/Style_assets';
import Icon from 'react-native-vector-icons/FontAwesome';

const lebar = '100%';
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
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
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

    const result = await AsyncStorage.getItem('usnm');

    if (result != null) {
      sethalaman(false);
      setNotif('');
      setUid(result);
      Cek(result);
      setdata('');
      isLoading(true);
    } else {
      isLoading(true);
      AsyncStorage.clear();
      navigation.replace('Login');
    }
  };

  const Cek = async usr => {
    //lm = parseInt(limit);
    isLoading(true);

    fetch(List_incident_teknisi, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: usr,
        limit: 0,
        itbs: itbs,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        isLoading(false);
        if (responseJson.status == '1') {
          isLoading(false);
          setdata(responseJson.data);
          //setlimit(limit);
        } else {
          isLoading(false);
          setNotif(responseJson.status);
          //setlimit(0);
        }
      })
      .catch(error => {
        isLoading(false);
        console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const Load_more = async usr => {
    sethalaman(true);
    setload(false);
    setlimit(limit + 1);
    alert('Halaman ' + limit);
    fetch(History_tiket, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: usr,
        limit: limit,
        itbs: itbs,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        isLoading(false);
        if (responseJson.status == '1') {
          isLoading(false);
          setdata([...data, ...responseJson.data]);
          //setlimit(limit+1);
          setload(true);
          sethalaman(false);
        } else {
          isLoading(false);
          setNotif(responseJson.status);
          sethalaman(false);
        }
      })
      .catch(error => {
        isLoading(false);
        console.error(error);
        setNotif('Upps ada kesalahan mohon coba lagi !!');
      });
  };

  const Pindah_halaman = us => {
    console.log(us.status);
    if (us.status == 1) {
      navigation.navigate('Teknisi_pengecekan', {incident_id: us.id});
    } else if (us.status == 2) {
      navigation.navigate('Teknisi_progres', {incident_id: us.id});
    } else {
      navigation.navigate('Detail_tiket_update', {incident_id: us.id});
    }
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
        <Text style={{backgroundColor: item.status == 1 ? 'green' : 'blue', color:'white', padding:5, fontWeight:'600'}}>{item.stat}</Text>
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
  

  const All = ({
    tiket,
    last_status,
    id,
    problem,
    blok,
    no_unit,
    create_date,
    detail,
    nama_lokasi,
  }) => {
    return (
      <View>
        <TouchableOpacity onPress={detail} style={styles.Card1}>
          <FontAwesomeIcon icon={faTicketAlt} style={styles.Imgbox} size={32} />
          <View style={styles.Box}>
            <Text
              numberOfLines={2}
              style={{
                width: lebar,
                left: 10,
                fontSize: 24,
                color: '#56c0e0',
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              {last_status}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                width: lebar,
                fontSize: 16,
                color: Cl3_,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Area : {nama_lokasi}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                width: lebar,
                fontSize: 16,
                color: Cl3_,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Unit : {blok}. {no_unit}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                width: lebar,
                fontSize: 16,
                color: Cl3_,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              No Tiket : {tiket}
            </Text>
            <Text
              numberOfLines={4}
              style={{
                width: lebar,
                fontSize: 16,
                color: Cl3_,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Laporan : {problem}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                width: lebar,
                fontSize: 16,
                color: Cl3_,
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Create Date : {create_date}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <Modal animationType="none" visible={loading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Bg1_,
          }}>
          <ActivityIndicator size="large" color={Cl_} />
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={ascdata} />
        }
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            if (load) {
              Load_more(iudstrg);
            }
          }
        }}
        scrollEventThrottle={100}>
        <View style={styles.container}>
          <ExpandableList data={data} />
        </View>
      </ScrollView>
      {/*
<View  style={styles.cnt} >
<TouchableOpacity style={styles.button} 
 onPress={() => navigation.navigate('Flm_create_pm')}
activeOpacity={0.6}>
<Text style={styles.buttonText}>Buat Tiket PM</Text>
</TouchableOpacity> 
</View>
*/}
    </View>
  );
};

export default List_job;

const styles = StyleSheet.create({
  Container: {
    fontFamily: 'sans-serif',
    backgroundColor: Bg_,
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    justifyContent: 'center',
  },

  Card1: {
    fontFamily: 'sans-serif',
    justifyContent: 'center',
    //alignItems:"center",
    backgroundColor: Bg_,
    flex: 1,
    paddingVertical: 15,
    elevation: 8,
    flexDirection: 'column',
    padding: 10,
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
    fontFamily: 'sans-serif',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    flex: 1,
    // remove width and height to override fixed static size
    width: lebar,
    height: null,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    justifyContent: 'space-around',
  },
  Box: {
    flex: 1,
    flexDirection: 'column',

    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 35,
  },
  Imgbox: {
    flex: 0,
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    width: 30,
    height: 30,
    top: 25,
    right: 0,
  },

  // test
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
