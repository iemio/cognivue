"use client";

import { useState } from "react";
import { MessageSquare as BellIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const initialComments = [
    {
        id: 1,
        image: "/avatar-80-01.jpg",
        user: "Chris Tompson",
        action: "requested review on",
        target: "PR #42: Feature implementation",
        timestamp: "15 minutes ago",
        unread: true,
    },
    {
        id: 2,
        image: "/avatar-80-02.jpg",
        user: "Emma Davis",
        action: "shared",
        target: "New component library",
        timestamp: "45 minutes ago",
        unread: true,
    },
    {
        id: 3,
        image: "/avatar-80-03.jpg",
        user: "James Wilson",
        action: "assigned you to",
        target: "API integration task",
        timestamp: "4 hours ago",
        unread: false,
    },
    {
        id: 4,
        image: "/avatar-80-04.jpg",
        user: "Alex Morgan",
        action: "replied to your comment in",
        target: "Authentication flow",
        timestamp: "12 hours ago",
        unread: false,
    },
    {
        id: 5,
        image: "/avatar-80-05.jpg",
        user: "Sarah Chen",
        action: "commented on",
        target: "Dashboard redesign",
        timestamp: "2 days ago",
        unread: false,
    },
    {
        id: 6,
        image: "/avatar-80-06.jpg",
        user: "Miky Derya",
        action: "mentioned you in",
        target: "Origin UI open graph image",
        timestamp: "2 weeks ago",
        unread: false,
    },
];

function Dot({ className }: { className?: string }) {
    return (
        <svg
            width="6"
            height="6"
            fill="currentColor"
            viewBox="0 0 6 6"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <circle cx="3" cy="3" r="3" />
        </svg>
    );
}

export default function Notifications() {
    const [comments, setNotifications] = useState(initialComments);
    const unreadCount = comments.filter((n) => n.unread).length;

    const handleMarkAllAsRead = () => {
        setNotifications(
            comments.map((comment) => ({
                ...comment,
                unread: false,
            }))
        );
    };

    const handleNotificationClick = (id: number) => {
        setNotifications(
            comments.map((comment) =>
                comment.id === id ? { ...comment, unread: false } : comment
            )
        );
    };

    return (
        <Popover>
            <Tooltip>
                <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                        <Button
                            size="icon"
                            variant="outline"
                            className="relative bg-transparent cursor-pointer"
                            aria-label="Open notifications"
                        >
                            <BellIcon size={16} aria-hidden="true" />
                            {unreadCount > 0 && (
                                <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
                                    {unreadCount > 99 ? "99+" : unreadCount}
                                </Badge>
                            )}
                        </Button>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" showArrow={true}>
                    View comments{" "}
                    <kbd className="bg-background text-muted-foreground/70 ms-2 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                        ⌘⇧C{" "}
                    </kbd>
                </TooltipContent>
            </Tooltip>
            <PopoverContent className="w-80 p-1 mt-1 mr-4">
                <div className="flex items-baseline justify-between gap-4 px-3 py-2">
                    <div className="text-sm font-semibold">Comments</div>
                    {unreadCount > 0 && (
                        <button
                            className="text-xs font-medium hover:underline"
                            onClick={handleMarkAllAsRead}
                        >
                            Mark all as read
                        </button>
                    )}
                </div>
                <div
                    role="separator"
                    aria-orientation="horizontal"
                    className="bg-border -mx-1 my-1 h-px"
                ></div>
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
                    >
                        <div className="relative flex items-start gap-3 pe-3">
                            <img
                                className="size-9 rounded-md"
                                src={comment.image}
                                width={32}
                                height={32}
                                alt={comment.user}
                            />
                            <div className="flex-1 space-y-1">
                                <button
                                    className="text-foreground/80 text-left after:absolute after:inset-0"
                                    onClick={() =>
                                        handleNotificationClick(comment.id)
                                    }
                                >
                                    <span className="text-foreground font-medium hover:underline">
                                        {comment.user}
                                    </span>{" "}
                                    {comment.action}{" "}
                                    <span className="text-foreground font-medium hover:underline">
                                        {comment.target}
                                    </span>
                                    .
                                </button>
                                <div className="text-muted-foreground text-xs">
                                    {comment.timestamp}
                                </div>
                            </div>
                            {comment.unread && (
                                <div className="absolute end-0 self-center">
                                    <Dot />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    );
}
