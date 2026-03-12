import ProjectList from './components/ProjectList'
import ShowProject from './components/ShowProject'
import AppBar from './components/AppBar'
import { Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Button} from 'primereact/button';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  const conectedUser=useSelector((state) => state.User.connected);
  return(<>
{/* <AppBar/> */}
   {!conectedUser&&<Link to="/Login" style={{marginLeft:'20px'}}>להתחברות</Link>}
   {conectedUser&&<Link to="/Projects" style={{marginLeft:'20px'}}>רשימת פרוייקטים</Link>}
   <Routes>
      <Route path="/Projects" element={<ProjectList/>} />
      <Route path="/Project/:id" element={<ShowProject/>} />
      <Route path="/Login" element={<Login/>}/>
   </Routes>
  </>)
}

export default App