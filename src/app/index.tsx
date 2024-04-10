import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import '../sass/global.scss'

const BrowseApp = lazy(async () => await import(/* webpackChunkName: "browseApp" */'./browse-app'))

const App: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Router basename="/">
      {/* { isUserLoggedIn ? <BrowseApp /> : <LoginApp />} */}
      <BrowseApp />
    </Router>
  </Suspense>
)

export default App
