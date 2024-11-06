import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
)
