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

    const search = (event) => {
        let statusOptions = ['To Do', 'In Progress', 'Done'];
        setFilteredStatus(event.query ? statusOptions.filter((s) => s.toLowerCase().startsWith(event.query.toLowerCase())) : statusOptions);
    }
    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Title</label>
                            <InputText id="title" type="text" className="w-12rem" onChange={e => setTitle(e.target.value)} value={title} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">description</label>
                            <InputText id="text" type="text" className="w-12rem" onChange={e => setDescription(e.target.value)} value={description} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">status</label>
                            <AutoComplete value={status} suggestions={filteredStatus} completeMethod={search} onChange={(e) => setStatus(e.value)} placeholder='choose status' dropdown={true} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">priority</label>
                            <Dropdown value={priority} options={PriorityOptions} onChange={(e) => setPriority(e.value)} placeholder='choose priority' dropdown={true}/>
                        </div>
                        <div className="flex-auto">
                            <label htmlFor="buttondisplay" className="font-bold block mb-2">
                                Button Display
                            </label>
                            <Calendar id="buttondisplay" value={dueDate} onChange={(e) => setDueDate(e.value)} icon="pi pi-calendar" />
                        </div>
                        <Button label="Login" icon="pi pi-user" className="p-button-success p-button-lg w-10rem mx-auto" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTesk;