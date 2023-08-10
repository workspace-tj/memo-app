import { Button, View, TextInput, StyleSheet, Text} from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { storeData } from './store';


const ComposeScreen = ({ navigation }) => {
    const [title, onChangeTitle] = useState();
    const [content, onChangeContent] = useState();
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
          onPress={() => storeData(title, content, 1691644149240)}
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