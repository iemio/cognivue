"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { FiChevronRight } from "react-icons/fi";
import { PiPackageThin } from "react-icons/pi";

interface ModalContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ open, setOpen }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

export function Modal({ children }: { children: ReactNode }) {
    return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    const { setOpen } = useModal();
    return (
        // <button
        //     className={cn(
        //         "px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden",
        //         className
        //     )}
        //     onClick={() => setOpen(true)}
        // >
        //     {children}
        // </button>
        <button
            className={cn(
                "group flex items-center gap-2 w-auto rounded px-3 py-2.5 text-sm backdrop-blur-sm text-blue-300 transition-colors cursor-pointer border bg-blue-300/20 hover:bg-blue-600 hover:text-blue-200 border-blue-300/30 mb-5.5",
                className
            )}
            onClick={() => setOpen(true)}
        >
            <PiPackageThin size={20} />
            {children}
            <FiChevronRight className="opacity-0 group-hover:opacity-100 transform transition-transform duration-300 -translate-x-1.5 group-hover:translate-x-0" />
        </button>
    );
};

export const ModalBody = ({
    children,
    className,
    onClose,
}: {
    children: ReactNode;
    className?: string;
    onClose?: () => void;
}) => {
    const { open } = useModal();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [open]);

    const modalRef = useRef<HTMLDivElement>(null);
    const { setOpen } = useModal();
    useOutsideClick(modalRef, () => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
    });

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        backdropFilter: "blur(10px)",
                    }}
                    exit={{
                        opacity: 0,
                        backdropFilter: "blur(0px)",
                    }}
                    className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-50"
                >
                    <Overlay />

                    <motion.div
                        ref={modalRef}
                        className={cn(
                            "min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden",
                            className
                        )}
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                            // rotateX: 40,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            // rotateX: 0,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            // rotateX: 10,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 15,
                        }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const ModalContent = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col flex-1 p-4", className)}>
            {children}
        </div>
    );
};

export const ModalFooter = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "flex justify-end p-4 bg-gray-100 dark:bg-neutral-900",
                className
            )}
        >
            {children}
        </div>
    );
};

const Overlay = ({ className }: { className?: string }) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                backdropFilter: "blur(10px)",
            }}
            exit={{
                opacity: 0,
                backdropFilter: "blur(0px)",
            }}
            className={` h-full w-full bg-transparent bg-opacity-50 z-50 ${className}`}
        ></motion.div>
    );
};

// const CloseIcon = () => {
//     const { setOpen } = useModal();
//     return (
//         <button
//             onClick={() => setOpen(false)}
//             className="absolute top-4 right-4 group"
//         >
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="text-black dark:text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
//             >
//                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                 <path d="M18 6l-12 12" />
//                 <path d="M6 6l12 12" />
//             </svg>
//         </button>
//     );
// };

// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
// export const useOutsideClick = (
//     ref: React.RefObject<HTMLDivElement | null>,
//     callback: Function
// ) => {
//     useEffect(() => {
//         const listener = (event: any) => {
//             // DO NOTHING if the element being clicked is the target element or their children
//             if (!ref.current || ref.current.contains(event.target)) {
//                 return;
//             }
//             callback(event);
//         };

//         document.addEventListener("mousedown", listener);
//         document.addEventListener("touchstart", listener);

//         return () => {
//             document.removeEventListener("mousedown", listener);
//             document.removeEventListener("touchstart", listener);
//         };
//     }, [ref, callback]);
// };

export const useOutsideClick = (
    ref: React.RefObject<HTMLDivElement | null>,
    callback: (event: MouseEvent | TouchEvent) => void
) => {
    useEffect(() => {
        const mouseListener = (event: MouseEvent) => {
            // DO NOTHING if the element being clicked is the target element or their children
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            callback(event);
        };

        const touchListener = (event: TouchEvent) => {
            // DO NOTHING if the element being touched is the target element or their children
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            callback(event);
        };

        document.addEventListener("mousedown", mouseListener);
        document.addEventListener("touchstart", touchListener);

        return () => {
            document.removeEventListener("mousedown", mouseListener);
            document.removeEventListener("touchstart", touchListener);
        };
    }, [ref, callback]);
};
