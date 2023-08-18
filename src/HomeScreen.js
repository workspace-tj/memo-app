import { Button, View, FlatList, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import format from 'date-fns/format';
import { FAB, IconButton } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { getAllItems, removeAll, removeItemByCreatedAt, removeValue, replaceListOrder } from './store';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";

const HomeScreen = ({ navigation }) => {
  const [memo, setMemo] = useState([]);
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
  const renderItem = ({ item, drag }) => {
    if (item.editedAt == null) {
      return <Item title={item.title} content={item.content} createdAt={item.createdAt} navigation={navigation} drag={drag}/>
    } else {
      return <EditedItem title={item.title} content={item.content} createdAt={item.createdAt} navigation={navigation} editedAt={item.editedAt} drag={drag}/>
    }
  }
  // const renderDragItem = ({ item, drag}) => {
  //   return (

  //       <TouchableOpacity
  //         activeOpacity={1}
  //         onLongPress={drag}
  //         // disabled={isActive}
  //         // style={[
  //         //   styles.rowItem,
  //         //   { backgroundColor: isActive ? "red" : item.backgroundColor },
  //         // ]}
  //       >
  //         <Text style={styles.text}>{item.createdAt}</Text>
  //       </TouchableOpacity>
  //   );
  // };
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={memo}
        renderItem={renderItem}
        keyExtractor={item => item.createdAt}
      /> */}
      {memo == null ? (
        <Text style={styles.notification} adjustsFontSizeToFit={true} numberOfLines={2}>メモがありません。{"\n"}＋を押してメモを作成してください。</Text>
        ) : (
          <DraggableFlatList
          data={memo}
          onDragEnd={({data,from,to}) => {
            if (from !== to) {
              console.log(`${from}から${to}へindexが変わりました。`)
              setMemo(data);
              replaceListOrder(data, from, to);
              console.log(`データの中身は${data}`);
            }
          }}
          keyExtractor={(item) => item.index}
          renderItem={renderItem}
        />
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Compose')}
      />
      {/* <Button title='test' onPress={() => {
          getAllItems().then((value) => {
            setMemo(value)
            console.log(memo)
          });
        }}></Button> */}
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

const onPressToEdit = ({ navigation }, value) => {
  navigation.navigate('Edit', value);
};

// const onPressMergeItem = (title, content, createdAt, editedAt) => {
//   mergeItem(title, content, createdAt, editedAt);
//   navigation.navigate('Edit');
//   navigation.navigate('Home');
// }

const Item = ({ title, content, createdAt, navigation, drag }) => (
  <View style={styles.ItemWrapper}>
    <TouchableOpacity onPress={() => onPressToEdit({ navigation }, { title, content, createdAt })} onLongPress={drag}>
    <View style={styles.rowWrapper}>
      <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
        <View style={styles.deleteBtn}>
          <IconButton
            icon="border-color"
            size={15}
            onPress={() => createTwoButtonAlert(`メモの編集`, `${format(createdAt, 'yyyy/MM/dd hh:mm')}のメモを編集しますか`, () => onPressToEdit({ navigation }, { title, content, createdAt }))}
            />
          <IconButton
            icon="delete"
            size={15}
            onPress={() => createTwoButtonAlert(`メモの削除`, `${format(createdAt, 'yyyy/MM/dd hh:mm')}のメモを削除しますか`, () => removeItemByCreatedAt(createdAt, { navigation }))}
            />
        </View>
      </View>
      <Text style={styles.text} numberOfLines={5}>{content}</Text>
      <Text style={styles.createdAt}>{`作成日：${format(createdAt, 'yyyy/MM/dd hh:mm')}`}</Text>
    </TouchableOpacity>
  </View>
);
const EditedItem = ({ title, content, createdAt, navigation, editedAt, drag}) => (
  <View style={styles.ItemWrapper}>
    <TouchableOpacity onPress={() => onPressToEdit({ navigation }, { title, content, createdAt })} onLongPress={drag}>
      <View style={styles.rowWrapper}>
        <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
        <View style={styles.deleteBtn}>
          <IconButton
            icon="border-color"
            size={15}
            onPress={() => createTwoButtonAlert(`メモの編集`, `${format(editedAt, 'yyyy/MM/dd hh:mm')}のメモを編集しますか`, () => onPressToEdit({ navigation }, { title, content, createdAt }))}
            />
          <IconButton
            icon="delete"
            size={15}
            onPress={() => createTwoButtonAlert(`メモの削除`, `${format(editedAt, 'yyyy/MM/dd hh:mm')}のメモを削除しますか`, () => removeItemByCreatedAt(createdAt, { navigation }))}
            />
        </View>
      </View>
      <Text style={styles.text} numberOfLines={5}>{content}</Text>
      <Text style={styles.createdAt}>{`更新日：${format(editedAt, 'yyyy/MM/dd hh:mm')}`}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    align: 'center',
  },
  ItemWrapper: {
    alignSelf: 'center',
    width: '95%',
    padding: 10,
    borderBottomColor: 'Black',
    borderBottomWidth: 0.3,
  },
  createdAt: {
    textAlign: 'right',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  deleteBtn: {
    flexDirection: 'row',
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBtn: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '400',
  },
  notification: {
    textAlign: 'center',
    fontSize:20,
    fontWeight: '400',
  }
});

export default HomeScreen