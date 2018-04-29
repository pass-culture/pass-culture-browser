import { createSelector } from 'reselect'

export default createSelector(
  state => state.data.offers,
  offers => {
    if (!offers) {
      return
    }
    const sortOffers = [...offers]
    // youngest are at the top of the list
    sortOffers.sort((o1, o2) => o2.id - o1.id)
    return sortOffers
  }
)
