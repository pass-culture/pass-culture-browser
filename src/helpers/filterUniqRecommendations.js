import get from 'lodash.get'
import uniqBy from 'lodash.uniqby'

// FIXME -> doit etre bouché pour les test unitaires
// l'import est bloqué par la librairie react-icons
// absent du node_modules de la webapp
// import { Logger } from 'pass-culture-shared'

export const filterUniqRecommendations = recommendations =>
  uniqBy(recommendations, recommendation => {
    const eventId = get(recommendation, 'offer.eventId')
    if (eventId) return `event_${eventId}`

    const thingId = get(recommendation, 'offer.thingId')
    if (thingId) return `thing_${thingId}`

    const tutoIndex = get(recommendation, 'mediation.tutoIndex')
    if (tutoIndex) return `tuto_${tutoIndex}`
    // const msg = 'weird this recommendation is with no thing or event or tuto'
    // Logger.warn(msg)
    return ''
  })

export default filterUniqRecommendations
