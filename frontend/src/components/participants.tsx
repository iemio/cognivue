"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const DEFAULT_AVATARS = [
    {
        src: "https://randomuser.me/api/portraits/men/32.jpg",
        alt: "John Doe",
        name: "John Doe",
        initials: "JD",
    },
    {
        src: "https://randomuser.me/api/portraits/women/44.jpg",
        alt: "Sarah Smith",
        name: "Sarah Smith",
        initials: "SS",
    },
    {
        src: "https://randomuser.me/api/portraits/men/91.jpg",
        alt: "Alex Wong",
        name: "Alex Wong",
        initials: "AW",
    },
    {
        src: "https://randomuser.me/api/portraits/women/17.jpg",
        alt: "Emma Johnson",
        name: "Emma Johnson",
        initials: "EJ",
    },
];

export default function Participants() {
    const maxVisible = 3;
    const visibleParticipants = DEFAULT_AVATARS.slice(0, maxVisible);
    const extraCount = DEFAULT_AVATARS.length - maxVisible;
    return (
        <TooltipProvider delayDuration={300}>
            <div className="bg-transparent flex items-center justify-center rounded-full border p-1">
                <div className="flex items-center relative">
                    {visibleParticipants.map((avatar, index) => (
                        <Tooltip key={index}>
                            <TooltipTrigger asChild>
                                <div
                                    className={cn(
                                        "relative hover:z-10",
                                        index > 0 && "-ml-2"
                                    )}
                                >
                                    <Avatar className="transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-secondary h-7 w-7">
                                        <AvatarImage
                                            src={avatar.src}
                                            alt={avatar.alt}
                                        />
                                        <AvatarFallback>
                                            {avatar.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                className="font-medium"
                            >
                                {avatar.name}
                            </TooltipContent>
                        </Tooltip>
                    ))}

                    {extraCount > 0 && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="secondary"
                                    className="cursor-pointer bg-transparent text-muted-foreground ring-transparent hover:bg-secondary hover:text-foreground flex size-8 items-center justify-center rounded-full text-[0.75rem] ring-2"
                                    size="icon"
                                >
                                    +{extraCount}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                className="font-medium"
                            >
                                other users here
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>
        </TooltipProvider>
    );
}
