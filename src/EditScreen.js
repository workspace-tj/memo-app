import { Button, View, TextInput, StyleSheet, Text} from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { mergeItem } from './store';


const EditScreen = ({ route, navigation }) => {
    const item = route.params;
    const [title, onChangeTitle] = useState(item.title);
    const [content, onChangeContent] = useState(item.content);
    const onPressMergeItem = (title, content, createdAt) => {
      mergeItem(title, content, createdAt);
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
          onPress={() => onPressMergeItem(title, content, item.createdAt)}
          title="更新"
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

  export default EditScreen