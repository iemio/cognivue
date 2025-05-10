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
// import { Badge } from "./ui/badge";

const actions: Action[] = [
    {
        name: "Export Schema",
        action: "exportSchema",
    },

    ...defaultActions,
];

const ActionCenter = () => {
    // if (true) {
    //     return (
    //         <Badge className="rounded" variant="outline">
    //             Read only
    //         </Badge>
    //     );
    // }
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

                    // if (nextAction && !nextAction.default && isDefault) {
                    //     console.log(
                    //         "Next action exists and is not default:",
                    //         nextAction
                    //     );
                    // }

                    return (
                        <div key={action.name}>
                            <DropdownMenuItem
                                onClick={() => {}}
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
