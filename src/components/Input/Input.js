import {View, Text, TextInput} from 'react-native';
import React from 'react';
import styles from './Input.style';
const Input = ({placeholder, isSecure, value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="white"
        secureTextEntry={isSecure}
      />
    </View>
  );
};

export default Input;
