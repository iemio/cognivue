"use client";
import React, { useState } from "react";
import {
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
    useModal,
} from "./animated-modal";

import { FileUpload } from "./package-upload";
import { useRouter } from "next/navigation";
import { IoCloseCircleOutline } from "react-icons/io5";
export function AnimatedModalDemo() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [file, setFile] = useState<File | null>(null);
    const { setOpen } = useModal();
    const handleFileUpload = (file: File | null) => {
        setFile(file);
        console.log(file);
    };
    const [loading, setLoading] = useState(false);
    const handleModalClose = () => {
        setFile(null);
    };
    return (
        <div>
            <Loader
                loadingStates={loadingStates}
                loading={loading}
                duration={2000}
            />
            {loading && (
                <button
                    className="fixed top-4 right-4 text-black dark:text-white z-[120]"
                    onClick={() => setLoading(false)}
                >
                    <IoCloseCircleOutline className="h-10 w-10 cursor-pointer" />
                    {/* <IconSquareRoundedX className="h-10 w-10" /> */}
                </button>
            )}
            <ModalTrigger className=" group/modal-btn">
                {/* <div className="flex justify-between items-center"> */}
                Start from a configuration file
                {/* <CreateButton /> */}
                {/* </div> */}
            </ModalTrigger>
            <ModalBody onClose={handleModalClose}>
                <ModalContent>
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <FileUpload onChange={handleFileUpload} />
                    </div>
                </ModalContent>
                <ModalFooter className="gap-4">
                    <button
                        className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28 cursor-pointer"
                        onClick={() => {
                            handleModalClose();
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </button>
                    {/* <button
                        disabled={!file}
                        className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28 cursor-pointer"
                        onClick={() => setLoading(true)}
                    > */}
                    <button
                        disabled={!file}
                        className="bg-gray-900 text-gray-300 dark:bg-gray-100 dark:text-gray-800 text-sm px-2 py-1 rounded-md border border-gray-900 w-28 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400 disabled:border-gray-600 dark:disabled:bg-gray-300 dark:disabled:text-gray-600 dark:disabled:border-gray-400"
                        onClick={() => setLoading(true)}
                    >
                        Configure
                    </button>
                </ModalFooter>
            </ModalBody>
        </div>
    );
}

import { MultiStepLoader as Loader } from "./multi-step-loader";
// import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
    {
        text: "Checking file type",
    },
    {
        text: "Travelling in a flight",
    },
    {
        text: "Meeting Tyler Durden",
    },
    {
        text: "Welcome to F**** C***",
    },
];

// export function MultiStepLoaderDemo() {
//     return (
//         <div className="w-full h-[60vh] flex items-center justify-center">
//             {/* Core Loader Modal */}

//             {/* The buttons are for demo only, remove it in your actual code ⬇️ */}
//             {/* <button
//                 onClick={() => setLoading(true)}
//                 className="bg-[#39C3EF] hover:bg-[#39C3EF]/90 text-black mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center"
//                 style={{
//                     boxShadow:
//                         "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
//                 }}
//             >
//                 Click to load
//             </button> */}

//             {loading && (
//                 <button
//                     className="fixed top-4 right-4 text-black dark:text-white z-[120]"
//                     onClick={() => setLoading(false)}
//                 >
//                     {/* <IconSquareRoundedX className="h-10 w-10" /> */}
//                 </button>
//             )}
//         </div>
//     );
// }
