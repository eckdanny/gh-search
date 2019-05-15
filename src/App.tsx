import React, { useState } from 'react'
import { Banner } from './components'
import UserSearch from './modules/UserSearch'

import './App.css'

const App: React.FC = () => {
  const [isEnabled, setEnabled] = useState(true)
  return (
    <div className="container" style={{ maxWidth: '680px' }}>
      {/* <div
        role="banner"
        style={{
          minHeight: '10vh',
        }}
        className="d-flex flex-column justify-content-center d-flex align-items-center"
      >
        <h1 className="mb-0">GitHub Username Search</h1>
        <p className="lead font-italic">for searching usernames :P</p>
      </div> */}
      <Banner>
        <h1 className="mb-0">GitHub Username Search</h1>
        <p className="lead font-italic">for searching usernames :P</p>
      </Banner>
      <div role="main">
        {/* <div>
          <label htmlFor="enable-feature">Enable?</label>
          <input
            type="checkbox"
            id="enable-feature"
            checked={isEnabled}
            onChange={e => {
              console.log(e)
              setEnabled(e.target.checked)
            }}
          />
        </div> */}
        {isEnabled && <UserSearch />}
      </div>
    </div>
  )
}

export default App
