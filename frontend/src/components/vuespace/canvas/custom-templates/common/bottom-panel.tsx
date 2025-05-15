import { Button } from "@/components/ui/button";
import { RiAddLine, RiFullscreenLine, RiSubtractLine } from "@remixicon/react";
import { Panel, useReactFlow } from "@xyflow/react";
import React, { useCallback } from "react";
import ThemeToggleButton from "./theme-toogle";

const BottomPanel = () => {
    const { fitView, zoomIn, zoomOut } = useReactFlow();

    const onFitView = useCallback(() => {
        fitView({ padding: 0.2 });
    }, [fitView]);
    return (
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
                <RiSubtractLine className="size-5" aria-hidden="true" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card cursor-pointer"
                onClick={onFitView}
                aria-label="Fit view"
            >
                <RiFullscreenLine className="size-5" aria-hidden="true" />
            </Button>
            <ThemeToggleButton />
        </Panel>
    );
};

export default BottomPanel;
