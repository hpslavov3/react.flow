import { Handle, Position } from "@xyflow/react";
import CustomHandle from "../../handles/CustomHandle";

const SplitEnd = (props) => {
    const data = props.data;

    return (
        <>
            <CustomHandle type="target" position={Position.Right} id="rightHandle" />
            <CustomHandle type="target" position={Position.Right} id="topRightHandle" />
            <div
                className="rhombus"
                data-id={props.id}
                data-source-node={data?.source}
                data-target-node={data?.target}
                data-source-edge-id={data?.edgeId}>End
                <div>Source: {data?.source}</div>
                <div><strong>Id: {props.id}</strong></div>
            </div>

            <CustomHandle type="target" position={Position.Left} id="leftHandle" />
            <CustomHandle type="source" position={Position.Bottom} id="bottomHandle" />

        </>)
}

export default SplitEnd;