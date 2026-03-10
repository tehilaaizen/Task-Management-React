import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ShowTaskesByStatus from "./ShowTaskesByStatus";
import AddTesk from "./AddTesk";
import { useState } from "react";
// •	סטטוס (To Do / In Progress / Done)
const ShowProject = () => {
    const { id } = useParams();
    const project = useSelector((state) => state.projectListSlice.projects.find(proj => proj.id === parseInt(id)));
    // if (!project) {
    //     return <div>Project not found</div>;
    // }
    // const tasks = project.tasks || [];
    const [showAdd, setShowAdd] = useState(false);
    return (
        <>
            <div className="flex flex-column h-screen w-full p-4 gap-4 surface-ground">

                <div className="flex justify-content-between align-items-center border-1 border-300 border-round p-3 surface-card shadow-2">
                    <h2 className="m-0">{project.name}</h2>
                    {/* <Button label="Add Project" icon="pi pi-plus" className="p-button-success" /> */}
                     <Button label="הוסף משימה" outlined onClick={()=>setShowAdd(!showAdd)}/> 
                </div>
                {showAdd && <AddTesk projectId={project.id} onClose={() => setShowAdd(false)} />}

                <div className="flex flex-1 gap-3">

                    <ShowTaskesByStatus status="To Do" project={project} />
                    <ShowTaskesByStatus status="In Progress" project={project} />
                    <ShowTaskesByStatus status="Done" project={project} />
                </div>

            </div>

        </>
    )
}
export default ShowProject