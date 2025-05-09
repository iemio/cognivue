import Header from "@/components/vuespace/header/header";
import Canvas from "@/components/vuespace/canvas/custom-templates/schema-visualizer";
import React from "react";

const Page = () => {
    return (
        <div className="min-h-svh flex flex-col">
            <Header />
            <Canvas />
        </div>
    );
};

export default Page;
