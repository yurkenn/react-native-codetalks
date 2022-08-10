import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" color={colors.brightorange} />
    </View>
  );
};

export default Loading;
