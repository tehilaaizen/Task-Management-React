import { useSelector, useDispatch } from "react-redux"; 
import { addProject } from '../store/ProjectsListSlice';
import { setProjectId } from '../store/ProjectIdSlice';
import { InputText } from 'primereact/inputtext';
import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const AddProject = ({ onClose ,visible}) => {
    const dispatch = useDispatch();

    const projectId = useSelector((state) => state.projectId);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const id = projectId; 
        const newProject = {
            id,
            name: data.name,
            description: data.description,
            createDate: new Date().toISOString().split('T')[0],
            tasks: [],
            taskesId: 1
        };
        dispatch(addProject(newProject )); 
        dispatch(setProjectId()); 
        reset();
        if (onClose) onClose();
    }

    return (
        <Dialog header="Add New Project" visible={visible} style={{ width: '400px' }} onHide={onClose} modal={true} closable={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-column justify-content-center align-items-start gap-1 p-2">
                <div className="flex flex-wrap justify-content-center align-items-center gap-2 ">
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
            <div className="p-2">
            <Button type="submit" icon="pi pi-check" label="Save" className="p-button-lg"/>
            {onClose && <Button type="button" onClick={onClose} icon="pi pi-times" label="Cancel"/>}
            </div>
        </form>
        </Dialog>
    );
};

export default AddProject;