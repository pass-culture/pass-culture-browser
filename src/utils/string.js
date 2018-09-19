/* eslint-disable */
/*
import { queryStringToObject, objectToQueryString } from 'pass-culture-shared'

// eslint-disable prefer-const
export function frenchQueryStringToEnglishObject(string = '') {
  const obj = queryStringToObject(string)

  console.log('frenchQueryStringToEnglishObject', obj)

  Object.keys(obj).forEach(key => {
    switch (key) {
      case 'mots-cles':
        obj.keywords = obj[key]
        delete obj[key]
        break
      default:
        break
    }
  })

  console.log('frenchQueryStringToEnglishObject after', obj)

  return obj
}

export function englishObjectToFrenchQueryString(obj) {

  console.log('englishObjectToFrenchQueryString', obj)
  let string = objectToQueryString(obj)

  string = string.replace(/keywords=/, 'mots-cles=')

  return string
}
*/

export function frenchQueryStringToEnglishQueryString(string) {
  string = string.replace(/mots-cles=/, 'keywords=')

  return string
}
