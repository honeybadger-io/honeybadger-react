import React from 'react'
import Honeybadger from 'honeybadger-js'
import TestRenderer from 'react-test-renderer'
import HbErrorBoundary from './'
import sinon from 'sinon'

describe('HoneybadgerReact', () => {
  let config = {api_key: 'FFAACCCC00'}
  let honeybadger = Honeybadger.configure(config)

  class Clean extends React.Component {
    render() {
      return <h1>Welcome! This works</h1>
    }
  }

  class Broken extends React.Component {
    render() {
      throw Error('Busted, sorry')
    }
  }

  var requests, xhr

  var sandbox = sinon.createSandbox()
  beforeEach(function () {
    // Stub HTTP requests.
    requests = []
    xhr = sandbox.useFakeXMLHttpRequest()

    xhr.onCreate = function (xhr) {
      return requests.push(xhr)
    }
  })

  afterEach(function () {
    sandbox.restore()
  })

  function afterNotify (done, run) {
    setTimeout(function () {
      run()
      done()
    }, 50)
  }

  it('should render the default component when there are no errors', () => {
    const testRenderer = TestRenderer.create(<HbErrorBoundary honeybadger={honeybadger}><Clean /></HbErrorBoundary>)
    const testInstance = testRenderer.root
    expect(testInstance.findByType(Clean)).toBeDefined()
  })

  it("should invoke Honeybadger's notify when a component errors", (done) => {
    sandbox.spy(honeybadger, 'notify')
    TestRenderer.create(<HbErrorBoundary honeybadger={honeybadger}><Broken /></HbErrorBoundary>)
    afterNotify(done, function () {
      expect(honeybadger.notify.calledOnce).toBeTruthy()
    })
  })

  describe('when no custom error component is available', () => {
    it('should render a default error message when a component errors', () => {
      const testRenderer = TestRenderer.create(<HbErrorBoundary honeybadger={honeybadger}><Broken /></HbErrorBoundary>)
      const testInstance = testRenderer.root
      expect(testInstance.findByProps({className: 'error'})).toBeDefined()
    })
  })

  describe('when a custom error component is available', () => {
    it('should render a custom error message when a component errors', (done) => {
      sandbox.spy(honeybadger, 'notify')

      const MyError = jest.fn(() => 'custom error view')
      TestRenderer.create(<HbErrorBoundary honeybadger={honeybadger} ErrorComponent={MyError}><Broken /></HbErrorBoundary>)
      expect(MyError).toBeCalledWith({
        error: expect.any(Error),
        info: { componentStack: expect.any(String) },
        errorOccurred: expect.any(Boolean)
      }, {})
      // Still want to ensure notify is only called once. The MyError component will be created twice by React.
      afterNotify(done, function () {
        expect(honeybadger.notify.calledOnce).toBeTruthy()
      })
     })
  })
})
