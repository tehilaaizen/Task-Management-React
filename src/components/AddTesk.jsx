import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { useDispatch } from "react-redux";
import { addTask } from "../store/ProjectsListSlice";
import { useForm, Controller } from "react-hook-form";
import { Dialog } from 'primereact/dialog';
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
                <div className="flex flex-column align-items-center justify-content-center gap-3 py-5 border-1 w-auto mx-auto rounded-lg">
                    <Dialog
                        header="Add New Task"
                        visible={props.visible}
                       style={{ width: '400px' }}
                       onHide={props.onClose}
                        modal={true}
                        closable={false}   
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="center ">
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
                        </Dialog >
                </div>
            </div>

        </div>
    )
};

export default AddTask;