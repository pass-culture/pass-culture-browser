import { mount } from 'enzyme'
import React from 'react'
import { MemoryRouter } from 'react-router'
import Icon from '../../../../../layout/Icon/Icon'
import SeeMore from '../SeeMore'
import { Link } from 'react-router-dom'

describe('src | components | SeeMore', () => {
  let props

  beforeEach(() => {
    props = {
      layout: 'one-item-medium',
      parameters: {
        aroundRadius: null,
        geolocation: { latitude: 1, longitude: 2 },
        hitsPerPage: 2,
        offerCategories: [],
        offerIsDuo: false,
        offerIsNew: false,
        offerTypes: { isDigital: false, isEvent: true, isThing: false },
        priceRange: [],
        searchAround: true,
        tags: [],
      },
    }
  })

  it('should render an icon for the see more component', () => {
    // When
    const wrapper = mount(
      <MemoryRouter>
        <SeeMore {...props} />
      </MemoryRouter>,
    )

    // Then
    const icon = wrapper.find(Icon)
    expect(icon.prop('svg')).toBe('ico-offres-home-white')
  })

  it('should a "En voir plus" label', () => {
    // When
    const wrapper = mount(
      <MemoryRouter>
        <SeeMore {...props} />
      </MemoryRouter>,
    )

    // Then
    const label = wrapper.find({ children: 'En voir plus' })
    expect(label).toHaveLength(1)
  })

  it('should redirect to the right url when categories are provided and not search around', () => {
    // Given
    props.parameters = {
      aroundRadius: null,
      geolocation: { latitude: null, longitude: null },
      hitsPerPage: 2,
      offerCategories: ["SPECTACLE", "CINEMA"],
      offerIsDuo: false,
      offerIsNew: false,
      offerTypes: { isDigital: false, isEvent: true, isThing: false },
      priceRange: [],
      searchAround: false,
      tags: [],
    }

    // When
    const wrapper = mount(
      <MemoryRouter>
        <SeeMore {...props} />
      </MemoryRouter>,
    )

    // Then
    const link = wrapper.find(Link)
    expect(link.prop('to')).toStrictEqual({
      pathname: "/recherche/resultats",
      parametersFromHome: props.parameters,
      search: "?autour-de=non&categories=SPECTACLE;CINEMA"
    })
  })

  it('should redirect to the right url when geolocation is provided and is search around', () => {
    // Given
    props.parameters = {
      aroundRadius: null,
      geolocation: { latitude: 1, longitude: 2 },
      hitsPerPage: 2,
      offerCategories: [],
      offerIsDuo: false,
      offerIsNew: false,
      offerTypes: { isDigital: false, isEvent: true, isThing: false },
      priceRange: [],
      searchAround: true,
      tags: [],
    }

    // When
    const wrapper = mount(
      <MemoryRouter>
        <SeeMore {...props} />
      </MemoryRouter>,
    )

    // Then
    const link = wrapper.find(Link)
    expect(link.prop('to')).toStrictEqual({
      pathname: "/recherche/resultats",
      parametersFromHome: props.parameters,
      search: "?autour-de=oui&latitude=1&longitude=2"
    })
  })
})