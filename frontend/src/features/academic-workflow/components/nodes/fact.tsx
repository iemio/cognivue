import { Handle, NodeProps, Position } from "@xyflow/react";
import { CustomNode } from "../../types";
import { Tag } from "lucide-react";

export const FactNode: React.FC<NodeProps<CustomNode>> = ({
    data,
    selected,
}) => (
    <div
        className={`px-3 py-2 bg-indigo-100 border border-indigo-300 shadow-md ${
            selected ? "ring-2 ring-yellow-400" : ""
        }`}
    >
        <Handle type="target" position={Position.Top} />
        <div className="flex items-center gap-1">
            <Tag size={12} className="text-indigo-600" />
            <span className="text-xs text-indigo-800">{data.label}</span>
        </div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);
