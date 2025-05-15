"use client";

import { useCallback, useRef, useState } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    useNodesState,
    useEdgesState,
    BackgroundVariant,
    ReactFlowInstance,
    Connection,
    ConnectionMode,
    Controls,
    Edge,
    MarkerType,
    Node,
    OnNodeDrag,
    OnReconnect,
    Panel,
    reconnectEdge,
    useReactFlow,
    useStore,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import BottomPanel from "@/components/vuespace/canvas/custom-templates/common/bottom-panel";
import Toolbar from "./common/toolbar";
import { Button } from "@/components/ui/button";
import { initialEdges, initialNodes } from "../constants";
import ElectricalComponent from "./nodes/electricalComponent";
import Bulb from "./nodes/bulb";
import Battery from "./nodes/battery";
import Board from "./nodes/board";
import Wire from "./nodes/wire";
import ConnectionLine from "./nodes/connectionLine";
import { v4 as uuid } from "uuid";
import useHistory from "../hooks/useHistory";
const nodeTypes = {
    electricalComponent: ElectricalComponent,
    bulb: Bulb,
    battery: Battery,
    board: Board,
};

const edgeTypes = {
    wire: Wire,
};

function CanvasInner() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const { addNode, removeNode, addEdge, removeEdge, undo, redo } =
        useHistory();

    const onConnect = useCallback(
        (connection: Connection) => {
            const edge = {
                ...connection,
                type: "wire",
                id: uuid(),
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    color: "#FFC300",
                },
            };
            addEdge(edge);
        },
        [addEdge]
    );

    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const [rfInstance, setRfInstance] = useState<ReactFlowInstance<
        Node,
        Edge
    > | null>(null);

    const onSave = () => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            console.log(flow);
            // saveFlow(flow);
        }
    };
    const isValidConnection = (connection: Edge | Connection) => {
        const { source, target } = connection;

        if (source === target) return false;
        return true;
    };
    const [selectedNode, setSelectedNode] = useState<Node | undefined>();

    const onNodeClick = (event: React.MouseEvent<Element>, node: Node) => {
        setSelectedNode(node);
    };

    const onPaneClick = () => {
        setSelectedNode(undefined);
    };

    return (
        <main className="flex-1 flex items-stretch">
            <div className="w-full" ref={reactFlowWrapper}>
                <ReactFlow
                    onInit={setRfInstance}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    connectionLineComponent={ConnectionLine} // ideas about valid or invalid connection
                    isValidConnection={isValidConnection}
                    fitView
                    minZoom={0.5}
                    maxZoom={1.5}
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
                >
                    {" "}
                    <Background
                        variant={BackgroundVariant.Dots}
                        gap={20}
                        size={2}
                    />
                    <Panel position="bottom-right">
                        {" "}
                        <Button aria-label="Save" onClick={onSave} />{" "}
                    </Panel>
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
