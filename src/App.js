import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './pages/auth/Login';
import Sign from './pages/auth/Sign';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import colors from './styles/colors';
import Rooms from './pages/Rooms/Rooms';
import RoomsDetail from './pages/RoomsDetail';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Stack = createNativeStackNavigator();

const App = () => {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user);
    });
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="SingPage" component={Sign} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userSession ? (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Rooms"
              component={Rooms}
              options={{
                title: 'odalar',
                headerTitleAlign: 'center',
                headerTintColor: colors.brightorange,
              }}
            />
            <Stack.Screen
              name="RoomsDetail"
              component={RoomsDetail}
              options={({route}) => ({
                title: route.params.item.roomname,
                headerTitleAlign: 'center',
                headerTintColor: colors.brightorange,
                headerRight: () => (
                  <Icon
                    name="logout"
                    size={30}
                    color={colors.darkorange}
                    onPress={() => auth().signOut()}
                  />
                ),
              })}
            />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
