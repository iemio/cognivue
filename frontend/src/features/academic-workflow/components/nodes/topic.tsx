import { Handle, NodeProps, Position } from "@xyflow/react";
import { CustomNode } from "../../types";
import { useState } from "react";
import { ChevronDown, ChevronRight, Folder } from "lucide-react";

export const TopicGroupNode: React.FC<NodeProps<CustomNode>> = ({
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
