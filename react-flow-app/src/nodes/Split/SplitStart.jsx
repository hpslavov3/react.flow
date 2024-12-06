import { Handle, Position } from "@xyflow/react";
import useToggleOptionsPanel from "../../hooks/useToggleOptionsPanel";
import CustomHandle from "../../handles/CustomHandle";

const SplitStart = (props) => {
    const data = props.data;
    const openOptionsPanel = useToggleOptionsPanel(true, props.id);

    return (
        <>
            <CustomHandle type="target" position={Position.top} id="topHandle" />
            <CustomHandle type="source" position={Position.Right} id="rightHandle" />
            <div
                className="rhombus"
                data-id={props.id}
                data-source-node={data?.source}
                data-target-node={data?.target}
                data-source-edge-id={data?.edgeId}>Start
                <div><strong>Id: {props.id}</strong></div>
                <button onClick={openOptionsPanel} >Options</button>
            </div>
            <CustomHandle type="source" position={Position.Left} id="leftHandle" />


        </>)
}

export default SplitStart;