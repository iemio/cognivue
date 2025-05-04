import Header from "@/components/header";
import SchemaVisualizer from "@/components/custom-templates/schema-visualizer";
import React from "react";

const Page = () => {
    return (
        <div className="min-h-svh flex flex-col">
            <Header />
            <SchemaVisualizer />
        </div>
    );
};

export default Page;
