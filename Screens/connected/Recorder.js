import React, {useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import Globals from '../../Ressources/Globals';
import {styleRecorder as styles} from '../../Ressources/Styles';
import {Button, IconButton} from 'react-native-paper';
import LottieView from 'lottie-react-native';

export default function Recorder(route) {
  let formator = route.route.params.formator;
  const [shoIcon, setshoIcon] = React.useState(false);
  const [language, setlanguage] = React.useState('Fongbe');
  const [recordind, setrecordind] = React.useState(false);
  useEffect(() => {
    route.navigation.setOptions({title: Globals.STRINGS.instructor});
    return () => {};
  }, []);

  return (
    <View style={styles.main_container}>
      <View>
        <View style={styles.top_container}>
          <Button
            style={styles.pass_button}
            mode="outlined"
            onPress={() => console.log('Pressed')}>
            Je passe
          </Button>
        </View>
        <View style={styles.middle_container}>
          <Text style={styles.autor_name}>
            Traduire le texte suivant en {language}
          </Text>
          <Text style={styles.autor_name}>Il s’est agrippé à moi.</Text>
        </View>
        <View>
          <Button
            icon="microphone"
            mode="outlined"
            onPress={() => {
              if (recordind) {
              } else {
              }
              setrecordind(!recordind);
            }}>
            {!recordind ? (
              <View>
                <IconButton icon="microphone" size={70} />
              </View>
            ) : (
              <View>
                <LottieView
                  source={require('../../assets/loties/24510-recording.json')}
                  autoPlay
                  loop
                />
              </View>
            )}
          </Button>
        </View>
      </View>
    </View>
  );
}
