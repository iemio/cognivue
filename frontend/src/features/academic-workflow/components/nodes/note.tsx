import { Handle, NodeProps, Position } from "@xyflow/react";
import { CustomNode } from "../../types";
import { StickyNote } from "lucide-react";

export const NoteNode: React.FC<NodeProps<CustomNode>> = ({
    data,
    selected,
}) => (
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
