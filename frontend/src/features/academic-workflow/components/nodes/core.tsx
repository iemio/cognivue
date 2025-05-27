import { Handle, NodeProps, Position } from "@xyflow/react";
import { CustomNode } from "../../types";
import { Brain } from "lucide-react";

export const CoreNode: React.FC<NodeProps<CustomNode>> = ({
    data,
    selected,
}) => (
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
