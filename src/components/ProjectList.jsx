import { Button } from 'primereact/button';
import { useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeProject } from '../store/ProjectsListSlice';
import AddProject from './AddProject';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';



const ProjectList = () => {
    const dispatch = useDispatch();
    const projectsData = useSelector((store) => store.projectListSlice.projects);
    const [showAdd, setShowAdd] = useState(false);


    const itemTemplate = (project) => {
        const header = (
            <Link to={`/Project/${project.id}`}>
                <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
            </Link>
        );
        const footer = (
            <>
                <Button label="Delete" severity="danger" icon="pi pi-trash" className="my-button" onClick={() => dispatch(removeProject(project.id))} />
            </>
        );
        return (<>
            <div className="card flex justify-content-center">
                <Card title={project.name} subTitle={project.createDate} footer={footer} header={header} className="md:w-25rem" >
                    <p className="m-0">
                        {project.description}
                    </p>
                </Card>
            </div>
        </>
        );
    };
    const conectedUser=useSelector((state) => state.User.connected);
    const navigate=useNavigate();

    return (
        <>
         {!conectedUser && navigate("/NotConnect")}
            <div className="flex flex-column justify-content-center align-items-center p-4 gap-4 surface-ground shadow-2">
                <div className="flex justify-content-between align-items-center p-3 surface-card">
                    <div className='p-4'>
                        <h1>Projects</h1>
                    </div>
                    <Button label="Add Project" icon="pi pi-plus" className="p-button-lg w-10rem mx-auto my-button p-3 " onClick={() => setShowAdd(true)} />
                </div>
                {showAdd && <AddProject onClose={() => setShowAdd(false)} visible={showAdd} />}
                <div className="grid w-10 mx-auto" value={projectsData} >
                    {projectsData.map((project) => (
                        <div key={project.id} className="col-12 md:col-6 lg:col-3 p-4 ">
                            {itemTemplate(project)}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default ProjectList;