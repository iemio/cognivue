import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    Handle,
    Position,
    MarkerType,
    Node,
    Edge,
    Connection,
    NodeProps,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
export type NodeType =
    | "core"
    | "concept"
    | "definition"
    | "example"
    | "question"
    | "citation"
    | "note"
    | "fact"
    | "topic_group";

export type CustomNodeData = {
    label: string;
    expanded?: boolean;
    childCount?: number;
};

export type CustomNode = Node<CustomNodeData, NodeType>;

export type CustomEdge = Edge & {
    label?: string;
    labelStyle?: React.CSSProperties;
};

export interface SubConcepts {
    [key: string]: string[];
}

export interface AIResponses {
    [key: string]: string;
}
