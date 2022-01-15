/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Globals from '../../Ressources/Globals';
import {styleDashBoard as styles} from '../../Ressources/Styles';
import FormButton from '../../components/FormButton';
import {Button} from 'react-native-paper';
import Fetcher from '../../API/fakeApi';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import Storer from '../../API/storer';
import RNReastart from 'react-native-restart';

export default function Dasboard({navigation}) {
  const [dataprop, setdataprop] = React.useState({
    saved: 0,
    checked: 0,
    rejected: 0,
    earned: 0,
    name: '',
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
    Fetcher.GetUserData()
      .then(res => {
        setspinner(false);
        if (res.message) {
          err_err(res);
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
      <Toast />

      <View>
        <View style={styles.top_container}>
          <Icon name="user" size={200} color="grey" />
          <Text style={styles.autor_name}>
            {dataprop.name}({Globals.PROFIL_INFO.phone_number})
          </Text>
        </View>
        <View style={styles.middle_container}>
          {MiddleFielder({
            icon: 'microphone',
            legend: Globals.STRINGS.save,
            value: dataprop.saved,
          })}
          {MiddleFielder({
            icon: 'check-circle',
            legend: Globals.STRINGS.checked,
            value: dataprop.checked,
          })}
          {MiddleFielder({
            icon: 'remove',
            legend: Globals.STRINGS.rejected,
            value: dataprop.rejected,
          })}
          {MiddleFielder({
            icon: 'usd',
            legend: Globals.STRINGS.earned,
            value: dataprop.earned,
          })}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
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

          <Button
            style={styles.action_button}
            mode="outlined"
            labelStyle={styles.loginButtonLabel}
            theme={{colors: {primary: '#fd7e14'}}}
            onPress={() => {}}>
            {Globals.STRINGS.checkout}
          </Button>
        </View>
        <Button
          style={[styles.action_button, {margin: 20}]}
          contentStyle={{margin: 20, padding: 1}}
          labelStyle={{color: 'white'}}
          theme={{colors: {primary: '#fd7e14'}}}
          mode="contained"
          onPress={() => {
            navigation.navigate('Recorder');
          }}>
          {Globals.STRINGS.translate}
        </Button>
      </View>
      <View></View>
    </View>
  );
}
