import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
    getStraightPath,
    getSimpleBezierPath,
    getSmoothStepPath,
} from '@xyflow/react';
import useToggleCreateNodesPanel from '../hooks/useToggleCreateNodesPanel';

export default function CustomEdge({ id, ...props }) {
    const [edgePath, labelX, labelY] = getSmoothStepPath({ ...props });
    const openCreateNodesPanel = useToggleCreateNodesPanel();

    return (
        <>
            <BaseEdge id={id} path={edgePath} style={{
                stroke: 'green'
            }} />
            <EdgeLabelRenderer>
                <div id={"wrapper-" + id}>

                    <div style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        borderRadius: '50%',
                        width: '3rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '3rem',
                        pointerEvents: 'all',
                        border: '2px solid whitesmoke',
                        background: '#ffff',
                        fontWeight: 'bold'
                    }} data-id={id} data-source-node={props.source} data-target-node={props.target}
                        onClick={(ev) => {
                            const x = ev.clientX;
                            const y = ev.clientY;
                            openCreateNodesPanel(true, id, x, y, ev.currentTarget.getAttribute('data-source-node'), ev.currentTarget.getAttribute('data-target-node'));
                        }}
                    >+</div>
                </div>

            </EdgeLabelRenderer>
        </>
    );
}
