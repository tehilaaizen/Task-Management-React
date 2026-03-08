import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import projectId from './features/ProjectId';
import './index.css'
import App from './App.jsx'
import projectsList from './features/ProjectsListReducer.js';
import { BrowserRouter} from 'react-router-dom';
const store = configureStore({
  reducer: {
      projectsList : projectsList,
      projectId: projectId
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
       <App />
    </BrowserRouter>
  </Provider>
)
