import React, { useState, useCallback, useRef, useEffect } from "react";
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
import {
    Book,
    HelpCircle,
    FileText,
    Lightbulb,
    Quote,
    StickyNote,
    Tag,
    Folder,
    Search,
    Plus,
    MessageCircle,
    Expand,
    ChevronDown,
    ChevronRight,
    ExternalLink,
    Brain,
} from "lucide-react";

// Type definitions
type NodeType =
    | "core"
    | "concept"
    | "definition"
    | "example"
    | "question"
    | "citation"
    | "note"
    | "fact"
    | "topic_group";

type CustomNodeData = {
    label: string;
    expanded?: boolean;
    childCount?: number;
};

type CustomNode = Node<CustomNodeData, NodeType>;

type CustomEdge = Edge & {
    label?: string;
    labelStyle?: React.CSSProperties;
};

interface SubConcepts {
    [key: string]: string[];
}

interface AIResponses {
    [key: string]: string;
}

// Custom Node Components
const CoreNode: React.FC<NodeProps<CustomNode>> = ({ data, selected }) => (
    <div
        className={`px-6 py-4 rounded-lg border-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg ${
            selected ? "ring-2 ring-yellow-400" : ""
        }`}
    >
        <Handle type="target" position={Position.Top} />
        <div className="flex items-center gap-2">
            <Brain size={20} />
            {data.label}
        </div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);

const ConceptNode: React.FC<NodeProps<CustomNode>> = ({ data, selected }) => (
    <div
        className={`px-4 py-3 rounded-xl border bg-gradient-to-r from-green-100 to-blue-100 shadow-md ${
            selected ? "ring-2 ring-yellow-400" : ""
        }`}
    >
        <Handle type="target" position={Position.Top} />
        <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-green-600" />
            <span className="font-medium">{data.label}</span>
        </div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);

const DefinitionNode: React.FC<NodeProps<CustomNode>> = ({
    data,
    selected,
}) => (
    <div
        className={`px-3 py-2 rounded-lg border bg-yellow-50 shadow-sm italic ${
            selected ? "ring-2 ring-yellow-400" : ""
        }`}
    >
        <Handle type="target" position={Position.Top} />
        <div className="flex items-center gap-2">
            <FileText size={14} className="text-yellow-600" />
            <span className="text-sm">{data.label}</span>
        </div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);

const ExampleNode: React.FC<NodeProps<CustomNode>> = ({ data, selected }) => (
    <div
        className={`px-4 py-3 rounded-lg border-2 border-dashed border-orange-300 bg-orange-50 shadow-md ${
            selected ? "ring-2 ring-yellow-400" : ""
        }`}
    >
        <Handle type="target" position={Position.Top} />
        <div className="flex items-center gap-2">
            <Tag size={16} className="text-orange-600" />
            <span className="font-medium text-orange-800">{data.label}</span>
        </div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);

const QuestionNode: React.FC<NodeProps<CustomNode>> = ({ data, selected }) => (
    <div
        className={`px-4 py-3 rounded-full border-2 border-purple-300 bg-purple-50 shadow-md ${
            selected ? "ring-2 ring-yellow-400" : ""
        }`}
    >
        <Handle type="target" position={Position.Top} />
        <div className="flex items-center gap-2">
            <HelpCircle size={16} className="text-purple-600" />
            <span className="text-purple-800">{data.label}</span>
        </div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);

const CitationNode: React.FC<NodeProps<CustomNode>> = ({ data, selected }) => (
    <div
        className={`px-3 py-2 rounded-md border bg-gray-100 shadow-sm ${
            selected ? "ring-2 ring-yellow-400" : ""
        }`}
    >
        <Handle type="target" position={Position.Top} />
        <div className="flex items-center gap-2">
            <Quote size={12} className="text-gray-600" />
            <ExternalLink size={12} className="text-gray-600" />
            <span className="text-xs text-gray-700">{data.label}</span>
        </div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);

const NoteNode: React.FC<NodeProps<CustomNode>> = ({ data, selected }) => (
    <div
        className={`px-3 py-2 rounded-lg border bg-yellow-200 shadow-md transform rotate-1 ${
            selected ? "ring-2 ring-yellow-400" : ""
        }`}
    >
        <Handle type="target" position={Position.Top} />
        <div className="flex items-center gap-2">
            <StickyNote size={14} className="text-yellow-700" />
            <span className="text-xs text-yellow-800">{data.label}</span>
        </div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);

const FactNode: React.FC<NodeProps<CustomNode>> = ({ data, selected }) => (
    <div
        className={`px-3 py-2 transform rotate-45 bg-indigo-100 border border-indigo-300 shadow-md ${
            selected ? "ring-2 ring-yellow-400" : ""
        }`}
    >
        <Handle type="target" position={Position.Top} />
        <div className="transform -rotate-45 flex items-center gap-1">
            <Tag size={12} className="text-indigo-600" />
            <span className="text-xs text-indigo-800">{data.label}</span>
        </div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);

const TopicGroupNode: React.FC<NodeProps<CustomNode>> = ({
    data,
    selected,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(
        data.expanded || false
    );

    return (
        <div
            className={`px-4 py-3 rounded-lg border-2 border-gray-400 bg-gray-50 shadow-lg ${
                selected ? "ring-2 ring-yellow-400" : ""
            }`}
        >
            <Handle type="target" position={Position.Top} />
            <div className="flex items-center gap-2">
                <Folder size={16} className="text-gray-600" />
                <span className="font-medium text-gray-800">{data.label}</span>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="ml-2 hover:bg-gray-200 rounded p-1"
                >
                    {isExpanded ? (
                        <ChevronDown size={14} />
                    ) : (
                        <ChevronRight size={14} />
                    )}
                </button>
            </div>
            {isExpanded && (
                <div className="mt-2 text-xs text-gray-600">
                    {data.childCount || 0} items
                </div>
            )}
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

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

// Initial nodes and edges
const initialNodes: CustomNode[] = [
    {
        id: "1",
        type: "core",
        position: { x: 400, y: 50 },
        data: { label: "Machine Learning" },
    },
    {
        id: "2",
        type: "concept",
        position: { x: 200, y: 200 },
        data: { label: "Supervised Learning" },
    },
    {
        id: "3",
        type: "concept",
        position: { x: 600, y: 200 },
        data: { label: "Unsupervised Learning" },
    },
    {
        id: "4",
        type: "definition",
        position: { x: 400, y: 350 },
        data: {
            label: "Overfitting: Model performs well on training data but poorly on new data",
        },
    },
    {
        id: "5",
        type: "example",
        position: { x: 100, y: 350 },
        data: { label: "Spam Detection in Gmail" },
    },
    {
        id: "6",
        type: "question",
        position: { x: 700, y: 350 },
        data: { label: "Why is overfitting bad?" },
    },
    {
        id: "7",
        type: "citation",
        position: { x: 300, y: 500 },
        data: { label: "(Bishop, Pattern Recognition, 2006)" },
    },
    {
        id: "8",
        type: "note",
        position: { x: 500, y: 500 },
        data: { label: "Need to study regularization" },
    },
    {
        id: "9",
        type: "fact",
        position: { x: 600, y: 500 },
        data: { label: "Gradient descent updates weights" },
    },
    {
        id: "10",
        type: "topic_group",
        position: { x: 50, y: 50 },
        data: { label: "Types of Learning", childCount: 3 },
    },
];

const initialEdges: CustomEdge[] = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        type: "smoothstep",
        label: "includes",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e1-3",
        source: "1",
        target: "3",
        type: "smoothstep",
        label: "includes",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e2-4",
        source: "2",
        target: "4",
        type: "smoothstep",
        label: "explains",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e2-5",
        source: "2",
        target: "5",
        type: "smoothstep",
        label: "example of",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e4-6",
        source: "4",
        target: "6",
        type: "smoothstep",
        label: "answers",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e4-7",
        source: "4",
        target: "7",
        type: "smoothstep",
        label: "source",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e10-2",
        source: "10",
        target: "2",
        type: "smoothstep",
        label: "contains",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
];

type FlowEditorProps = {
    vuespaceId: string;
};

function CanvasInner({ vuespaceId }: FlowEditorProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [chatQuery, setChatQuery] = useState<string>("");
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [nodeIdCounter, setNodeIdCounter] = useState<number>(11);

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

    const handleSearch = (): void => {
        // Simulated semantic search - highlight relevant nodes
        const matchingNodes = nodes.filter((node) =>
            node.data.label.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setNodes((nds) =>
            nds.map((node) => ({
                ...node,
                style: matchingNodes.includes(node)
                    ? {
                          ...node.style,
                          background: "#fef3c7",
                          border: "2px solid #f59e0b",
                      }
                    : {
                          ...node.style,
                          background: undefined,
                          border: undefined,
                      },
            }))
        );
    };

    const handleChatQuery = (): void => {
        // Simulated AI response
        const responses: AIResponses = {
            overfitting:
                "Overfitting occurs when a model learns the training data too well, including noise and random fluctuations. This leads to poor generalization on new, unseen data.",
            "cnn vs rnn":
                "CNNs (Convolutional Neural Networks) are designed for spatial data like images, using convolution operations. RNNs (Recurrent Neural Networks) are designed for sequential data like text or time series.",
            "gradient descent":
                "Gradient descent is an optimization algorithm that iteratively adjusts model parameters in the direction that minimizes the loss function.",
        };

        const lowerQuery = chatQuery.toLowerCase();
        let response =
            "I can help explain concepts in your knowledge map. Try asking about specific topics!";

        for (const [key, value] of Object.entries(responses)) {
            if (lowerQuery.includes(key)) {
                response = value;
                break;
            }
        }

        alert(response); // In a real app, this would be a proper chat interface
    };

    const addNode = (type: NodeType): void => {
        const newNode: CustomNode = {
            id: `${nodeIdCounter}`,
            type: type,
            position: { x: 400, y: 300 },
            data: { label: `New ${type}` },
        };

        setNodes((nds) => [...nds, newNode]);
        setNodeIdCounter((prev) => prev + 1);
    };

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

    const getNodeColor = (nodeType: string): string => {
        const colors: Record<string, string> = {
            core: "#3b82f6",
            concept: "#10b981",
            definition: "#f59e0b",
            example: "#f97316",
            question: "#8b5cf6",
            citation: "#6b7280",
            note: "#eab308",
            fact: "#6366f1",
            topic_group: "#9ca3af",
        };

        return colors[nodeType] || "#6b7280";
    };

    return (
        <div className="h-screen flex">
            {/* Main Flow Area */}
            <div className="flex-1 relative">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-white shadow-md p-4 flex items-center gap-4">
                    <h1 className="text-xl font-bold text-gray-800">
                        Academic Knowledge Workflow
                    </h1>

                    {/* Search */}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Semantic search..."
                            value={searchQuery}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setSearchQuery(e.target.value)}
                            className="px-3 py-1 border rounded-md text-sm"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-1"
                        >
                            <Search size={14} />
                        </button>
                    </div>

                    {/* Chat */}
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Ask about concepts..."
                            value={chatQuery}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setChatQuery(e.target.value)}
                            className="px-3 py-1 border rounded-md text-sm"
                        />
                        <button
                            onClick={handleChatQuery}
                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-1"
                        >
                            <MessageCircle size={14} />
                        </button>
                    </div>

                    {/* Add Node Dropdown */}
                    <div className="relative">
                        <select
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                            ) => {
                                const value = e.target.value as NodeType;
                                if (value) addNode(value);
                            }}
                            className="px-3 py-1 border rounded-md text-sm"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Add Node
                            </option>
                            <option value="core">Core Topic</option>
                            <option value="concept">Concept</option>
                            <option value="definition">Definition</option>
                            <option value="example">Example</option>
                            <option value="question">Question</option>
                            <option value="citation">Citation</option>
                            <option value="note">Note</option>
                            <option value="fact">Fact</option>
                            <option value="topic_group">Topic Group</option>
                        </select>
                    </div>
                </div>

                {/* React Flow */}
                <div className="h-full pt-16 mt-50">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        nodeTypes={nodeTypes}
                        fitView
                        className="bg-gray-50"
                    >
                        <Background color="#e5e7eb" gap={20} />
                        <Controls />
                        <MiniMap
                            nodeColor={(node: Node) =>
                                getNodeColor(node.type || "default")
                            }
                        />
                    </ReactFlow>
                </div>
            </div>

            {/* Sidebar */}
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
        </div>
    );
}

export default function Canvas({ vuespaceId }: FlowEditorProps) {
    return (
        <ReactFlowProvider>
            <CanvasInner vuespaceId={vuespaceId} />
        </ReactFlowProvider>
    );
}
