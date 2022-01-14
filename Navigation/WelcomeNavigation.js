import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from '../Screens/login/SignIn';
import Signup from '../Screens/login/Signup';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();
function Navigation({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MainNavigation" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
