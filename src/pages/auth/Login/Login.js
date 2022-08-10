import {View, Text} from 'react-native';
import React from 'react';
import Input from '../../../components/Input';
import styles from './Login.style';
import Button from '../../../components/Button/Button';
import {Formik} from 'formik';
import authErrorMessageparser from '../../../utils/authErrorMessageParser';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
const initialValues = {
  usermail: '',
  password: '',
};

const Login = ({navigation}) => {
  const handleSignButton = () => {
    navigation.navigate('SingPage');
  };

  const handleFormSubmit = async formValues => {
    try {
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      showMessage({
        message: 'Giriş Yapıldı',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: authErrorMessageparser(error.code),
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>codetalks</Text>
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <>
            <Input
              value={values.usermail}
              onChangeText={handleChange('usermail')}
              placeholder="e-postanızı giriniz.."
            />
            <Input
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="şifrenizi giriniz.."
              isSecure
            />
            <Button theme="primary" text="Giriş Yap" onPress={handleSubmit} />
          </>
        )}
      </Formik>

      <Button theme="secondary" text="Kayıt Ol" onPress={handleSignButton} />
    </View>
  );
};

export default Login;
