import { Handle, NodeProps, Position } from "@xyflow/react";
import { CustomNode } from "../../types";
import { HelpCircle } from "lucide-react";

export const QuestionNode: React.FC<NodeProps<CustomNode>> = ({
    data,
    selected,
}) => (
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
