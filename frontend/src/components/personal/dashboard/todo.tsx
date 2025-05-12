"use client";
import { useEffect } from "react";
import { AnimatePresence, motion, useAnimate, usePresence } from "motion/react";
import { FiClock, FiMoreHorizontal } from "react-icons/fi";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CgLink, CgRename, CgDuplicate, CgShare } from "react-icons/cg";

// Define the Todo item type
interface TodoItem {
    id: string;
    text: string;
    time: string;
}

// Define props for the Todos component
interface TodosProps {
    todos: TodoItem[];
    selectedTodos: string[];
    toggleSelection: (id: string) => void;
}

// Define props for the Todo component
interface TodoProps {
    id: string;
    children: React.ReactNode;
    time: string;
    isSelected: boolean;
    toggleSelection: (id: string) => void;
}

const Todos: React.FC<TodosProps> = ({
    todos,
    selectedTodos,
    toggleSelection,
}) => {
    return (
        <div className="w-full space-y-3">
            <AnimatePresence>
                {todos.map((t) => (
                    <Todo
                        id={t.id}
                        key={t.id}
                        time={t.time}
                        isSelected={selectedTodos.includes(t.id)}
                        toggleSelection={toggleSelection}
                    >
                        {t.text}
                    </Todo>
                ))}
            </AnimatePresence>
        </div>
    );
};

const Todo: React.FC<TodoProps> = ({
    id,
    children,
    time,
    isSelected,
    toggleSelection,
}) => {
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate();
    // const isTemplate = true;
    useEffect(() => {
        if (!isPresent) {
            const exitAnimation = async (): Promise<void> => {
                await animate(
                    scope.current,
                    { scale: 1.025 },
                    { ease: "easeIn", duration: 0.125 }
                );
                safeToRemove();
            };

            exitAnimation();
        }
    }, [isPresent, animate, safeToRemove, scope]);

    return (
        <motion.div
            ref={scope}
            layout
            className={`relative flex w-full items-center gap-3 rounded border ${
                isSelected
                    ? "border-indigo-500 bg-indigo-900/20"
                    : "border-zinc-700 bg-zinc-900"
            } p-3`}
        >
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                        e.stopPropagation();
                        // isSelected: !isSelected;
                        toggleSelection(id);
                    }}
                    className="size-4 accent-indigo-400"
                />
                <Link href={`/file/${id}`} onClick={(e) => e.stopPropagation()}>
                    <p
                        className={` transition-colors ${
                            isSelected && "text-zinc-400"
                        } `}
                    >
                        {children}
                    </p>
                </Link>
            </div>
            <div className="ml-auto flex gap-1.5">
                <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-400">
                    <FiClock />
                    <span>{time} ago</span>
                </div>
                <Avatar className="h-6 w-6">
                    <AvatarFallback>
                        <User
                            size={10}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                    </AvatarFallback>
                </Avatar>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="cursor-pointer rounded bg-neutral-300/20 px-1.5 py-1 text-xs text-neutral-300 transition-colors hover:bg-neutral-600 hover:text-neutral-200"
                        >
                            <FiMoreHorizontal />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="cursor-pointer"
                        >
                            <CgLink />
                            Copy link
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="cursor-pointer"
                        >
                            <CgDuplicate />
                            Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="cursor-pointer"
                        >
                            <CgRename />
                            Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="cursor-pointer"
                        >
                            <CgShare />
                            Share
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/*small dot*/}
            {isSelected && (
                <div className="absolute right-0 top-0 h-3 w-3 translate-x-1/3 -translate-y-1/3 rounded-full bg-indigo-500" />
            )}
        </motion.div>
    );
};

// Handler functions to update todos
interface TodoHandlers {
    toggleSelection: (id: string) => void;
    deleteSelected: (selectedIds: string[]) => void;
}

// Example implementation of the handler functions
const useTodoHandlers = (
    setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>
): TodoHandlers => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const toggleSelection = (id: string): void => {
        // This will be implemented in the parent component
    };

    const deleteSelected = (selectedIds: string[]): void => {
        setTodos((pv) => pv.filter((t) => !selectedIds.includes(t.id)));
    };

    return { toggleSelection, deleteSelected };
};

export { Todos, Todo, useTodoHandlers, type TodoItem, type TodoHandlers };
