"use client";

import * as React from "react";
import Link from "next/link";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "@/components/icons/logo";
import { EventColor } from "@/types/priority";
import { NewsArticle, News } from "./sidebar-news";

export const comments = [
    {
        id: "my-events",
        name: "My Events",
        color: "emerald" as EventColor,
        isActive: true,
    },
];
// use different hrefs
const DEMO_ARTICLES: NewsArticle[] = [
    {
        href: "https://dub.co/changelog/regions-support",
        title: "Regions support in analytics",
        summary: "You can now filter your analytics by regions",
        image: "https://assets.dub.co/changelog/regions-support.png",
    },
    {
        href: "https://dub.co/blog/soc2",
        title: "Dub is now SOC 2 Type II Compliant",
        summary:
            "We're excited to announce that Dub has successfully completed a SOC 2 Type II audit to further demonstrate our commitment to security.",
        image: "https://assets.dub.co/blog/soc2.jpg",
    },
    {
        href: "https://dub.co/changelog/utm-templates",
        title: "UTM Templates",
        summary:
            "You can now create UTM templates to streamline UTM campaign management across your team.",
        image: "https://assets.dub.co/changelog/utm-templates.jpg",
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props} className=" max-lg:p-3 lg:pe-1">
            <SidebarHeader>
                <div className="flex justify-between items-center gap-2 mt-2">
                    <Link className="inline-flex" href="/">
                        <span className="sr-only">Logo</span>
                        <Logo />
                        {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                        >
                            <path
                                fill="#52525C"
                                d="m10.661.863-2.339 1.04 5.251 11.794L1.521 9.072l-.918 2.39 12.053 4.627-11.794 5.25 1.041 2.34 11.794-5.252L9.071 30.48l2.39.917 4.626-12.052 5.251 11.793 2.339-1.04-5.251-11.795 12.052 4.627.917-2.39-12.052-4.627 11.794-5.25-1.041-2.34-11.794 5.252L22.928 1.52l-2.39-.917-4.626 12.052L10.662.863Z"
                            />
                            <path
                                fill="#F4F4F5"
                                d="M17.28 0h-2.56v12.91L5.591 3.78l-1.81 1.81 9.129 9.129H0v2.56h12.91L3.78 26.409l1.81 1.81 9.129-9.129V32h2.56V19.09l9.128 9.129 1.81-1.81-9.128-9.129H32v-2.56H19.09l9.129-9.129-1.81-1.81-9.129 9.129V0Z"
                            />
                        </svg> */}
                    </Link>
                    <SidebarTrigger className="text-muted-foreground/80 hover:text-foreground/80 hover:bg-transparent!" />
                </div>
            </SidebarHeader>
            <SidebarContent className="gap-0 mt-3 pt-3 border-t">
                <SidebarGroup className="px-1">
                    sidebar widget here
                </SidebarGroup>
                <SidebarGroup className="px-1 mt-3 pt-4 border-t">
                    <SidebarGroupLabel className="uppercase text-muted-foreground/65">
                        Comments
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {comments.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        asChild
                                        className="relative rounded-md [&>svg]:size-auto justify-between has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px]"
                                    >
                                        <span>
                                            <span className="font-medium flex items-center justify-between gap-3">
                                                {/* <Checkbox
                                                    id={item.id}
                                                    className="sr-only peer"
                                                    checked={isColorVisible(
                                                        item.color
                                                    )}
                                                    onCheckedChange={() =>
                                                        toggleColorVisibility(
                                                            item.color
                                                        )
                                                    }
                                                />
                                                <RiCheckLine
                                                    className="peer-not-data-[state=checked]:invisible"
                                                    size={16}
                                                    aria-hidden="true"
                                                /> */}
                                                <label
                                                    htmlFor={item.id}
                                                    className="peer-not-data-[state=checked]:line-through peer-not-data-[state=checked]:text-muted-foreground/65 after:absolute after:inset-0"
                                                >
                                                    {item.name}
                                                </label>
                                            </span>
                                            <span
                                                className="size-1.5 rounded-full bg-(--event-color)"
                                                style={
                                                    {
                                                        "--event-color": `var(--color-${item.color}-400)`,
                                                    } as React.CSSProperties
                                                }
                                            ></span>
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {/**nav footer here */}
                <News articles={DEMO_ARTICLES} />
            </SidebarFooter>
        </Sidebar>
    );
}
