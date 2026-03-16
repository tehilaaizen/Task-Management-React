import ProjectList from './components/ProjectList'
import ShowProject from './components/ShowProject'
import NotConnect from './components/NotConnect'
import {  Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Button} from 'primereact/button';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useNavigate } from 'react-router-dom'

function App() {
  const conectedUser=useSelector((state) => state.User.connected);
  const navigate=useNavigate();
  return(<>

<div className="flex flex-column align-items-center justify-content-center p-4">
   <Routes>
    <Route path='/NotConnect' element={<NotConnect/>}/>
      <Route path="/Projects" element={<ProjectList/>} />
      <Route path="/Project/:id" element={<ShowProject/>} />
      <Route path="/" element={<Login/>}/>
   </Routes>
    </div>
   
  </>)
}

export default App