import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../../ui/dropdown-menu";
import { Button } from "../../../../ui/button";
import { EllipsisIcon } from "lucide-react";

import { defaultActions } from "@/lib/actions";
import { Action } from "@/types/action";
import {
    getNodesBounds,
    getViewportForBounds,
    useReactFlow,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import { useTheme } from "next-themes";
import { SettingsDialog, DialogContentType } from "./settings-dialog";

const actions: Action[] = [
    {
        name: "Export Schema",
        action: "exportSchema",
    },
    ...defaultActions,
];

const IMAGE_WIDTH = 1024;
const IMAGE_HEIGHT = 768;

const downloadImage = (dataUrl: string) => {
    const a = document.createElement("a");
    a.setAttribute("download", "reactflow.png");
    a.setAttribute("href", dataUrl);
    a.click();
};

const ActionCenterX = () => {
    const { getNodes } = useReactFlow();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // State for dialog
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogContentType, setDialogContentType] =
        React.useState<DialogContentType>("openSettings");

    const handleActionClick = (action: Action) => {
        switch (action.action) {
            case "exportSchema":
                setDialogContentType("exportSchema");
                setDialogOpen(true);
                break;

            case "downloadPNG": {
                // Check if user wants to configure settings first
                // You can add a condition here to either show dialog or directly download
                const shouldShowSettings = true; // Set this based on your logic

                if (shouldShowSettings) {
                    setDialogContentType("downloadPNG");
                    setDialogOpen(true);
                } else {
                    // Direct download logic
                    const color = isDark ? "black" : "white";
                    const nodesBounds = getNodesBounds(getNodes());
                    const { x, y, zoom } = getViewportForBounds(
                        nodesBounds,
                        IMAGE_WIDTH,
                        IMAGE_HEIGHT,
                        0.5,
                        2,
                        1
                    );

                    const reactFlow = document.querySelector(
                        ".react-flow__viewport"
                    ) as HTMLElement;
                    if (!reactFlow) return;

                    toPng(reactFlow, {
                        backgroundColor: color,
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                        style: {
                            width: `${IMAGE_WIDTH}px`,
                            height: `${IMAGE_HEIGHT}px`,
                            transform: `translate(${x}px, ${y}px) scale(${zoom})`,
                        },
                    }).then(downloadImage);
                }
                break;
            }

            case "deleteNode":
                setDialogContentType("deleteNode");
                setDialogOpen(true);
                break;

            case "openSettings":
                setDialogContentType("openSettings");
                setDialogOpen(true);
                break;

            default:
                console.warn(`No handler defined for action: ${action.action}`);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer rounded-full shadow-none lg:peer-data-[state=invisible]:-translate-x-7.5 transition-transform ease-in-out duration-300"
                        aria-label="Open edit menu"
                    >
                        <EllipsisIcon size={16} aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {actions.map((action, index) => {
                        const isDefault = action.default ?? false;
                        const nextAction = actions[index + 1];

                        return (
                            <div key={action.name}>
                                <DropdownMenuItem
                                    onClick={() => handleActionClick(action)}
                                    className="cursor-pointer"
                                >
                                    {action.name}
                                </DropdownMenuItem>

                                {nextAction &&
                                    nextAction.default &&
                                    !isDefault && <DropdownMenuSeparator />}
                            </div>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>

            <SettingsDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                contentType={dialogContentType}
            />
        </>
    );
};

export default ActionCenterX;
