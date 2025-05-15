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

type ElectricalComponentNode = Node<ElectricalComponentData, "string">;

export default function ElectricalComponent({
    data: {
        value,
        type,
        rotation,
        state,
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
            className="relative"
            style={{
                transform: `rotate(${rotation}deg)`,
                background: isAdditionValid
                    ? "#58ed58"
                    : isAdditionInvalid
                    ? "#ff0505"
                    : undefined,
                visibility: visible ? "visible" : "hidden",
            }}
        >
            <Rotation selected={selected} id={id} />
            {parentId && selected && (
                <div
                    className="absolute"
                    style={{ top: -23, right: 20, color, cursor: "pointer" }}
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
                    {isAttachedToGroup ? <Lock /> : <Unlock />}
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
            <span
                className="text-xxs absolute"
                style={{ color, top: 0, left: 0 }}
            >
                {value} {unit}
            </span>
            {isAdditionValid && (
                <Plus
                    style={{ position: "absolute", top: -17, right: 2 }}
                    color={color}
                />
            )}
            {isAdditionInvalid && (
                <X
                    style={{ position: "absolute", top: -17, right: 2 }}
                    color={color}
                />
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
