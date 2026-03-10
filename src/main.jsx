import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import projectId from './store/ProjectIdSlice.js';
import './index.css'
import App from './App.jsx'
import projectListSlice from './store/ProjectsListSlice.js';
import { BrowserRouter} from 'react-router-dom';
import User from './store/UserSlice.js';
const store = configureStore({
  reducer: {
     projectListSlice,
     projectId,
      User
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
       <App />
    </BrowserRouter>
  </Provider>
)
