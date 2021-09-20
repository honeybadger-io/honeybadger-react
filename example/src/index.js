import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

import {Honeybadger, HoneybadgerErrorBoundary} from '@honeybadger-io/react'

Honeybadger.configure({
  apiKey: (process.env.REACT_APP_HONEYBADGER_API_KEY || prompt('Enter the API key for your Honeybadger project:')),
  environment: 'production'
})

ReactDOM.render(
  <HoneybadgerErrorBoundary honeybadger={Honeybadger}>
    <App />
  </HoneybadgerErrorBoundary>,
  document.getElementById('root')
)
