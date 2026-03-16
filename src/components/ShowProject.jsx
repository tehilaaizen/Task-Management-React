import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ShowTaskesByStatus from "./ShowTaskesByStatus";
import AddTesk from "./AddTesk";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ShowProject = () => {
    const { id } = useParams();
     
if(isNaN(id)){
    return <div>Invalid project ID</div>;
}   
    const project = useSelector((state) => state.projectListSlice.projects.find(proj => proj.id === parseInt(id)));
  
    const tasks = project.tasks || [];
    const [showAdd, setShowAdd] = useState(false);
    const conectedUser=useSelector((state) => state.User.connected);
    const navigate=useNavigate();
    return (
        <>
           {!conectedUser && navigate("/NotConnect")}
            <div className="flex flex-column h-screen w-full p-4 gap-4 surface-ground">

                <div className="flex justify-content-between align-items-center p-3 surface-card">
                {/* <div className="flex flex-wrap justify-content-center align-items-center gap-2"> */}

                    <h1 className="m-0">{project.name}</h1>
                    {/* <Button label="Add Project" icon="pi pi-plus" className="p-button-success" /> */}
                    <Button label="Add Task" severity="success" onClick={() => setShowAdd(true)} className="my-button" />
                    {showAdd && (
                        <AddTesk projectId={project.id} visible={showAdd} onClose={() => setShowAdd(false)} />
                    )}
                </div>
                <div className="flex gap-3 w-full">
                    <div className="flex-1">
                        <ShowTaskesByStatus status="To Do" project={project} />
                    </div>

                    <div className="flex-1">
                        <ShowTaskesByStatus status="In Progress" project={project} />
                    </div>

                    <div className="flex-1">
                        <ShowTaskesByStatus status="Done" project={project} />
                    </div>

                </div>

            </div>

        </>
    )
}
export default ShowProject