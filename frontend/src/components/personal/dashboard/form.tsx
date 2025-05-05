import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { TodoItem } from "./todo";

interface FormProps {
    setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const Form: React.FC<FormProps> = ({ setTodos }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [time, setTime] = useState<number>(15);
    const [text, setText] = useState<string>("");
    const [unit, setUnit] = useState<"mins" | "hrs">("mins");

    const handleSubmit = (): void => {
        if (!text.length) {
            return;
        }

        setTodos((pv) => [
            {
                id: Math.random().toString(),
                text,
                checked: false,
                time: `${time} ${unit}`,
            },
            ...pv,
        ]);

        setTime(15);
        setText("");
        setUnit("mins");
    };

    return (
        <div className="fixed bottom-6 w-full left-1/2 max-w-3xl -translate-x-1/2 px-4">
            <AnimatePresence>
                {visible && (
                    <motion.form
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 25 }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-3"
                    >
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What do you need to do?"
                            className="h-24 w-full resize-none rounded bg-zinc-900 p-3 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="number"
                                    className="w-24 rounded bg-zinc-700 px-1.5 py-1 text-sm text-zinc-50 focus:outline-0"
                                    value={time}
                                    onChange={(e) =>
                                        setTime(parseInt(e.target.value))
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => setUnit("mins")}
                                    className={`rounded px-1.5 py-1 text-xs ${
                                        unit === "mins"
                                            ? "bg-white text-zinc-950"
                                            : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"
                                    }`}
                                >
                                    mins
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUnit("hrs")}
                                    className={`rounded px-1.5 py-1 text-xs ${
                                        unit === "hrs"
                                            ? "bg-white text-zinc-950"
                                            : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"
                                    }`}
                                >
                                    hrs
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500 cursor-pointer"
                            >
                                Submit or next :)
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
            <button
                onClick={() => setVisible((pv) => !pv)}
                className="grid w-full place-content-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900 cursor-pointer"
            >
                <FiPlus
                    className={`transition-transform ${
                        visible ? "rotate-45" : "rotate-0"
                    }`}
                />
            </button>
        </div>
    );
};

export default Form;
