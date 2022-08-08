// eslint-disable-next-line no-unused-vars
import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import FloatingButton from '../../components/FloatingButton';
import styles from './Rooms.style';
import ModalContentInput from '../../components/modal/ModalContentInput';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContentData from '../../utils/parseContentData';
import RoomsCard from '../../components/Cards/RoomsCard';
const Rooms = ({navigation}) => {
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    database()
      .ref('rooms/')
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = parseContentData(contentData || {});
        setRoomList(parsedData);
      });
  }, []);

  const handleInputToggle = () => {
    setInputModalVisible(!inputModalVisible);
  };

  const handleSendContent = content => {
    handleInputToggle();
    sendContent(content);
  };

  const sendContent = content => {
    const userMail = auth().currentUser.email;

    const contentObject = {
      text: content,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
    };
    database().ref('rooms/').push(contentObject);
  };

  const handleRoomsDetail = () => {
    navigation.navigate('RoomsDetail');
  };

  const renderRoomList = ({item}) => (
    <RoomsCard rooms={item} onPress={handleRoomsDetail} />
  );

  return (
    <View style={styles.container}>
      <FlatList data={roomList} renderItem={renderRoomList} numColumns="2" />
      <FloatingButton icon="add" onPress={handleInputToggle} />
      <ModalContentInput
        visible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendContent}
      />
    </View>
  );
};

export default Rooms;
