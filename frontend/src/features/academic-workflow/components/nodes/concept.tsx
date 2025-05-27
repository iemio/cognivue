import { Handle, NodeProps, Position } from "@xyflow/react";
import { CustomNode } from "../../types";
import { Lightbulb } from "lucide-react";

export const ConceptNode: React.FC<NodeProps<CustomNode>> = ({
    data,
    selected,
}) => (
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
