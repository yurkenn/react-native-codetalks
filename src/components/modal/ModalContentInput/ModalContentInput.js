import {View, TextInput} from 'react-native';
import React, {useState} from 'react';
import styles from './ModalContentInput.style';
import Button from '../../Button';
import Modal from 'react-native-modal';

const ModalContentInput = ({visible, onClose, onSend, placeholder}) => {
  const [text, setText] = useState('');

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            placeholder={placeholder}
            onChangeText={setText}
            multiline
          />
        </View>
        <Button text="Yarat" onPress={() => onSend(text)} />
      </View>
    </Modal>
  );
};

export default ModalContentInput;
