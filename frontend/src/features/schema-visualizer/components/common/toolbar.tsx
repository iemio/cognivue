import { Button } from "@/components/ui/button";
import { Panel } from "@xyflow/react";
import React from "react";
import { Box, Spline, Frame, Command } from "lucide-react";
import {
    Toolbar,
    type ToolbarItem,
} from "@/components/vuespace/canvas/custom-templates/common/ui/toolbar-dynamic";
const TOOLBAR_ITEMS: ToolbarItem[] = [
    {
        id: 1,
        label: "Nodes",
        icon: <Box className="h-5 w-5" />,
        content: (
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-1 text-muted-foreground">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-400" />
                    <span>Ibelick</span>
                </div>
                <Button variant="outline" size="sm">
                    Edit Profile
                </Button>
            </div>
        ),
    },
    {
        id: 2,
        label: "Edges",
        icon: <Spline className="h-5 w-5" />,
        content: (
            <div className="flex flex-col space-y-4">
                <div className="text-muted-foreground">
                    You have 3 new messages.
                </div>
                <Button variant="outline" size="sm">
                    View more
                </Button>
            </div>
        ),
    },
    {
        id: 3,
        label: "Backgrounds",
        icon: <Frame className="h-5 w-5" />,
        content: (
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col text-muted-foreground">
                    <div className="space-y-1">
                        <div>Project_Proposal.pdf</div>
                        <div>Meeting_Notes.docx</div>
                        <div>Financial_Report.xls</div>
                    </div>
                </div>
                <Button variant="outline" size="sm">
                    Manage documents
                </Button>
            </div>
        ),
    },
    {
        id: 4,
        label: "Controls",
        icon: <Command className="h-5 w-5" />,
        content: (
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col text-muted-foreground">
                    <span>Current Balance</span>
                    <span>$1,250.32</span>
                </div>
                <Button variant="outline" size="sm">
                    View Transactions
                </Button>
            </div>
        ),
    },
];

const ToolPanel = () => {
    return (
        <Panel
            position="bottom-center"
            className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse"
        >
            <Toolbar items={TOOLBAR_ITEMS} />
        </Panel>
    );
};

export default ToolPanel;
