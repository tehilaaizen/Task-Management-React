
import { Button } from 'primereact/button';


import { OrderList } from 'primereact/orderlist';
import  { useState,useEffect } from 'react';


import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useDispatch } from 'react-redux';
import { changeStatus, removeTask } from '../store/ProjectsListSlice';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';




const ShowTaskesByStatus=(props)=>{
    const status= props.status;
    const project= props.project; 
    const tasks= project.tasks.filter(task => task.status === status);
    const [showAdd, setShowAdd] = useState(false);
    const dispatch = useDispatch();




    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     ProductService.getProducts().then((data) => setProducts(data));
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // const getSeverity = (product) => {
    //     switch (product.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };


    const itemTemplate = (task) => {
        return (
            <>
            {/* <div className="flex flex-wrap p-2 align-items-center gap-3" >
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{task.title}</span> 
                    <span className="text-sm text-500">{task.description}</span>
                    <span className="text-sm text-300">{new Date(task.dueDate).toLocaleDateString()}</span>
                    <span className="text-sm text-300">{task.priority}</span>
                </div>
                 <Button label="Delete" icon="pi pi-trash" className="p-button p-button-danger"  onClick={() => dispatch(removeTask({projectId:project.id,taskId:task.id}))} />
                 <Button label="change" icon="pi pi-trash" className="p-button p-button-danger"  onClick={() => dispatch(changeStatus({projectId:project.id,taskId:task.id}))} />

            </div > */}
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={"https://primefaces.org/cdn/primereact/images/usercard.png"} alt={task.name} />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{task.title}</div>
                                <div className="text-700">{task.description}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                {/* <Rating value={task.priority}  cancel={false}></Rating> */}
                                <span className="flex align-items-center gap-2">
                                    <span className="font-semibold">{task.priority}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">{task.date}</span>
                            <Button icon="pi pi-trash"  onClick={() => dispatch(removeTask({projectId:project.id,taskId:task.id}))}></Button>
                            <Button icon='pi pi-down' onClick={() => dispatch(changeStatus({projectId:project.id,taskId:task.id}))}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    };

    return(
        <>
        <OrderList dataKey="id" value={tasks}  itemTemplate={itemTemplate} header={status} filter filterBy="title" filterPlaceholder="חפש משימה"></OrderList>
        </>
    )
}
export default ShowTaskesByStatus;