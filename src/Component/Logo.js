import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../../assets/gambar/logofeat.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 230,
    height: 40,
    marginBottom: 8,
    resizeMode: 'cover',
  },
})
