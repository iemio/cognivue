"use client";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { DirectionAwareTabs } from "./ui/direction-aware-tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Settings2Icon, XIcon } from "lucide-react";

// item ===data for previous builtin node
const item = {
    text: "Gather Data",
    id: 1,
    description:
        "Collect relevant marketing copy from the user's website and competitor sites to understand the current market positioning and identify potential areas for improvement.",
};
const AgentNode = () => {
    const [open, setOpen] = useState(true);
    const [tabChangeRerender, setTabChangeRerender] = useState<number>(1);
    const [topP, setTopP] = useState([10]);
    const [temp, setTemp] = useState([10]);
    const [tokens, setTokens] = useState([10]);
    const tabs = [
        {
            id: 0,
            label: "Title",
            content: (
                <div className="flex w-full flex-col pr-2 py-2">
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.75,
                            delay: 0.15,
                        }}
                    >
                        <label className="text-xs text-neutral-400">
                            Short title for your agent task
                        </label>
                        <motion.input
                            type="text"
                            value={item.text}
                            className=" w-full rounded-lg border font-semibold border-black/10 bg-neutral-800 px-1 py-[6px] text-xl md:text-3xl text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13EEE3]/80 dark:border-white/10"
                            onChange={(e) => {
                                const text = e.target.value;
                                item.text = text;
                            }}
                        />
                    </motion.div>
                </div>
            ),
        },
        {
            id: 1,
            label: "Prompt",
            content: (
                <div className="flex flex-col  pr-2 ">
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.75,
                            delay: 0.15,
                        }}
                    >
                        <label
                            className="text-xs text-neutral-400"
                            htmlFor="prompt"
                        >
                            Prompt{" "}
                            <span className="lowercase">
                                instructing your agent how to{" "}
                                {item.text.slice(0, 20)}
                            </span>
                        </label>
                        <textarea
                            id="prompt"
                            className="h-[100px] w-full resize-none rounded-[6px]  bg-neutral-800 px-2 py-[2px] text-sm text-white placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13EEE3]/80"
                            value={item.description}
                            placeholder="update agent prompt"
                            onChange={(e) => {
                                const description = e.target.value;
                                item.description = description;
                            }}
                        />
                    </motion.div>
                </div>
            ),
        },
        {
            id: 2,
            label: "Settings",
            content: (
                <div className="flex flex-col py-2 px-1 ">
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.75,
                            delay: 0.15,
                        }}
                        className="space-y-3"
                    >
                        <p className="text-xs text-neutral-400">
                            AI settings for the{" "}
                            <span className="lowercase">
                                {item.text.slice(0, 20)} stage
                            </span>
                        </p>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <label
                                    className="text-xs text-neutral-400"
                                    htmlFor="top-p"
                                >
                                    Top P
                                </label>
                                <div className="flex w-1/2 items-center gap-3">
                                    <span className="w-12 rounded-md  bg-black/20 px-2 py-0.5 text-right text-sm text-muted-foreground">
                                        {topP}
                                    </span>
                                    <Slider
                                        id="temperature"
                                        max={1}
                                        defaultValue={topP}
                                        step={0.1}
                                        onValueChange={setTopP}
                                        className="[&_[role=slider]]:h-8 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-md [&_[role=slider]]:border-neutral-100/10 [&_[role=slider]]:bg-neutral-900 [&_[role=slider]]:hover:border-[#13EEE3]/70 "
                                        aria-label="Top P"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <label
                                    className="text-xs text-neutral-400"
                                    htmlFor="top-p"
                                >
                                    Temperature
                                </label>
                                <div className="flex w-1/2 items-center gap-3">
                                    <span className="w-12 rounded-md  bg-black/20 px-2 py-0.5 text-right text-sm text-muted-foreground">
                                        {temp}
                                    </span>
                                    <Slider
                                        id="top-p"
                                        max={1}
                                        defaultValue={temp}
                                        step={0.1}
                                        onValueChange={setTemp}
                                        className="[&_[role=slider]]:h-8 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-md [&_[role=slider]]:border-neutral-100/10 [&_[role=slider]]:bg-neutral-900 [&_[role=slider]]:hover:border-[#13EEE3]/70"
                                        aria-label="Temperature"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <label
                                    className="text-xs text-neutral-400"
                                    htmlFor="top-p"
                                >
                                    Max Tokens
                                </label>
                                <div className="flex w-1/2 items-center gap-3">
                                    <span className="w-12 rounded-md  bg-black/20 px-2 py-0.5 text-right text-sm text-muted-foreground">
                                        {tokens}
                                    </span>
                                    <Slider
                                        id="max_tokens"
                                        max={1}
                                        defaultValue={tokens}
                                        step={0.1}
                                        onValueChange={setTokens}
                                        className="[&_[role=slider]]:h-8 [&_[role=slider]]:w-5 [&_[role=slider]]:rounded-md [&_[role=slider]]:border-neutral-100/10 [&_[role=slider]]:bg-neutral-900 [&_[role=slider]]:hover:border-[#13EEE3]/70"
                                        aria-label="Tokens"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ),
        },
    ];
    return (
        <div
            className={cn(
                "flex h-full w-100 flex-col items-center justify-center gap-2 border-2",
                open ? "py-1 px-1" : "py-3 "
            )}
        >
            {!open && (
                <motion.div
                    key={`${item}`}
                    className=" px-1 min-w-[150px]"
                    initial={{
                        opacity: 0,
                        filter: "blur(4px)",
                    }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                        bounce: 0.2,
                        delay: 0,
                        type: "spring",
                    }}
                >
                    <h4
                        className={cn(
                            "tracking-tighter text-base md:text-lg ",
                            "text-white/70"
                        )}
                    >
                        {` ${item.text}`}
                    </h4>
                </motion.div>
            )}
            <motion.button
                layout
                onClick={() => setOpen(!open)}
                key="collapse"
                className={cn(
                    open
                        ? "absolute right-3 top-3 z-10 "
                        : "relative z-10 ml-auto mr-3 "
                )}
            >
                {open ? (
                    <motion.span
                        initial={{
                            opacity: 0,
                            filter: "blur(4px)",
                        }}
                        animate={{
                            opacity: 1,
                            filter: "blur(0px)",
                        }}
                        exit={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{
                            type: "spring",
                            duration: 1.95,
                        }}
                    >
                        <XIcon className="h-5 w-5 text-neutral-500" />
                    </motion.span>
                ) : (
                    <motion.span
                        initial={{
                            opacity: 0,
                            filter: "blur(4px)",
                        }}
                        animate={{
                            opacity: 1,
                            filter: "blur(0px)",
                        }}
                        exit={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{
                            type: "spring",
                            duration: 0.95,
                        }}
                    >
                        <Settings2Icon className="stroke-1 h-5 w-5 text-white/80  hover:stroke-[#13EEE3]/70 " />
                    </motion.span>
                )}
            </motion.button>

            {/*tabs layout here */}
            <AnimatePresence mode="popLayout">
                {open ? (
                    <motion.div className="flex w-full flex-col ">
                        <div className=" w-full  ">
                            <motion.div
                                initial={{
                                    y: 0,
                                    opacity: 0,
                                    filter: "blur(4px)",
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    filter: "blur(0px)",
                                }}
                                transition={{
                                    type: "spring",
                                    duration: 0.15,
                                }}
                                layout
                                className="  w-full"
                            >
                                <DirectionAwareTabs
                                    className="mr-auto bg-transparent pr-2"
                                    rounded="rounded "
                                    tabs={tabs}
                                    onChange={() =>
                                        setTabChangeRerender(
                                            tabChangeRerender + 1
                                        )
                                    }
                                />
                            </motion.div>
                        </div>

                        <motion.div
                            key={`re-render-${tabChangeRerender}`} //  re-animates the button section on tab change
                            className="mb-2 flex w-full items-center justify-between pl-2"
                            initial={{
                                opacity: 0,
                                filter: "blur(4px)",
                            }}
                            animate={{
                                opacity: 1,
                                filter: "blur(0px)",
                            }}
                            transition={{
                                type: "spring",
                                bounce: 0,
                                duration: 0.55,
                            }}
                        >
                            <motion.div className="flex items-center gap-2 pt-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#13EEE3]" />
                                <span className="text-xs text-neutral-300/80">
                                    Changes
                                </span>
                            </motion.div>
                            <motion.div layout className="ml-auto mr-1  pt-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                    className="h-7 rounded-lg bg-[#13EEE3]/80 hover:bg-[#13EEE3] hover:text-black text-black"
                                >
                                    Apply Changes
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default AgentNode;
