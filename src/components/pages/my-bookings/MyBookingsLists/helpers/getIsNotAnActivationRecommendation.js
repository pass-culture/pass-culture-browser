const getIsNotAnActivationRecommendation = recommendation => {
  const { offer } = recommendation || {}
  if (!offer) return false
  const { type: offerType } = offer
  if (!offerType) return false
  const isActivationType =
    offerType === 'EventType.ACTIVATION' || offerType === 'ThingType.ACTIVATION'
  return !isActivationType
}

export default getIsNotAnActivationRecommendation
