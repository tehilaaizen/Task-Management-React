import { createSlice } from "@reduxjs/toolkit";
import EditTask from "../components/EditTesk";
const projectsListSlice = createSlice({
  name: "projectsList",
  initialState: {
    projects: [
        { id: 1, name: 'Project 1',  description: "project description", createDate: '2023-01-01',taskesId:5,tasks: [{ id: 1, title: 'Task 1', description: 'task description', status: 'To Do', priority: 'Medium', dueDate: '2023-01-15' },{ id: 2, title: 'Task 2', description: 'task description', status: 'Done', priority: 'High', dueDate: '2023-01-16' },{ id: 3, title: 'Task 3', description: 'task description', status: 'To Do', priority: 'Low', dueDate: '2023-01-17' },{ id: 4, title: 'Task 4', description: 'task description', status: 'To Do', priority: 'Medium', dueDate: '2023-01-18' }] },
        { id: 2, name: 'Project 2',  description: "project description", createDate: '2023-02-01',taskesId:3,tasks: [{ id: 1, title: 'Task 1', description: 'task description', status: 'To Do', priority: 'High', dueDate: '2023-02-15' },{ id: 2, title: 'Task 2', description: 'task description', status: 'To Do', priority: 'Medium', dueDate: '2023-02-16' }] },
        { id: 3, name: 'Project 3',  description: "project description", createDate: '2023-03-01',taskesId:2,tasks: [{ id: 1, title: 'Task 1', description: 'task description', status: 'To Do', priority: 'Medium', dueDate: '2023-03-15' }] },
        { id: 4, name: 'Project 4',  description: "project description", createDate: '2023-04-01',taskesId:1,tasks: [] },
        { id: 5, name: 'Project 5',  description: "project description", createDate: '2023-05-01',taskesId:1,tasks: [] },
        { id: 6, name: 'Project 6',  description: "project description", createDate: '2023-06-01',taskesId:1,tasks: [] }   
    ]
  },
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    addTask: (state, action) => {
      const project = state.projects.find(project => project.id == action.payload.projectId);
      if (project) {
        action.payload.task.id=project.taskesId;
        project.tasks.push(action.payload.task);
        project.taskesId+=1;
      }
    },
    removeTask: (state, action) => {
      const project = state.projects.find(project => project.id === action.payload.projectId);
      const taskToDrop = project.tasks.find(task => task.id === action.payload.taskId);
      project.tasks = project.tasks.filter(task => task.id !== action.payload.taskId);
    },
    changeStatus: (state, action) => {
     const project = state.projects.find(project => project.id === action.payload.projectId);
     const taskToChange = project.tasks.find(task => task.id === action.payload.taskId);
     if(taskToChange.status === "To Do"){
        taskToChange.status = "In Progress";
    }
    else if(taskToChange.status === "In Progress"){
        taskToChange.status = "Done";
    }
  },
  editTask: (state, action) => {
    const project = state.projects.find(project => project.id == action.payload.projectId);
    const taskToEdit = project.tasks.find(task => task.id == action.payload.taskId);
    taskToEdit.title = action.payload.title;
    taskToEdit.description = action.payload.description;
    taskToEdit.priority = action.payload.priority;
    taskToEdit.dueDate = action.payload.dueDate;
  }
}
});

export const { addProject, removeProject, addTask,removeTask ,changeStatus,editTask} = projectsListSlice.actions;
export default projectsListSlice.reducer;