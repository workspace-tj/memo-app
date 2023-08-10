import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (title, content, createdAt) => {
    try {
        const value = {
            title: title,
            content: content,
            createdAt: createdAt,
        }
      const jsonValue = JSON.stringify(value);
      console.log(jsonValue);
      const key = `${createdAt}`
      console.log(key);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  export {storeData};