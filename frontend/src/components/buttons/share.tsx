"use client";

import { CheckIcon, CopyIcon, Share2 as Share, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import QRCode from "qrcode";
import { useTheme } from "next-themes";

export default function Notifications() {
    const id = useId();
    const [emails, setEmails] = useState([""]);
    const [copied, setCopied] = useState<boolean>(false);
    const lastInputRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [currentURL, setCurrentURL] = useState("");
    const { theme } = useTheme();
    const addEmail = () => {
        setEmails([...emails, ""]);
    };

    const handleEmailChange = (index: number, value: string) => {
        const newEmails = [...emails];
        newEmails[index] = value;
        setEmails(newEmails);
    };

    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const [qrCode, setQrCode] = useState<string | null>(null);

    useEffect(() => {
        setCurrentURL(window.location.href);

        const generateQRCode = async () => {
            const qr = await QRCode.toDataURL(currentURL, {
                width: 280, // Size of the QR code
                margin: 0, // Margin around QR code
                color: {
                    dark: theme === "dark" ? "#fff" : "#000", // Custom color for dark parts (default is black)
                    light: theme === "dark" ? "#000" : "#fff", // Custom color for light parts (default is white)
                },
            });
            setQrCode(qr);
        };
        generateQRCode();
    }, [currentURL]);

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
                            <Share size={16} aria-hidden="true" />
                        </Button>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" showArrow={true}>
                    Share file{" "}
                    <kbd className="bg-background text-muted-foreground/70 ms-2 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                        ⌘⇧S{" "}
                    </kbd>
                </TooltipContent>
            </Tooltip>
            <PopoverContent className="w-80 mt-1 mr-4">
                <div className="flex flex-col gap-2">
                    <div className="text-md font-medium">Share file</div>
                    <hr className="my-1 border-t" />
                    {/* <div className="flex flex-wrap justify-center gap-2">
                        <Button
                            size="icon"
                            variant="outline"
                            className="bg-transparent"
                            aria-label="Embed"
                        >
                            <RiCodeFill size={16} aria-hidden="true" />
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            className="bg-transparent"
                            aria-label="Share on Twitter"
                        >
                            <RiTwitterXFill size={16} aria-hidden="true" />
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            className="bg-transparent"
                            aria-label="Share on Facebook"
                        >
                            <RiFacebookFill size={16} aria-hidden="true" />
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            className="bg-transparent"
                            aria-label="Share via email"
                        >
                            <RiMailLine size={16} aria-hidden="true" />
                        </Button>
                    </div> */}

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <div className="*:not-first:mt-2">
                                <Label>Share via email</Label>
                                <div className="space-y-3">
                                    {emails.map((email, index) => (
                                        <Input
                                            key={index}
                                            id={`team-email-${index + 1}`}
                                            placeholder="hi@yourcompany.com"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                handleEmailChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            ref={
                                                index === emails.length - 1
                                                    ? lastInputRef
                                                    : undefined
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={addEmail}
                                className="text-sm underline hover:no-underline"
                            >
                                + Add another
                            </button>
                        </div>
                        {/* <Button type="button" className="w-full">
                            Send invites
                        </Button> */}
                        <Button size="sm" className="cursor-pointer w-full">
                            Send files
                        </Button>
                    </form>
                    <hr className="my-1 border-t" />
                    <div className="*:not-first:mt-2">
                        <Label htmlFor={id}>
                            {/* Share as QR Code or via magic link */}
                        </Label>
                        <div className="relative flex flex-row gap-2 items-center">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="relative bg-transparent cursor-pointer w-10"
                                        aria-label="Open notifications"
                                    >
                                        <QrCode size={16} aria-hidden="true" />
                                    </Button>
                                    {/* <div></div> */}
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-80 mr-2"
                                    side="left"
                                >
                                    <div className="flex flex-col gap-4 items-center mt-2">
                                        <div> Share as QR Code</div>
                                        <div>
                                            {qrCode ? (
                                                <img
                                                    src={qrCode}
                                                    alt="QR Code"
                                                />
                                            ) : (
                                                "Generating QR Code..."
                                            )}
                                        </div>
                                        <div className="text-xs">
                                            Scan the QR code with a tablet or
                                            phone camera to quickly open this
                                            file on other devices.
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Input
                                ref={inputRef}
                                id={id}
                                className="pe-9"
                                type="text"
                                defaultValue={currentURL}
                                aria-label="Share link"
                                readOnly
                            />
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={handleCopy}
                                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                                            aria-label={
                                                copied
                                                    ? "Copied"
                                                    : "Copy link to clipboard"
                                            }
                                            disabled={copied}
                                        >
                                            <div
                                                className={cn(
                                                    "transition-all",
                                                    copied
                                                        ? "scale-100 opacity-100"
                                                        : "scale-0 opacity-0"
                                                )}
                                            >
                                                <CheckIcon
                                                    className="stroke-emerald-500"
                                                    size={16}
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div
                                                className={cn(
                                                    "absolute transition-all",
                                                    copied
                                                        ? "scale-0 opacity-0"
                                                        : "scale-100 opacity-100"
                                                )}
                                            >
                                                <CopyIcon
                                                    size={16}
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="px-2 py-1 text-xs">
                                        Copy link
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
