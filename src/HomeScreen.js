import { Button, View, FlatList,StyleSheet, Text } from 'react-native';
import format from 'date-fns/format';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const Item = ({title, content, createdAt}) => (
  <View style={styles.ItemWrapper}>
    <Text>{title}</Text>
    <Text>{content}</Text>
    <Text style={styles.createdAt}>{createdAt}</Text>
  </View>
)

const HomeScreen = ({ navigation }) => {
  const [memo, setMemo] = useState();

  const callbackFunc = async ()=> {
    const ret = await getMultiple()
    console.log(ret)
  }
  useEffect(() => {
    const newMemos = "a";
    setMemo(newMemos);
    console.log(memo);
  });
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Compose')}
          title="Go to Compose"
        />
        <FlatList
          data={memos}
          renderItem={({item}) => <Item title={item.title} content={item.content} createdAt={format(item.createdAt, 'yyyy/MM/dd hh:mm')} />}
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
          onPress={() => removeValue()}
        />
        <Button
          title='getAllKey'
          onPress={() => getAllKeys()}
        />
        <Button
          title='getAllItems'
          onPress={() => callbackFunc()}
        />
        {/* <Button
          title='getAllItems'
          onPress={ () => console.log(abc())} */}
        {/* /> */}
      </View>
    );
  };
  const returnA = () => {
    const a = ["b", "c"]
    return a
  }
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

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('memos')
    } catch(e) {
      console.log(e);
    }
  
    console.log('Done.')
  }

  const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      console.log(e);
    }
    return (keys);
    // console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }

  const getMultiple = async () => {
    let keys = []
    let values
    try {
      keys = await AsyncStorage.getAllKeys();
      values = await AsyncStorage.multiGet(keys);
      // let abc =  [["1691464317640", "{\"title\":\"\",\"content\":\"\",\"createAt\":1691464317640}"], ["1691467048476", "{\"title\":\"はじめまして\",\"content\":\"よろしく\",\"createdAt\":1691467048476}"], ["1691468663239", "{\"title\":\"hello\",\"content\":\"helloworld\",\"createdAt\":1691468663239}"], ["1691468768593", "{\"title\":\"aa\",\"content\":\"bb\",\"createdAt\":1691468768593}"], ["1691468826770", "{\"title\":\"aa\",\"content\":\"cc\",\"createdAt\":1691468826770}"], ["1691468972022", "{\"title\":\"aa\",\"content\":\"gg\",\"createdAt\":1691468972022}"], ["1691634631914", "[{\"title\":\"a\",\"content\":\"Hello\",\"createdAt\":1691634631914},{\"title\":\"b\",\"content\":\"Good Evening\",\"createdAt\":1691634653971},{\"title\":\"c\",\"content\":\"GoodMorning\",\"createdAt\":1691634721637},{\"title\":\"d\",\"content\":\"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"createdAt\":1691634746457},{\"title\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\",\"content\":\"cccccccccccccccccccccccccccccccccccccc\",\"createdAt\":1691634792560}]"], ["1691644149240", "{\"title\":\"テスト\",\"content\":\"テストメッセージ\",\"createdAt\":1691644149240}"]]
      // return abc;
      // console.log(values);
      return values
    } catch(e) {
      // read error
    }
    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  }

  // const OutputGetData = () => {
  //   const data = getData();
  //   console.log(data);
  //   return (<Text>{data}</Text>)
  // }

const abc = async () => {
  let abcd = [["1691464317640", "{\"title\":\"\",\"content\":\"\",\"createAt\":1691464317640}"], ["1691467048476", "{\"title\":\"はじめまして\",\"content\":\"よろしく\",\"createdAt\":1691467048476}"], ["1691468663239", "{\"title\":\"hello\",\"content\":\"helloworld\",\"createdAt\":1691468663239}"], ["1691468768593", "{\"title\":\"aa\",\"content\":\"bb\",\"createdAt\":1691468768593}"], ["1691468826770", "{\"title\":\"aa\",\"content\":\"cc\",\"createdAt\":1691468826770}"], ["1691468972022", "{\"title\":\"aa\",\"content\":\"gg\",\"createdAt\":1691468972022}"], ["1691634631914", "[{\"title\":\"a\",\"content\":\"Hello\",\"createdAt\":1691634631914},{\"title\":\"b\",\"content\":\"Good Evening\",\"createdAt\":1691634653971},{\"title\":\"c\",\"content\":\"GoodMorning\",\"createdAt\":1691634721637},{\"title\":\"d\",\"content\":\"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"createdAt\":1691634746457},{\"title\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\",\"content\":\"cccccccccccccccccccccccccccccccccccccc\",\"createdAt\":1691634792560}]"], ["1691644149240", "{\"title\":\"テスト\",\"content\":\"テストメッセージ\",\"createdAt\":1691644149240}"]]
  return abcd
}
console.log(abc())

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
  }
});

  export default HomeScreen