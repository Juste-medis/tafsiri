import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';
import Fetcher from './API/fetcher';
import Storer from './API/storer';
import Globals from './Ressources/Globals';
import WelcomeNavigation from './Navigation/WelcomeNavigation';
import MainNavigation from './Navigation/MainNavigation';
import SignIn from './Screens/login/SignIn';

//fonction de ping a internet, it atach a listener to internet and asign it to GLobal.internet
Fetcher.FetchInternet();
let isLogged;
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [spinner, setspinner] = React.useState(true);
  spinner &&
    Storer.getData('@USER_TYPE').then(data => {
      //if user is already logged
      if (data) {
        isLogged = data;
        Globals.USER_TYPE = data;
        Storer.getData('@ProfilInfo').then(prise => {
          Globals.PROFIL_INFO = prise;
          setspinner(false);
        });
      } else {
        setspinner(false);
      }
    });
  return spinner ? (
    <View style={styles.main_container}>
      <ImageBackground
        style={styles.background_container}
        source={Globals.IMAGES.SPLASH}>
        <View style={styles.bottom_container}>
          <ActivityIndicator
            style={styles.indicator}
            size="large"
            color="#5b3a70"
          />
        </View>
      </ImageBackground>
    </View>
  ) : isLogged ? (
    <MainNavigation user_type={isLogged} />
  ) : (
    <WelcomeNavigation />
  );
};
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  background_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  bottom_container: {
    position: 'absolute',
    bottom: '5%',
  },
  indicator: {
    width: 70,
    height: 70,
  },
});

export default App;
