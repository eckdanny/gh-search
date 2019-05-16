import React from 'react'
import GitHubButton from 'react-github-btn'
import { Banner } from './components'
import UserSearch from './modules/UserSearch'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="container" style={{ maxWidth: '680px' }}>
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
        <UserSearch />
      </div>
    </div>
  )
}

export default App
