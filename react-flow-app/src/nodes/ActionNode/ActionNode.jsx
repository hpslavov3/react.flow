import { Handle, Position } from "@xyflow/react";
import useToggleOptionsPanel from "../../hooks/useToggleOptionsPanel";



const ActionNode = (props) => {
    const data = props.data;
    const openOptionsPanel = useToggleOptionsPanel(true, props.id);

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div
                className="react-flow__node-default"
                data-id={props.id}
                data-source-node={data.source}
                data-target-node={data.target}
                data-source-edge-id={data.edgeId}>Action Node
                <div>Source: {data.source}</div>
                <div><strong>Id: {props.id}</strong></div>
                <div>Target: {data.target}</div>
                <button onClick={openOptionsPanel} >Options</button>
            </div>
            <Handle type="source" position={Position.Bottom} />

        </>)
}

export default ActionNode;