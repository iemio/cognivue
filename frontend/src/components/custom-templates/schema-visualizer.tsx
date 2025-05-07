"use client";

import { useCallback, useRef, useState } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    Background,
    useNodesState,
    useEdgesState,
    Panel,
    useReactFlow,
    BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import {
    RiAddLine,
    RiSubtractLine,
    RiFullscreenLine,
    RiSunLine,
    RiMoonClearLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import TableNode from "@/components/nodes/table-node";
import SchemaEdge from "@/components/edges/schema-edge";
import { initialNodes, initialEdges } from "@/lib/schema-data";
import { useTheme } from "next-themes";

// Register custom node types and edge types
const nodeTypes = {
    tableNode: TableNode,
};

const edgeTypes = {
    custom: SchemaEdge,
};

function SchemaVisualizerInner() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { fitView, zoomIn, zoomOut } = useReactFlow();

    const onFitView = useCallback(() => {
        fitView({ padding: 0.2 });
    }, [fitView]);

    const { theme, setTheme } = useTheme();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [system, setSystem] = useState(false);

    const smartToggle = () => {
        const prefersDarkScheme = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        if (theme === "system") {
            setTheme(prefersDarkScheme ? "light" : "dark");
            setSystem(false);
        } else if (
            (theme === "light" && !prefersDarkScheme) ||
            (theme === "dark" && prefersDarkScheme)
        ) {
            setTheme(theme === "light" ? "dark" : "light");
            setSystem(false);
        } else {
            setTheme("system");
            setSystem(true);
        }
    };

    return (
        <main className="flex-1 flex items-stretch">
            <div className="w-full" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    fitView
                    minZoom={0.5}
                    maxZoom={1}
                    defaultEdgeOptions={{
                        type: "custom",
                        className: "opacity-25",
                    }}
                    style={
                        {
                            "--xy-background-pattern-dots-color-default":
                                "var(--color-border)",
                            "--xy-edge-stroke-width-default": 1.5,
                            "--xy-edge-stroke-default":
                                "var(--color-foreground)",
                            "--xy-edge-stroke-selected-default":
                                "var(--color-foreground)",
                            "--xy-attribution-background-color-default":
                                "transparent",
                        } as React.CSSProperties
                    }
                    // attributionPosition="bottom-left" // you should remove this line if you don't want to show the attribution
                >
                    <Background
                        variant={BackgroundVariant.Dots}
                        gap={20}
                        size={2}
                    />

                    <Panel
                        position="bottom-left"
                        className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse"
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card cursor-pointer"
                            onClick={() => zoomIn()}
                            aria-label="Zoom in"
                        >
                            <RiAddLine className="size-5" aria-hidden="true" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="cursor-pointer text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
                            onClick={() => zoomOut()}
                            aria-label="Zoom out"
                        >
                            <RiSubtractLine
                                className="size-5"
                                aria-hidden="true"
                            />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card cursor-pointer"
                            onClick={onFitView}
                            aria-label="Fit view"
                        >
                            <RiFullscreenLine
                                className="size-5"
                                aria-hidden="true"
                            />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card cursor-pointer"
                            onClick={smartToggle}
                            aria-label="Fit view"
                        >
                            <RiSunLine
                                className="dark:hidden size-5"
                                aria-hidden="true"
                            />
                            <RiMoonClearLine
                                className="hidden dark:block size-5"
                                aria-hidden="true"
                            />
                        </Button>
                    </Panel>
                </ReactFlow>
            </div>
        </main>
    );
}

export default function SchemaVisualizer() {
    return (
        <ReactFlowProvider>
            <SchemaVisualizerInner />
        </ReactFlowProvider>
    );
}
