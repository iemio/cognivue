"use client";
import Link from "next/link";
import Participants from "@/components/participants";
import TemplateSwitcher from "@/components/template-switcher";
import { Separator } from "@/components/ui/separator";
// import ThemeToggle from "@/components/theme-toggle";
import ShareButton from "./buttons/share";
import Notifications from "./buttons/notifications";
import Logo from "./icons/logo";
import FileInfo from "./buttons/file-info";
import ActionCenter from "./action-center";

export default function Header() {
    return (
        <header className="fixed top-2 md:top-5 w-full px-2 md:px-5 z-50">
            <div className="border border-border/80 rounded-xl bg-card/80 backdrop-blur-md h-12 md:h-16 flex justify-between items-center gap-2 px-4 shadow-lg/2">
                {/* Left area */}
                <div className="flex-1 flex items-center gap-2">
                    <Link className="inline-flex" href="/">
                        <Logo />
                    </Link>
                    <ActionCenter />
                </div>
                {/* Center area */}
                <div className="grow flex justify-center">
                    <TemplateSwitcher />
                </div>
                {/* Right area */}
                <div className="flex-1 flex justify-end items-center gap-3">
                    <Participants />
                    <ShareButton />
                    <Notifications />
                    <Separator
                        orientation="vertical"
                        className="min-h-6 max-sm:hidden"
                    />
                    <FileInfo />
                    {/* <ThemeToggle /> */}
                </div>
            </div>
        </header>
    );
}
