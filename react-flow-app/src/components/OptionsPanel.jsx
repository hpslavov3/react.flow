import { useDispatch, useSelector } from "react-redux"
import '../App.css'
import useToggleOptionsPanel from "../hooks/useToggleOptionsPanel";
import { addNewSplitBranch } from "../store/reducers/builderSlice";


export const OptionsPanel = () => {
    const dispatch = useDispatch();
    const shouldShowPanel = useSelector((state) => state.panel.visible);
    const nodeId = useSelector((state) => state.panel.nodeId);
    const node = useSelector((state) => state.builder.nodes.find(n => n.id == nodeId));

    const closeOptionsPanel = useToggleOptionsPanel(false, nodeId);

    const style = {
        width: '17rem',
        height: '10rem',
        position: 'absolute',
        top: '15rem',
        right: '3rem',
        border: '1px solid black',
        borderRadius: '30px',
        backgroundColor: "antiquewhite",
        zIndex: 5
    };

    const splitOptions = <div><button onClick={() => dispatch(addNewSplitBranch(node))}>Add Branch</button></div>
    const content = node?.type == 'splitStart' ? splitOptions : '' 

    return (<>
        <div id="options-panel" onClick={closeOptionsPanel}
            className={shouldShowPanel ? 'block' : 'hidden'}
            style={style}>
                <h3>Node Options Panel</h3>
                <div><strong>Node Id:</strong>{nodeId}</div>
                {content}
        </div>
    </>)
}