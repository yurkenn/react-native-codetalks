import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import styles from './RoomsCard.style';
import {formatDistance, parseISO} from 'date-fns';
const RoomsCard = ({rooms, onPress}) => {
  const formattedDate = formatDistance(parseISO(rooms.date), new Date(), {
    addSuffix: true,
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.room_name}>{rooms.text}</Text>
        <View style={styles.info_container}>
          <Text style={styles.room_creater}>{rooms.username}</Text>
          <Text style={styles.room_created_date}>{formattedDate}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RoomsCard;
