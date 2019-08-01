export const bookingNormalizer = {
  recommendation: 'recommendations',
  user: {
    isMergingDatum: true,
    stateKey: 'users',
  },
}

export const favoriteNormalizer = {
  matchingRecommendations: {
    normalizer: recommendationNormalizer,
    stateKey: 'recommendations',
  },
}

export const recommendationNormalizer = {
  bookings: 'bookings',
}
