import { createSlice, nanoid } from "@reduxjs/toolkit";
import { addEdge, applyEdgeChanges, applyNodeChanges, getIncomers, getOutgoers, getConnectedEdges } from "@xyflow/react";
import * as _ from 'lodash';

const initialState = {
    nodes: [
        {
            id: 'node-1',
            type: 'startingNode',
            position: { x: 0, y: 0 },
            data: { label: 'Start' },
        },
        {
            id: 'node-2',
            type: 'endNode',
            targetPosition: 'top',
            position: { x: 0, y: 200 },
            data: { label: 'End' },
        }
    ],
    edges: [
        { id: 'a->b', type: 'custom', source: 'node-1', target: 'node-2' },
    ],
    buildStepY: 350,
    buildStepX: 60
}

export const builderSlice = createSlice({
    name: 'builder',
    initialState,
    reducers: {
        onNodesChange: (state, changes) => {
            state.nodes = applyNodeChanges(changes.payload, state.nodes);
        },

        onEdgesChange: (state, changes) => {
            state.edges = applyEdgeChanges(changes.payload, state.edges);
        },

        addNode: (state, action) => {
            state.nodes = [...state.nodes, action.payload];
        },

        removeNodeByIndex: (state, action) => {
            state.nodes.splice(action.payload, 1);
        },

        addNewEdge: (state, action) => {
            state.edges = addEdge(action.payload, state.edges);
        },

        removeEdgeByIndex: (state, action) => {
            state.edges.splice(action.payload, 1);
        },

        onConnect: (state, action) => {
            state.edges = addEdge(action.payload, state.edges);
        }

    }
});

export const {
    onNodesChange,
    onEdgesChange,
    addNewEdge,
    onConnect,
    addNode,
    removeNodeByIndex,
    removeEdgeByIndex
} = builderSlice.actions;

const updateNodesPosition = (sourceEdge) => {
    return (dispatch, getState) => {
        const initialTargetNode = getState().builder.nodes.find(n => n.id == sourceEdge.target);
        const queue = [initialTargetNode];
        const nodesToRecalculate = [];

        while (queue.length > 0) {
            const node = queue.pop();
            const targetNode = getState().builder.nodes.find(n => n.id == node.data.target);
            if (targetNode) {
                queue.push(targetNode);
                nodesToRecalculate.push(targetNode);
            }
        }

        nodesToRecalculate.forEach(n => {
            const currentClone = _.cloneDeep(n);
            currentClone.position.y += getState().builder.buildStepY;
            const currentNodeIndex = getState().builder.nodes.findIndex(n1 => n1.id == n.id);
            dispatch(removeNodeByIndex(currentNodeIndex));
            dispatch(addNode(currentClone));
        });
    }
}

export const addActionNode = (nodeData) => {
    const { edgeId, source, target, type } = nodeData;

    return (dispatch, getState) => {
        const sourceNode = getState().builder.nodes.find(n => n.id == source);
        const targetNode = getState().builder.nodes.find(n => n.id == target);
        const yStep = getState().builder.buildStepY;
        const xPositionStep = getState().builder.buildStepX;
        const selectedEdgeId = getState().createNodePanel.edgeId;
        const currentNodeEdges = getConnectedEdges([sourceNode], getState().builder.edges);
        const selectedEdge = currentNodeEdges.find(h => h.id == selectedEdgeId);


        /**
         * Create new node
         */
        const node = {
            id: nanoid(5),
            type: type,
            position: { x: sourceNode.type == 'startingNode' ? sourceNode.position.x - xPositionStep : sourceNode.position.x, y: targetNode.position.y },
            data: { label: 'Action Node', target: targetNode.id, source }
        };
        const edgeSource = { id: nanoid(5), source, target: node.id, type: 'custom' };
        const edgeTarget = { id: nanoid(5), source: node.id, target, type: 'custom' };

        edgeSource.sourceHandle = selectedEdge.sourceHandle;
        edgeTarget.targetHandle = selectedEdge.targetHandle;

        dispatch(addNode(node));
        dispatch(addNewEdge(edgeSource));
        dispatch(addNewEdge(edgeTarget));


        /**
         * Clone source node and remove original - Updating edges
         */
        const duplicatedSourceNode = _.cloneDeep(sourceNode);
        duplicatedSourceNode.data.targetEdge = edgeSource;
        duplicatedSourceNode.data.target = node.id

        const sourceNodeIndex = getState().builder.nodes.findIndex(n => n.id == source);
        dispatch(removeNodeByIndex(sourceNodeIndex));
        dispatch(addNode(duplicatedSourceNode));


        /**
         * Clone target node and remove original - Updating edges & position
         */
        const duplicatedTargetNode = _.cloneDeep(targetNode);
        duplicatedTargetNode.data.sourceEdge = edgeTarget;
        duplicatedTargetNode.data.source = node.id;
        duplicatedTargetNode.position.y += yStep;

        const targetNodeIndex = getState().builder.nodes.findIndex(n => n.id == target);
        dispatch(removeNodeByIndex(targetNodeIndex));
        dispatch(addNode(duplicatedTargetNode));


        /**
         * Remove original Edge
         */
        const edgeIdIndex = getState().builder.edges.findIndex(e => e.id == edgeId);
        dispatch(removeEdgeByIndex(edgeIdIndex));

        if (duplicatedTargetNode.data.target) {
            dispatch(updateNodesPosition(selectedEdge))
        }
    }
}

export const addSplitNode = (nodeData) => {
    const { edgeId, source, target, type } = nodeData;

    return (dispatch, getState) => {
        const sourceNode = getState().builder.nodes.find(n => n.id == source);
        const targetNode = getState().builder.nodes.find(n => n.id == target);
        const yStep = getState().builder.buildStepY;
        const xPositionStep = getState().builder.buildStepX;
        const selectedEdgeId = getState().createNodePanel.edgeId;
        const currentNodeEdges = getConnectedEdges([sourceNode], getState().builder.edges);
        const selectedEdge = currentNodeEdges.find(h => h.id == selectedEdgeId);

        /**
         * Create new node
         */
        const nodeStart = {
            id: nanoid(5),
            type: type,
            position: { x: sourceNode.type == 'startingNode' ? sourceNode.position.x - xPositionStep : sourceNode.position.x, y: targetNode.position.y },
            data: { label: 'Split Node', source }
        };

        /**
        * SplitStart connection to previous node
        */
        const edgeSource = { id: nanoid(5), source, target: nodeStart.id, type: 'custom', targetHandle: 'topHandle' };

        const nodeEnd = {
            id: nanoid(5),
            type: 'splitEnd',
            position: { x: sourceNode.type == 'startingNode' ? sourceNode.position.x - xPositionStep : sourceNode.position.x, y: targetNode.position.y + yStep },
            data: { label: 'Split Node', target: targetNode.id, source: nodeStart.id }
        };

        nodeStart.data.endNode = nodeEnd.id;
        nodeStart.data.target = nodeEnd.id;
        nodeEnd.data.startNode = nodeStart.id;

        /**
        * SplitStart - connections to the end node
        */
        const leftHandleSourceEdge = { id: nanoid(5), source: nodeStart.id, target: nodeEnd.id, type: 'custom', sourceHandle: 'leftHandle', targetHandle: 'leftHandle' };
        const rightHandleSourceEdge = { id: nanoid(5), source: nodeStart.id, target: nodeEnd.id, type: 'custom', sourceHandle: 'rightHandle', targetHandle: 'rightHandle' };

        /**
         * SplitStart - connection edge to the target node
         */
        const edgeTarget = { id: nanoid(5), source: nodeEnd.id, target, type: 'custom', sourceHandle: 'bottomHandle' };


        edgeSource.sourceHandle = selectedEdge.sourceHandle;
        edgeTarget.targetHandle = selectedEdge.targetHandle;

        dispatch(addNode(nodeStart));
        dispatch(addNode(nodeEnd));
        dispatch(addNewEdge(leftHandleSourceEdge));
        dispatch(addNewEdge(rightHandleSourceEdge));
        dispatch(addNewEdge(edgeSource));
        dispatch(addNewEdge(edgeTarget));


        /**
         * Clone source node and remove original - Updating edges
         */
        const duplicatedSourceNode = _.cloneDeep(sourceNode);
        duplicatedSourceNode.data.targetEdge = edgeSource;
        duplicatedSourceNode.data.target = nodeStart.id
        const sourceNodeIndex = getState().builder.nodes.findIndex(n => n.id == source);
        dispatch(removeNodeByIndex(sourceNodeIndex));
        dispatch(addNode(duplicatedSourceNode));


        /**
         * Clone target node and remove original - Updating edges & position
         */
        const duplicatedTargetNode = _.cloneDeep(targetNode);
        duplicatedTargetNode.data.sourceEdge = edgeTarget;
        duplicatedTargetNode.data.source = nodeEnd.id;
        if (!duplicatedTargetNode.data.target) {
            duplicatedTargetNode.position.y += 2 * yStep;
        }
        const targetNodeIndex = getState().builder.nodes.findIndex(n => n.id == target);
        dispatch(removeNodeByIndex(targetNodeIndex));
        dispatch(addNode(duplicatedTargetNode));


        /**
         * Remove original Edge
         */
        const edgeIdIndex = getState().builder.edges.findIndex(e => e.id == edgeId);
        dispatch(removeEdgeByIndex(edgeIdIndex));

        if (duplicatedTargetNode.data.target) {
            dispatch(updateNodesPosition(selectedEdge))
        }
    }
}

export const addNewSplitBranch = (nodeData) => {
    return (dispatch, getState) => {
        const node = nodeData;
        debugger
        const edge = { id: nanoid(5), source: node.id, target: node.data.endNode, type: 'custom', sourceHandle: 'rightHandle', targetHandle: 'rightHandle' };
        dispatch(addNewEdge(edge));
    }
}

export default builderSlice.reducer;