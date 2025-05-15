"use client";

import * as React from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const transition = {
    type: "spring",
    bounce: 0.1,
    duration: 0.25,
};

export interface ToolbarItem {
    id: number;
    label: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

interface ToolbarProps {
    items: ToolbarItem[];
}

export function Toolbar({ items }: ToolbarProps) {
    const [active, setActive] = React.useState<number | null>(null);
    const [contentRef, { height: contentHeight }] = useMeasure();
    const [menuRef, { width: containerWidth }] = useMeasure();
    const [isOpen, setIsOpen] = React.useState(false);
    const [maxWidth, setMaxWidth] = React.useState(0);
    const toolbarRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!containerWidth || maxWidth > 0) return;
        setMaxWidth(containerWidth);
    }, [containerWidth, maxWidth]);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                toolbarRef.current &&
                !toolbarRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setActive(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <MotionConfig transition={transition}>
            <div ref={toolbarRef}>
                <Card>
                    <div className="overflow-hidden">
                        <AnimatePresence initial={false} mode="sync">
                            {isOpen && (
                                <motion.div
                                    key="content"
                                    initial={{ height: 0 }}
                                    animate={{ height: contentHeight || 0 }}
                                    exit={{ height: 0 }}
                                    style={{ width: maxWidth }}
                                >
                                    <div ref={contentRef} className="p-2">
                                        {items.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    opacity:
                                                        active === item.id
                                                            ? 1
                                                            : 0,
                                                }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <div
                                                    className={cn(
                                                        "px-2 pt-2 text-sm",
                                                        active === item.id
                                                            ? "block"
                                                            : "hidden"
                                                    )}
                                                >
                                                    {item.content}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="flex space-x-2 p-2" ref={menuRef}>
                        {items.map((item) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "h-9 w-9 cursor-pointer",
                                    active === item.id &&
                                        "bg-muted text-foreground"
                                )}
                                onClick={() => {
                                    if (!isOpen) setIsOpen(true);
                                    if (active === item.id) {
                                        setIsOpen(false);
                                        setActive(null);
                                        return;
                                    }
                                    setActive(item.id);
                                }}
                            >
                                <span className="sr-only">{item.label}</span>
                                {item.icon}
                            </Button>
                        ))}
                    </div>
                </Card>
            </div>
        </MotionConfig>
    );
}
