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

const nodes = [
    {
        name: "Canvas",
        href: "/layout/schema-visualizer",
    },
    {
        name: "Both",
        href: "/layout/schema-visualizer",
    },
    {
        name: "Document",
        href: "/layout/schema-visualizer",
    },
];

export default function LayoutSwitcher() {
    const [activeTemplate, setActiveTemplate] = useState(nodes[0] ?? null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="max-sm:hidden">
                    <BreadcrumbLink href="#">Vuespace</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-border max-sm:hidden">
                    {" "}
                    /{" "}
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <DropdownMenu onOpenChange={setDropdownOpen}>
                        <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-foreground cursor-pointer">
                            {activeTemplate?.name ?? "Select Template"}
                            <ChevronDownIcon
                                className={`-me-1 opacity-60 ${
                                    dropdownOpen && "rotate-180"
                                }`}
                                size={16}
                                aria-hidden="true"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent sideOffset={10}>
                            {nodes.map((template) => (
                                <DropdownMenuItem
                                    key={template.name}
                                    onClick={() => setActiveTemplate(template)}
                                    className="cursor-pointer"
                                >
                                    {template.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        // </div>
    );
}
