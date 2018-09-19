import createCachedSelector from 're-reselect'

import { frenchQueryStringToEnglishObject } from '../utils/string'

export default createCachedSelector(
  (state, search) => search,
  frenchQueryStringToEnglishObject
)((state, search) => search || '')
