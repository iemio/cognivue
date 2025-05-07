"use client";
import React, { useState } from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "./animated-modal";

import { FileUpload } from "./package-upload";

export function AnimatedModalDemo() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (file: File | null) => {
        setFile(file);
        console.log(file);
    };
    return (
        <div>
            <Modal>
                <ModalTrigger className=" group/modal-btn">
                    {/* <div className="flex justify-between items-center"> */}
                    Start from a configuration file
                    {/* <CreateButton /> */}
                    {/* </div> */}
                </ModalTrigger>
                <ModalBody>
                    <ModalContent>
                        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                            <FileUpload onChange={handleFileUpload} />
                        </div>
                    </ModalContent>
                    <ModalFooter className="gap-4">
                        <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                            Cancel
                        </button>
                        <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                            Next
                        </button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
}
