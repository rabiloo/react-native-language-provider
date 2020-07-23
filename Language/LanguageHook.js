import {useContext} from 'react';
import {LanguageContext} from './LanguageContext';
import {LanguageService} from './LanguageService';

function useLanguageString() {
  const {Strings} = useContext(LanguageContext);

  const setLanguageCode = ({languageCode}) => {
    LanguageService.setLanguageCode({langCode: languageCode});
  };

  return {Strings, setLanguageCode};
}
export {useLanguageString};
