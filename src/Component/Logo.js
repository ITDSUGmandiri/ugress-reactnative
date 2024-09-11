import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../../Img/icon_login_masiin.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 230,
    height: 140,
    resizeMode: 'cover',
  },
})
