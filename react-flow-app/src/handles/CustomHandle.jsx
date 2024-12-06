import React from "react";
import { Handle, useHandleConnections } from "@xyflow/react";

const CustomHandle = (props) => {
    const connections = useHandleConnections({type: props.type});

    return (
        <>
            <Handle id={props.id} type={props.type} position={props.position} isConnectable={true} />
        </>
    )
}

export default CustomHandle;