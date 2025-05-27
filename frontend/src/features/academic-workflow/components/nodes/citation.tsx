import { Handle, NodeProps, Position } from "@xyflow/react";
import { CustomNode } from "../../types";
import { ExternalLink, Quote } from "lucide-react";

export const CitationNode: React.FC<NodeProps<CustomNode>> = ({
    data,
    selected,
}) => (
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
