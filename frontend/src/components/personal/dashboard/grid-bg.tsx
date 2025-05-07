import { cn } from "@/lib/utils";
import React from "react";
import { Modal } from "./animated-modal";
import { AnimatedModalDemo } from "./drop-modal";
import TabsComponent from "./tabs";

export function GridBackgroundDemo() {
    return (
        <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
            <div className="mx-auto w-full max-w-3xl px-4 mt-10 flex flex-col">
                <Header />
                <Modal>
                    <AnimatedModalDemo />
                </Modal>
                {/* <div className="flex justify-between items-center">
                    <CreateButton />
                </div> */}
                <TabsComponent />
            </div>
            {/* <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
                Backgrounds
            </p> */}
        </div>
    );
}

const Header = () => {
    return (
        <div className="mb-6">
            <h1 className="text-xl font-medium text-white">
                Good morning user! ☀️ 🌙
            </h1>
            <p className="text-zinc-400">
                Let&apos;s see what we need to work on today.
            </p>
        </div>
    );
};
