import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Globals from '../Ressources/Globals';

const {width, height} = Dimensions.get('screen');

export default function FormInput({labelName, ...rest}) {
  return (
    <TextInput
      label={labelName}
      style={styles.input}
      numberOfLines={1}
      theme={{
        colors: {
          primary: Globals.COLORS.blue_dark,
        },
      }}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
  },
});
