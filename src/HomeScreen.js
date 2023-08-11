import { Button, View, FlatList, StyleSheet, Text, Alert} from 'react-native';
import format from 'date-fns/format';
import { FAB, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { getAllItems, removeValue } from './store';

const Item = ({ title, content, formattedCreatedAt, createdAt, navigation}) => (
  <View style={styles.ItemWrapper}>
    <View style={styles.rowWrapper}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.deleteBtn}>
        <IconButton
        icon="border-color"
        size={15}
        onPress={() => createTwoButtonAlert(`メモの編集`,`${formattedCreatedAt}のメモを編集しますか`, () => onPressMergeItems({navigation}, {title, content, createdAt}))}
        />
        <IconButton
        icon="delete"
        size={15}
        onPress={() => createTwoButtonAlert(`メモの削除`,`${formattedCreatedAt}のメモを削除しますか`, () => removeValue(createdAt, {navigation}))}
        />
      </View>
    </View>
    <Text style={styles.text}>{content}</Text>
    <Text style={styles.createdAt}>{formattedCreatedAt}</Text>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [memo, setMemo] = useState({title: "example", content: "HelloWorld", createdAt: Date.now()});
  // const [reloadFlag, setReloadFlag] = useState(false);
  // const handleReload = () => {
  //   setReloadFlag(!reloadFlag); // toggle the flag to trigger a re-render
  // };
  
  useEffect(() => {
    const set = () => {
      getAllItems().then((value) => {
        setMemo(value);
      })
    console.log(memo)
  }
    
    const unsubscribe = navigation.addListener('focus',set)

    return unsubscribe;
  }, [navigation]);
  // useEffect(() => {
  //   const set = () => {
  //     const value = arrayArrange();
  //     setMemo(value);
  //   console.log(memo)
  // }
    
  //   const unsubscribe = navigation.addListener('focus',set)

  //   return unsubscribe;
  // }, [navigation]);
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate('Compose')}
        title="Go to Compose"
      />
      <FlatList
        data={memo}
        renderItem={({ item }) => <Item title={item.title} content={item.content} formattedCreatedAt={format(item.createdAt, 'yyyy/MM/dd hh:mm')} createdAt={item.createdAt} navigation={navigation}/>}
        keyExtractor={item => item.createdAt}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Compose')}
      />
      <Button
        title='store'
        onPress={() => storeData(memos)}
      />
      <Button
        title='get'
        onPress={() => getData()}
      />
      <Button
        title='remove'
        onPress={() => removeAll()}
      />
      <Button
        title='getAllKey'
        onPress={() => handleReload()}
      />
      {/* <Button
        title='getAllItems'
        onPress={() => useNavigation().replace('home')}
      /> */}
      <IconButton
        icon="delete"
        onPress={() => getMultiple().then(value => {
          console.log(value)
        })}
      />
      {/* <Button
          title='getAllItems'
          onPress={ () => console.log(abc())} */}
      {/* /> */}
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
  {text: 'はい', onPress: onpress},
]);

const onPressMergeItems = ({navigation}, value) => {
  navigation.navigate('Edit', value)
  console.log(value);
}


// const returnA = () => {
//   const a = ["b", "c"]
//   return a
// }
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log(jsonValue);
    const key = `memos`
    console.log(key);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async () => {
  try {
    console.log(`${memos[0].createdAt}`)
    const jsonValue = await AsyncStorage.getItem(`1691644149240`);
    console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
  } catch (e) {
    console.log(e);
  }
};

const removeAll = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys)
  } catch (e) {
    console.log(e);
  }

  console.log('Done.')
}


// const getAllKeys = async () => {
//   let keys = []
//   try {
//     keys = await AsyncStorage.getAllKeys()
//   } catch (e) {
//     console.log(e);
//   }
//   return (keys);
  // console.log(keys)
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
// }



// const arrayArrange = () => {
//   getAllItems().then(jsonValues => {
//     const v = jsonValues
//     console.log(v);
//     const values = JSON.parse(v);
//     const value = values.map((i) => {return i[1]});
//     console.log(value);
//     return value; 
//   })
// }

const memos = [
  {
    title: "a",
    content: "Hello",
    createdAt: 1691634631914,
  },
  {
    title: "b",
    content: "Good Evening",
    createdAt: 1691634653971,
  },
  {
    title: "c",
    content: "GoodMorning",
    createdAt: 1691634721637,
  },
  {
    title: "d",
    content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: 1691634746457,
  },
  {
    title: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    content: "cccccccccccccccccccccccccccccccccccccc",
    createdAt: 1691634792560
  },
]

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
    // direction:'rtl',
    flexDirection: 'row',
    position: 'absolute',
    right: 3,
    top: 0,
  },
  rowWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default HomeScreen