/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, Image, ImageBackground, View} from 'react-native';
import {IconButton, Title, Text} from 'react-native-paper';
import Globals from '../../Ressources/Globals';
import {styleSignIn as styles} from '../../Ressources/Styles';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import Loading from '../../components/Loading';
import SelectDropdown from 'react-native-select-dropdown';

export default function SignupScreen({navigation}) {
  const [number, setnumber] = useState('');
  const [code, setcode] = useState('');
  const [language, setlanguage] = useState('');
  const [loading, setloading] = useState('');

  const languages = ['Fongbe', 'Goubgbe', 'Yoruba'];
  if (loading) {
    return <Loading />;
  }

  return (
    <ImageBackground style={styles.container} source={Globals.IMAGES.LO_SPLASH}>
      <Image source={Globals.IMAGES.LOGO} style={styles.Image_style} />
      <ScrollView style={styles.center_scroll}>
        <View style={styles.center_container}>
          <Title style={styles.titleText}>{Globals.STRINGS.get_started}</Title>
          <FormInput
            labelName="Numéro de télephone"
            value={number}
            autoCapitalize="none"
            onChangeText={usernumber => setnumber(usernumber)}
          />
          <FormInput
            labelName="Code"
            value={code}
            keyboardType="number-pad"
            onChangeText={u => setcode(u)}
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
            labelStyle={styles.loginButtonLabel}
            onPress={() => {}}
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
