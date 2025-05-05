"use client";

import React from "react";
// adjust path if needed
import { cn } from "@/lib/utils";
import { CanvasRevealEffect } from "@/components/personal/achievement/canvas-reveal-effect";
import {
    CardBody,
    CardContainer,
    CardItem,
} from "@/components/personal/achievement/3d-card";
import Logo from "@/components/icons/logo";

export const AchievementCard = ({
    title,
    description,
    claimed,
    className,
}: {
    title: string;
    description: string;
    className?: string;
    claimed: boolean;
}) => {
    return (
        <CardContainer className="inter-var">
            <CardBody
                className={cn(
                    "bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto min-w-[25rem] h-auto rounded-xl p-6 border overflow-hidden",
                    className
                )}
            >
                <CanvasRevealEffect
                    animationSpeed={0.6}
                    containerClassName="absolute inset-0 z-0 bg-black"
                    dotSize={3}
                    colors={[
                        [0, 0, 0],
                        [0, 175, 0],
                        // [0, 255, 0],// Bright green
                        [34, 139, 34], // Forest green
                    ]}
                />
                <CardItem
                    translateZ="40"
                    className="text-xl font-bold text-neutral-600 dark:text-white mt-8"
                >
                    <Logo />
                </CardItem>
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold  text-zinc-100 font-mono"
                >
                    {title}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-sm max-w-sm mt-2 text-zinc-300"
                >
                    {description}
                </CardItem>

                <div className="flex justify-between items-center mt-16">
                    {/* <CardItem
                        translateZ={20}
                        as="a"
                        href="https://"
                        target="__blank"
                        className="px-4 py-2 rounded-xl text-xs font-normal text-white"
                    >
                        Try now →
                    </CardItem> */}
                    <CardItem
                        translateZ={20}
                        as="button"
                        className={cn(
                            "px-4 py-2 rounded-xl text-black text-xs font-bold",
                            claimed
                                ? "bg-zinc-500 cursor-not-allowed"
                                : "bg-zinc-300 cursor-pointer"
                        )}
                    >
                        {claimed ? "Claimed" : "Claim"}
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
};
