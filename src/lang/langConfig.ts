import React from 'react'

export const defaultLang = 'en'

export const langs = [
  { id: 'en', name: 'English' },
  { id: 'pt', name: 'Portuguese' },
]

export const messageBundle = {
  en: {
    'label.language': 'Language',
  },
  pt: {
    'label.language': 'Idioma',
  },
}

export const LangContext = React.createContext(messageBundle[defaultLang])
