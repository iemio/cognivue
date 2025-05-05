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
        name: "Schema-table",
        href: "/templates/schema-visualizer",
    },
];

export default function TemplateSwitcher() {
    const [activeTemplate, setActiveTemplate] = useState(nodes[0] ?? null);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="max-sm:hidden">
                    <BreadcrumbLink href="#">Nodes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-border max-sm:hidden">
                    {" "}
                    /{" "}
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 font-medium text-foreground cursor-pointer">
                            {activeTemplate?.name ?? "Select Template"}
                            <ChevronDownIcon
                                className="-me-1 opacity-60"
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
