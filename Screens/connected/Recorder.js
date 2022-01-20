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
  const send_instance = async (patho, pathi) => {
    let fexist = await RNFS.exists(patho);
    if (!fexist) {
      err_player('Enrégistrement invalide');
    } else {
      setspinner(true);

      //let audi = await RNFS.readFile(patho);
      /*
      const blob = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(JSON.parse(JSON.stringify(blob)));
      this.setState({showProfilPicker: false, spinner: true});
      let copyData = {photo_blob: blob};
      Fetcher.UpdateEnseignantProfileInfo(JSON.stringify(copyData));
      let audihh = await RNFS.readFile(patho, 'base64');    
      let cv_pdf_path = RNFS.ExternalDirectoryPath + '/gtu.jpg';
      RNFS.copyFile(cv_pdf_path, RNFS.DocumentDirectoryPath + '/gtu.jpg');
      console.log(cv_pdf_path);
      let audihh = await RNFS.readFile(patho, 'base64');
 let cv_pdf_path = RNFS.ExternalDirectoryPath + '/test.aac';
      RNFS.copyFile(RNFS.DocumentDirectoryPath + '/test.aac', cv_pdf_path);
      console.log(cv_pdf_path);
      */

      var bodyFormData = new FormData();
      let audi = {
        uri: pathi,
        name: 'audio.aac',
        type: 'audio/aac',
      };
      let audiu = await (await fetch(pathi)).blob();
      console.log(audiu);
      bodyFormData.append('audio', audi, 'test.aac');
      bodyFormData.append('idsentences', sectiondata.idsentences);
      bodyFormData.append('token', Globals.PROFIL_INFO.user.token);
      bodyFormData.append('phone', Globals.PROFIL_INFO.phone);
      bodyFormData.append('language', Globals.PROFIL_INFO.user.language);
      bodyFormData.append('profile', Globals.PROFIL_INFO.user.profile);
      bodyFormData.append('sentence', sectiondata.sentences[0]);

      console.log('------------------------------------');
      for (const key in bodyFormData) {
        console.log(key, bodyFormData[key]);
      }

      var http = new XMLHttpRequest();
      http.open(
        'POST',
        'http://217.160.170.119:8000/api/speech/uploadfile/',
        true,
      );

      http.setRequestHeader('Content-type', 'multipart/form-data');
      http.onreadystatechange = function () {
        //Call a function when the state changes.
        console.log('eee', http.responseText);
        if (http.readyState === 4 && http.status === 200) {
          console.log(http.responseText);
        }
      };
      http.send(bodyFormData);

      /*
      Fetcher.PutSection(bodyFormData)
        .then(res => {
          console.log(res.errors);
          if (res.errors) {
            err_err(
              typeof res.errors[0] === 'string'
                ? res.errors[0]
                : Globals.STRINGS.Ocurred_error,
            );
          } else {
            setsectiondata({...sectiondata, ...res});
            load_init();
          }
          setspinner(false);
        })
        .catch(err => {
          console.log(err.code, err);
          err_err(err);
        });
        */
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
