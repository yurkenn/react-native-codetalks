import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import FloatingButton from '../../components/FloatingButton';
import styles from './RoomsDetail.style';
import ModalContentInput from '../../components/modal/ModalContentInput';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import parseContentData from '../../utils/parseContentData';
import RoomsDetailCard from '../../components/Cards/RoomsDetailCard';

const RoomsDetail = ({route}) => {
  const {item} = route.params;

  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    database()
      .ref(`rooms/${item.id}/${item.roomname.split('#')[0]}`)
      .on('value', snapshot => {
        const newContentData = snapshot.val();
        const parsedData = parseContentData(newContentData || {});
        setMessageList(parsedData);
      });
  }, []);

  const handleToggleInput = () => {
    setInputModalVisible(!inputModalVisible);
  };

  const handleSendMessage = content => {
    handleToggleInput();
    sendMessage(content);
  };

  const sendMessage = content => {
    const userMail = auth().currentUser.email;

    const contentData = {
      message: content,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
    };
    database()
      .ref(`rooms/${item.id}/${item.roomname.split('#')[0]}/`)
      .push(contentData);
  };

  const renderMessages = ({item}) => <RoomsDetailCard user={item} />;

  return (
    <View style={styles.container}>
      <FlatList data={messageList} renderItem={renderMessages} />
      <FloatingButton icon="add" onPress={handleToggleInput} />
      <ModalContentInput
        visible={inputModalVisible}
        onClose={handleToggleInput}
        onSend={handleSendMessage}
      />
    </View>
  );
};

export default RoomsDetail;
