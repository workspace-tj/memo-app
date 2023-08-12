import { Button, View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import format from 'date-fns/format';
import { FAB, IconButton } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { getAllItems, removeAll, removeValue } from './store';

const HomeScreen = ({ navigation }) => {
  const [memo, setMemo] = useState({ title: "example", content: "HelloWorld", createdAt: Date.now() });
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerBtn}>
          <IconButton
            icon="delete"
            onPress={() => createTwoButtonAlert("全削除", "メモを全て削除しますか？", () => removeAll({ navigation }))}
          />
          <IconButton
            icon="plus"
            onPress={() => navigation.navigate('Compose')}
          />
        </View>
      ),
    })
    const set = () => {
      getAllItems().then((value) => {
        setMemo(value);
      })
    }
    
    const unsubscribe = navigation.addListener('focus', set)
    
    return unsubscribe;
  }, [navigation]);
  const renderItem = ({ item }) => {
    if (item.editedAt == null) {
      return <Item title={item.title} content={item.content} createdAt={item.createdAt} navigation={navigation} />
    } else {
      return <EditedItem title={item.title} content={item.content} createdAt={item.createdAt} navigation={navigation} editedAt={item.editedAt} />
    }
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={memo}
        renderItem={renderItem}
        keyExtractor={item => item.createdAt}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Compose')}
      />
    </View>
  );
};

const createTwoButtonAlert = (title, message, onpress) =>
Alert.alert(title, message, [
  {
    text: 'いいえ',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
  { text: 'はい', onPress: onpress },
]);

const onPressMergeItems = ({ navigation }, value) => {
  navigation.navigate('Edit', value);
};

const Item = ({ title, content, createdAt, navigation }) => (
  <View style={styles.ItemWrapper}>
    <View style={styles.rowWrapper}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.deleteBtn}>
        <IconButton
          icon="border-color"
          size={15}
          onPress={() => createTwoButtonAlert(`メモの編集`, `${format(createdAt, 'yyyy/MM/dd hh:mm')}のメモを編集しますか`, () => onPressMergeItems({ navigation }, { title, content, createdAt }))}
        />
        <IconButton
          icon="delete"
          size={15}
          onPress={() => createTwoButtonAlert(`メモの削除`, `${format(createdAt, 'yyyy/MM/dd hh:mm')}のメモを削除しますか`, () => removeValue(createdAt, { navigation }))}
        />
      </View>
    </View>
    <Text style={styles.text}>{content}</Text>
    <Text style={styles.createdAt}>{`作成日：${format(createdAt, 'yyyy/MM/dd hh:mm')}`}</Text>
  </View>
);
const EditedItem = ({ title, content, createdAt, navigation, editedAt }) => (
  <View style={styles.ItemWrapper}>
    <View style={styles.rowWrapper}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.deleteBtn}>
        <IconButton
          icon="border-color"
          size={15}
          onPress={() => createTwoButtonAlert(`メモの編集`, `${format(editedAt, 'yyyy/MM/dd hh:mm')}のメモを編集しますか`, () => onPressMergeItems({ navigation }, { title, content, createdAt }))}
        />
        <IconButton
          icon="delete"
          size={15}
          onPress={() => createTwoButtonAlert(`メモの削除`, `${format(editedAt, 'yyyy/MM/dd hh:mm')}のメモを削除しますか`, () => removeValue(createdAt, { navigation }))}
        />
      </View>
    </View>
    <Text style={styles.text}>{content}</Text>
    <Text style={styles.createdAt}>{`更新日：${format(editedAt, 'yyyy/MM/dd hh:mm')}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    align: 'center',
  },
  ItemWrapper: {
    width: '95%',
    padding: 10,
  },
  createdAt: {
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  deleteBtn: {
    flexDirection: 'row',
    position: 'absolute',
    right: 3,
    top: 0,
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBtn: {
    flexDirection: 'row',
  }
});

export default HomeScreen