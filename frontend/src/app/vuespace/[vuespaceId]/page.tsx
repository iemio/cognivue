"use client";
import Header from "@/components/vuespace/header/header";
// import Canvas from "@/components/vuespace/canvas/custom-templates/schema-visualizer";
import React, { useState } from "react";
import Editor from "@/components/vuespace/slate/Editor";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Canvas from "@/features/electric-workflow/components/workflow";

const Page = () => {
    const [option, setOption] = useState<"Canvas" | "Document" | "Both">(
        "Canvas"
    );
    const isMobile = useIsMobile();
    console.log("option", option);
    return (
        <div
            className={cn(
                "flex flex-row w-full",
                isMobile ? "min-h-svh" : "min-h-[calc(100svh-16px)]"
            )}
        >
            <Header setOption={setOption} option={option} />
            {/* <div> */}
            {option !== "Canvas" && <Editor />}
            {option !== "Document" && <Canvas />}
        </div>
    );
};

export default Page;
