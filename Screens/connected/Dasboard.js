import React, {useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import Globals from '../../Ressources/Globals';
import {styleDashBoard as styles} from '../../Ressources/Styles';
import FormButton from '../../components/FormButton';
import {Button, IconButton} from 'react-native-paper';

export default function Dasboard({navigation}) {
  const [shoIcon, setshoIcon] = React.useState(false);
  const [dataprop, setdataprop] = React.useState({
    saved: 5,
    checked: 15,
    rejected: 20,
    earns: 30,
  });
  useEffect(() => {
    return () => {};
  }, []);

  const MiddleFielder = meta => {
    return (
      <View style={styles.middle_fields_container}>
        <Text style={styles.midle_prop_value}>{meta.value}</Text>
        {shoIcon ? (
          <IconButton
            icon={meta.icon}
            color={Globals.COLORS.secondary}
            size={20}
          />
        ) : (
          <Text style={styles.midle_prop_title}>{meta.legend}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.main_container}>
      <View>
        <FormButton
          style={styles.action_button}
          title={Globals.STRINGS.checkout}
          modeValue="contained"
          labelStyle={styles.loginButtonLabel}
          onPress={() => {
            navigation.navigate('Recorder');
          }}
        />
        <Button
          icon={shoIcon ? 'creation' : 'account-arrow-left-outline'}
          mode="contained"
          onPress={() => setshoIcon(!shoIcon)}></Button>
      </View>
      <View>
        <View style={styles.top_container}>
          <Image style={styles.image} source={Globals.IMAGES.SPLASH} />
          <Text style={styles.autor_name}>ttttttttt</Text>
        </View>
        <View style={styles.middle_container}>
          {MiddleFielder({
            icon: 'save',
            legend: Globals.STRINGS.save,
            value: dataprop.saved,
          })}
          {MiddleFielder({
            icon: 'checkbox',
            legend: Globals.STRINGS.checked,
            value: dataprop.checked,
          })}
          {MiddleFielder({
            icon: 'close',
            legend: Globals.STRINGS.rejected,
            value: dataprop.rejected,
          })}
          {MiddleFielder({
            icon: 'dollar',
            legend: Globals.STRINGS.earned,
            value: dataprop.earned,
          })}
        </View>
        <View>
          <FormButton
            style={styles.action_button}
            title={Globals.STRINGS.checkout}
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => {}}
          />
          <FormButton
            style={styles.action_button}
            title={Globals.STRINGS.signout}
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => {}}
          />
        </View>
      </View>
      <View></View>
    </View>
  );
}
