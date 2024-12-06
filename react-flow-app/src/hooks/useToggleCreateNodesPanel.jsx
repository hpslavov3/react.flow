import { useCallback } from "react";
import { setVisible, setEdgeId, setX, setY, setSource, setTarget } from "../store/reducers/createPanelSlice";
import { setVisible as setOptionsPanelVisible } from '../store/reducers/panelSlice';
import { useDispatch } from "react-redux";

export default function useToggleCreateNodesPanel() {
    const dispatch = useDispatch();

    const func = (visible, nodeId, x, y, source, target) => {
        dispatch(setVisible(visible));
        dispatch(setEdgeId(nodeId));
        dispatch(setX(x));
        dispatch(setY(y));
        dispatch(setSource(source));
        dispatch(setTarget(target));
        dispatch(setOptionsPanelVisible(false));
    };

    return func;
}