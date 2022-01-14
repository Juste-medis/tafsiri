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
        initialRouteName="SignIn"
        screenOptions={{
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
          cardStyleInterpolator: inter => {
            let {current, next, layouts} = inter;
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                  {
                    scale: next
                      ? next.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0.9],
                        })
                      : 1,
                  },
                ],
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }),
              },
            };
          },
        }}>
        <Stack.Screen name="SignIn" component={Dasboard} />
        <Stack.Screen name="Signup" component={Recorder} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default Navigation;
