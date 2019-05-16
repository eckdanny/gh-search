import React, { useState } from 'react'
import GitHubButton from 'react-github-btn'
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
        <h1 className="mb-0">
          GitHub Username Search{' '}
          <span className="d-none d-sm-inline-block">
            <GitHubButton
              className="d-none d-md-inline-block"
              href="https://github.com/eckdanny/gh-search"
              aria-label="Check out eckdanny/gh-search on GitHub"
            >
              GitHub
            </GitHubButton>
          </span>
        </h1>
        <p className="lead font-italic mb-0">for searching usernames :P</p>
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
