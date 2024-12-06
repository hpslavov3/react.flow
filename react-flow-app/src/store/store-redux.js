import { configureStore } from '@reduxjs/toolkit'
import builderSliceReducer from './reducers/builderSlice'
import panelSliceReducer from './reducers/panelSlice'
import createNodePanelReducer from './reducers/createPanelSlice'

export const store = configureStore({
    reducer: {
        builder: builderSliceReducer,
        panel: panelSliceReducer,
        createNodePanel: createNodePanelReducer
    }
})