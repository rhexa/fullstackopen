import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
// const root = ReactDOM.createRoot(document.getElementById('root'))

// const renderApp = () => {
//   root.render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   )
// }

// renderApp()
// store.subscribe(renderApp)