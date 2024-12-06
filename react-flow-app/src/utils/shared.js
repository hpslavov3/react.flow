import { setVisible } from "../store/reducers/panelSlice"
import { useDispatch } from "react-redux"

const dispatch = useDispatch();

export const openOptionsPanel = () => {
    dispatch(setVisible(true));
}