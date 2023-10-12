/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import AddNoteScreen from './src/screens/AddNoteScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { createNotesTable } from './src/services/notes.service';
import { colors } from './src/utils/constants';
import { store } from './src/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { checkAuthExist, createAuth, createAuthTable } from './src/services/auth.service';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  useEffect(() => {
    createNotesTable();
  }, [])
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
          headerShown: false,
          headerTitleStyle: { color: 'white'},
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: 'white'
        }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'List Notes' }} />
          <Stack.Screen name="AddNoteScreen" component={AddNoteScreen}
            options={({ route }: { route: any }) => ({ title: route?.params?.from !== 'edit' ? 'Add notes' : 'Edit Notes', headerShown: true })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}


export default App;
