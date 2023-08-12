import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/HomeScreen';
import ComposeScreen from './src/ComposeScreen';
import EditScreen from './src/EditScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: "メモ"}}/>
        <Stack.Screen name="Compose" component={ComposeScreen} options={{ title: "作成" }} />
        <Stack.Screen name="Edit" component={EditScreen} options={{ title: "編集" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};