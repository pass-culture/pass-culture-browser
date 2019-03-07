import invert from 'lodash.invert'

export const mapBrowserToApi = {
  [`mots-cles`]: 'keywords'
}

export const mapApiToBrowser = invert(mapBrowserToApi)
