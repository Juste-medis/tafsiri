/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

export default function FormButton({
  title,
  style,
  contentStyle,
  modeValue,
  ...rest
}) {
  return (
    <Button
      mode={modeValue}
      {...rest}
      style={[styles.button, style ? style : null]}
      contentStyle={[
        styles.buttonContainer,
        contentStyle ? contentStyle : null,
      ]}
      theme={{colors: {primary: '#fd7e14'}}}>
      <Text style={{color: 'white'}}>{title}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  buttonContainer: {
    width: width / 2,
    height: height / 15,
  },
});
