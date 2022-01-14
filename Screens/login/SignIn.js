import React, {useState} from 'react';
import {View, Image, Text, ScrollView, ActivityIndicator} from 'react-native';
import Globals from '../../Ressources/Globals';
import {styleSignIn as styles} from '../../Ressources/Styles';
import Storer from '../../API/storer';
import Fetcher from '../../API/fetcher';
import {UriEncoder} from '../../Helpers/Utils';
import RNReastart from 'react-native-restart';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import {Title} from 'react-native-paper';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';

//search "beautiful textinput on google"
export default function SignIn({navigation}) {
  const [username, setusername] = useState('');
  const [code, setcode] = useState('');
  var [wrong_logins_text, set_wrong_text] = useState('');
  var [spinner, setspinner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function err_err(err) {
    setspinner(false);
    Toast.show({
      type: 'error',
      text1: 'Eureur',
      text2:
        err.name == 'TypeError'
          ? Globals.STRINGS.no_internet
          : err.message || Globals.STRINGS.Ocurred_error,
    });
  }
  async function valideEnterdData() {
    await yup
      .object()
      .shape({
        username: yup
          .string()
          .min(3, 'Identifiant Invalide')
          .required('Vous devez entrer un Identifiant'),
        code: yup
          .string()
          .min(3, 'Mot de passe invalide')
          .required('Vous devez entrer un mot de passe.'),
      })
      .validate({username, code});
  }
  async function onSignInPressed() {
    try {
      await valideEnterdData();
      setspinner(true);
      Fetcher.AuthSignin(
        UriEncoder({
          username: username,
          user_pass: code,
        }),
      )
        .then(res => {
          setspinner(false);
          if (res.message) {
            setModalVisible(true);
          } else {
            Fetcher.CheckAuth(20)
              .then(res => {
                if (res.username) {
                  Globals.PROFIL_INFO = res;
                  Storer.storeData('@ProfilInfo', res).then(() => {
                    Storer.storeData('@USER_TYPE', 1).then(() => {
                      RNReastart.Restart();
                    });
                  });
                }
              })
              .catch(err => {
                err_err(err);
              });
          }
        })
        .catch(err => {
          err_err(err);
        });
    } catch (e) {
      if (e.name === 'ValidationError') {
        set_wrong_text(e.message);
      }
    }
  }
  return (
    <View style={styles.container}>
      <Toast />
      <Image source={Globals.IMAGES.LOGO} style={styles.Image_style} />
      <ScrollView style={styles.center_scroll}>
        <Title style={styles.titleText}>{Globals.STRINGS.hello}</Title>
        <View style={styles.center_container}>
          {wrong_logins_text.length > 2 && (
            <View style={styles.wrong_login_container}>
              <Text style={styles.wrong_login_found_text}>
                {wrong_logins_text}
              </Text>
            </View>
          )}

          <FormInput
            labelName="Numéro"
            value={username}
            autoCapitalize="none"
            onChangeText={name => setusername(name)}
            placeholder={`${Globals.STRINGS.phone}`}
          />

          <FormInput
            labelName="Code"
            value={code}
            style={styles.input}
            onChangeText={usercode => setcode(usercode)}
            placeholder="######"
          />

          <View style={styles.err_cont}>
            {spinner ? (
              <ActivityIndicator
                style={styles.indicator}
                size="large"
                color={Globals.COLORS.primary_pure}
              />
            ) : (
              <FormButton
                title={Globals.STRINGS.connection}
                modeValue="contained"
                labelStyle={styles.loginButtonLabel}
                onPress={() => {
                  onSignInPressed();
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom_container}>
        <Text style={styles.simple_text}>
          {Globals.STRINGS.newHere}
          <Text
            style={styles.boldText}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            {' ' + Globals.STRINGS.register}
          </Text>
        </Text>
      </View>
    </View>
  );
}
