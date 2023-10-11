/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddNoteScreen from './src/screens/AddNoteScreen';
import { colors } from './src/utils/constants';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          color: 'white'
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: 'white'
      }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'List Notes' }} />
        <Stack.Screen name="AddNoteScreen" component={AddNoteScreen}
          options={({ route }) => ({ title: route?.params?.title ?? 'Add notes', headerShown: true })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
