
import { Button } from 'primereact/button';


import { OrderList } from 'primereact/orderlist';
import  { useState } from 'react';


import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useDispatch } from 'react-redux';
import { changeStatus, removeTask } from '../store/ProjectsListSlice';




const ShowTaskesByStatus=(props)=>{
    const status= props.status;
    const project= props.project; 
    const tasks= project.tasks.filter(task => task.status === status);
    const [showAdd, setShowAdd] = useState(false);
    const dispatch = useDispatch();


    const itemTemplate = (task) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3" >
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{task.title}</span> 
                    <span className="text-sm text-500">{task.description}</span>
                    <span className="text-sm text-300">{new Date(task.dueDate).toLocaleDateString()}</span>
                    <span className="text-sm text-300">{task.priority}</span>
                </div>
                 <Button label="Delete" icon="pi pi-trash" className="p-button p-button-danger" style={{backgroundColor: '#9d4540', color: 'white', border: 'none'}} onClick={() => dispatch(removeTask({projectId:project.id,taskId:task.id}))} />
                 <Button label="change" icon="pi pi-trash" className="p-button p-button-danger" style={{backgroundColor: '#9d4540', color: 'white', border: 'none'}} onClick={() => dispatch(changeStatus({projectId:project.id,taskId:task.id}))} />

            </div >
        );
    };

    return(
        <>
        <OrderList dataKey="id" value={tasks}  itemTemplate={itemTemplate} header={status} filter filterBy="title" filterPlaceholder="חפש משימה"></OrderList>
        </>
    )
}
export default ShowTaskesByStatus;