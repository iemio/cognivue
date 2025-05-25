"use client";

import * as React from "react";
import {
    Bell,
    Check,
    Globe,
    Home,
    Keyboard,
    MessageCircle,
    Paintbrush,
    Settings,
    Video,
    FileText,
    Trash2,
} from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";

// Define content types for different actions
export type DialogContentType =
    | "exportSchema"
    | "downloadPNG"
    | "deleteNode"
    | "openSettings";

interface SettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    contentType: DialogContentType;
}

// Navigation data for different content types
const navigationData = {
    exportSchema: [
        { name: "Format", icon: FileText },
        { name: "Options", icon: Settings },
        { name: "Preview", icon: Globe },
    ],
    downloadPNG: [
        { name: "Image Settings", icon: Paintbrush },
        { name: "Quality", icon: Settings },
        { name: "Preview", icon: Globe },
    ],
    deleteNode: [
        { name: "Selection", icon: MessageCircle },
        { name: "Confirmation", icon: Check },
    ],
    openSettings: [
        { name: "Canvas", icon: Home },
        { name: "Document", icon: MessageCircle },
        { name: "Node", icon: Keyboard },
        { name: "Edges", icon: Video },
        { name: "Notifications", icon: Bell },
        { name: "Appearance", icon: Paintbrush },
    ],
};

// Content components for different actions
const ExportSchemaContent = () => (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Export Schema Options</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                        <p className="font-medium">JSON Format</p>
                        <p className="text-sm text-muted-foreground">
                            Export as JSON schema
                        </p>
                    </div>
                    <Button size="sm">Select</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                        <p className="font-medium">XML Format</p>
                        <p className="text-sm text-muted-foreground">
                            Export as XML schema
                        </p>
                    </div>
                    <Button size="sm" variant="outline">
                        Select
                    </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                        <p className="font-medium">YAML Format</p>
                        <p className="text-sm text-muted-foreground">
                            Export as YAML schema
                        </p>
                    </div>
                    <Button size="sm" variant="outline">
                        Select
                    </Button>
                </div>
            </div>
        </div>
    </div>
);

const DownloadPNGContent = () => (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">PNG Export Settings</h3>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Resolution</label>
                    <select className="w-full p-2 border rounded-md">
                        <option>1024x768 (Default)</option>
                        <option>1920x1080 (HD)</option>
                        <option>2560x1440 (2K)</option>
                        <option>3840x2160 (4K)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Background Color
                    </label>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                            White
                        </Button>
                        <Button size="sm" variant="outline">
                            Black
                        </Button>
                        <Button size="sm" variant="outline">
                            Transparent
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Quality</label>
                    <input
                        type="range"
                        min="50"
                        max="100"
                        defaultValue="90"
                        className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">90% quality</p>
                </div>
            </div>
        </div>
    </div>
);

const DeleteNodeContent = () => (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Delete Node</h3>
            <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <div className="flex items-center gap-2 mb-2">
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <p className="font-medium text-destructive">Warning</p>
                </div>
                <p className="text-sm text-muted-foreground">
                    This action will permanently delete the selected node(s) and
                    cannot be undone.
                </p>
            </div>
            <div className="space-y-2">
                <p className="text-sm font-medium">Selected nodes:</p>
                <div className="p-2 bg-muted rounded border">
                    <p className="text-sm">• Node 1: Start Node</p>
                    <p className="text-sm">• Node 2: Process Node</p>
                </div>
            </div>
            <div className="flex gap-2 pt-4">
                <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                </Button>
                <Button variant="outline" size="sm">
                    Cancel
                </Button>
            </div>
        </div>
    </div>
);

const OpenSettingsContent = () => (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Application Settings</h3>
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="aspect-video max-w-3xl rounded-xl bg-muted/50 flex items-center justify-center"
                >
                    <p className="text-muted-foreground">
                        Settings Panel {i + 1}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

// Content renderer based on type
const renderContent = (contentType: DialogContentType) => {
    switch (contentType) {
        case "exportSchema":
            return <ExportSchemaContent />;
        case "downloadPNG":
            return <DownloadPNGContent />;
        case "deleteNode":
            return <DeleteNodeContent />;
        case "openSettings":
            return <OpenSettingsContent />;
        default:
            return <OpenSettingsContent />;
    }
};

// Title and breadcrumb text based on content type
const getDialogInfo = (contentType: DialogContentType) => {
    const info = {
        exportSchema: {
            title: "Export Schema",
            breadcrumb: "Export Schema",
            description: "Configure schema export settings",
        },
        downloadPNG: {
            title: "Download PNG",
            breadcrumb: "Download PNG",
            description: "Configure PNG export settings",
        },
        deleteNode: {
            title: "Delete Node",
            breadcrumb: "Delete Node",
            description: "Confirm node deletion",
        },
        openSettings: {
            title: "Settings",
            breadcrumb: "Settings",
            description: "Customize your application settings",
        },
    };
    return info[contentType];
};

export function SettingsDialog({
    open,
    onOpenChange,
    contentType,
}: SettingsDialogProps) {
    const [activeSection, setActiveSection] = React.useState(0);
    const dialogInfo = getDialogInfo(contentType);
    const navigation = navigationData[contentType];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
                <DialogTitle className="sr-only">
                    {dialogInfo.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                    {dialogInfo.description}
                </DialogDescription>
                <SidebarProvider className="items-start">
                    <Sidebar collapsible="none" className="hidden md:flex">
                        <SidebarContent className="mt-8">
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {navigation.map((item, index) => (
                                            <SidebarMenuItem key={item.name}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={
                                                        activeSection === index
                                                    }
                                                    onClick={() =>
                                                        setActiveSection(index)
                                                    }
                                                >
                                                    <a
                                                        href="#"
                                                        onClick={(e) =>
                                                            e.preventDefault()
                                                        }
                                                    >
                                                        <item.icon />
                                                        <span>{item.name}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                    <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href="#">
                                                Settings
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>
                                                {dialogInfo.breadcrumb}
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        </header>
                        {renderContent(contentType)}
                    </main>
                </SidebarProvider>
            </DialogContent>
        </Dialog>
    );
}
