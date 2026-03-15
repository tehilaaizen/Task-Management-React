// // •	שדות משימה:
// // •	כותרת
// // •	תיאור
// // •	סטטוס (To Do / In Progress / Done)
// // •	עדיפות (Low / Medium / High)
// // •	תאריך יעד

// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addTask } from "../store/ProjectsListSlice";
// import { AutoComplete } from 'primereact/autocomplete';
// import { Dropdown } from 'primereact/dropdown';
// import { Calendar } from 'primereact/calendar';


// const AddTesk = (props) => {

//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [status, setStatus] = useState('');
//     const [priority, setPriority] = useState('');
//     const [dueDate, setDueDate] = useState(null);
//     const dispatch = useDispatch();
//     const [filteredStatus, setFilteredStatus] = useState([]);
//     const statusOptions = ['To Do', 'In Progress', 'Done'];
//     const PriorityOptions = ['Low', 'Medium', 'High'];


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newTask = {
//             title, description, status, priority,dueDate: dueDate ? dueDate.toISOString() : null 

//         }

//         dispatch(addTask({
//             projectId: props.projectId,
//             task: newTask
//         }));
//         setTitle('');
//         setDescription('');
//         setStatus('');
//         setPriority('');
//         setDueDate(null);
//         if (props.onClose) props.onClose();

//     }

//     // const search = (event) => {
//     //     let statusOptions = ['To Do', 'In Progress', 'Done'];
//     //     setFilteredStatus(event.query ? statusOptions.filter((s) => s.toLowerCase().startsWith(event.query.toLowerCase())) : statusOptions);
//     // }
//     return (
//         <div className="card">
//             <div className="flex flex-column md:flex-row ">
//                 <div className="w-full md:w-15 flex flex-column align-items-center justify-content-center gap-3 py-5 border-1">
//                     <form onSubmit={handleSubmit}>
//                         <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
//                             <label className="w-6rem">Title</label>
//                             <InputText id="title" type="text" className="w-12rem" onChange={e => setTitle(e.target.value)} value={title} />
//                         </div>
//                         <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
//                             <label className="w-6rem">description</label>
//                             <InputText id="text" type="text" className="w-12rem" onChange={e => setDescription(e.target.value)} value={description} />
//                         </div>
//                         <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
//                             <label className="w-6rem">status</label>
//                                <Dropdown className="w-12rem" value={status} options={statusOptions} onChange={(e) => setStatus(e.value)} placeholder='choose status' dropdown={true}/>

//                         </div>
//                         <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
//                             <label className="w-6rem">priority</label>
//                             <Dropdown className="w-12rem" value={priority} options={PriorityOptions} onChange={(e) => setPriority(e.value)} placeholder='choose priority' dropdown={true}/>
//                         </div>
//                         <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
//                             <label htmlFor="buttondisplay" className="w-6rem">Date</label>
//                             <Calendar className='w-12rem' id="buttondisplay" value={dueDate} onChange={(e) => setDueDate(e.value)} icon="pi pi-calendar" />
//                         </div>
//                     <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">

//                         <Button label="Add Task" icon="pi pi-plus" className="p-button-lg w-10rem mx-auto my-button" type="submit"/>
//                         {props.onClose && <Button icon='pi pi-trash' className="p-button-lg w-10rem mx-auto my-button" type="button" onClick={props.onClose}  />}

//                     </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AddTesk;
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { useDispatch } from "react-redux";
import { addTask } from "../store/ProjectsListSlice";
import { useForm, Controller } from "react-hook-form";

const AddTask = (props) => {
    const dispatch = useDispatch();

    const statusOptions = ['To Do', 'In Progress', 'Done'];
    const priorityOptions = ['Low', 'Medium', 'High'];

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            dueDate: new Date() 
        }
    });

    const onSubmit = (data) => {
        const newTask = {
            ...data,
            dueDate: data.dueDate ? data.dueDate.toISOString() : new Date().toISOString()
        }

        dispatch(addTask({
            projectId: props.projectId,
            task: newTask
        }));

        reset(); 
        if (props.onClose) props.onClose();
    }

    return (
        <div className="card">
            <div className="flex flex-column md:flex-row ">
                {/* <div className="w-full md:w-15 flex flex-column align-items-center justify-content-center gap-3 py-5 border-1"> */}
                <div className="flex flex-column align-items-center justify-content-center gap-3 py-5 border-1 w-auto mx-auto rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-column justify-content-center align-items-start gap-1 p-2">
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">Title</label>
                                <InputText
                                    id="title"
                                    className="w-12rem"
                                    {...register("title", { required: "Title is required", maxLength: { value: 25, message: "Max 25 characters" } })}
                                />
                            </div>
                            {errors.title && <span className="p-error">{errors.title.message}</span>}
                        </div>

                        <div className="flex flex-column justify-content-center align-items-start gap-1 p-2">
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">Description</label>
                                <InputText
                                    id="description"
                                    className="w-12rem"
                                    {...register("description", { required: "Description is required" })}
                                />
                            </div>
                            {errors.description && <span className="p-error">{errors.description.message}</span>}
                        </div>

                        <div className="flex flex-column justify-content-center align-items-start gap-1 p-2">
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">Status</label>
                                <Controller
                                    name="status"
                                    control={control}
                                    rules={{ required: "Status is required" }}
                                    render={({ field }) => (
                                        <Dropdown
                                            {...field}
                                            className="w-12rem"
                                            options={statusOptions}
                                            placeholder="Choose status"
                                        />
                                    )}
                                />
                            </div>
                            {errors.status && <span className="p-error">{errors.status.message}</span>}
                        </div>

                        <div className="flex flex-column justify-content-center align-items-start gap-1 p-2">
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">Priority</label>
                                <Controller
                                    name="priority"
                                    control={control}
                                    rules={{ required: "Priority is required" }}
                                    render={({ field }) => (
                                        <Dropdown
                                            {...field}
                                            className="w-12rem"
                                            options={priorityOptions}
                                            placeholder="Choose priority"
                                        />
                                    )}
                                />
                            </div>
                            {errors.priority && <span className="p-error">{errors.priority.message}</span>}
                        </div>

                        <div className="flex flex-column justify-content-center align-items-start gap-1 p-2">
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label htmlFor="dueDate" className="w-6rem">Date</label>
                                <Controller
                                    name="dueDate"
                                    control={control}
                                    render={({ field }) => (
                                        <Calendar
                                            {...field}
                                            className="w-12rem"
                                            id="dueDate"
                                            icon="pi pi-calendar"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-content-center align-items-center gap-2 p-2">
                            <Button
                                label="Add Task"
                                icon="pi pi-plus"
                                className="p-button-lg w-10rem mx-auto my-button"
                                type="submit"
                            />
                            {props.onClose && (
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-lg w-10rem mx-auto my-button"
                                    type="button"
                                    onClick={props.onClose}
                                />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTask;