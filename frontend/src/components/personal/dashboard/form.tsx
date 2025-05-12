// // blank as inbuilt template
// import { AnimatePresence, motion } from "motion/react";
// import { useState } from "react";
// import { FiPlus } from "react-icons/fi";
// import { TodoItem } from "./todo";
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbList,
//     BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ChevronDownIcon } from "lucide-react";

// interface FormProps {
//     setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
// }

// const templates = [
//     {
//         name: "Blank",
//         href: "/templates/blank",
//     },
//     {
//         name: "Schema-builder",
//         href: "/templates/schema-builder",
//     },
//     {
//         name: "form-builder",
//         href: "/templates/form-builder",
//     },
//     {
//         name: "Agentic-workflow",
//         href: "/templates/form-builder",
//     },
// ];

// const Form: React.FC<FormProps> = ({ setTodos }) => {
//     const [visible, setVisible] = useState<boolean>(false);
//     const [time, setTime] = useState<number>(15);
//     const [text, setText] = useState<string>("");
//     const [fileType, setFileType] = useState<"blank" | "template">("blank");
//     const [activeTemplate, setActiveTemplate] = useState(templates[0] ?? null);

//     const handleSubmit = (): void => {
//         if (!text.length) {
//             return;
//         }

//         setTodos((pv) => [
//             {
//                 id: Math.random().toString(),
//                 text,
//                 checked: false,
//                 time: `${time} ${"min"}`,
//             },
//             ...pv,
//         ]);

//         setTime(15);
//         setText("");
//         setFileType("blank");
//         setActiveTemplate(templates[0]);
//     };

//     return (
//         <div className="fixed bottom-6 w-full left-1/2 max-w-3xl -translate-x-1/2 px-4">
//             <AnimatePresence>
//                 {visible && (
//                     <motion.form
//                         initial={{ opacity: 0, y: 25 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 25 }}
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             handleSubmit();
//                         }}
//                         className="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-3"
//                     >
//                         <input
//                             value={text}
//                             onChange={(e) => setText(e.target.value)}
//                             placeholder="Name of file"
//                             className="h-10 w-full resize-none rounded bg-zinc-900 p-1 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0 mb-10"
//                         />

//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-1.5">
//                                 <Breadcrumb>
//                                     <BreadcrumbList>
//                                         <BreadcrumbItem className="">
//                                             {/* <BreadcrumbLink href="#">
//                                                 Nodes
//                                             </BreadcrumbLink> */}
//                                             <div
//                                                 className={`rounded px-1.5 py-1 text-xs ${
//                                                     fileType === "template"
//                                                         ? "bg-white text-zinc-950"
//                                                         : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"
//                                                 }`}
//                                             >
//                                                 Template
//                                             </div>
//                                         </BreadcrumbItem>
//                                         <BreadcrumbSeparator className="text-border">
//                                             {" "}
//                                             /{" "}
//                                         </BreadcrumbSeparator>
//                                         <BreadcrumbItem>
//                                             <DropdownMenu>
//                                                 <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-foreground cursor-pointer">
//                                                     {activeTemplate?.name ??
//                                                         "Select Template"}
//                                                     <ChevronDownIcon
//                                                         className="-me-1 opacity-60"
//                                                         size={16}
//                                                         aria-hidden="true"
//                                                     />
//                                                 </DropdownMenuTrigger>
//                                                 <DropdownMenuContent
//                                                     align="start"
//                                                     sideOffset={12}
//                                                 >
//                                                     {templates.map(
//                                                         (template, index) => (
//                                                             <DropdownMenuItem
//                                                                 key={
//                                                                     template.name
//                                                                 }
//                                                                 onClick={() => {
//                                                                     setActiveTemplate(
//                                                                         template
//                                                                     );
//                                                                     setFileType(
//                                                                         index
//                                                                             ? "template"
//                                                                             : "blank"
//                                                                     );
//                                                                 }}
//                                                                 className="cursor-pointer"
//                                                             >
//                                                                 {template.name}
//                                                             </DropdownMenuItem>
//                                                         )
//                                                     )}
//                                                 </DropdownMenuContent>
//                                             </DropdownMenu>
//                                         </BreadcrumbItem>
//                                     </BreadcrumbList>
//                                 </Breadcrumb>
//                             </div>

//                             {/* <div>Select template</div> */}
//                             <button
//                                 type="submit"
//                                 className="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500 cursor-pointer"
//                             >
//                                 Submit
//                                 {/* { Submit or next :)} */}
//                             </button>
//                         </div>
//                     </motion.form>
//                 )}
//             </AnimatePresence>
//             <button
//                 onClick={() => setVisible((pv) => !pv)}
//                 className="grid w-full place-content-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900 cursor-pointer"
//             >
//                 <FiPlus
//                     className={`transition-transform ${
//                         visible ? "rotate-45" : "rotate-0"
//                     }`}
//                 />
//             </button>
//         </div>
//     );
// };

// export default Form;
"use client";
// blank as inbuilt template
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { TodoItem } from "./todo";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUpIcon } from "lucide-react";

interface FormProps {
    setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const templates = [
    {
        name: "Blank",
        href: "/templates/blank",
    },
    {
        name: "Schema-builder",
        href: "/templates/schema-builder",
    },
    {
        name: "form-builder",
        href: "/templates/form-builder",
    },
    {
        name: "Agentic-workflow",
        href: "/templates/form-builder",
    },
];

const Form: React.FC<FormProps> = ({ setTodos }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [time, setTime] = useState<number>(15);
    const [text, setText] = useState<string>("");
    const [fileType, setFileType] = useState<"blank" | "template">("blank");
    const [activeTemplate, setActiveTemplate] = useState(templates[0] ?? null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const handleSubmit = (): void => {
        if (!text.length) {
            return;
        }

        setTodos((pv) => [
            {
                id: Math.random().toString(),
                text,
                checked: false,
                time: `${time} ${"min"}`,
            },
            ...pv,
        ]);

        setTime(15);
        setText("");
        setFileType("blank");
        setActiveTemplate(templates[0]);
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
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Name of file"
                            className="h-10 w-full resize-none rounded bg-zinc-900 p-1 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0 mb-10"
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="">
                                            <div
                                                className={`rounded px-1.5 py-1 text-xs ${
                                                    fileType === "template"
                                                        ? "bg-white text-zinc-950"
                                                        : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"
                                                }`}
                                            >
                                                Template
                                            </div>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="text-border">
                                            {" "}
                                            /{" "}
                                        </BreadcrumbSeparator>
                                        <BreadcrumbItem>
                                            <DropdownMenu
                                                onOpenChange={setDropdownOpen}
                                            >
                                                <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-foreground cursor-pointer">
                                                    {activeTemplate?.name ??
                                                        "Select Template"}

                                                    <ChevronUpIcon
                                                        className={`-me-1 opacity-60 ${
                                                            dropdownOpen &&
                                                            "rotate-180 cursor-pointer"
                                                        }`}
                                                        size={16}
                                                        aria-hidden="true"
                                                    />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="start"
                                                    sideOffset={12}
                                                >
                                                    {templates.map(
                                                        (template, index) => (
                                                            <DropdownMenuItem
                                                                key={
                                                                    template.name
                                                                }
                                                                onClick={() => {
                                                                    setActiveTemplate(
                                                                        template
                                                                    );
                                                                    setFileType(
                                                                        index
                                                                            ? "template"
                                                                            : "blank"
                                                                    );
                                                                }}
                                                                className="cursor-pointer"
                                                            >
                                                                {template.name}
                                                            </DropdownMenuItem>
                                                        )
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>

                            <button
                                type="submit"
                                className="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500 cursor-pointer"
                            >
                                Submit
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
