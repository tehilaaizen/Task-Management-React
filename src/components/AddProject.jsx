// import react, { useState } from 'react';
// import { addProject } from '../store/ProjectsListSlice';
// import { useDispatch ,useSelector} from 'react-redux';
// import { setProjectId } from '../store/ProjectIdSlice';
// const AddProject = ({onClose}) => {
//     const [projectName, setProjectName] = useState('');
//     const [projectDescription, setProjectDescription] = useState('');
//     const dispatch = useDispatch();
//     const projectId = useSelector((state) => state.projectId);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const id = projectId.toString();
//         const newProject = {
//             id: id,
//             name: projectName,
//             description: projectDescription,
//             createDate: new Date().toISOString().split('T')[0] 
//         };
//         dispatch(addProject(newProject));
//         dispatch(setProjectId());
//         setProjectName('');
//         setProjectDescription('');
//         if (onClose) onClose();
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={projectName}
//                 onChange={(e) => setProjectName(e.target.value)}
//                 placeholder="Enter project name"
//             />
//             <input type="text" 
//                 value={projectDescription}
//                 onChange={(e) => setProjectDescription(e.target.value)}
//                 placeholder="Enter project description" 
//             />
//             <button type="submit">Add Project</button>
//             {onClose && <button type="button" onClick={onClose}>Cancel</button>}
//         </form>
//     );
// };

// export default AddProject;

import { useSelector, useDispatch } from "react-redux"; 
import { addProject } from '../store/ProjectsListSlice';
import { setProjectId } from '../store/ProjectIdSlice';
import { InputText } from 'primereact/inputtext';
import { useForm } from "react-hook-form";

const AddProject = ({ onClose }) => {
    const dispatch = useDispatch();

    const projectId = useSelector((state) => state.projectId);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const id = projectId.toString(); 
        const newProject = {
            id,
            ...data, 
             createDate: new Date().toISOString().split('T')[0] 
        };
        dispatch(addProject(newProject )); 
        dispatch(setProjectId()); 
        reset();
        if (onClose) onClose();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-column justify-content-center align-items-start gap-1 p-2">
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <label className="w-6rem">Title</label>
                    <InputText
                        id="name"
                        className="w-12rem"
                        {...register("name", { required: "Title is required", maxLength: { value: 25, message: "Max 25 characters" } })}
                    />
                </div>
                {errors.title && <span className="p-error">{errors.title.message}</span>} 
            </div>
            <div className="flex flex-column justify-content-center align-items-start gap-1 p-2">
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                   <label className='w-6rem'>Description</label>
                   <InputText
                       id='description'
                       className='w-12rem'
                       {...register("description", { required: "Description is required" })}
                   />
                </div>
                {errors.description && <span className="p-error">{errors.description.message}</span>} 
            </div>

            <button type="submit">Add Project</button>
            {onClose && <button type="button" onClick={onClose}>Cancel</button>}
        </form>
    );
};

export default AddProject;