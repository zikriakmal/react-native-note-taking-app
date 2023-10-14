/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/redux/store';
import AddNoteScreen from './src/screens/AddNoteScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { createNotesTable } from './src/services/notes.service';
import { colors } from './src/utils/constants';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  useEffect(() => {
    createNotesTable();
    SplashScreen.hide();
  }, [])
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
          headerShown: false,
          headerTitleStyle: { color: 'white' },
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: 'white'
        }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'List Notes' }} />
          <Stack.Screen name="AddNoteScreen" component={AddNoteScreen}
            options={({ route }: { route: any }) => ({ title: route?.params?.from !== 'edit' ? 'Add Notes' : 'Edit Notes', headerShown: true })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}


export default App;
