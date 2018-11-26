import React, { Component } from 'react'

import GoodComponent from './GoodComponent'
import BuggyComponent from './BuggyComponent'

export default class App extends Component {
  render () {
    return (
      <div>
        <GoodComponent />
        <BuggyComponent />
      </div>
    )
  }
}
