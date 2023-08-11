import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/HomeScreen';
import ComposeScreen from './src/ComposeScreen';
import EditScreen from './src/EditScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Compose" component={ComposeScreen} options={{title: "作成"}}/>
        <Drawer.Screen name="Edit" component={EditScreen} options={{title: "編集"}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}