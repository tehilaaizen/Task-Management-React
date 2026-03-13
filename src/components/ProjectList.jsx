
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
            <Link to={`/Project/${project.id}`}>

                <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
            </Link>


        );

        const footer = (

            <>
                {/* <Button label="Save" icon="pi pi-check" /> */}
                {/* אפשר להוסיף כפתור של עריכה */}
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

    return (
        <>

            <div className="xl:flex xl:justify-content-center xl:align-items-center p-4 gap-4 surface-ground rounded-lg   shadow-2 align-items-center">
                <Button label="Add Project" icon="pi pi-plus" className="p-button-lg w-10rem mx-auto my-button " onClick={() => setShowAdd(true)} />
                {showAdd && <AddProject onClose={() => setShowAdd(false)} />}
                <OrderList dataKey="id" value={projectsData} itemTemplate={itemTemplate} header="Projects" filter filterBy="name" filterPlaceholder="Search projects" className='p-grid'></OrderList>
            </div>
        </>
    )
}
export default ProjectList;