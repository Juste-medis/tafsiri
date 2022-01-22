/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
  Linking,
} from 'react-native';
import Globals from '../../Ressources/Globals';
import {styleSignIn as styles} from '../../Ressources/Styles';
import Storer from '../../API/storer';
import RNReastart from 'react-native-restart';
import Toast from 'react-native-toast-message';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import SelectDropdown from 'react-native-select-dropdown';
import Fetcher from '../../API/fetcher';
import {Schemasignin} from '../../API/schemas';
import {Modal, Button, Title, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const languages = ['Fongbe', 'Goubgbe', 'Yoruba'];

//search "beautiful textinput on google"
export default function SignIn({navigation}) {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [phone, setphone] = useState('');
  const [code, setcode] = useState('');
  const [language, setlanguage] = useState('Fongbe');

  const [wrong_logins_text, set_wrong_text] = useState('');
  const [spinner, setspinner] = useState(false);

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
  async function onSignInPressed() {
    try {
      await Schemasignin.validate({phone, code, language});
      setspinner(true);
      Fetcher.AuthSignin(
        JSON.stringify({
          user: {
            phone,
            code,
            language,
          },
        }),
      )
        .then(res => {
          setspinner(false);
          if (res.errors) {
            set_wrong_text(
              typeof res.errors[0] === 'string'
                ? res.errors[0]
                : Globals.STRINGS.Ocurred_error,
            );
            setspinner(false);
          } else {
            Globals.PROFIL_INFO = res;
            Toast.show({
              type: 'success',
              text1: 'Bienvenu',
              text2: res?.user?.username,
            });
            Storer.storeData('@ProfilInfo', {...res, phone, code}).then(() => {
              Storer.storeData('@USER_TYPE', 1).then(() => {
                RNReastart.Restart();
              });
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
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal_container}>
          <View style={styles.modal_top_container}>
            <Icon name="envelope-o" size={25} color="black" />
            <Text style={styles.subscript_text}>Inscription</Text>
            <Text style={{color: 'black', textAlign: 'center'}}>
              Veillez envoyer un message (whatsapp) au{' '}
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {' '}
                +33 7 55 99 63 43
              </Text>
            </Text>
          </View>
          <View style={styles.modal_bottom_container}>
            <Button
              style={{borderColor: Globals.COLORS.white}}
              labelStyle={{fontWeight: 'bold'}}
              theme={{
                colors: {
                  primary: Globals.COLORS.white,
                },
              }}
              mode="outlined"
              onPress={() => {
                Linking.openURL('https://wa.me/message/DIOP65L4TUCUE1');
              }}>
              Ecrire
            </Button>
          </View>
        </Modal>
      </Portal>
      <ImageBackground
        style={styles.container}
        source={Globals.IMAGES.LO_SPLASH}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Globals.COLORS.black}
        />
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
              value={phone}
              keyboardType="number-pad"
              autoCapitalize="none"
              onChangeText={name => setphone(name)}
              placeholder={`${Globals.STRINGS.phone}`}
            />

            <FormInput
              labelName="Code"
              value={code}
              style={styles.input}
              onChangeText={usercode => setcode(usercode)}
              placeholder="######"
            />
            <View style={{paddingVertical: 20}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'black',
                }}>
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
                showModal();
              }}>
              {' ' + Globals.STRINGS.register}
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </Provider>
  );
}
