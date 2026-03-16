import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const NotConnect = () => {
    return (
        <div className="flex flex-column align-items-center justify-content-center p-4">
            <h2 className="m-0">Not Connected</h2>
            <p className="m-0">Please connect to the internet to access this feature.</p>
            {/* <Button label="Retry" icon="pi pi-refresh" className="p-button-secondary mt-3" onClick={() => window.location.reload()} /> */}
            <Link to="/"><Button label="Login" icon="pi pi-sign-in" /></Link>
        </div>
    );
};

export default NotConnect;