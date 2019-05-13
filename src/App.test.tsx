import React from 'react'
import { render } from 'react-testing-library'
import App from './App'

describe('App', () => {
  it('includes a link to React docs', () => {
    const { getByText } = render(<App />)
    expect(getByText('Learn React').getAttribute('href')).toMatch(
      /\/\/reactjs.org/
    )
  })
})
