import { Button, View, TextInput, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { storeItem } from './store';


const ComposeScreen = ({ navigation }) => {
  const [title, onChangeTitle] = useState();
  const [content, onChangeContent] = useState();
  const onPressStoreItem = (title, content, createdAt) => {
    storeItem(title, content, createdAt);
    navigation.navigate('Home');
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>タイトルを入力してください</Text>
      <TextInput
        style={styles.inputTitle}
        onChangeText={onChangeTitle}
        value={title}
        multiline={true}
      />
      <Text>メモを入力してください</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeContent}
        value={content}
        multiline={true}
      />
      <Button
        onPress={() => onPressStoreItem(title, content, Date.now())}
        title="作成"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 120,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputTitle: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

export default ComposeScreen