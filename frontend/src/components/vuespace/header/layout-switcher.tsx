"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    // DropdownMenuRadioGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoWorkflow } from "react-icons/go";
import { IoDocumentOutline } from "react-icons/io5";
import { BsLayoutSplit } from "react-icons/bs";

const layouts = [
    { name: "Canvas", icon: <GoWorkflow /> },
    { name: "Both", icon: <BsLayoutSplit /> },
    { name: "Document", icon: <IoDocumentOutline /> },
] as const;

interface LayoutSwitcherProps {
    option: "Canvas" | "Document" | "Both";
    setOption: React.Dispatch<
        React.SetStateAction<"Canvas" | "Document" | "Both">
    >;
}

const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({
    option,
    setOption,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="max-sm:hidden">
                    <BreadcrumbLink href="#">Layout</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-border max-sm:hidden">
                    {" "}
                    /{" "}
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <DropdownMenu onOpenChange={setDropdownOpen}>
                        <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-foreground cursor-pointer">
                            {option ?? "Select Layout"}
                            <ChevronDownIcon
                                className={`-me-1 opacity-60 ${
                                    dropdownOpen && "rotate-180"
                                }`}
                                size={16}
                                aria-hidden="true"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent sideOffset={10}>
                            {layouts.map((layout) => (
                                <DropdownMenuItem
                                    key={layout.name}
                                    onClick={() => setOption(layout.name)}
                                    className="cursor-pointer flex flex-row gap-4"
                                >
                                    <div>{layout.icon}</div>
                                    <div>{layout.name}</div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        // </div>
    );
};

export default LayoutSwitcher;
