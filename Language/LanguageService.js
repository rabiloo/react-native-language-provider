const changeListeners = {};

let allString = {};

let Strings = {};
let languageCode;
const LanguageService = {
  get: () => Strings,
  getLanguageCode: () => languageCode,
  setAllData: ({data}) => {
    allString = data;
  },
  setLanguageCode: ({langCode}) => {
    if (langCode && allString[langCode]) {
      languageCode = langCode;
      Strings = allString[langCode];
    } else {
      const dataKeys = Object.keys(allString);
      languageCode = dataKeys[0];
      Strings = allString[languageCode];
    }
    Object.keys(changeListeners).forEach((k) => {
      changeListeners[k](langCode);
    });
    return Strings;
  },
  onChange: ({key}, cb) => {
    changeListeners[`${key}`] = (langCode) => cb(langCode);
  },
};

export {LanguageService};
