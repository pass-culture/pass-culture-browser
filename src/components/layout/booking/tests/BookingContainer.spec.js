import { mapStateToProps } from '../BookingContainer'

describe('src | components | booking', () => {
  let state
  let match

  beforeEach(() => {
    state = {
      data: {
        bookings: [
          {
            id: 'AAA',
            isCancelled: false,
            isUsed: false,
            stock: {
              available: 10,
              bookingLimitDatetime: '2018-11-27T23:59:56.790000Z',
              bookingRecapSent: null,
              dateModified: '2018-10-29T09:44:38.649450Z',
              dateModifiedAtLastProvider: '2018-10-29T09:44:38.649416Z',
              endDatetime: '2018-11-30T22:42:56.790000Z',
              groupSize: 1,
              id: 'AE',
              idAtProviders: null,
              isSoftDeleted: false,
              lastProviderId: null,
              modelName: 'Stock',
              offerId: 'AAA',
              price: 10,
              resolvedOffer: {
                bookingEmail: null,
                dateCreated: '2018-10-29T09:44:38.216817Z',
                dateModifiedAtLastProvider: '2018-10-29T09:44:38.216792Z',
                id: 'AE',
                idAtProviders: null,
                isActive: true,
                lastProviderId: null,
                modelName: 'Offer',
                product: {
                  accessibility: '\u0000',
                  ageMax: null,
                  ageMin: null,
                  conditions: null,
                  dateModifiedAtLastProvider: '2018-10-29T09:44:38.012002Z',
                  description: null,
                  durationMinutes: 60,
                  extraData: null,
                  firstThumbDominantColor: [0, 0, 0],
                  id: 'AE',
                  idAtProviders: null,
                  isNational: false,
                  lastProviderId: null,
                  mediaUrls: [],
                  modelName: 'Event',
                  name: 'Rencontre avec Franck Lepage',
                  thumbCount: 1,
                  type: 'EventType.CONFERENCE_DEBAT_DEDICACE',
                },
                productId: 'AE',
                venue: {
                  address: '1 BD POISSONNIERE',
                  bic: null,
                  bookingEmail: 'fake@email.com',
                  city: 'Paris',
                  comment: null,
                  dateModifiedAtLastProvider: '2018-10-29T09:44:37.451422Z',
                  departementCode: '75',
                  firstThumbDominantColor: null,
                  iban: null,
                  id: 'AE',
                  idAtProviders: null,
                  isVirtual: false,
                  lastProviderId: null,
                  latitude: 48.87067,
                  longitude: 2.3478,
                  managingOffererId: 'AE',
                  modelName: 'Venue',
                  name: 'LE GRAND REX PARIS',
                  postalCode: '75002',
                  siret: '50763357600016',
                  thumbCount: 0,
                },
                venueId: 'AE',
              },
            },
            stockId: 'AE',
          },
        ],
        recommendations: [
          {
            id: 'AAA',
            offer: {
              isEvent: true,
              productId: 'AAA',
              venue: {
                latitude: 48.8638,
                longitude: 2.3375,
              },
              venueId: 'AAA',
            },
            offerId: 'AAA',
          },
        ],
      },
      geolocation: {
        latitude: 48.8637404,
        longitude: 2.3374129,
      },
    }

    match = {
      params: {
        bookingId: 'AAA',
        mediationId: 'AAA',
        offerId: 'AAA',
      },
    }
  })

  describe('mapStateToProps', () => {
    describe('isEvent', () => {
      it('should return the matching booking given the recommendation', () => {
        // given
        const ownProps = {
          match,
          recommendation: state.data.recommendations[0],
        }

        // when
        const result = mapStateToProps(state, ownProps)

        // then
        const expected = {
          bookables: [],
          booking: state.data.bookings[0],
        }
        expect(result).toStrictEqual(expected)
      })
    })
  })
})
