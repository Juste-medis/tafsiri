/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styleRecorder as styles} from '../../Ressources/Styles';
import Toast from 'react-native-toast-message';
import Globals from '../../Ressources/Globals';
import Fetcher from '../../API/fetcher';
import AudioRecorde from '../../components/AudioRecorder';
import * as RNFS from 'react-native-fs';

export default function Recorder({navigation}) {
  const [spinner, setspinner] = React.useState(false);

  const [sectiondata, setsectiondata] = React.useState({
    language: Globals.PROFIL_INFO.user.language,
    sentences: Globals.PROFIL_INFO.user.sentences,
    idsentences: Globals.PROFIL_INFO.user.idsentences[0],
  });
  useEffect(() => {
    load_init();
    return () => {};
  }, []);

  const load_init = () => {
    setspinner(true);
    Fetcher.GetSection(
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
          setsectiondata({
            ...sectiondata,
            ...{
              language: res.user.language,
              sentences: res.user.sentences,
              idsentences: res.user.idsentences[0],
            },
          });
        }
        setspinner(false);
      })
      .catch(err => {
        err_err(err);
      });
  };
  const send_instance = async patho => {
    let fexist = await RNFS.exists(patho);
    if (!fexist) {
      err_player('Enrégistrement invalide');
    } else {
      setspinner(true);
      var bodyFormData = new FormData();
      //let audi = new File(patho);
      //let audi = await RNFS.readFile(patho);
      let audi = {
        uri: patho,
        name: 'audio.aac',
        type: 'audio/aac',
      };

      bodyFormData.append('audio', audi);
      bodyFormData.append('idsentences', sectiondata.idsentences);
      bodyFormData.append('token', Globals.PROFIL_INFO.user.token);
      bodyFormData.append('phone', Globals.PROFIL_INFO.phone);
      bodyFormData.append('language', Globals.PROFIL_INFO.user.language);
      bodyFormData.append('sentence', sectiondata.sentences[0]);

      for (const key in bodyFormData) {
        console.log(key, bodyFormData[key]);
      }

      Fetcher.PutSection(bodyFormData)
        .then(res => {
          console.log(res);
          if (res.errors) {
            err_err(
              typeof res.errors[0] === 'string'
                ? res.errors[0]
                : Globals.STRINGS.Ocurred_error,
            );
          } else {
            setsectiondata({...sectiondata, ...res});
          }
          setspinner(false);
        })
        .catch(err => {
          console.log(err.code, err.message);
          err_err(err);
        });
    }
  };
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
  function err_player(err) {
    setspinner(false);
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: err,
    });
  }
  return (
    <ScrollView style={styles.main_container}>
      <Toast position="top" topOffset={1} />

      <View style={styles.middle_heberger}>
        <View style={styles.middle_container}>
          <Text style={styles.translate_text}>
            Traduire le texte suivant en{' '}
            <Text style={styles.translate_lang}>{sectiondata.language}</Text>:
          </Text>
          <Text style={styles.translate_value}>{sectiondata.sentences[0]}</Text>
        </View>
        <AudioRecorde
          spinner={spinner}
          sectiondata={sectiondata}
          err_player={err_player}
          load_init={load_init}
          send_instance={send_instance}
        />
      </View>
    </ScrollView>
  );
}
