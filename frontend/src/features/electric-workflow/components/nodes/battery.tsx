import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import React from "react";
import { ElectricalComponentData, ElectricalComponentType } from "../../types";
import BatteryIcon from "../../icons/Battery";
import { getUnit } from "../../utils";
import Terminal from "./terminal";

type BatteryNode = Node<ElectricalComponentData, "string">;

export default function Battery({
    type,
    data: { value },
}: NodeProps<BatteryNode>) {
    const unit = getUnit(type as ElectricalComponentType);

    return (
        <div className="relative inline-block">
            <BatteryIcon height={48} />
            <span className="text-[0.425rem] absolute top-[27px] left-[18px] text-white">
                {value} {unit}
            </span>
            <Terminal
                style={{ left: 39, top: 2 }}
                type="target"
                position={Position.Top}
                id="right"
            />
            <Terminal
                style={{ left: 9, top: 2 }}
                type="source"
                position={Position.Top}
                id="left"
            />
        </div>
    );
}
