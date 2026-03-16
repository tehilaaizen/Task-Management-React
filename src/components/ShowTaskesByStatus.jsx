
import { Button } from 'primereact/button';


import { OrderList } from 'primereact/orderlist';
import  { useState,useEffect } from 'react';


import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useDispatch } from 'react-redux';
import { changeStatus, removeTask } from '../store/ProjectsListSlice';
import EditTask from './EditTesk';
const ShowTaskesByStatus=(props)=>{
    const status= props.status;
    const project= props.project; 
    const tasks= project.tasks.filter(task => task.status === status);
    const [showAdd, setShowAdd] = useState(false);
    const dispatch = useDispatch();
    const itemTemplate = (task) => {
        return (
            <>
           
            <div className="col-12 md:col-6 lg:col-3">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={"https://primefaces.org/cdn/primereact/images/usercard.png"} alt={task.name} />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{task.title}</div>
                                <div className="text-700 font-alt">{task.description}</div>
                                <div className="text-700">{new Date(task.dueDate).toLocaleDateString()}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                <span className="flex align-items-center gap-2">
                                    <span className="text-700">{task.priority}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">{task.date}</span>
                            <Button icon="pi pi-trash"  onClick={() => dispatch(removeTask({projectId:project.id,taskId:task.id}))}className='my-button' ></Button>
                            <Button icon="pi pi-pencil"  onClick={() => setShowAdd(true)} ></Button>
                            {showAdd && (
                                <EditTask projectId={project.id} task={task} visible={showAdd} onClose={() => setShowAdd(false)} />
                            )}
                            <Button icon='pi pi-angle-double-right' onClick={() => dispatch(changeStatus({projectId:project.id,taskId:task.id}))} className='my-button'></Button>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    };

    return(
           <div className="w-full">
        <OrderList
            className="w-full"
            dataKey="id"
            value={tasks}
            itemTemplate={itemTemplate}
            header={status}
            filter
            filterBy="title"
            filterPlaceholder="Search..."
            showControls={false}
        />
    </div>
        
    )
}
export default ShowTaskesByStatus;