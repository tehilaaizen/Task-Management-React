import { Link } from "react-router-dom";

const AppBar=()=>{
    return(<>
    <Link to="/projects" >
    {/* style={{ textDecoration: 'none', color: 'black' }}> */}
        Task Management
    </Link>
    

    </>)
}
export default AppBar;