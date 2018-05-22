import { getFuzzyPosition } from '../../utils/geolocation'

const config = {
  name: 'pass_culture',
  collections: [
    // NECESSARY FOR DOING DIFF PUSH PULL
    {
      description: 'id',
      name: 'differences',
    },
    // SPECIFIC COLLECTIONS
    {
      description: 'dehumanizedId',
      isSync: true,
      name: 'recommendations',
      query: async ({ around, mediationId, offerId, position }) => {
        let query = around
          ? `around=${around}`
          : mediationId
            ? `mediationId=${mediationId}`
            : (offerId && `offerId=${offerId}`) || ''
        // get the coords
        // if there are not yet set try to get a fuzzy one
        let coords
        if (position && position.coords) {
          coords = position.coords
        } else {
          coords = await getFuzzyPosition().coords
        }
        console.log('coords', coords)
        if (!coords) {
          return query
        }
        const { latitude, longitude } = coords
        query = `${query}&&latitude=${latitude}&&longitude=${longitude}`
        return query
      },
      sortBy: 'dehumanizedId'
    },
    {
      description: 'id',
      isPullOnly: true,
      name: 'bookings',
    },
    {
      description: 'id',
      name: 'users',
    },
  ],
  version: 1,
}

export default config
