import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

import Honeybadger from 'honeybadger-js'
import ErrorBoundary from '@honeybadger-io/react'

Honeybadger.configure({
  apiKey: (process.env.REACT_APP_HONEYBADGER_API_KEY || prompt('Enter the API key for your Honeybadger project:')),
  environment: 'production'
})

ReactDOM.render(
  <ErrorBoundary honeybadger={Honeybadger}>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
)
