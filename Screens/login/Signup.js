/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, Image, ImageBackground, View} from 'react-native';
import {IconButton, Title, Text} from 'react-native-paper';
import Globals from '../../Ressources/Globals';
import {styleSignIn as styles} from '../../Ressources/Styles';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import SelectDropdown from 'react-native-select-dropdown';
import Fetcher from '../../API/fetcher';
import {Schemasignup} from '../../API/schemas';
import {UriEncoder} from '../../Helpers/Utils';
import Storer from '../../API/storer';
import RNReastart from 'react-native-restart';
import Toast from 'react-native-toast-message';

export default function SignupScreen({navigation}) {
  const [phone, setphone] = useState('');
  const [code, setcode] = useState('');
  const [username, setusername] = useState('');
  const [language, setlanguage] = useState('Fongbe');
  const [wrong_logins_text, set_wrong_text] = useState('');
  const [spinner, setspinner] = useState(false);

  const languages = ['Fongbe', 'Goubgbe', 'Yoruba'];

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

  async function onSignUpPressed() {
    try {
      await Schemasignup.validate({phone, username, code, language});
      setspinner(true);
      Fetcher.AuthSignup(
        JSON.stringify({
          user: {
            phone,
            username,
            code,
            language,
          },
        }),
      )
        .then(res => {
          console.log(res.errors[0]);
          if (res.errors) {
            set_wrong_text(res.errors[0].msg);
            setspinner(false);
          } else {
            Fetcher.AuthSignin(UriEncoder({phone, code, language})).then(
              resi => {
                setspinner(false);
                if (resi.errors) {
                  set_wrong_text(resi.errors[0].msg);
                  setspinner(false);
                } else {
                  Globals.PROFIL_INFO = resi;
                  Storer.storeData('@ProfilInfo', resi).then(() => {
                    Storer.storeData('@username_TYPE', 1).then(() => {
                      RNReastart.Restart();
                    });
                  });
                }
              },
            );
          }
        })
        .catch(err => {
          console.log(err);
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
        <View style={styles.center_container}>
          <Title style={styles.titleText}>{Globals.STRINGS.get_started}</Title>
          {wrong_logins_text.length > 2 && (
            <View style={styles.wrong_login_container}>
              <Text style={styles.wrong_login_found_text}>
                {wrong_logins_text}
              </Text>
            </View>
          )}
          <FormInput
            labelName="Numéro de télephone"
            value={phone}
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={usernamephone => setphone(usernamephone)}
          />
          <FormInput
            labelName="Code"
            value={code}
            onChangeText={u => setcode(u)}
          />

          <FormInput
            labelName="Nom d'itulisateur"
            value={username}
            onChangeText={u => setusername(u)}
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
          <FormButton
            title="Go"
            modeValue="contained"
            loading={spinner}
            disabled={
              spinner ||
              phone.length < 8 ||
              code.length < 5 ||
              username.length < 6
            }
            labelStyle={styles.loginButtonLabel}
            onPress={onSignUpPressed}
          />
          <IconButton
            icon="arrow-left"
            size={30}
            style={styles.navButton}
            color="#5b3a70"
            onPress={() => navigation.goBack()}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
