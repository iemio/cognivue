"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const EmptyCircleIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${className}`}
        >
            <circle cx="12" cy="12" r="9" />
        </svg>
    );
};

const CheckFilled = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn("w-6 h-6", className)}
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

const CrossFilled = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn("w-6 h-6", className)}
        >
            <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
            />
        </svg>
    );
};

// Enhanced loading state type with processing status indicator
type LoadingState = {
    text: string;
    error?: string;
    status?: "idle" | "processing" | "success" | "error";
};

const LoaderCore = ({
    loadingStates,
    value = 0,
    errorIndex = -1,
    stateStatuses = {},
}: {
    loadingStates: LoadingState[];
    value?: number;
    errorIndex?: number;
    stateStatuses?: Record<number, LoadingState["status"]>;
}) => {
    return (
        <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-40">
            {loadingStates.map((loadingState, index) => {
                const distance = Math.abs(index - value);
                const opacity = Math.max(1 - distance * 0.2, 0);
                const hasError = index === errorIndex;
                const status = stateStatuses[index] || "idle";
                const isProcessing = status === "processing";
                const isSuccess = status === "success";

                return (
                    <motion.div
                        key={index}
                        className={cn("text-left flex gap-2 mb-4")}
                        initial={{ opacity: 0, y: -(value * 40) }}
                        animate={{ opacity: opacity, y: -(value * 40) }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            {/* Pending (not current) states */}
                            {index > value && (
                                <EmptyCircleIcon className="text-black dark:text-white" />
                            )}

                            {/* Error state */}
                            {hasError && (
                                <CrossFilled className="text-red-600 dark:text-red-500" />
                            )}

                            {/* Processing state - current step being checked */}
                            {index === value && isProcessing && !hasError && (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    <EmptyCircleIcon className="text-blue-600 dark:text-blue-400" />
                                </motion.div>
                            )}

                            {/* Success state */}
                            {(index < value ||
                                (index === value && isSuccess)) &&
                                !hasError && (
                                    <CheckFilled
                                        className={cn(
                                            "text-black dark:text-white",
                                            value === index &&
                                                isSuccess &&
                                                "text-lime-700 dark:text-lime-500 opacity-100"
                                        )}
                                    />
                                )}
                        </div>
                        <div className="flex flex-col">
                            <span
                                className={cn(
                                    "text-black dark:text-white",
                                    value === index &&
                                        isProcessing &&
                                        "text-blue-600 dark:text-blue-400",
                                    value === index &&
                                        isSuccess &&
                                        "text-lime-700 dark:text-lime-500",
                                    hasError && "text-red-600 dark:text-red-500"
                                )}
                            >
                                {loadingState.text}
                                {value === index &&
                                    isProcessing &&
                                    !hasError &&
                                    " ..."}
                            </span>
                            {hasError && loadingState.error && (
                                <span className="text-sm text-red-600 dark:text-red-500 mt-1">
                                    {loadingState.error}
                                </span>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export const MultiStepLoader = ({
    loadingStates,
    loading,
    duration = 1000, // Duration to show success state before moving to next step
    loop = false,
    onComplete,
    onError,
    checkStateForError,
}: {
    loadingStates: LoadingState[];
    loading?: boolean;
    duration?: number;
    loop?: boolean;
    onComplete?: () => void;
    onError?: (errorIndex: number, errorMessage: string) => void;
    checkStateForError?: (
        stateIndex: number
    ) => Promise<{ hasError: boolean; errorMessage?: string }>;
}) => {
    const router = useRouter();
    const [currentState, setCurrentState] = useState(0);
    const [errorIndex, setErrorIndex] = useState(-1);
    const [processingState, setProcessingState] = useState(false);
    const [stateStatuses, setStateStatuses] = useState<
        Record<number, LoadingState["status"]>
    >({});

    // Reset all states when loading changes
    useEffect(() => {
        if (!loading) {
            setCurrentState(0);
            setErrorIndex(-1);
            setProcessingState(false);
            setStateStatuses({});
            // Reset the status of all loading states
            loadingStates.forEach((state) => {
                state.status = "idle";
            });
            return;
        }
    }, [loading]);

    useEffect(() => {
        if (!loading || processingState) return;

        const processCurrentState = async () => {
            // Set processing flag and update status
            setProcessingState(true);

            // Update the current state status to processing
            setStateStatuses((prev) => ({
                ...prev,
                [currentState]: "processing",
            }));
            loadingStates[currentState].status = "processing";

            // If we have a function to check for errors, use it
            if (checkStateForError) {
                try {
                    console.log(`Processing state ${currentState}...`);

                    // Wait for the error check to complete
                    const { hasError, errorMessage } = await checkStateForError(
                        currentState
                    );

                    if (hasError) {
                        console.log(
                            `Error found in state ${currentState}: ${errorMessage}`
                        );

                        // Update status to error
                        setStateStatuses((prev) => ({
                            ...prev,
                            [currentState]: "error",
                        }));
                        loadingStates[currentState].status = "error";

                        // Update the loading state with the error message
                        if (errorMessage) {
                            loadingStates[currentState].error = errorMessage;
                        }

                        // Set error index to current state
                        setErrorIndex(currentState);

                        // Call onError callback if provided
                        if (onError) {
                            onError(
                                currentState,
                                errorMessage || "Unknown error"
                            );
                        }

                        // Stop processing and don't move to next state
                        setProcessingState(false);
                        return;
                    }

                    // No error, set status to success
                    console.log(`State ${currentState} completed successfully`);
                    setStateStatuses((prev) => ({
                        ...prev,
                        [currentState]: "success",
                    }));
                    loadingStates[currentState].status = "success";

                    // Wait for the success state to be visible for the specified duration
                    setTimeout(() => {
                        setProcessingState(false);

                        if (loop) {
                            setCurrentState((prevState) =>
                                prevState === loadingStates.length - 1
                                    ? 0
                                    : prevState + 1
                            );
                        } else {
                            if (currentState < loadingStates.length - 1) {
                                setCurrentState(currentState + 1);
                            } else {
                                // We've completed all steps successfully
                                console.log("All steps completed successfully");
                                if (onComplete) {
                                    onComplete();
                                } else {
                                    // Default behavior is to navigate
                                    router.push("/file/2");
                                }
                            }
                        }
                    }, duration);
                } catch (error) {
                    // Handle any exceptions during error checking
                    console.error(`Exception in state ${currentState}:`, error);

                    // Update status to error
                    setStateStatuses((prev) => ({
                        ...prev,
                        [currentState]: "error",
                    }));
                    loadingStates[currentState].status = "error";

                    setErrorIndex(currentState);
                    loadingStates[currentState].error =
                        "Unexpected error occurred";

                    if (onError) {
                        onError(currentState, "Unexpected error occurred");
                    }

                    setProcessingState(false);
                    return;
                }
            }
        };

        // Process current state if we're not already processing and no error has occurred
        if (!processingState && errorIndex === -1) {
            processCurrentState();
        }
    }, [
        currentState,
        loading,
        errorIndex,
        processingState,
        loop,
        loadingStates,
        duration,
        checkStateForError,
        onError,
        onComplete,
        router,
    ]);

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl"
                >
                    <div className="h-96 relative">
                        <LoaderCore
                            value={currentState}
                            loadingStates={loadingStates}
                            errorIndex={errorIndex}
                            stateStatuses={stateStatuses}
                        />
                    </div>

                    <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-white dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
