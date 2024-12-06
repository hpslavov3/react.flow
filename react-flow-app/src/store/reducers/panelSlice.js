import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    nodeId: undefined
}

export const panelSlice = createSlice({
    name: 'optionsPanel',
    initialState,
    reducers: {
        setVisible: (state, action) => {
            state.visible = action.payload;
        },
        setNodeId: (state, action) => {
            state.nodeId = action.payload
        }
    }
})

export default panelSlice.reducer;

export const {
    setVisible,
    setNodeId
} = panelSlice.actions;