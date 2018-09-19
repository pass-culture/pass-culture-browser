import createCachedSelector from 're-reselect'

import queryStringToObject from '../utils/string'
// TO DO import from /shared

export default createCachedSelector(
  (state, search) => search,
  queryStringToObject
)((state, search) => search || '')
