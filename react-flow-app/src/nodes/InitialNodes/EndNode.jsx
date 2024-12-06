import { Handle, Position } from "@xyflow/react"

export const EndNode = () => {
    return (<>
        <Handle type="target" position={Position.Top} />

        <div style={{
            borderRadius: '50%',
            width: '3rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '3rem',
            pointerEvents: 'all',
            border: '2px solid whitesmoke',
            background: '#ffff',
            fontWeight: 'bold',
            boxShadow: '1px 0px 3px'
        }}>X</div>

    </>)
}