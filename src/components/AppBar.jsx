import { Link } from "react-router-dom";

const AppBar=()=>{
    return(<>
    <Link to="/Projects" >Task Management</Link>
    <Link to="/Login" style={{marginLeft:'20px'}}>Login</Link>
    </>)
}
export default AppBar;