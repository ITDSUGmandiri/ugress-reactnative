import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
export default function NewTiket() {
  return <WebView source={{ uri: 'https://itbs.slmugmandiri.co.id/mydashboard/ticket/add' }} style={{ flex: 1 }} />;
}
