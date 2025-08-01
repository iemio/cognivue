import { Handle, NodeProps, Position } from "@xyflow/react";
import { CustomNode } from "../../types";
import { Tag } from "lucide-react";

export const ExampleNode: React.FC<NodeProps<CustomNode>> = ({
    data,
    selected,
}) => (
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
