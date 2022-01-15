/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {styleRecorder as styles} from '../../Ressources/Styles';
import Toast from 'react-native-toast-message';
import Globals from '../../Ressources/Globals';
import Fetcher from '../../API/fakeApi';
import AudioRecorde from '../../components/AudioRecorder';
import * as RNFS from 'react-native-fs';

export default function Recorder({navigation}) {
  const [spinner, setspinner] = React.useState(false);
  const [sectiondata, setsectiondata] = React.useState({
    language: '...',
    trancriptarr: [],
  });
  const [tindex, setindex] = React.useState(0);

  useEffect(() => {
    load_init();
    return () => {};
  }, []);

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

  const load_init = () => {
    setspinner(true);
    Fetcher.GetSection()
      .then(res => {
        setspinner(false);
        if (res.message) {
          err_err(res);
        } else {
          setsectiondata({...sectiondata, ...res});
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
        name: 'autio.jpg',
        type: 'audio/aac',
      };

      bodyFormData.append('audio', audi);
      bodyFormData.append('transcript', sectiondata.trancriptarr[tindex]);
      for (const key in bodyFormData) {
        console.log(key, bodyFormData[key]);
      }
      Fetcher.PutSection(bodyFormData)
        .then(res => {
          setspinner(false);
          if (res.message) {
            err_err(res);
          } else {
            setsectiondata({...sectiondata, ...res});
          }
          setspinner(false);
        })
        .catch(err => {
          err_err(err);
        });
    }
  };

  return (
    <View style={styles.main_container}>
      <Toast />
      <View>
        <View style={styles.middle_container}>
          <Text style={styles.translate_text}>
            Traduire le texte suivant en{' '}
            <Text style={styles.translate_lang}>{sectiondata.language}</Text>:
          </Text>
          <Text style={styles.translate_value}>
            {sectiondata.trancriptarr[tindex]}
          </Text>
        </View>
        <AudioRecorde
          spinner={spinner}
          sectiondata={sectiondata}
          tindex={tindex}
          setindex={setindex}
          err_player={err_player}
          send_instance={send_instance}
        />
      </View>
    </View>
  );
}
