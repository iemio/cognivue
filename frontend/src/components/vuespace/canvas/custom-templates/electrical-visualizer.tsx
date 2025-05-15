"use client";

import { useRef } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    useNodesState,
    useEdgesState,
    BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import TableNode from "@/components/vuespace/canvas/nodes/table-node";
import SchemaEdge from "@/components/vuespace/canvas/edges/schema-edge";
import { initialNodes, initialEdges } from "@/lib/schema-data";
import BottomPanel from "./common/bottom-panel";
import Toolbar from "./common/toolbar";

// Register custom node types and edge types
const nodeTypes = {
    tableNode: TableNode,
};

const edgeTypes = {
    custom: SchemaEdge,
};

function CanvasInner() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    return (
        <main className="flex-1 flex items-stretch">
            <div className="w-full" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    fitView
                    minZoom={0.5}
                    maxZoom={1}
                    defaultEdgeOptions={{
                        type: "custom",
                        className: "opacity-25",
                    }}
                    style={
                        {
                            "--xy-background-pattern-dots-color-default":
                                "var(--color-border)",
                            "--xy-edge-stroke-width-default": 1.5,
                            "--xy-edge-stroke-default":
                                "var(--color-foreground)",
                            "--xy-edge-stroke-selected-default":
                                "var(--color-foreground)",
                            "--xy-attribution-background-color-default":
                                "transparent",
                        } as React.CSSProperties
                    }
                    // attributionPosition="bottom-left" // you should remove this line if you don't want to show the attribution
                >
                    <Background
                        variant={BackgroundVariant.Lines}
                        gap={10}
                        color="#eee"
                        id="1"
                    />
                    <Background
                        variant={BackgroundVariant.Lines}
                        gap={100}
                        color="#ccc"
                        id="2"
                    />
                    <Toolbar />
                    <BottomPanel />
                </ReactFlow>
            </div>
        </main>
    );
}

export default function Canvas() {
    return (
        <ReactFlowProvider>
            <CanvasInner />
        </ReactFlowProvider>
    );
}
