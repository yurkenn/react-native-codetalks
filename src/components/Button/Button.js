import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './Button.style';
const Button = ({text, theme = 'primary', onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles[theme].container}>
      <Text style={styles[theme].text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
