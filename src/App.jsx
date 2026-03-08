import ProjectList from './components/ProjectList'
import ShowProject from './components/ShowProject'
import AppBar from './components/AppBar'
import { Route,Routes } from 'react-router-dom'

function App() {
  return(<>
   <AppBar/>
   <Routes>
      <Route path="/projects" element={<ProjectList />} />
      <Route path="/project/:id" element={<ShowProject/>} />
   </Routes>
  </>)
}

export default App
