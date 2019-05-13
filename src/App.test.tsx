import React from 'react'
import { render } from 'react-testing-library'
import App from './App'

describe('App', () => {
  it('includes a [role="banner"] region', () => {
    const { getByRole } = render(<App />)
    expect(getByRole('banner')).toBeInTheDocument()
  })
  it('includes a [role="main"] region', () => {
    const { getByRole } = render(<App />)
    expect(getByRole('main')).toBeInTheDocument()
  })
  it('has a level-one heading', () => {
    const { container } = render(<App />)
    expect(container.getElementsByTagName('h1').length).toBe(1)
  })
})
