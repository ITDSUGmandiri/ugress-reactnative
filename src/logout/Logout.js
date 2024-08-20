import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Cl_, Bg1_} from '../style/Style_assets';
import {StyleSheet, Text,Modal, View,TouchableOpacity} from 'react-native';
const Logout = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);

  const modalHeader=(
    <View style={styles.modalHeader}>
      <Text style={styles.title}>Logout</Text>
      <View style={styles.divider}></View>
    </View>
  )

  const modalBody=(
    <View style={styles.modalBody}>
      <Text style={styles.bodyText}>Anda yakin ingin keluar dari Aplikasi ?</Text>
    </View>
  )

  const modalFooter=(
    <View style={styles.modalFooter}>
      <View style={styles.divider}></View>
      <View style={{flexDirection:"row-reverse",margin:10}}>
        <TouchableOpacity style={{...styles.actions,backgroundColor:"#db2828"}} 
          onPress={() => {
            navigation.replace('Bottom_navigasi');
          }}>
          <Text style={styles.actionText}>Batal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.actions,backgroundColor:"#21ba45"}}
        onPress={() => {
           setTimeout(() => {
    AsyncStorage.clear();
    navigation.replace('Login');
  }, 2000);
        }}>
          <Text style={styles.actionText}>Ya</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const modalContainer=(
    <View style={styles.modalContainer}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </View>
  )

  const modal = (
    <Modal
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.modal}>
        <View>
          {modalContainer}
        </View>
      </View>
    </Modal>
)


    

  // setTimeout(() => {
  //   AsyncStorage.clear();
  //   navigation.replace('Login');
  // }, 2000);

  return (
    <View style={styles.container}>
      
    {modal}

    
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal:{
    backgroundColor:"#00000099",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer:{
    backgroundColor:"#f9fafb",
    width:"80%",
    borderRadius:5
  },
  modalHeader:{
    
  },
  title:{
    fontWeight:"bold",
    fontSize:20,
    padding:15,
    color:"#000"
  },
  divider:{
    width:"100%",
    height:1,
    backgroundColor:"lightgray"
  },
  modalBody:{
    backgroundColor:"#fff",
    paddingVertical:20,
    paddingHorizontal:10
  },
  modalFooter:{
  },
  actions:{
    borderRadius:5,
    marginHorizontal:10,
    paddingVertical:10,
    paddingHorizontal:20
  },
  actionText:{
    color:"#fff"
  }
});

export default Logout;
