import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enJSON from './locale/en.json'
import idJSON from './locale/id.json'
import arJSON from './locale/ar.json'
import { LANGUAGE } from './constants'

const lng = localStorage.getItem(LANGUAGE) || 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    id: { ...idJSON },
    ar: { ...arJSON }
  },
  lng
})
