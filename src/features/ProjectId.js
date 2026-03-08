import { createSlice } from "@reduxjs/toolkit";
const projectId = createSlice({
    name: "projectId",
    initialState: 7,
    reducers: {
        setProjectId: (state, action) => {
            return state +1;
        }
    }
});
export const { setProjectId } = projectId.actions;
export default projectId.reducer;
