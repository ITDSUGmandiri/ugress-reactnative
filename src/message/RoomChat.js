import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import Logo from '../../Img/logofeat.png';
import moment from 'moment';

export default RoomChat = () => {
  const data = [
    { id: 1, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit amet',  image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png', },
    { id: 2, date: '9:50 am', type: 'out', message: 'Lorem ipsum dolor sit amet', image: 'https://www.bootdey.com/img/Content/avatar/avatar6.png', },
    { id: 3, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
    { id: 4, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit a met' },
    { id: 5, date: '9:50 am', type: 'out', message: 'Lorem ipsum dolor sit a met' },
  ]

  const [messages, setMessages] = useState(data)
  const [newMsg, setNewMsg] = useState()
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const time = moment(new Date()).format('LLLL');
    setCurrentTime(time);

  }, [currentTime]);

  const renderDate = date => {
    return <Text style={styles.time}>{date}</Text>
  }

  return (
    <View style={styles.container}>
       <View style={styles.tophead}>
          <Image source={Logo} style={styles.logo}></Image>

          <Text>{currentTime}</Text>
         
        </View>
      <FlatList
        style={styles.list}
        data={messages}
        keyExtractor={item => {
          return item.id
        }}
        renderItem={message => {
          const item = message.item
          let inMessage = item.type === 'in'
          let itemStyle = inMessage ? styles.itemIn : styles.itemOut
          return (
            <View style={[styles.item, itemStyle]}>
              
              
              {inMessage ? 

              <>
              <Image source={{ uri: item.image }} style={styles.userPic} />
              <View style={[styles.balloon]}>
                
                <Text selectable>{inMessage && renderDate(item.date)}{'\n'}{item.message}</Text>
                
              </View>
              
              </>
              :
              <>
              <View style={[styles.balloon]}>
                <Text selectable>{renderDate(item.date)}{'\n'}{item.message}</Text>
              </View>
               <Image source={{ uri: item.image }} style={styles.userPic} /></>
               }
              {/* {inMessage && renderDate(item.date)} */}
            </View>
          )
        }}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Write a message..."
            underlineColorAndroid="transparent"
            onChangeText={msg => setNewMsg({ msg })}
          />
        </View>

        <TouchableOpacity style={styles.btnSend}>
          <Image
            source={{ uri: 'https://img.icons8.com/small/75/ffffff/filled-sent.png' }}
            style={styles.iconSend}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    height: 40,
    width: 200,
  },
  tophead: {
    borderBottomLeftRadius:40,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: 'sans-serif-light',
    fontWeight: 'bold',
    paddingBottom:5,
    color: 'black',
  },
  container: {
    
    backgroundColor: '#000060',
    flex: 999,
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  list: {
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: '#000060',
    width: 45,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  balloon: {
    fontSize:12,
    maxWidth: 250,
    padding: 8,
    borderRadius: 10,
  },
  itemIn: {
    alignSelf: 'flex-start',
  },
  itemOut: {
    alignSelf: 'flex-end',
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize: 10,
    color: '#808080',
  },
  item: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
  },
})
