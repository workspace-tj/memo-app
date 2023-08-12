import AsyncStorage from '@react-native-async-storage/async-storage';

const storeItem = async (title, content, createdAt) => {
  try {
    const value = {
      title,
      content,
      createdAt,
    }
    const jsonValue = JSON.stringify(value);
    const key = `${createdAt}`
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getAllItems = async () => {
  let keys = []
  let values
  try {
    keys = await AsyncStorage.getAllKeys();
    values = await AsyncStorage.multiGet(keys);
    return values.map(i => JSON.parse(i[1]));
  } catch (e) {
    console.log(e);
  }
};

const removeValue = async (key, { navigation }) => {
  try {
    await AsyncStorage.removeItem(`${key}`)
  } catch (e) {
    console.log(e)
  }
  await navigation.navigate('Compose');
  await navigation.navigate('Home')
};

const removeAll = async ({ navigation }) => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys)
  } catch (e) {
    console.log(e);
  }
  await navigation.navigate('Compose');
  await navigation.navigate('Home')
}

const mergeItem = async (title, content, createdAt, editedAt) => {
  try {
    const value = {
      title,
      content,
      createdAt,
      editedAt,
    }
    const jsonValue = JSON.stringify(value);
    const key = `${createdAt}`
    await AsyncStorage.mergeItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export { storeItem, getAllItems, removeValue, removeAll, mergeItem };