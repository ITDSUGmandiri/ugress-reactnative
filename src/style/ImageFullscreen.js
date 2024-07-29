import React from 'react';
import { StyleSheet, Modal, View, Image, TouchableOpacity } from 'react-native';
//import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

const ImageFullscreen = ({ uri, visible, onClose }) => {
  return (
    <Modal isVisible={visible}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose}>
          <Image source={{ uri }} style={styles.image} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ImageFullscreen;
