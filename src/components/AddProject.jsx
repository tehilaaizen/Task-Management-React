import react, { useState } from 'react';
import { addProject } from '../features/ProjectsListReducer';
import { useDispatch ,useSelector} from 'react-redux';
import { setProjectId } from '../features/ProjectId';

const AddProject = ({ onClose }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const dispatch = useDispatch();
    const projectId = useSelector((state) => state.projectId);

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = projectId.toString();
        const newProject = {
            id: id,
            name: projectName,
            description: projectDescription,
            createDate: new Date().toISOString().split('T')[0] 
        };
        dispatch(addProject(newProject));
        dispatch(setProjectId());
        setProjectName('');
        setProjectDescription('');
        if (onClose) onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
            />
            <input type="text" 
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Enter project description" 
            />
            <button type="submit">Add Project</button>
            {onClose && <button type="button" onClick={onClose}>Cancel</button>}
        </form>
    );
};

export default AddProject;