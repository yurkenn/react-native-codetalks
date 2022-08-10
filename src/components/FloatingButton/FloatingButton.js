import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './FloatingButton.style';
const FloatingButton = ({icon, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name={icon} size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;
