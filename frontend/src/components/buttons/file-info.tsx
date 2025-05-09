"use client";

import { Info } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function FileInfo() {
    const fileDetails = {
        Name: "abc",
        Created: "2023-10-01",
        Author: "iemio",
        LastEdit: "2023-10-02",
        Contributors: ["iemio", "user2"],
        Viewers: ["iemio", "user2", "user3"],
    };
    return (
        <Popover>
            <Tooltip>
                <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                        <div className="p-2">
                            <Info
                                size={22}
                                aria-hidden="true"
                                className="text-muted-foreground/80 hover:text-muted-foreground rounded peer-focus-visible:border-ring peer-focus-visible:ring-ring/50 relative inline-flex cursor-pointer items-center justify-center transition-[color,box-shadow] outline-none peer-focus-visible:ring-[3px]"
                            />
                        </div>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" showArrow={true}>
                    File info{" "}
                    <kbd className="bg-background text-muted-foreground/70 ms-2 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                        ⌥I{" "}
                    </kbd>
                </TooltipContent>
            </Tooltip>
            <PopoverContent className="w-72 mt-1 mr-4">
                <div className="flex flex-col gap-2 p-4">
                    {Object.entries(fileDetails).map(([key, value]) => (
                        <div
                            key={key}
                            className="flex justify-between text-sm text-muted-foreground/80"
                        >
                            <span>{key}</span>
                            <span className="text-foreground/80">{`${value}`}</span>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
