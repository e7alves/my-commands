import React from 'react'

import messageBundle from './messageBundle'

export const defaultLang = 'en'

export const langs = [
  { id: 'en', name: 'English' },
  { id: 'pt', name: 'Portuguese' },
]

export const LangContext = React.createContext(messageBundle[defaultLang])
