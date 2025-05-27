import React, { useState, useCallback, useRef } from "react";
import {
    ReactFlow,
    Background,
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType,
    Node,
    Connection,
    OnConnect,
    ReactFlowProvider,
    BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Expand } from "lucide-react";
import { CoreNode } from "./components/nodes/core";
import { ConceptNode } from "./components/nodes/concept";
import { DefinitionNode } from "./components/nodes/definition";
import { ExampleNode } from "./components/nodes/example";
import { QuestionNode } from "./components/nodes/question";
import { CitationNode } from "./components/nodes/citation";
import { FactNode } from "./components/nodes/fact";
import { TopicGroupNode } from "./components/nodes/topic";
import { initialEdges, initialNodes } from "./constants";
import { NoteNode } from "./components/nodes/note";
import { CustomEdge, CustomNode, NodeType, SubConcepts } from "./types";

// Node type mapping
const nodeTypes = {
    core: CoreNode,
    concept: ConceptNode,
    definition: DefinitionNode,
    example: ExampleNode,
    question: QuestionNode,
    citation: CitationNode,
    note: NoteNode,
    fact: FactNode,
    topic_group: TopicGroupNode,
};

type FlowEditorProps = {
    vuespaceId: string;
};

//eslint-disable-next-line @typescript-eslint/no-unused-vars
function CanvasInner({ vuespaceId }: FlowEditorProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [nodeIdCounter, setNodeIdCounter] = useState<number>(11);

    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const onConnect: OnConnect = useCallback(
        (params: Connection) => {
            const edgeWithLabel: CustomEdge = {
                ...params,
                id: `${params.source}-${params.target}`,
                type: "smoothstep",
                label: "related",
                labelStyle: { fontSize: 12, fontWeight: "bold" },
                markerEnd: { type: MarkerType.ArrowClosed },
            };
            setEdges((eds) => addEdge(edgeWithLabel, eds));
        },
        [setEdges]
    );
    const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
        setSelectedNode(node as CustomNode);
        setShowSidebar(true);
    }, []);

    const getNodeExplanation = (nodeType: NodeType): string => {
        const explanations: Record<NodeType, string> = {
            core: "This is a central concept that serves as the foundation for understanding related topics.",
            concept:
                "This represents a key idea or principle that helps build understanding of the broader topic.",
            definition:
                "This provides a clear explanation of what a term or concept means.",
            example:
                "This is a concrete instance that illustrates how the concept applies in practice.",
            question:
                "This represents an inquiry that can deepen understanding of the topic.",
            citation:
                "This is a reference to external source material that supports or explains the concept.",
            note: "This is a personal annotation or reminder related to the concept.",
            fact: "This is a specific piece of information that is definitively true about the concept.",
            topic_group:
                "This groups related concepts together for better organization.",
        };

        return explanations[nodeType];
    };

    const generateSubConcepts = (conceptName: string): string[] => {
        // Simulated AI-generated sub-concepts
        const subConcepts: SubConcepts = {
            "Machine Learning": [
                "Neural Networks",
                "Decision Trees",
                "Support Vector Machines",
            ],
            "Supervised Learning": [
                "Classification",
                "Regression",
                "Cross-validation",
            ],
            "Neural Networks": [
                "Backpropagation",
                "Activation Functions",
                "Layer Architecture",
            ],
            Backpropagation: [
                "Chain Rule",
                "Gradient Computation",
                "Weight Updates",
            ],
        };

        return (
            subConcepts[conceptName] || [
                "Sub-concept 1",
                "Sub-concept 2",
                "Sub-concept 3",
            ]
        );
    };

    const expandNode = (nodeId: string): void => {
        const node = nodes.find((n) => n.id === nodeId);
        if (!node) return;

        const subConcepts = generateSubConcepts(node.data.label);
        const baseX = node.position.x;
        const baseY = node.position.y + 150;

        const newNodes: CustomNode[] = subConcepts.map((concept, index) => ({
            id: `${nodeIdCounter + index}`,
            type: "concept",
            position: { x: baseX + (index - 1) * 200, y: baseY },
            data: { label: concept },
        }));

        const newEdges: CustomEdge[] = newNodes.map((newNode) => ({
            id: `e${nodeId}-${newNode.id}`,
            source: nodeId,
            target: newNode.id,
            type: "smoothstep",
            label: "explains",
            labelStyle: { fontSize: 12, fontWeight: "bold" },
            markerEnd: { type: MarkerType.ArrowClosed },
        }));

        setNodes((nds) => [...nds, ...newNodes]);
        setEdges((eds) => [...eds, ...newEdges]);
        setNodeIdCounter((prev) => prev + subConcepts.length);
    };

    return (
        <main className="flex-1 flex items-stretch">
            <div className="w-full" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
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
                        variant={BackgroundVariant.Dots}
                        gap={20}
                        size={2}
                    />
                </ReactFlow>
            </div>

            {showSidebar && selectedNode && (
                <div className="w-80 bg-white border-l shadow-lg p-4 overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Node Details</h2>
                        <button
                            onClick={() => setShowSidebar(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-gray-700">Type</h3>
                            <span className="text-sm bg-gray-100 px-2 py-1 rounded capitalize">
                                {selectedNode.type}
                            </span>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-700">Label</h3>
                            <p className="text-sm text-gray-600">
                                {selectedNode.data.label}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-700">
                                AI Explanation
                            </h3>
                            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                                {selectedNode.type &&
                                    getNodeExplanation(selectedNode.type)}
                            </p>
                        </div>

                        <button
                            onClick={() => expandNode(selectedNode.id)}
                            className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 flex items-center justify-center gap-2"
                        >
                            <Expand size={16} />
                            Expand with AI
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default function Canvas({ vuespaceId }: FlowEditorProps) {
    return (
        <ReactFlowProvider>
            <CanvasInner vuespaceId={vuespaceId} />
        </ReactFlowProvider>
    );
}
