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
      data: { 
        label: (
          <div className="text-center">
            <div className="font-semibold text-sm">All Systems</div>
            <div className="text-xs opacity-90">1,200+ options</div>
          </div>
        )
      },
      position: { x: 180, y: 0 },
      style: { 
        background: 'hsl(var(--primary))',
        color: 'hsl(var(--primary-foreground))',
        border: 'none',
        borderRadius: '12px',
        width: 180,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px hsl(var(--primary) / 0.25)'
      }
    },
    {
      id: '2',
      data: { 
        label: (
          <div className="text-center">
            <div className="font-medium text-sm">User Profile Filter</div>
            <div className="text-xs opacity-80 mt-1">Windows, MySQL, Apache</div>
          </div>
        )
      },
      position: { x: 50, y: 120 },
      style: { 
        background: 'hsl(var(--secondary))',
        color: 'hsl(var(--secondary-foreground))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '10px',
        width: 170,
        height: 55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px hsl(var(--muted) / 0.2)'
      }
    },
    {
      id: '3',
      data: { 
        label: (
          <div className="text-center">
            <div className="font-medium text-sm">Compatibility Check</div>
            <div className="text-xs opacity-80 mt-1">240 compatible</div>
          </div>
        )
      },
      position: { x: 270, y: 120 },
      style: { 
        background: 'hsl(var(--accent))',
        color: 'hsl(var(--accent-foreground))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '10px',
        width: 170,
        height: 55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px hsl(var(--muted) / 0.2)'
      }
    },
    {
      id: '4',
      data: { 
        label: (
          <div className="text-center">
            <div className="font-medium text-sm">Performance Filter</div>
            <div className="text-xs opacity-80 mt-1">85 high-performance</div>
          </div>
        )
      },
      position: { x: 50, y: 220 },
      style: { 
        background: 'hsl(var(--muted))',
        color: 'hsl(var(--muted-foreground))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '10px',
        width: 170,
        height: 55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px hsl(var(--muted) / 0.15)'
      }
    },
    {
      id: '5',
      data: { 
        label: (
          <div className="text-center">
            <div className="font-medium text-sm">Security Standards</div>
            <div className="text-xs opacity-80 mt-1">42 compliant</div>
          </div>
        )
      },
      position: { x: 270, y: 220 },
      style: { 
        background: 'hsl(var(--muted))',
        color: 'hsl(var(--muted-foreground))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '10px',
        width: 170,
        height: 55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px hsl(var(--muted) / 0.15)'
      }
    },
    {
      id: '6',
      data: { 
        label: (
          <div className="text-center">
            <div className="font-medium text-sm">User Preferences</div>
            <div className="text-xs opacity-80 mt-1">reliability &gt; performance</div>
          </div>
        )
      },
      position: { x: 160, y: 320 },
      style: { 
        background: 'hsl(var(--card))',
        color: 'hsl(var(--card-foreground))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '10px',
        width: 170,
        height: 55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 6px hsl(var(--muted) / 0.1)'
      }
    },
    {
      id: '7',
      type: 'output',
      data: { 
        label: (
          <div className="text-center">
            <div className="font-semibold text-sm">Final Recommendations</div>
            <div className="text-xs opacity-90 mt-1">3 optimal solutions</div>
          </div>
        )
      },
      position: { x: 160, y: 420 },
      style: { 
        background: 'hsl(var(--primary))',
        color: 'hsl(var(--primary-foreground))',
        border: '2px solid hsl(var(--primary) / 0.8)',
        borderRadius: '12px',
        width: 180,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 16px hsl(var(--primary) / 0.3)'
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
      style: { stroke: 'hsl(var(--primary))', strokeWidth: 2.5 }
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--primary))', strokeWidth: 2.5 }
    },
    {
      id: 'e2-4',
      source: '2',
      target: '4',
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2 }
    },
    {
      id: 'e3-5',
      source: '3',
      target: '5',
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2 }
    },
    {
      id: 'e4-6',
      source: '4',
      target: '6',
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--accent))', strokeWidth: 2 }
    },
    {
      id: 'e5-6',
      source: '5',
      target: '6',
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--accent))', strokeWidth: 2 }
    },
    {
      id: 'e6-7',
      source: '6',
      target: '7',
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'hsl(var(--primary))', strokeWidth: 3 }
    }
  ];

  return (
    <div className="w-full h-80 bg-gradient-to-br from-background via-muted/30 to-background rounded-xl border shadow-lg overflow-hidden">
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
        className="bg-transparent"
      >
        <Background 
          color="hsl(var(--border))" 
          gap={24} 
          size={1}
        />
        <MiniMap 
          nodeColor="hsl(var(--primary))"
          nodeStrokeWidth={2}
          pannable={false}
          zoomable={false}
          style={{
            height: 90,
            width: 140,
            backgroundColor: 'hsl(var(--background) / 0.95)',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default FilteringGraph;