import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import Dasboard from '../Screens/connected/Dasboard';
import Recorder from '../Screens/connected/Recorder';

const Stack = createStackNavigator();
function Navigation({navigation}) {
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        initialRouteName="Dasboard"
        screenOptions={{
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
        }}>
        <Stack.Screen name="Dasboard" component={Dasboard} />
        <Stack.Screen
          options={{title: 'Enregistrement'}}
          name="Recorder"
          component={Recorder}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default Navigation;
