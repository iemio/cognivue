import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
import { EllipsisIcon } from "lucide-react";

import { defaultActions } from "@/lib/actions";
import { Action } from "@/types/action";
// import { SettingsDialog } from "./settings-dialog";

// import { Badge } from "./ui/badge";

// import {
//     Bell,
//     Check,
//     Globe,
//     Home,
//     Keyboard,
//     Link,
//     Lock,
//     Menu,
//     MessageCircle,
//     Paintbrush,
//     Settings,
//     Video,
// } from "lucide-react";

const actions: Action[] = [
    {
        name: "Export Schema",
        action: "exportSchema",
    },

    ...defaultActions,
];

const ActionCenter = () => {
    // if (true) {
    //     return (
    //         <Badge className="rounded" variant="outline">
    //             Read only
    //         </Badge>
    //     );
    // }
    // const { setOpen } = useModal();
    // const [selectedAction, setSelectedAction] = useState<Action | null>(null);

    // Function to render dialog content based on selected action
    // const renderDialogContent = () => {
    //     if (!selectedAction) return null;

    //     switch (selectedAction.action) {
    //         case "exportSchema":
    //             return <>abc</>;
    //         default:
    //             // Return the contents of SettingsDialog but without the Dialog wrapper
    //             // This is using the component structure from your pasted code
    //             return <SettingsDialog />;
    //         case "settings":
    //             const data = {
    //                 nav: [
    //                     { name: "Notifications", icon: Bell },
    //                     { name: "Navigation", icon: Menu },
    //                     { name: "Home", icon: Home },
    //                     { name: "Appearance", icon: Paintbrush },
    //                     { name: "Messages & media", icon: MessageCircle },
    //                     { name: "Language & region", icon: Globe },
    //                     { name: "Accessibility", icon: Keyboard },
    //                     { name: "Mark as read", icon: Check },
    //                     { name: "Audio & video", icon: Video },
    //                     { name: "Connected accounts", icon: Link },
    //                     { name: "Privacy & visibility", icon: Lock },
    //                     { name: "Advanced", icon: Settings },
    //                 ],
    //             };
    //             return <>def</>;
    //     }
    // };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer rounded-full shadow-none lg:peer-data-[state=invisible]:-translate-x-7.5 transition-transform ease-in-out duration-300"
                        aria-label="Open edit menu"
                    >
                        <EllipsisIcon size={16} aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {/* <SettingsDialog /> */}
                    {actions.map((action, index) => {
                        const isDefault = action.default ?? false;
                        const nextAction = actions[index + 1];

                        // if (nextAction && !nextAction.default && isDefault) {
                        //     console.log(
                        //         "Next action exists and is not default:",
                        //         nextAction
                        //     );
                        // }

                        return (
                            <div>
                                <div key={action.name}>
                                    <DropdownMenuItem
                                        onClick={
                                            () => {}
                                            // () => setOpen(true)
                                            // handleActionClick(action)
                                        }
                                        className="cursor-pointer"
                                        key={action.name}
                                    >
                                        {/* <SettingsDialog /> */}
                                        {action.name}
                                    </DropdownMenuItem>

                                    {nextAction &&
                                        nextAction.default &&
                                        !isDefault && <DropdownMenuSeparator />}
                                </div>
                            </div>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* <ModalBody onClose={() => {}}>
                <ModalContent>
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                        helloooo
                    </div>
                </ModalContent>
                <ModalFooter className="gap-4">
                    <button
                        className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28 cursor-pointer"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </button>
                    {/* <button
                        disabled={!file}
                        className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28 cursor-pointer"
                        onClick={() => setLoading(true)}
                    > */}
            {/* <button
                        disabled={false}
                        className="bg-gray-900 text-gray-300 dark:bg-gray-100 dark:text-gray-800 text-sm px-2 py-1 rounded-md border border-gray-900 w-28 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400 disabled:border-gray-600 dark:disabled:bg-gray-300 dark:disabled:text-gray-600 dark:disabled:border-gray-400"
                        onClick={() => {}}
                    >
                        Save Changes
                    </button>
                </ModalFooter>
            </ModalBody> */}
        </>
    );
};

export default ActionCenter;
