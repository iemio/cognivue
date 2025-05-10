"use client";
import Header from "@/components/vuespace/header/header";
import Canvas from "@/components/vuespace/canvas/custom-templates/schema-visualizer";
import React, { useState } from "react";
import Editor from "@/components/vuespace/slate/Editor";

const Page = () => {
    const [option, setOption] = useState<"Canvas" | "Document" | "Both">(
        "Canvas"
    );
    console.log("option", option);
    return (
        <div className="min-h-svh flex flex-col">
            <Header setOption={setOption} option={option} />
            {/* <div> */}
            {option !== "Document" && <Canvas />}
            {option !== "Canvas" && <Editor />}
        </div>
    );
};

export default Page;
