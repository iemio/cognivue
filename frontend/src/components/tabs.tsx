import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableComponent from "./table";

function TabsComponent() {
    return (
        <Tabs defaultValue="tab-1">
            <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0">
                <TabsTrigger
                    value="tab-1"
                    className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
                >
                    All
                </TabsTrigger>
                <TabsTrigger
                    value="tab-2"
                    className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
                >
                    Recents
                </TabsTrigger>
                <TabsTrigger
                    value="tab-3"
                    className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
                >
                    Folders
                </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1">
                {/* <p className="p-4 text-center text-xs text-muted-foreground"> */}
                <TableComponent />
                {/* </p> */}
            </TabsContent>
            <TabsContent value="tab-2">
                <p className="p-4 text-center text-xs text-muted-foreground">
                    Content for Tab 2
                </p>
            </TabsContent>
            <TabsContent value="tab-3">
                <p className="p-4 text-center text-xs text-muted-foreground">
                    Content for Tab 3
                </p>
            </TabsContent>
        </Tabs>
    );
}

export default TabsComponent;
