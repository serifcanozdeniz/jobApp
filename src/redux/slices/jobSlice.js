import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    isLoading: false,
    error: null,
}
const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = true;
        },
        serError: (state, action) => {
            state.isLoading = false,
                state.error = action.payload;
        },
        setJobs: (state, action) => {
            state.isLoading = false,
                state.error = null,
                state.jobs = action.payload;
        },
        deleteJob: (state, action) => {
            // silinecek elemanın id si üzerinden sırasını bul
            const index = state.jobs.findIndex((i) => i.id === action.payload);

            // elemanı diziden kaldır
            state.jobs.splice(index, 1);
        },
    },

})
// reducer ı export et
export default jobSlice.reducer;

// aksiyonları export et
export const { setLoading, serError, setJobs, deleteJob } = jobSlice.actions;