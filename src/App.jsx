import ProjectList from './components/ProjectList'
import ShowProject from './components/ShowProject'
import AppBar from './components/AppBar'
import {  Route,Routes } from 'react-router-dom'
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
{/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={"https://primefaces.org/cdn/primereact/images/usercard.png"} /> */}
   {!conectedUser&&<Link to="/Login" style={{marginLeft:'800px'}}>Login</Link>}
   {conectedUser&&<Link to="/Projects" style={{marginLeft:'800px'}}>Projects List</Link>}
   <Routes>
      <Route path="/Projects" element={<ProjectList/>} />
      <Route path="/Project/:id" element={<ShowProject/>} />
      <Route path="/Login" element={<Login/>}/>
   </Routes>
  </>)
}

export default App