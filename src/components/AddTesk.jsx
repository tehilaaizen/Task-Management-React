// •	שדות משימה:
// •	כותרת
// •	תיאור
// •	סטטוס (To Do / In Progress / Done)
// •	עדיפות (Low / Medium / High)
// •	תאריך יעד


import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/ProjectsListSlice";
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';


const AddTesk = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const dispatch = useDispatch();
    const [filteredStatus, setFilteredStatus] = useState([]);
    const statusOptions = ['To Do', 'In Progress', 'Done'];
    const PriorityOptions = ['Low', 'Medium', 'High'];

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            title, description, status, priority,dueDate: dueDate ? dueDate.toISOString() : null 

        }

        dispatch(addTask({
            projectId: props.projectId,
            task: newTask
        }));
        setTitle('');
        setDescription('');
        setStatus('');
        setPriority('');
        setDueDate(null);
        if (props.onClose) props.onClose();
    }

    // const search = (event) => {
    //     let statusOptions = ['To Do', 'In Progress', 'Done'];
    //     setFilteredStatus(event.query ? statusOptions.filter((s) => s.toLowerCase().startsWith(event.query.toLowerCase())) : statusOptions);
    // }
    return (
        <div className="card">
            <div className="flex flex-column md:flex-row ">
                <div className="w-full md:w-15 flex flex-column align-items-center justify-content-center gap-3 py-5 border-1">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                            <label className="w-6rem">Title</label>
                            <InputText id="title" type="text" className="w-12rem" onChange={e => setTitle(e.target.value)} value={title} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                            <label className="w-6rem">description</label>
                            <InputText id="text" type="text" className="w-12rem" onChange={e => setDescription(e.target.value)} value={description} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                            <label className="w-6rem">status</label>
                               <Dropdown className="w-12rem" value={status} options={statusOptions} onChange={(e) => setStatus(e.value)} placeholder='choose status' dropdown={true}/>

                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                            <label className="w-6rem">priority</label>
                            <Dropdown className="w-12rem" value={priority} options={PriorityOptions} onChange={(e) => setPriority(e.value)} placeholder='choose priority' dropdown={true}/>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                            <label htmlFor="buttondisplay" className="w-6rem">Date</label>
                            <Calendar className='w-12rem' id="buttondisplay" value={dueDate} onChange={(e) => setDueDate(e.value)} icon="pi pi-calendar" />
                        </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">

                        <Button label="Add Task" icon="pi pi-plus" className="p-button-success p-button-lg w-10rem mx-auto" type="submit" />
                        {props.onClose && <Button icon='pi pi-trash' className="p-button-success p-button-lg w-10rem mx-auto" type="button" onClick={props.onClose}/>}

                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTesk;