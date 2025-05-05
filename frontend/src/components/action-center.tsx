import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { EllipsisIcon } from "lucide-react";

import { defaultActions } from "@/lib/actions";
import { Action } from "@/types/action";

const actions: Action[] = [
    {
        name: "Export Schema",
        action: "exportSchema",
    },

    ...defaultActions,
];

const ActionCenter = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer rounded-full shadow-none"
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
