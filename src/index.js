import './index.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore} from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer  from './reducers'
const store = createStore(rootReducer, composeWithDevTools()),
    container = document.getElementById('root'),
    root = createRoot(container)

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
