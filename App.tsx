/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();
const globalOptions: NativeStackNavigationOptions = {
  headerStyle: {backgroundColor: '#2C6BED'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: 'white',

};
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalOptions}>
        <Stack.Screen
          options={{title: "Let's Signup"}}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{title: "Let's Register"}}
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{title: "Let's Register"}}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{title: "Let's Register"}}
          name="AddChatScreen"
          component={AddChatScreen}
        />
        <Stack.Screen
          options={{title: "Let's Register"}}
          name="ChatScreen"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
