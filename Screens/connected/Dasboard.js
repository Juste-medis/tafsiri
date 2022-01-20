/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Globals from '../../Ressources/Globals';
import {styleDashBoard as styles} from '../../Ressources/Styles';
import FormButton from '../../components/FormButton';
import {Button} from 'react-native-paper';
import Fetcher from '../../API/fetcher';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import Storer from '../../API/storer';
import RNReastart from 'react-native-restart';

export default function Dasboard({navigation}) {
  const [dataprop, setdataprop] = React.useState({
    recordings: Globals.PROFIL_INFO.user.recordings,
    validated: Globals.PROFIL_INFO.user.validated,
    rejected: Globals.PROFIL_INFO.user.rejected,
    gain: Globals.PROFIL_INFO.user.gain,
    username: Globals.PROFIL_INFO.user.username,
  });
  const [spinner, setspinner] = React.useState(false);
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
  useEffect(() => {
    load_init();
    return () => {};
  }, []);
  const load_init = () => {
    setspinner(true);
    Fetcher.GetUserData(
      JSON.stringify({
        user: {
          phone: Globals.PROFIL_INFO.phone,
          code: Globals.PROFIL_INFO.code,
          language: Globals.PROFIL_INFO.user.language,
        },
      }),
    )
      .then(res => {
        setspinner(false);
        if (res.errors) {
          err_err(
            typeof res.errors[0] === 'string'
              ? res.errors[0]
              : Globals.STRINGS.Ocurred_error,
          );
        } else {
          setdataprop({...dataprop, ...res});
        }
        setspinner(false);
      })
      .catch(err => {
        err_err(err);
      });
  };

  const MiddleFielder = meta => {
    return (
      <View style={styles.middle_fields_container}>
        <Text style={styles.midle_prop_value}>{meta.value}</Text>
        <Text style={styles.midle_prop_title}>
          <Icon icon={meta.icon} color="#000" size={20} />
          {meta.legend}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.main_container}>
      <Toast position="bottom" />

      <View style={styles.middle_heberger}>
        <View style={styles.top_container}>
          <Icon name="user" size={200} color="grey" />
          <Text style={styles.autor_name}>
            {dataprop.username} ({Globals.PROFIL_INFO.phone})
          </Text>
        </View>
        <View style={styles.middle_container}>
          {MiddleFielder({
            icon: 'microphone',
            legend: Globals.STRINGS.save,
            value: dataprop.recordings,
          })}
          {MiddleFielder({
            icon: 'check-circle',
            legend: Globals.STRINGS.validated,
            value: dataprop.validated,
          })}
          {MiddleFielder({
            icon: 'remove',
            legend: Globals.STRINGS.rejected,
            value: dataprop.rejected,
          })}
          {Globals.PROFIL_INFO.user.profile === 'traducteur' &&
            MiddleFielder({
              icon: 'usd',
              legend: Globals.STRINGS.gain,
              value: dataprop.gain,
            })}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
          }}>
          <FormButton
            style={styles.action_button}
            title={Globals.STRINGS.signout}
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => {
              Storer.removeData();
              RNReastart.Restart();
            }}
          />
          {Globals.PROFIL_INFO.user.profile === 'traducteur' && (
            <Button
              style={[styles.action_button, {marginTop: 10}]}
              mode="outlined"
              labelStyle={styles.loginButtonLabel}
              theme={{colors: {primary: '#fd7e14'}}}
              onPress={() => {}}>
              {Globals.STRINGS.checkout}
            </Button>
          )}
        </View>
        <Button
          style={[styles.action_button, {marginVertical: 20, width: '50%'}]}
          labelStyle={{color: 'white'}}
          theme={{colors: {primary: '#fd7e14'}}}
          mode="contained"
          onPress={() => {
            navigation.navigate('Recorder');
          }}>
          {Globals.STRINGS.translate}
        </Button>
        {Globals.PROFIL_INFO.user.profile === 'joueur' && (
          <Button
            style={[
              styles.action_button,
              {marginVertical: 20, width: '50%', borderRadius: 0},
            ]}
            theme={{colors: {primary: Globals.COLORS.arsenic2}}}
            mode="outlined"
            onPress={() => {
              navigation.navigate('Challenge');
            }}>
            challenge
          </Button>
        )}
      </View>
      <View></View>
    </View>
  );
}
