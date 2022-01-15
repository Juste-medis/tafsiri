/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Globals from '../../Ressources/Globals';
import {styleSignIn as styles} from '../../Ressources/Styles';
import Storer from '../../API/storer';
import Fetcher from '../../API/fakeApi';
import {UriEncoder} from '../../Helpers/Utils';
import RNReastart from 'react-native-restart';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import {Title} from 'react-native-paper';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import SelectDropdown from 'react-native-select-dropdown';

const languages = ['Fongbe', 'Goubgbe', 'Yoruba'];

//search "beautiful textinput on google"
export default function SignIn({navigation}) {
  const [phone_number, setphone_number] = useState();
  const [code, setcode] = useState();
  var [wrong_logins_text, set_wrong_text] = useState('');
  var [spinner, setspinner] = useState(false);
  const [language, setlanguage] = useState('');

  function err_err(err) {
    setspinner(false);
    Toast.show({
      type: 'error',
      text1: 'Eureur',
      text2:
        err.name === 'TypeError'
          ? Globals.STRINGS.no_internet
          : err.message || Globals.STRINGS.Ocurred_error,
    });
  }
  async function valideEnterdData() {
    await yup
      .object()
      .shape({
        phone_number: yup
          .number()
          .min(3, 'Telephone Invalide')
          .required('Vous devez entrer un Tel'),
        code: yup
          .number()
          .min(3, 'Code invalide')
          .required('Vous devez entrer un code'),
      })
      .validate({phone_number, code});
  }
  async function onSignInPressed() {
    try {
      await valideEnterdData();
      setspinner(true);
      Fetcher.AuthSignin(
        UriEncoder({
          phone_number: phone_number,
          user_code: code,
        }),
      )
        .then(res => {
          setspinner(false);
          if (res.message) {
            // setModalVisible(true);
          } else {
            Fetcher.CheckAuth(20)
              .then(resi => {
                if (res.name) {
                  Globals.PROFIL_INFO = resi;
                  Storer.storeData('@ProfilInfo', {
                    ...resi,
                    ...{
                      phone_number: phone_number,
                      user_code: code,
                    },
                  }).then(() => {
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
    <ImageBackground style={styles.container} source={Globals.IMAGES.LO_SPLASH}>
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
            style={styles.input}
            value={phone_number}
            keyboardType="number-pad"
            autoCapitalize="none"
            onChangeText={name => setphone_number(name)}
            placeholder={`${Globals.STRINGS.phone}`}
          />

          <FormInput
            labelName="Code"
            value={code}
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={usercode => setcode(usercode)}
            placeholder="######"
          />
          <View style={{paddingVertical: 20}}>
            <Text
              style={{fontWeight: 'bold', textAlign: 'center', color: 'black'}}>
              {Globals.STRINGS.language}:
            </Text>
            <SelectDropdown
              defaultValue="Fongbe"
              data={languages}
              onSelect={(selectedItem, index) => {
                setlanguage(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>

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
    </ImageBackground>
  );
}
