"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    useNodesState,
    useEdgesState,
    BackgroundVariant,
    ReactFlowInstance,
    Connection,
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
import { initialEdges, initialNodes } from "../constants";
import ElectricalComponent from "./nodes/electrical-component";
import Bulb from "./nodes/bulb";
import Battery from "./nodes/battery";
import Board from "./nodes/board";
import Wire from "./nodes/wire";
import ConnectionLine from "./nodes/connection-line";
import { v4 as uuid } from "uuid";
import useHistory from "../hooks/useHistory";
import { ElectricalComponentState, ElectricalComponentType } from "../types";
import { isPointInBox, zoomSelector } from "../utils";
import ComponentDetail from "./nodes/component-detail";
import useKeyBindings from "../hooks/useKeyBindings";
import ToolPanel from "./common/toolbar";
import { Button } from "@/components/ui/button";
import { pusher } from "@/lib/config/pusher";
import { API_URL } from "@/lib/api";
// import { useUpdateData } from "../hooks/useUpdateData";

const nodeTypes = {
    electricalComponent: ElectricalComponent,
    bulb: Bulb,
    battery: Battery,
    board: Board,
};

const edgeTypes = {
    wire: Wire,
};

function CanvasInner({ vuespaceId }: FlowEditorProps) {
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
                    color: "#0096FF",
                },
            };
            addEdge(edge);
        },
        [addEdge]
    );

    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const isValidConnection = (connection: Edge | Connection) => {
        const { source, target } = connection;

        if (source === target) return false;
        return true;
    };

    const [selectedNode, setSelectedNode] = useState<Node | undefined>();

    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onNodeClick = (event: React.MouseEvent<Element>, node: Node) => {
        setSelectedNode(node);
        console.log(node);
    };

    const onPaneClick = () => {
        setSelectedNode(undefined);
    };

    const dragOutsideRef = useRef<ElectricalComponentType | null>(null);

    const onDragStart = (
        event: React.DragEvent<HTMLButtonElement>,
        type: ElectricalComponentType
    ) => {
        dragOutsideRef.current = type;
        event.dataTransfer.effectAllowed = "move";
    };
    const onDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { screenToFlowPosition, getIntersectingNodes, setViewport } =
        useReactFlow();

    const onDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        const type = dragOutsideRef.current;

        if (!type) return;

        let position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const boards = nodes?.filter(
            (node) => node.type === ElectricalComponentType.Board
        );
        const board = boards.find((board) => {
            return isPointInBox(
                { x: position.x, y: position.y },
                {
                    x: board.position?.x || 0,
                    y: board?.position?.y || 0,
                    height: board?.measured?.height || 0,
                    width: board?.measured?.width || 0,
                }
            );
        });

        if (board) {
            const { x, y } = board?.position || {
                x: 0,
                y: 0,
            };
            const { x: dragX, y: dragY } = position || {
                x: 0,
                y: 0,
            };
            position = { x: dragX - x, y: dragY - y };
        }

        let node: Node | undefined;
        if (
            [
                ElectricalComponentType.Capacitor,
                ElectricalComponentType.Inductor,
                ElectricalComponentType.Resistor,
            ].includes(type)
        ) {
            node = {
                id: uuid(),
                type: "electricalComponent",
                position,
                data: { type, value: 3 },
                parentId: board?.id,
            };
        } else if (type === ElectricalComponentType.Bulb) {
            node = {
                id: uuid(),
                type,
                position,
                data: { value: 12 },
                parentId: board?.id,
            };
        } else if (type === ElectricalComponentType.Battery) {
            node = {
                id: uuid(),
                type,
                position,
                data: { value: 12 },
                parentId: board?.id,
            };
        } else if (type === ElectricalComponentType.Board) {
            node = {
                id: uuid(),
                type,
                position,
                data: {},
                style: { height: 200, width: 200 },
            };
        }

        if (node) addNode(node);
    };

    // Reconnection of edges start

    const edgeReconnectSuccessful = useRef(false);

    const onReconnectStart = () => {
        edgeReconnectSuccessful.current = false;
    };
    const onReconnect: OnReconnect = (oldEdge, newConnection) => {
        edgeReconnectSuccessful.current = true;
        setEdges((prevEdges) =>
            reconnectEdge(oldEdge, newConnection, prevEdges)
        );
    };
    const onReconnectEnd = (_: MouseEvent | TouchEvent, edge: Edge) => {
        if (!edgeReconnectSuccessful.current) {
            removeEdge(edge);
        }
    };
    // Reconnection of edges end

    // Overlapping nodes start
    const overlappingNodeRef = useRef<Node | null>(null);
    const showContent = useStore(zoomSelector);

    const onNodeDrag: OnNodeDrag = (evt, dragNode) => {
        const overlappingNode = getIntersectingNodes(dragNode)?.[0];
        overlappingNodeRef.current = overlappingNode;

        setNodes((prevNodes) =>
            prevNodes.map((node) => {
                if (node.id === dragNode.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            isDragging: true,
                            state:
                                overlappingNode &&
                                [
                                    ElectricalComponentType.Capacitor,
                                    ElectricalComponentType.Resistor,
                                    ElectricalComponentType.Inductor,
                                ].includes(
                                    overlappingNode?.data
                                        ?.type as ElectricalComponentType
                                )
                                    ? overlappingNode?.data?.type ===
                                      dragNode?.data?.type
                                        ? ElectricalComponentState.Add
                                        : ElectricalComponentState.NotAdd
                                    : undefined,
                        },
                    };
                }
                return node;
            })
        );
    };
    const onNodeDragStop: OnNodeDrag = (evt, dragNode) => {
        if (
            !overlappingNodeRef.current ||
            (overlappingNodeRef?.current?.type !==
                ElectricalComponentType.Board &&
                dragNode?.parentId)
        ) {
            setNodes((prevNodes) => {
                const board = prevNodes?.find(
                    (prevNode) => prevNode.id === dragNode?.parentId
                );

                return prevNodes.map((node) => {
                    if (node.id === dragNode.id) {
                        const { x, y } = board?.position || { x: 0, y: 0 };
                        const { x: dragX, y: dragY } = dragNode?.position || {
                            x: 0,
                            y: 0,
                        };

                        const position = { x: dragX + x, y: dragY + y };

                        return {
                            ...node,
                            position,
                            parentId: undefined,
                            data: { ...node.data, isDragging: false },
                        };
                    }
                    return node;
                });
            });
        }

        if (
            [
                ElectricalComponentType.Capacitor,
                ElectricalComponentType.Resistor,
                ElectricalComponentType.Inductor,
            ].includes(
                overlappingNodeRef?.current?.data
                    ?.type as ElectricalComponentType
            ) &&
            dragNode?.data?.type === overlappingNodeRef?.current?.data?.type
        ) {
            setNodes((prevNodes) =>
                prevNodes
                    .map((node) => {
                        if (node.id === overlappingNodeRef?.current?.id) {
                            return {
                                ...node,
                                data: {
                                    ...node?.data,
                                    value:
                                        (dragNode?.data?.value as number) +
                                        (node?.data?.value as number),
                                },
                            };
                        }
                        return node;
                    })
                    .filter((node) => node.id !== dragNode?.id)
            );
        }

        if (
            overlappingNodeRef?.current?.type === ElectricalComponentType.Board
        ) {
            setNodes((prevNodes) => [
                overlappingNodeRef?.current as Node,
                ...prevNodes
                    .filter(
                        (node) => node.id !== overlappingNodeRef?.current?.id
                    )
                    .map((node) => {
                        if (node.id === dragNode?.id) {
                            const { x, y } = overlappingNodeRef?.current
                                ?.position || {
                                x: 0,
                                y: 0,
                            };
                            const { x: dragX, y: dragY } =
                                dragNode?.position || {
                                    x: 0,
                                    y: 0,
                                };

                            let position;
                            if (!node.parentId) {
                                position = { x: dragX - x, y: dragY - y };
                            } else if (
                                node.parentId &&
                                node?.parentId !==
                                    overlappingNodeRef?.current?.id
                            ) {
                                const prevBoard = prevNodes?.find(
                                    (node) => node?.id === dragNode?.parentId
                                );
                                const { x: prevBoardX, y: prevBoardY } =
                                    prevBoard?.position || {
                                        x: 0,
                                        y: 0,
                                    };
                                position = {
                                    x: dragX + prevBoardX - x,
                                    y: dragY + prevBoardY - y,
                                };
                            }

                            return {
                                ...node,
                                parentId: overlappingNodeRef?.current?.id,
                                ...((!dragNode?.parentId ||
                                    dragNode?.parentId !==
                                        overlappingNodeRef?.current?.id) && {
                                    position,
                                }),
                                draggable: showContent,
                                selectable: showContent,
                                data: {
                                    ...node.data,
                                    visible: showContent,
                                    connectable: showContent,
                                },
                            };
                        }
                        return node;
                    }),
            ]);
        }
    };
    useEffect(() => {
        setNodes((prevNodes) =>
            prevNodes.map((node) => {
                if (node.parentId) {
                    return {
                        ...node,
                        draggable: showContent,
                        selectable: showContent,
                        data: {
                            ...node.data,
                            visible: showContent,
                            connectable: showContent,
                        },
                    };
                }
                return {
                    ...node,
                    ...node,
                    draggable: true,
                    selectable: true,
                    data: {
                        ...node.data,
                        visible: true,
                        connectable: true,
                    },
                };
            })
        );
    }, [showContent]);
    //Overlapping nodes end

    // Key bindings
    useKeyBindings({ removeNode, undo, redo });

    const [rfInstance, setRfInstance] = useState<ReactFlowInstance<
        Node,
        Edge
    > | null>(null);
    // const { mutateAsync: saveFlow, isPending } = useUpdateData();

    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSave = () => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            console.log(flow);
            // saveFlow(flow);
        }
    };

    useEffect(() => {
        const channel = pusher.subscribe(`workflow_${vuespaceId}`);
        channel.bind("graph-updated", (data: { flow: any }) => {
            const { nodes, edges, viewport } = data.flow;
            setNodes(nodes);
            setEdges(edges);
            if (viewport) setViewport(viewport);
        });

        return () => {
            channel.unbind_all();
            pusher.unsubscribe(`workflow_${vuespaceId}`);
        };
    }, [vuespaceId]);

    const { toObject } = useReactFlow();

    const sendChange = async () => {
        const payload = {
            room_id: vuespaceId,
            flow: toObject(), // includes nodes, edges, and viewport
        };

        await fetch(`${API_URL}/workflow/save`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });
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
                    onMoveEnd={sendChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    connectionLineComponent={ConnectionLine} // ideas about valid or invalid connection
                    isValidConnection={isValidConnection}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onNodeClick={onNodeClick}
                    onPaneClick={onPaneClick}
                    onReconnectStart={onReconnectStart}
                    onReconnect={onReconnect}
                    onReconnectEnd={onReconnectEnd}
                    onNodeDrag={onNodeDrag}
                    onNodeDragStop={onNodeDragStop}
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
                    <Background
                        variant={BackgroundVariant.Lines}
                        gap={10}
                        color="#e5e5e5"
                        id="1"
                    />
                    <Background
                        variant={BackgroundVariant.Lines}
                        gap={100}
                        color="#ccc"
                        id="2"
                    />
                    <Panel position="bottom-right">
                        {" "}
                        {selectedNode && (
                            <div className="bg-white border border-gray-300 rounded-xl h-[150px] w-full p-3 mb-12 relative z-[1000]">
                                <ComponentDetail
                                    node={selectedNode}
                                    key={selectedNode.id}
                                />
                            </div>
                        )}
                        <Button aria-label="Save" onClick={onSave} />{" "}
                    </Panel>
                    <ToolPanel onDragStart={onDragStart} />

                    <BottomPanel />
                </ReactFlow>
            </div>
        </main>
    );
}

type FlowEditorProps = {
    vuespaceId: string;
};

export default function Canvas({ vuespaceId }: FlowEditorProps) {
    return (
        <ReactFlowProvider>
            <CanvasInner vuespaceId={vuespaceId} />
        </ReactFlowProvider>
    );
}
