import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { ReactFlow, Panel, MiniMap, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomEdge from './edges/CustomEdge';
import { useSelector } from 'react-redux';
import { onNodesChange, onEdgesChange, addNewEdge, onConnect } from './store/reducers/builderSlice'
import { useDispatch } from 'react-redux'
import ActionNode from './nodes/ActionNode/ActionNode';
import { StartingNode } from './nodes/InitialNodes/StartingNode';
import { EndNode } from './nodes/InitialNodes/EndNode';
import { OptionsPanel } from './components/OptionsPanel';
import { CreateNodePanel } from './components/CreateNodePanel';
import  SplitStart  from './nodes/Split/SplitStart'
import  SplitEnd  from './nodes/Split/SplitEnd'

const nodeTypes = {
  def: ActionNode,
  endNode: EndNode,
  startingNode: StartingNode,
  splitStart: SplitStart,
  splitEnd: SplitEnd
};

const edgeTypes = {
  'custom': CustomEdge
}


export default function App() {
  const dispatch = useDispatch();

  const nodes = useSelector((state) => state.builder.nodes);
  const edges = useSelector((state) => state.builder.edges);

  const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

  return (
    <div style={{ width: '99vw', height: '99vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={(e) => dispatch(onNodesChange(e))}
        onEdgesChange={(e) => dispatch(onEdgesChange(e))}
        onConnect={(e) => dispatch(onConnect(e))}
        onLoad={onLoad}
        fitView
      >
        <OptionsPanel />
        <CreateNodePanel />
        <Controls position='bottom-left' orientation='horizontal' />
        <MiniMap position='top-left' />
        <Background variant='dots' />
      </ReactFlow>
    </div>
  );
}