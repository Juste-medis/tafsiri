import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Title, Text } from "react-native-paper";
import Globals from "../../Ressources/Globals";

import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import Loading from "../../components/Loading";
import SelectDropdown from "react-native-select-dropdown";

export default function SignupScreen({ navigation }) {
  const [number, setnumber] = useState("");
  const [code, setcode] = useState("");
  const [language, setlanguage] = useState("");
  const [loading, setloading] = useState("");

  const languages = ["Fongbe", "Goubgbe", "Yoruba"];
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>{Globals.STRINGS.get_started}</Title>
      <FormInput
        labelName="Numéro de télephone"
        value={number}
        autoCapitalize="none"
        onChangeText={(usernumber) => setnumber(usernumber)}
      />
      <FormInput
        labelName="Code"
        value={code}
        keyboardType="number-pad"
        onChangeText={(u) => setcode(u)}
      />
      <SelectDropdown
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

      <FormButton
        title="Go"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => {}}
      />

      <IconButton
        icon="keyboard-backspace"
        size={30}
        style={styles.navButton}
        color="#5b3a70"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
  change_address: {
    fontWeight: "bold",
  },
});
