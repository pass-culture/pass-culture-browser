import get from 'lodash.get'
import { createSelector } from 'reselect'


import selectIsTuto from './isTuto'
import selectMediation from './mediation'

export default createSelector(
  selectIsTuto,
  selectMediation,
  (isTuto, mediation) => isTuto && get(mediation, 'id') === 'AE' // TODO: write better rule
)
