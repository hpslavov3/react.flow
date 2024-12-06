import { useCallback } from "react";
import { setVisible, setNodeId } from "../store/reducers/panelSlice";
import { setVisible as setCreatePanelVisible } from "../store/reducers/createPanelSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useToggleOptionsPanel(visible, nodeId) {
    const dispatch = useDispatch();

    const func = useCallback(() => {
        dispatch(setVisible(visible));
        dispatch(setNodeId(nodeId));
        dispatch(setCreatePanelVisible(false));
    }, []);

    return func;
}