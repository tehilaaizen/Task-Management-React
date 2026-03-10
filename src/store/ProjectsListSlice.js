import { createSlice } from "@reduxjs/toolkit";
//const initialState = 
// •	יצירת משימה
// •	עריכת משימה
// •	מחיקת משימה
// •	שינוי סטטוס משימה
// •	שדות משימה:
// •	כותרת
// •	תיאור
// •	סטטוס (To Do / In Progress / Done)
// •	עדיפות (Low / Medium / High)
// •	תאריך יעד `

const projectsListSlice = createSlice({
  name: "projectsList",
  initialState: {
    projects: [
        { id: 1, name: 'פרוייקט א',  description: "פרוייקט בריאקט", createDate: '2023-01-01',taskesId:3,tasks: [{ id: 1, title: 'משימה 1', description: 'תיאור המשימה', status: 'To Do', priority: 'Medium', dueDate: '2023-01-15' },{ id: 2, title: 'משימה 2', description: 'תיאור המשימה', status: 'Done', priority: 'High', dueDate: '2023-01-16' }] },
        { id: 2, name: 'פרוייקט ב',  description: "תיאור הפרוייקט", createDate: '2023-02-01',taskesId:3,tasks: [{ id: 1, title: 'משימה 1', description: 'תיאור המשימה', status: 'To Do', priority: 'High', dueDate: '2023-02-15' },{ id: 2, title: 'משימה 2', description: 'תיאור המשימה', status: 'To Do', priority: 'Medium', dueDate: '2023-02-16' }] },
        { id: 3, name: 'פרוייקט ג',  description: "תיאור הפרוייקט", createDate: '2023-03-01',taskesId:1,tasks: [] },
        { id: 4, name: 'פרוייקט ד',  description: "תיאור הפרוייקט", createDate: '2023-04-01',taskesId:1,tasks: [] },
        { id: 5, name: 'פרוייקט ה',  description: "תיאור הפרוייקט", createDate: '2023-05-01',taskesId:1,tasks: [] },
        { id: 6, name: 'פרוייקט ו',  description: "תיאור הפרוייקט", createDate: '2023-06-01',taskesId:1,tasks: [] }   
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
      const project = state.projects.find(project => project.id === action.payload.projectId);
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
  }}
});

export const { addProject, removeProject, addTask,removeTask ,changeStatus} = projectsListSlice.actions;
export default projectsListSlice.reducer;