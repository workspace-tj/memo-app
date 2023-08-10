import { Button, View, TextInput, StyleSheet, Text} from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { storeData } from './store';


const ComposeScreen = ({ navigation }) => {
    const [title, onChangeTitle] = useState();
    const [content, onChangeContent] = useState();
    const onPressStoreDate = (title, content, createdAt) => {
      storeData(title, content, createdAt);
      navigation.navigate('Home');
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>タイトルを入力してください</Text>
        <TextInput
            style={styles.input}
            onChangeText = {onChangeTitle}
            value = {title}
        />
        <Text>メモを入力してください</Text>
        <TextInput
            style={styles.input}
            onChangeText = {onChangeContent}
            value = {content}
        />
        <Button
          onPress={() => onPressStoreDate(title, content, Date.now())}
          title="作成"
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
      width: '90%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  export default ComposeScreen