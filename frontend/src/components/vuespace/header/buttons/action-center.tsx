// import React from "react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "../../../ui/dropdown-menu";
// import { Button } from "../../../ui/button";
// import { EllipsisIcon } from "lucide-react";

// import { defaultActions } from "@/lib/actions";
// import { Action } from "@/types/action";
// import {
//     getNodesBounds,
//     getViewportForBounds,
//     useReactFlow,
// } from "@xyflow/react";
// // import { SettingsDialog } from "./settings-dialog";

// // import { Badge } from "./ui/badge";

// // import {
// //     Bell,
// //     Check,
// //     Globe,
// //     Home,
// //     Keyboard,
// //     Link,
// //     Lock,
// //     Menu,
// //     MessageCircle,
// //     Paintbrush,
// //     Settings,
// //     Video,
// // } from "lucide-react";
// import { toPng } from "html-to-image";
// import { useTheme } from "next-themes";

// const actions: Action[] = [
//     {
//         name: "Export Schema",
//         action: "exportSchema",
//     },

//     ...defaultActions,
// ];

// const IMAGE_WIDTH = 1024;
// const IMAGE_HEIGHT = 768;

// const downloadImage = (dataUrl: string) => {
//     const a = document.createElement("a");

//     a.setAttribute("download", "reactflow.png");
//     a.setAttribute("href", dataUrl);

//     a.click();
// };

// const ActionCenter = () => {
//     // if (true) {
//     //     return (
//     //         <Badge className="rounded" variant="outline">
//     //             Read only
//     //         </Badge>
//     //     );
//     // }
//     const handleActionClick = (action: Action) => {
//         switch (action.action) {
//             case "exportSchema":
//                 console.log("Schema exported!");
//                 // You can trigger export logic here
//                 break;
//             case "downloadPNG":
//                 const { getNodes } = useReactFlow();
//                 const { theme } = useTheme();
//                 const isDark = theme === "dark";
//                 let color = "white";
//                 if (isDark) color = "black";

//                 const nodesBounds = getNodesBounds(getNodes());
//                 const { x, y, zoom } = getViewportForBounds(
//                     nodesBounds,
//                     IMAGE_WIDTH,
//                     IMAGE_HEIGHT,
//                     0.5,
//                     2,
//                     1
//                 );

//                 const reactFlow = document.querySelector(
//                     ".react-flow__viewport"
//                 ) as HTMLElement;
//                 if (!reactFlow) return;

//                 toPng(reactFlow, {
//                     backgroundColor: color,
//                     width: IMAGE_WIDTH,
//                     height: IMAGE_HEIGHT,
//                     style: {
//                         width: `${IMAGE_WIDTH}px`,
//                         height: `${IMAGE_HEIGHT}px`,
//                         transform: `translate(${x}px, ${y}px) scale(${zoom})`,
//                     },
//                 }).then(downloadImage);

//                 break;
//             case "deleteNode":
//                 console.log("Node deleted!");
//                 // Logic for deleting a node
//                 break;
//             case "openSettings":
//                 console.log("Settings opened!");
//                 // Logic for opening settings
//                 break;
//             default:
//                 console.warn(`No handler defined for action: ${action.action}`);
//         }
//     };
//     return (
//         <>
//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button
//                         size="icon"
//                         variant="ghost"
//                         className="cursor-pointer rounded-full shadow-none lg:peer-data-[state=invisible]:-translate-x-7.5 transition-transform ease-in-out duration-300"
//                         aria-label="Open edit menu"
//                     >
//                         <EllipsisIcon size={16} aria-hidden="true" />
//                     </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="start">
//                     {/* <SettingsDialog /> */}
//                     {actions.map((action, index) => {
//                         const isDefault = action.default ?? false;
//                         const nextAction = actions[index + 1];

//                         return (
//                             <div key={action.name}>
//                                 <DropdownMenuItem
//                                     onClick={() => {
//                                         handleActionClick(action);
//                                     }}
//                                     className="cursor-pointer"
//                                     key={action.name}
//                                 >
//                                     {/* <SettingsDialog /> */}
//                                     {action.name}
//                                 </DropdownMenuItem>

//                                 {nextAction &&
//                                     nextAction.default &&
//                                     !isDefault && <DropdownMenuSeparator />}
//                             </div>
//                         );
//                     })}
//                 </DropdownMenuContent>
//             </DropdownMenu>
//         </>
//     );
// };

// export default ActionCenter;
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
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

const ActionCenter = () => {
    // ✅ Move hooks to component body
    const { getNodes } = useReactFlow();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleActionClick = (action: Action) => {
        switch (action.action) {
            case "exportSchema":
                console.log("Schema exported!");
                break;

            case "downloadPNG": {
                const color = isDark ? "black" : "white";

                // Get node bounds and viewport
                const nodesBounds = getNodesBounds(getNodes());
                const { x, y, zoom } = getViewportForBounds(
                    nodesBounds,
                    IMAGE_WIDTH,
                    IMAGE_HEIGHT,
                    0.5,
                    2,
                    1
                );

                // Find the viewport element
                const reactFlow = document.querySelector(
                    ".react-flow__viewport"
                ) as HTMLElement;
                if (!reactFlow) return;

                // Generate PNG
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

                break;
            }

            case "deleteNode":
                console.log("Node deleted!");
                break;

            case "openSettings":
                console.log("Settings opened!");
                break;

            default:
                console.warn(`No handler defined for action: ${action.action}`);
        }
    };

    return (
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

                            {nextAction && nextAction.default && !isDefault && (
                                <DropdownMenuSeparator />
                            )}
                        </div>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionCenter;
