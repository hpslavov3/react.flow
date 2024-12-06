import { applyEdgeChanges, applyNodeChanges, addEdge } from "@xyflow/react";
import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { useCallback } from "react";
import * as _ from 'lodash';

const handleNodeCreate = (data) => {
    return { id: nanoid(6), type: data.type, position: data.position, data: data?.data };
};

const useStore = create((set, get) => ({

    nodes: [
        {
            id: 'node-1',
            type: 'default',
            position: { x: 0, y: 0 },
            data: { label: 'Start' },
        },
        {
            id: 'node-2',
            type: 'output',
            targetPosition: 'top',
            position: { x: 0, y: 200 },
            data: { label: 'End' },
        }
    ],

    edges: [
        { id: 'a->b', type: 'custom', source: 'node-1', target: 'node-2' },
    ],


    onNodesChange(changes) {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        })
    },


    onEdgeChanges(changes) {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        })
    },

    addEdge(data) {
        data.customProp = true
        set({ edges: addEdge({ id: nanoid(6), ...data, type: "custom" }, get().edges) });
    },

    updateNode(id, data) {
        set({
            nodes: get().nodes.map(node =>
                node.id === id
                    ? { ...node, data: { ...node.data, ...data } }
                    : node
            )
        });
    },

    removeNodes(nodes) {
        for (const { id } of nodes) {
            nodes.filter(n => n.id != id);
        }
    },

    createNode(type, data) {
        const id = nanoid(6);

        switch (type) {
            case 'osc': {

                const data = data.data || { frequency: 440, type: 'sine' };
                const position = data.position || { x: 0, y: 0 };

                set({ nodes: [...get().nodes, { id, data, type, position }] });

                break;
            }

            case 'gain': {

                const data = data.data || {};
                const position = data.position || { x: 0, y: 0 };

                set({ nodes: [...get().nodes, { id, data, type, position }] });

                break;
            }
            case 'default': {

                const target = get().nodes.find(n => n.id == data.target);
                

                const node = {
                    id, type,
                    position: { x:target.position.x, y: target.position.y },
                    data: {
                        label:
                            <div data-id={id} data-source-node={data.source} data-target-node={data.target} data-source-edge-id={data.edgeId}>Default Node
                                <div>Source: {data.source}</div>
                                <div>Id: {id}</div>
                                <div>SourceEdgeId: {data.edgeId}</div>
                                <div>Target: {data.target}</div>
                            </div>
                    }
                };

                set({ nodes: [...get().nodes, node] });
                const edgeDataSource = { source: data.source, target: node.id }
                const edgeDataTarget = { source: node.id, target: data.target }
                set({ edges: addEdge({ id: nanoid(6), ...edgeDataSource, type: "custom" }, get().edges) });
                set({ edges: addEdge({ id: nanoid(6), ...edgeDataTarget, type: "custom" }, get().edges) });


                target.position.y += 350 

                const targetNodeIndex = get().nodes.findIndex(n => n.id == target.id);
                const duplicatedTargetNode = _.cloneDeep(target);
                get().nodes.splice(targetNodeIndex, 1)
                set({ nodes: [...get().nodes, duplicatedTargetNode] });


                const edgeIdIndex = get().edges.findIndex((e) => e.id == data.edgeId);
                get().edges.splice(edgeIdIndex, 1)
                set({ edges: get().edges })

                break;
            }
            case 'input': {
                const node = { id, type, position: { x: 0, y: 0 }, data: data?.data || { label: <div>Input Node</div> } };

                set({ nodes: [...get().nodes, node] });

                break;

            }
            case 'output': {
                const node = { id, type, position: { x: 0, y: 0 }, data: data?.data || { label: <div>Output Node</div> } };

                set({ nodes: [...get().nodes, node] });

                break;
            }
            case 'group': {
                const node = { id, type, position: { x: 0, y: 0 }, data: { label: <div>Group Node</div> } };

                set({ nodes: [...get().nodes, node] });

                break;
            }
            case 'textUpdater': {

                set({ nodes: [...get().nodes, handleNodeCreate({ id, type, position: { x: 0, y: 0 }, data: {} })] });

                break;
            }
        }
    }


}));


export default useStore;