import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../../assets/helper/theme'
import { white } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})
