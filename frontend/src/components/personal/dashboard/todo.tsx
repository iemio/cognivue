import { useEffect } from "react";
import { AnimatePresence, motion, useAnimate, usePresence } from "motion/react";
import { FiClock, FiTrash2 } from "react-icons/fi";

// Define the Todo item type
interface TodoItem {
    id: string;
    text: string;
    checked: boolean;
    time: string;
}

// Define props for the Todos component
interface TodosProps {
    todos: TodoItem[];
    handleCheck: (id: string) => void;
    removeElement: (id: string) => void;
}

// Define props for the Todo component
interface TodoProps {
    removeElement: (id: string) => void;
    handleCheck: (id: string) => void;
    id: string;
    children: React.ReactNode;
    checked: boolean;
    time: string;
}

const Todos: React.FC<TodosProps> = ({ todos, handleCheck, removeElement }) => {
    return (
        <div className="w-full space-y-3">
            <AnimatePresence>
                {todos.map((t) => (
                    <Todo
                        handleCheck={handleCheck}
                        removeElement={removeElement}
                        id={t.id}
                        key={t.id}
                        checked={t.checked}
                        time={t.time}
                    >
                        {t.text}
                    </Todo>
                ))}
            </AnimatePresence>
        </div>
    );
};

const Todo: React.FC<TodoProps> = ({
    removeElement,
    handleCheck,
    id,
    children,
    checked,
    time,
}) => {
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (!isPresent) {
            const exitAnimation = async (): Promise<void> => {
                animate(
                    "p",
                    { color: checked ? "#6ee7b7" : "#fca5a5" },
                    { ease: "easeIn", duration: 0.125 }
                );

                await animate(
                    scope.current,
                    { scale: 1.025 },
                    { ease: "easeIn", duration: 0.125 }
                );

                await animate(
                    scope.current,
                    { opacity: 0, x: checked ? 24 : -24 },
                    { delay: 0.75 }
                );

                safeToRemove();
            };

            exitAnimation();
        }
    }, [isPresent, animate, checked, safeToRemove, scope]);

    return (
        <motion.div
            ref={scope}
            layout
            className="relative flex w-full items-center gap-3 rounded border border-zinc-700 bg-zinc-900 p-3"
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={() => handleCheck(id)}
                className="size-4 accent-indigo-400"
            />
            <p
                className={`text-white transition-colors ${
                    checked && "text-zinc-400"
                }`}
            >
                {children}
            </p>
            <div className="ml-auto flex gap-1.5">
                <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-400">
                    <FiClock />
                    <span>{time}</span>
                </div>
                <button
                    onClick={() => removeElement(id)}
                    className="rounded bg-red-300/20 px-1.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
                >
                    <FiTrash2 />
                </button>
            </div>
        </motion.div>
    );
};

// Handler functions to update todos
interface TodoHandlers {
    handleCheck: (id: string) => void;
    removeElement: (id: string) => void;
}

// Example implementation of the handler functions
const useTodoHandlers = (
    setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>
): TodoHandlers => {
    const handleCheck = (id: string): void => {
        setTodos((pv) =>
            pv.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
        );
    };

    const removeElement = (id: string): void => {
        setTodos((pv) => pv.filter((t) => t.id !== id));
    };

    return { handleCheck, removeElement };
};

export { Todos, Todo, useTodoHandlers, type TodoItem, type TodoHandlers };
