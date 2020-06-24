import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import EligibilityCheck from '../EligibilityCheck'

describe('eligibility check page', () => {
  it('should display the title "Créer un compte"', () => {
    // when
    const wrapper = mount(
      <MemoryRouter>
        <EligibilityCheck />
      </MemoryRouter>
    )

    // then
    const elgbtTitle = wrapper.find({ children: 'Créer un compte' })
    expect(elgbtTitle).toHaveLength(1)
  })

  it('should display a back to beta page link', () => {
    // when
    const wrapper = mount(
      <MemoryRouter>
        <EligibilityCheck />
      </MemoryRouter>
    )

    // then
    const backLink = wrapper.find('a[href="/beta"]')
    expect(backLink).toHaveLength(1)
  })

  it('should display a postal code input', () => {
    // when
    const wrapper = mount(
      <MemoryRouter>
        <EligibilityCheck />
      </MemoryRouter>
    )

    // then
    const elgbtPostalCodeInput = wrapper.find({
      children: 'Quel est ton code postal de résidence ?',
    })
    expect(elgbtPostalCodeInput).toHaveLength(1)
  })

  it('should add a space in input when user enters the first two numbers of his postal code', () => {
    // given
    const wrapper = mount(
      <MemoryRouter>
        <EligibilityCheck />
      </MemoryRouter>
    )
    const elgbtPostalCodeInput = wrapper.find('input[placeholder="Ex: 75 017"]')

    // when
    act(() => {
      elgbtPostalCodeInput.invoke('onChange')({ target: { value: '76530' } })
    })
    wrapper.update()

    // then
    const elgbtPostalCodeInputUpdated = wrapper.find('input[placeholder="Ex: 75 017"]')
    expect(elgbtPostalCodeInputUpdated.prop('value')).toBe('76 530')
  })

  it('should display a date of birth input', () => {
    // when
    const wrapper = mount(
      <MemoryRouter>
        <EligibilityCheck />
      </MemoryRouter>
    )

    // then
    const elgbtDobInput = wrapper.find({ children: 'Quelle est ta date de naissance ?' })
    expect(elgbtDobInput).toHaveLength(1)
  })

  it('should add slashes in date of birth input', () => {
    // given
    const wrapper = mount(
      <MemoryRouter>
        <EligibilityCheck />
      </MemoryRouter>
    )
    const elgbtDateOfBirthInput = wrapper.find('input[placeholder="JJ/MM/AAAA"]')

    // when
    act(() => {
      elgbtDateOfBirthInput.invoke('onChange')({ target: { value: '05031997' } })
    })
    wrapper.update()

    // then
    const elgbtDateOfBirthInputUpdated = wrapper.find('input[placeholder="JJ/MM/AAAA"]')
    expect(elgbtDateOfBirthInputUpdated.prop('value')).toBe('05/03/1997')
  })

  it('should display a submit button', () => {
    // when
    const wrapper = mount(
      <MemoryRouter>
        <EligibilityCheck />
      </MemoryRouter>
    )

    // then
    const elgbtSubmitBtn = wrapper.find('input[value="Vérifier mon éligibilité"]')
    expect(elgbtSubmitBtn).toHaveLength(1)
  })
})
