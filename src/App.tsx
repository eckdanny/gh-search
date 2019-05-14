import React from 'react'
import BasicUserSearchForm from './BasicUserSearchForm'

const App: React.FC = () => {
  return (
    <div>
      <div role="banner">
        <h1>GitHub Search</h1>
      </div>
      <div role="main">
        <BasicUserSearchForm />
      </div>
    </div>
  )
}

export default App
