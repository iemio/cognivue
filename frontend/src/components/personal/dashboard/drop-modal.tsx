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
import { IoCloseOutline } from "react-icons/io5";
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

    // Define processing times for each step (in milliseconds)
    const processingTimes: { [key: number]: number } = {
        0: 2000, // 2 seconds for first step
        1: 5000, // 5 seconds for second step
        2: 3000, // 3 seconds for third step
        3: 1500, // 1.5 seconds for fourth step
        5: 10000,
    };

    // Error simulation function with different timings for each step
    const checkForErrors = async (
        stateIndex: number
    ): Promise<{ hasError: boolean; errorMessage?: string }> => {
        // Return a promise to simulate async operations with different durations
        return new Promise((resolve) => {
            console.log(`Processing state ${stateIndex}...`);

            // Get the processing time for this step (or default to 2000ms)
            const processingTime = processingTimes[stateIndex] || 2000;
            var v = 10;
            // Simulate different processing times and outcomes for each step
            setTimeout(() => {
                switch (stateIndex) {
                    case 0:
                        v = 0;
                        console.log(v);
                        // First step passes after its processing time
                        // console.log(
                        //     `Step ${stateIndex} completed successfully after ${processingTime}ms`
                        // );
                        resolve({ hasError: false });
                        break;
                    case 5:
                        v = 5;
                        console.log(v);
                        // Second step fails after its processing time
                        // console.log(
                        //     `Step ${stateIndex} failed after ${processingTime}ms`
                        // );
                        resolve({
                            hasError: true,
                            // errorMessage: `Connection timeout after ${
                            //     processingTime / 1000
                            // } seconds`,
                            errorMessage: `after ${
                                processingTime / 1000
                            } seconds`,
                        });
                        break;
                    case 4:
                        v = 4;
                        console.log(v);
                        // Third step passes after its processing time
                        // console.log(
                        //     `Step ${stateIndex} completed successfully after ${processingTime}ms`
                        // );
                        resolve({ hasError: false });
                        break;
                    case 2:
                        // Fourth step passes after its processing time
                        v = 2;
                        console.log(v);
                        // console.log(
                        //     `Step ${stateIndex} completed successfully after ${processingTime}ms`
                        // );
                        resolve({ hasError: false });
                        break;
                    default:
                        // Default behavior for any additional steps
                        console.log(
                            `Step ${stateIndex} completed with default handler after ${processingTime}ms`
                        );
                        resolve({ hasError: false });
                }
            }, processingTime); // Different delay for each step based on the processingTimes object
        });
    };

    const handleComplete = () => {
        console.log("All steps completed successfully!");
        // You could do additional operations here
    };

    const handleError = (index: number, message: string) => {
        console.error(`Error occurred at step ${index}: ${message}`);
        // You could log errors or perform fallback operations here
    };

    return (
        <div>
            <Loader
                loadingStates={loadingStates}
                loading={loading}
                duration={1000} // Time to show success state before moving to next step
                checkStateForError={checkForErrors}
                onError={handleError}
                onComplete={handleComplete}
            />
            {loading && (
                <button
                    className="fixed top-4 right-4 text-black dark:text-white z-[120]"
                    onClick={() => setLoading(false)}
                >
                    <IoCloseOutline className="h-10 w-10 cursor-pointer" />
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
        text: "Travelling in",
    },
    {
        text: "Meeting Tyler ",
    },
    {
        text: "Welcome to F**** ",
    },
    {
        text: "4",
    },
    {
        text: "5",
    },
    {
        text: "6",
    },
    {
        text: "7",
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
