import {View, Text} from 'react-native';
import React from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './Sign.style';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';

const initialValues = {
  usermail: '',
  password: '',
  repassword: '',
};

const Sign = ({navigation}) => {
  const handleGoBackButton = () => {
    navigation.goBack();
  };

  const handleFormSubmit = async formValues => {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Şifre Uyuşmuyor',
        type: 'danger',
      });
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
        formValues.repassword,
      );
      showMessage({
        message: 'Kullancı Oluşturuldu',
        type: 'success',
      });
      navigation.navigate('LoginPage');
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'warning',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>codetalks</Text>
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({handleChange, handleSubmit, values}) => (
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
            <Input
              onChangeText={handleChange('repassword')}
              value={values.repassword}
              placeholder="şifrenizi tekrar giriniz.."
              isSecure
            />
            <Button theme="primary" text="Kayıt Ol" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button theme="secondary" text="Geri" onPress={handleGoBackButton} />
    </View>
  );
};

export default Sign;
