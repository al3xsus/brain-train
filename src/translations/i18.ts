import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import ru from "./ru.json"
import en from "./en.json"

i18n
    .use(initReactI18next)
    .init({
        interpolation: {escapeValue: false},
        lng: 'en',
        resources: {
            en: {
                translation: en
            },
            zh: {
                translation: ru
            }
        }
    });