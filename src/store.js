import AsyncStorage from '@react-native-async-storage/async-storage';

// const storeItem = async (title, content, createdAt) => {
//   try {
//     const value = {
//       title,
//       content,
//       createdAt,
//     }
//     const jsonValue = JSON.stringify(value);
//     const key = `${createdAt}`
//     await AsyncStorage.setItem(key, jsonValue);
//   } catch (e) {
//     console.log(e);
//   }
// };

const storeItem = async (title, content, createdAt) => {
  const key = 'memos';

  try {
    const existingMemos = await AsyncStorage.getItem(key);
    const memos = existingMemos ? JSON.parse(existingMemos) : [];
    const index = memos.length + 1;
    
    const value = {
      title,
      content,
      createdAt,
      index,
    };
    
    const newMemos = [...memos, value];
    await AsyncStorage.setItem(key, JSON.stringify(newMemos));

    console.log(`Memo saved successfully.`);
  } catch (error) {
    console.log('Error saving memo:', error);
  }
};

const getAllItems = async () => {
  let key = 'memos'
  try {
    const memos = await AsyncStorage.getItem(key).then((value) => JSON.parse(value));
    return memos;
  } catch (e) {
    console.log(e);
  }
};

const removeValue = async (createdAt, { navigation }) => {
  try {
    await AsyncStorage.removeItem(`${key}`)
  } catch (e) {
    console.log(e)
  }
  await navigation.navigate('Compose');
  await navigation.navigate('Home')
};

// const removeAll = async ({ navigation }) => {
//   let keys = []
//   try {
//     keys = await AsyncStorage.getAllKeys();
//     await AsyncStorage.multiRemove(keys)
//   } catch (e) {
//     console.log(e);
//   }
//   await navigation.navigate('Compose');
//   await navigation.navigate('Home')
// }

const removeAll = async ({ navigation }) => {
  let key = 'memos'
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log(e);
  }
  await navigation.navigate('Compose');
  await navigation.navigate('Home')
}

const mergeItem = async (title, content, createdAt, editedAt) => {
  let key = 'memos'
  try {
    const memos = await AsyncStorage.getItem(key).then((value) => JSON.parse(value));
    
    const value = {
      title,
      content,
      createdAt,
      editedAt,
    }
    const updateMemo = memos.map((memo) => {
      if (memo.createdAt === createdAt) {
        return [...memos, value];
      }
      return memo
    });
    
    const jsonUpdatedMemos = JSON.stringify(updateMemo)
    await AsyncStorage.mergeItem(key, jsonUpdatedMemos);
  } catch (e) {
    console.log(e);
  }
};

const replaceListOrder = async (data, from, to) => {
  const key = 'memos';

  try {
    const newData = data.map((memo) => {
      if (memo.index === from + 1) {
        return { ...memo, index: to + 1 };
      } else if (from + 1 < memo.index && memo.index <= to + 1) {
        return { ...memo, index: memo.index - 1 };
      }
      return memo;
    });

    await AsyncStorage.setItem(key, JSON.stringify(newData));

    console.log('Memo order replaced successfully.');
  } catch (error) {
    console.log('Error replacing memo order:', error);
  }
};

export { storeItem, getAllItems, removeValue, removeAll, mergeItem, replaceListOrder };