import React, {useState, useEffect} from 'react';
import * as RNLocalize from 'react-native-localize';
import PropTypes from "prop-types"

import {LanguageService} from './LanguageService';
import {LanguageLocal} from './LanguageLocal';

const LanguageContext = React.createContext({Colors: {}});
/**
 *
 * @param {*} data Strings:{en:{}, ja:{}, vi: {}}
 * * @param {*} initialLanguageCode en, ja,...
 */
function LanguageContainer({children, data, initialLanguageCode, cache}) {
  LanguageService.setAllData({data});

  const [Strings, setStrings] = useState(() => {
    if (initialLanguageCode && data[initialLanguageCode]) {
      LanguageService.setLanguageCode({langCode: initialLanguageCode});
      return data[initialLanguageCode];
    }
    //init base device
    let languageCode;
    let bestStrings;
    const localizes = RNLocalize.getLocales();
    for (let i = 0; i < localizes.length; i++) {
      const element = localizes[i];
      if (data[element.languageCode]) {
        bestStrings = data[element.languageCode];
        languageCode = element.languageCode;
        break;
      }
    }
    //Strings is used in function
    LanguageService.setLanguageCode({langCode: languageCode});
    return bestStrings;
  });
  useEffect(() => {
    LanguageService.onChange({key: 'LanguageContainer'}, (langCode) => {
      if (langCode && data[langCode]) {
        setStrings(data[langCode]);
        if (cache) {
          LanguageLocal.save(langCode);
        }
      }
    });
  
    const checkLanguageLocal = async () => {
      if (cache) {
        const languageCode = await LanguageLocal.get();
        LanguageService.setLanguageCode({langCode: languageCode});
      }
    };
    checkLanguageLocal();
  }, []);

  return (
    <LanguageContext.Provider value={{Strings}}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageContainer.propTypes = {
  children: PropTypes.any,
  data: PropTypes.object,
  initialLanguageCode: PropTypes.string,
  cache: PropTypes.bool,
};

export {LanguageContext, LanguageContainer};
