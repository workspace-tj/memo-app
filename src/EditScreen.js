import { Button, View, TextInput, StyleSheet, Text} from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { mergeItem } from './store';


const EditScreen = ({ route, navigation }) => {
    const item = route.params;
    const [title, onChangeTitle] = useState(item.title);
    const [content, onChangeContent] = useState(item.content);
    const onPressMergeItem = (title, content, createdAt, editedAt) => {
      mergeItem(title, content, createdAt, editedAt);
      navigation.navigate('Home');
    }
    useEffect(() => {
      const set = () => {
          onChangeTitle(item.title)
          onChangeContent(item.content)
        }
      console.log({title,content})
      
      const unsubscribe = navigation.addListener('focus',set)
  
      return unsubscribe;
    }, [navigation]);
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
          onPress={() => onPressMergeItem(title, content, item.createdAt, Date.now())}
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