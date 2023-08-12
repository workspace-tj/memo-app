import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/HomeScreen';
import ComposeScreen from './src/ComposeScreen';
import EditScreen from './src/EditScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
        <Stack.Screen name="Edit" component={EditScreen} options={{title: "編集"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Root() {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Compose" component={ComposeScreen} options={{title: "作成"}}/>
      </Drawer.Navigator>
  );
}