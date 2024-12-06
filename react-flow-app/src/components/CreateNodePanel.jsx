import { useSelector } from "react-redux"
import '../App.css'
import useToggleCreateNodesPanel from "../hooks/useToggleCreateNodesPanel";
import { useReactFlow } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { addActionNode, addSplitNode } from "../store/reducers/builderSlice";

export const CreateNodePanel = () => {
    const dispatch = useDispatch();
    const flow = useReactFlow();
    const shouldShowPanel = useSelector((state) => state.createNodePanel.visible);
    const edgeId = useSelector((state) => state.createNodePanel.edgeId);

    const xCord = useSelector((state) => state.createNodePanel.x);
    const yCord = useSelector((state) => state.createNodePanel.y);
    const source = useSelector((state)=> state.createNodePanel.source);
    const target = useSelector((state)=> state.createNodePanel.target);

    let { x, y } = flow.screenToFlowPosition({ x: xCord, y: yCord });
    ({ x, y } = flow.flowToScreenPosition({ x: x, y: x }))

    // console.log(`x,y: ${x} ${y}`)

    const closeOptionsPanel = useToggleCreateNodesPanel();
    const style = {
        width: '15rem',
        height: '17rem',
        position: 'absolute',
        top: '15rem',
        right: '3rem',
        border: '1px solid black',
        borderRadius: '30px',
        backgroundColor: "antiquewhite",
        zIndex: 5
    };

    return (<>
        <div id="create-nodes-panel" onClick={() => closeOptionsPanel(false, '', 0, 0)}
            className={shouldShowPanel ? 'block' : 'hidden'}
            style={style}>
              <h3>Create Node Panel</h3>
              <div><strong>Edge Id: </strong>{edgeId}</div>
              <hr></hr>
              <h3>Actions</h3>
            <button
                onClick={(ev) => {
                    dispatch(addActionNode({
                        edgeId: edgeId,
                        source: source,
                        target: target,
                        type: 'def'
                    }))
                }}
            >Add Action Node</button>
            <button
            className="small-margin-top"
                onClick={(ev) => {
                    dispatch(addSplitNode({
                        edgeId: edgeId,
                        source: source,
                        target: target,
                        type: 'splitStart'
                    }))
                }}
            >Add Split Node</button>
        </div>
    </>)
}