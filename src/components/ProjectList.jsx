
import { Button } from 'primereact/button';


import { OrderList } from 'primereact/orderlist';
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




const ProjectList = () => {
    const dispatch = useDispatch();
    const projectsData = useSelector((store) => store.projectListSlice.projects);
    const [showAdd, setShowAdd] = useState(false);


    const itemTemplate = (project) => {
        const header = (
            <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />

        );
        const footer = (
            <>
                {/* <Button label="Save" icon="pi pi-check" /> */}
                {/* אפשר להוסיף כפתור של עריכה */}
                <Button label="Delete" severity="secondary" icon="pi pi-trash" style={{ marginLeft: '0.5em' }} onClick={() => dispatch(removeProject(project.id))} />
            </>
        );
        return (<>
            <div className="card flex justify-content-center">
                <Link to={`/Project/${project.id}`}>
                <Card title={project.name} subTitle={project.createDate} footer={footer} header={header} className="md:w-25rem" >
                    <p className="m-0">
                        {project.description}
                    </p>
                </Card>
                </Link>
            </div>

            {/* <div className="flex flex-wrap p-2 align-items-center gap-3" >
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{project.name}</span>      
                    <span className="text-sm text-500">{project.description}</span>
                    <span className="text-sm text-300">{project.createDate}</span>  
                    <Link to={`/project/${project.id}`} className="p-button p-button-secondary" style={{backgroundColor: '#4a90e2', color: 'white', border: 'none'}}>View Details</Link>            
                </div>
                 <Button label="Delete" icon="pi pi-trash" className="p-button p-button-danger" style={{backgroundColor: '#9d4540', color: 'white', border: 'none'}} onClick={() => dispatch(removeProject(project.id))} />

            </div >*/}
        </>
        );
    };

    return (
        <>

            <div className="card xl:flex xl:justify-content-center">
                <button onClick={() => setShowAdd(true)}>הוסף פרוייקט</button>
                {showAdd && <AddProject onClose={() => setShowAdd(false)} />}
                <OrderList dataKey="id" value={projectsData} itemTemplate={itemTemplate} header="Projects" filter filterBy="name" filterPlaceholder="Search projects"></OrderList>
            </div>
        </>
    )
}
export default ProjectList;