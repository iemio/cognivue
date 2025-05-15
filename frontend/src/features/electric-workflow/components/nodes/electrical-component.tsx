import { Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import React from "react";
import {
    ElectricalComponentData,
    ElectricalComponentState,
    ElectricalComponentType,
} from "../../types";
import { Capacitor, Inductor, Resistor } from "../../icons";
import { getUnit } from "../../utils";
import Terminal from "./terminal";
import Rotation from "./rotation";
import { Lock, Plus, Unlock, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type ElectricalComponentNode = Node<ElectricalComponentData, "string">;

export default function ElectricalComponent({
    data: {
        value,
        type,
        rotation,
        state,
        isDragging,
        isAttachedToGroup,
        visible = true,
        connectable,
    },
    selected,
    id,
    parentId,
}: NodeProps<ElectricalComponentNode>) {
    const unit = getUnit(type as ElectricalComponentType);

    const isAdditionValid = state === ElectricalComponentState.Add;
    const isAdditionInvalid = state === ElectricalComponentState.NotAdd;

    const { updateNode } = useReactFlow();

    const { theme } = useTheme();
    const isDark = theme === "dark";

    const color = isDark ? "white" : "black";

    return (
        <div
            className={cn(
                "relative",
                isAdditionValid &&
                    "bg-emerald-300/50 backdrop-blur-xs border border-emerald-600 p-1",
                isAdditionInvalid &&
                    "bg-red-300/50 backdrop-blur-xs border border-red-600 p-1"
            )}
            style={{
                transform: `rotate(${rotation}deg)`,
                visibility: visible ? "visible" : "hidden",
            }}
        >
            {!isDragging && <Rotation selected={selected} id={id} />}
            {parentId && selected && (
                <div
                    className="absolute -top-5 right-2 cursor-pointer"
                    onClick={() => {
                        updateNode(id, (prevNode) => ({
                            extent:
                                prevNode.extent === "parent"
                                    ? undefined
                                    : "parent",
                            data: {
                                ...prevNode.data,
                                isAttachedToGroup: !isAttachedToGroup,
                            },
                        }));
                    }}
                    title={
                        isAttachedToGroup
                            ? "Detach from group"
                            : "Attach to group"
                    }
                >
                    {isAttachedToGroup ? (
                        <Lock className="size-4" />
                    ) : (
                        <Unlock className="size-4" />
                    )}
                </div>
            )}
            {type === ElectricalComponentType.Resistor && (
                <Resistor height={24} color={color} />
            )}
            {type === ElectricalComponentType.Capacitor && (
                <Capacitor height={24} color={color} />
            )}
            {type === ElectricalComponentType.Inductor && (
                <Inductor height={24} color={color} />
            )}
            {!isDragging && (
                <span className="text-[0.6rem] absolute" style={{ color }}>
                    {value} {unit}
                </span>
            )}
            {isAdditionValid && (
                <Plus
                    className="absolute -top-4 right-1 size-3"
                    color={color}
                />
            )}
            {isAdditionInvalid && (
                <X className="absolute -top-4 right-1 size-3" color={color} />
            )}
            <Terminal
                type="target"
                position={Position.Right}
                id="right"
                isConnectable={connectable}
            />
            <Terminal
                type="source"
                position={Position.Left}
                id="left"
                isConnectable={connectable}
            />
        </div>
    );
}
