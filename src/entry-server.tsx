import ReactDOMServer from 'react-dom/server'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/store'

export function render() {
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
  return { html }
}
