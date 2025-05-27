import { Handle, NodeProps, Position } from "@xyflow/react";
import { CustomNode } from "../../types";
import { FileText } from "lucide-react";

export const DefinitionNode: React.FC<NodeProps<CustomNode>> = ({
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
