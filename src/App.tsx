import React, { useState } from 'react'
import UserSearch from './modules/UserSearch'

const App: React.FC = () => {
  const [isEnabled, setEnabled] = useState(true)
  return (
    <div>
      <div role="banner">
        <h1>GitHub Search</h1>
      </div>
      <div role="main">
        <div>
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
        </div>
        {isEnabled && <UserSearch />}
      </div>
    </div>
  )
}

export default App
