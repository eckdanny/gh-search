import React from 'react'
import { render } from 'react-testing-library'
import BasicUserSearchForm from './BasicUserSearchForm'

describe('BasicUserSearchForm', () => {
  it('renders a form', () => {
    const { getByTestId } = render(
      <BasicUserSearchForm data-testid="my-form" />
    )
    const $el = getByTestId('my-form')
    expect($el.tagName).toBe('FORM')
  })
})
