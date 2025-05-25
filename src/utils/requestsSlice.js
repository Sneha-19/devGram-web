import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload
        },
        removeRequests: (state, action) => {
            const newArray = state.filter((req) => req.id !== action.payload._id);
            return newArray;
        }
    }
})

export const {addRequests, removeRequests} = requestsSlice.actions;

export default requestsSlice.reducer;
