"use client";

import { useState } from "react";
import { Pencil, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/color-dropdown-menu";
import { RiMore2Fill } from "@remixicon/react";

export default function More() {
    const [color, setColor] = useState("background");
    const [draggable, setDraggable] = useState(true);
    const [connectable, setConnectable] = useState(true);
    const [selectable, setSelectable] = useState(false);

    const colors = ["background", "red", "orange", "amber", "blue", "emerald"];
    console.log("color", color);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer shadow-none hover:bg-transparent -my-2 -me-2 text-muted-foreground/60 hover:text-muted-foreground"
                    aria-label="Open edit menu"
                >
                    <RiMore2Fill className="size-5" aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Pencil
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                        <span>Edit</span>
                        <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger inset>
                            Color
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                    value={color}
                                    onValueChange={setColor}
                                    className="flex gap-1.5"
                                >
                                    {colors.map((c, index) => (
                                        <DropdownMenuRadioItem
                                            key={index}
                                            value={c}
                                            className={`size-6 border-${c}-500 bg-${c}-500 shadow-none data-[state=checked]:border-${c}-500 data-[state=checked]:bg-${c}-500 .data-[state=unchecked]:border-${c}-500`}
                                        ></DropdownMenuRadioItem>
                                    ))}
                                    {/* <DropdownMenuRadioItem
                                        value={"blue"}
                                        className={`size-6 border-orange-500 bg-orange-500 shadow-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 .data-[state=unchecked]:border-blue-500`}
                                    ></DropdownMenuRadioItem> */}
                                    {/* <DropdownMenuRadioItem
                                        value={"blue"}
                                        className={`size-6 border-blue-500 bg-blue-500 shadow-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 .data-[state=unchecked]:border-blue-500`}
                                    ></DropdownMenuRadioItem> */}
                                    {/* <DropdownMenuRadioItem
                                        value="Black"
                                        className="bg-black-500 focus:bg-black-500 h-6"
                                    ></DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem
                                        value="Red"
                                        className="size-6 border-red-500 bg-red-500 shadow-none data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500"
                                        // disabled
                                    ></DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem
                                        value="Amber"
                                        className="bg-amber-500 focus:bg-amber-500 h-6"
                                    ></DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem
                                        value="Emerald"
                                        className="bg-emerald-500 focus:bg-emerald-500 h-6"
                                    ></DropdownMenuRadioItem> */}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger inset>
                            Settings
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuCheckboxItem
                                    checked={draggable}
                                    onCheckedChange={setDraggable}
                                >
                                    Draggable
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={connectable}
                                    onCheckedChange={setConnectable}
                                >
                                    Connectable
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={selectable}
                                    onCheckedChange={setSelectable}
                                >
                                    Selectable
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuGroup> */}
                {/* <DropdownMenuItem>
                        <Share2Icon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                        <span>Share</span>
                    </DropdownMenuItem> */}
                {/* <DropdownMenuItem>
                        <ArchiveRestoreIcon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                        <span>Archive</span>
                    </DropdownMenuItem> */}
                {/* </DropdownMenuGroup> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                    <TrashIcon size={16} aria-hidden="true" />
                    <span>Delete</span>
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
