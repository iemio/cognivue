import { Node, NodeProps, NodeResizer, useStore } from "@xyflow/react";
import React from "react";
import { ElectricalComponentData } from "../../types";
import Placeholder from "./placeholder";
import { zoomSelector } from "../../utils";
import { useTheme } from "next-themes";

type BoardNode = Node<ElectricalComponentData, "string">;

export default function Board({ selected }: NodeProps<BoardNode>) {
    const showContent = useStore(zoomSelector);

    const { theme } = useTheme();
    const isDark = theme === "dark";
    const color = isDark ? "white" : "black";

    return (
        <div
            className="rounded-lg h-full w-full"
            style={{
                border: `2px solid ${color}`,
                boxShadow: selected ? `${color} 0px 0px 4px` : undefined,
            }}
        >
            {/* Add margin wrapper around NodeResizer */}
            <NodeResizer minWidth={200} minHeight={200} isVisible={selected} />

            {!showContent && <Placeholder />}
        </div>
    );
}
