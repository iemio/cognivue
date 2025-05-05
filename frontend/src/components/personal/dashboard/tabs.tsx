import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TodoItem, Todos, useTodoHandlers } from "./todo";
import { useState } from "react";
import Form from "./form";
// import TableComponent from "./table";

function TabsComponent() {
    const [todos, setTodos] = useState<TodoItem[]>([
        {
            id: "1",
            text: "Take out trash",
            checked: false,
            time: "5 mins",
        },
        {
            id: "2",
            text: "Do laundry",
            checked: false,
            time: "10 mins",
        },
        {
            id: "3",
            text: "Have existential crisis",
            checked: true,
            time: "12 hrs",
        },
    ]);
    const { handleCheck, removeElement } = useTodoHandlers(setTodos);
    return (
        <Tabs defaultValue="tab-1">
            <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0 mt-2">
                <TabsTrigger
                    value="tab-1"
                    className="cursor-pointer relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
                >
                    All
                </TabsTrigger>
                <TabsTrigger
                    value="tab-2"
                    className="cursor-pointer relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
                >
                    Vues
                </TabsTrigger>
                <TabsTrigger
                    value="tab-3"
                    className="cursor-pointer relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
                >
                    Folders
                </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1" className="mt-7">
                <Todos
                    todos={todos}
                    handleCheck={handleCheck}
                    removeElement={removeElement}
                />
                <Form setTodos={setTodos} />
                {/* <TableComponent /> */}
                {/* <p className="p-4 text-center text-xs text-muted-foreground">
                    Content for Tab 2
                </p> */}
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
