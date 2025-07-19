import React from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface FilteringGraphProps {
  messageId: string;
}

const FilteringGraph: React.FC<FilteringGraphProps> = ({ messageId }) => {
  const nodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'All Systems\n(1,200+ options)' },
      position: { x: 50, y: 0 },
      style: { 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        width: 140,
        fontSize: '11px',
        textAlign: 'center'
      }
    },
    {
      id: '2',
      data: { label: 'User Profile Filter\n(Windows, MySQL, Apache)' },
      position: { x: 0, y: 80 },
      style: { 
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        border: 'none',
        width: 160,
        fontSize: '11px',
        textAlign: 'center'
      }
    },
    {
      id: '3',
      data: { label: 'Compatibility Check\n(240 compatible)' },
      position: { x: 200, y: 80 },
      style: { 
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        color: 'white',
        border: 'none',
        width: 160,
        fontSize: '11px',
        textAlign: 'center'
      }
    },
    {
      id: '4',
      data: { label: 'Performance Filter\n(85 high-performance)' },
      position: { x: 0, y: 160 },
      style: { 
        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        color: 'white',
        border: 'none',
        width: 160,
        fontSize: '11px',
        textAlign: 'center'
      }
    },
    {
      id: '5',
      data: { label: 'Security Standards\n(42 compliant)' },
      position: { x: 200, y: 160 },
      style: { 
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        color: 'white',
        border: 'none',
        width: 160,
        fontSize: '11px',
        textAlign: 'center'
      }
    },
    {
      id: '6',
      data: { label: 'User Preferences\n(reliability > performance)' },
      position: { x: 100, y: 240 },
      style: { 
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        color: '#333',
        border: 'none',
        width: 160,
        fontSize: '11px',
        textAlign: 'center'
      }
    },
    {
      id: '7',
      type: 'output',
      data: { label: 'Final Recommendations\n(3 optimal solutions)' },
      position: { x: 100, y: 320 },
      style: { 
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        color: '#333',
        border: '2px solid #ff8a65',
        width: 160,
        fontSize: '11px',
        fontWeight: 'bold',
        textAlign: 'center'
      }
    }
  ];

  const edges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 2 }
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 2 }
    },
    {
      id: 'e2-4',
      source: '2',
      target: '4',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#06b6d4', strokeWidth: 2 }
    },
    {
      id: 'e3-5',
      source: '3',
      target: '5',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#06b6d4', strokeWidth: 2 }
    },
    {
      id: 'e4-6',
      source: '4',
      target: '6',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 }
    },
    {
      id: 'e5-6',
      source: '5',
      target: '6',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 }
    },
    {
      id: 'e6-7',
      source: '6',
      target: '7',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#f59e0b', strokeWidth: 3 }
    }
  ];

  return (
    <div className="w-full h-96 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
      >
        <Background color="#e2e8f0" gap={20} />
        <Controls showZoom={false} showFitView={false} showInteractive={false} />
        <MiniMap 
          nodeColor="#8b5cf6"
          nodeStrokeWidth={3}
          pannable={false}
          zoomable={false}
          style={{
            height: 80,
            width: 120,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default FilteringGraph;