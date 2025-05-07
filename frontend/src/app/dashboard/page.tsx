"use client";

import React, { useEffect, useState } from "react";
import TabsComponent from "@/components/personal/dashboard/tabs";
import CreateButton from "@/components/personal/dashboard/create-button";
import { FileUpload } from "@/components/personal/dashboard/package-upload";

export default function VanishList() {
    const [bgImage, setBgImage] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const handleFileUpload = (files: File[]) => {
        setFiles(files);
        console.log(files);
    };

    useEffect(() => {
        const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const strokeColor = dark ? "%2318181b" : "%23cccccc33"; // dark: #18181b, light: #ccc with opacity
        const svg = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='${strokeColor}'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`;
        setBgImage(svg);
    }, []);

    return (
        // <section
        //     className="min-h-screen bg-zinc-950 py-24"
        //     style={{
        //         backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        //     }}
        // >
        <section
            className="min-h-screen py-24 bg-white dark:bg-zinc-950"
            style={{ backgroundImage: bgImage }}
            data-dark
        >
            <div className="mx-auto w-full max-w-3xl px-4 mt-10 flex flex-col">
                <Header />
                <div className="flex justify-between items-center">
                    <CreateButton />
                </div>

                <TabsComponent />
            </div>
            <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={handleFileUpload} />
            </div>
        </section>
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
