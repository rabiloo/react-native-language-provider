import AsyncStorage from '@react-native-community/async-storage';

const AsyncStoreKey = {language: 'local-language-async'};

const LanguageLocal = {
  save: async (languageCode) => {
    try {
      await AsyncStorage.setItem(AsyncStoreKey.language, languageCode);
    } catch (error) {
      // FirebaseInstant.crash.recordError(error);
    }
  },
  remove: () => {
    AsyncStorage.removeItem(AsyncStoreKey.language);
  },
  get: async () => {
    try {
      const result = await AsyncStorage.getItem(AsyncStoreKey.language);
      return result;
    } catch (error) {
      // FirebaseInstant.crash.recordError(error);
      return null;
    }
  },
};
export {LanguageLocal};
