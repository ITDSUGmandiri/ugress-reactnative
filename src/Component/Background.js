import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, Text } from 'react-native'
import { theme } from '../../assets/helper/theme'

import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../../Img/bg_splash.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        {children}
      </KeyboardAvoidingView>
      <Text style={{  justifyContent: 'flex-end', bottom:10, fontSize: 12, fontWeight: 'bold', textAlign: 'center',color: Colors.white, }} >V1.0.0{'\n'}powered by ITBS UG MANDIRI</Text>
    
    </ImageBackground>
    
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
