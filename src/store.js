import AsyncStorage from '@react-native-async-storage/async-storage';

const storeItem = async (title, content, createdAt) => {
    try {
        const value = {
            title,
            content,
            createdAt,
        }
      const jsonValue = JSON.stringify(value);
      // console.log(jsonValue);
      const key = `${createdAt}`
      // console.log(key);
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
    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  };

  const removeValue = async (key, {navigation}) => {
    try {
      await AsyncStorage.removeItem(`${key}`)
    } catch(e) {
      console.log(e)
    }
    console.log('Done.');
    await navigation.navigate('Home');
  }

  const mergeItem = async (title, content, createdAt) => {
    try {
        const value = {
            title,
            content,
            createdAt,
        }
      const jsonValue = JSON.stringify(value);
      // console.log(jsonValue);
      const key = `${createdAt}`
      // console.log(key);
      await AsyncStorage.mergeItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  export {storeItem, getAllItems, removeValue, mergeItem};