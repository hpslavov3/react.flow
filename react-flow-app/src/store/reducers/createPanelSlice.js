import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    edgeId: undefined,
    x: 0,
    y: 0,
    source: '',
    target: ''
}

export const createPanelSlice = createSlice({
    name: 'createNodePanel',
    initialState,
    reducers: {
        setVisible: (state, action) => {
            state.visible = action.payload;
        },
        setEdgeId: (state, action) => {
            state.edgeId = action.payload;
        },
        setX: (state, action) => {
            state.x = action.payload;
        }, 
        setY: (state, action) => {
            state.y = action.payload;
        },
        setSource: (state, action) => {
            state.source = action.payload
        },
        setTarget: (state, action) => {
            state.target = action.payload
        }
    }
})

export default createPanelSlice.reducer;

export const {
    setVisible,
    setEdgeId,
    setX,
    setY,
    setSource,
    setTarget
} = createPanelSlice.actions;