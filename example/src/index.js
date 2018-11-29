import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'
import Honeybadger from 'honeybadger-js'
import ErrorBoundary from '@honeybadger-io/react'

const config = {
  api_key: (process.env.REACT_APP_HONEYBADGER_API_KEY || prompt('Enter the API key for your Honeybadger project:'))
}

const honeybadger = Honeybadger.configure(config)

ReactDOM.render(<ErrorBoundary honeybadger={honeybadger}><App /></ErrorBoundary>, document.getElementById('root'))
