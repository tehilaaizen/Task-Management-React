import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const ShowProject = () => {
    const { id } = useParams();
    const project = useSelector((state) => state.projectsList.projects.find(p => String(p.id) === String(id)));
    if (!project) {
        return <div>Project not found</div>;
    }
    const tasks = project.tasks || [];

    return (
        <div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>Created on: {project.createDate}</p>
            <h3>Tasks:</h3>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Due Date: {task.dueDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ShowProject