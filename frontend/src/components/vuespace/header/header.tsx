"use client";
import Participants from "@/components/vuespace/header/participants";
import LayoutSwitcher from "@/components/vuespace/header/layout-switcher";
import { Separator } from "@/components/ui/separator";
// import ThemeToggle from "@/components/theme-toggle";
import ActionCenter from "./buttons/action-center";
import FileInfo from "./buttons/file-info";
import ShareButton from "./buttons/share";
// import Notifications from "./buttons/notifications";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface HeaderProps {
    option: "Canvas" | "Document" | "Both";
    setOption: React.Dispatch<
        React.SetStateAction<"Canvas" | "Document" | "Both">
    >;
}

const Header: React.FC<HeaderProps> = ({ option, setOption }) => {
    const isMobile = useIsMobile();
    const { open } = useSidebar();
    console.log(isMobile);
    return (
        <header
            className={cn(
                `fixed z-50 transition-all duration-200 ${
                    open ? "lg:pr-67" : ""
                }`,
                !isMobile
                    ? "w-[calc(100%-16px)] px-3 top-5"
                    : "w-full px-3 top-3"
            )}
        >
            <div className="border border-border/80 rounded-xl bg-card/80 backdrop-blur-md h-12 md:h-16 flex justify-between items-center gap-2 px-4 shadow-lg/2">
                {/* Left area */}
                <div className="flex-1 flex items-center gap-2">
                    {/* <Link className="inline-flex" href="/dashboard">
                        <LogoIcon />
                    </Link> */}
                    <SidebarTrigger
                        data-state={open ? "invisible" : "visible"}
                        className="peer size-7 text-muted-foreground/80 hover:text-foreground/80 hover:bg-transparent! sm:-ms-1.5 lg:data-[state=invisible]:opacity-0 lg:data-[state=invisible]:pointer-events-none transition-opacity ease-in-out duration-200 cursor-pointer"
                        isOutsideSidebar
                    />

                    <ActionCenter />
                </div>
                {/* Center area */}
                <div className="grow flex justify-center">
                    <LayoutSwitcher setOption={setOption} option={option} />
                </div>
                {/* Right area */}
                <div className="flex-1 flex justify-end items-center gap-3">
                    {/**hide this in large apps */}
                    <Participants />
                    <ShareButton />
                    {/* <Notifications /> */}
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
};
export default Header;
