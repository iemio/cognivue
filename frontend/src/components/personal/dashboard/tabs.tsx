"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TodoItem, Todos } from "./todo";
import { useState } from "react";
import DeleteButton from "./delete-button";
import Form from "./form";

// Instead of importing Form, let's assume it's a component that adds new todos
// and we'll just import it as a reference

function TabsComponent() {
    const [todos, setTodos] = useState<TodoItem[]>([
        {
            id: "1",
            text: "Take out trash",
            time: "5 mins",
        },
        {
            id: "2",
            text: "Do laundry",
            time: "10 mins",
        },
        {
            id: "3",
            text: "Have existential crisis",
            time: "12 hrs",
        },
    ]);

    // State to track selected todos
    const [selectedTodos, setSelectedTodos] = useState<string[]>([]);

    // Get base todo handlers

    // Selection toggle handler
    const toggleSelection = (id: string) => {
        setSelectedTodos((prev) =>
            prev.includes(id)
                ? prev.filter((todoId) => todoId !== id)
                : [...prev, id]
        );
    };

    // Function to handle bulk delete
    const handleBulkDelete = () => {
        if (selectedTodos.length > 0) {
            // Remove all selected todos from the list
            setTodos((prev) =>
                prev.filter((todo) => !selectedTodos.includes(todo.id))
            );
            setSelectedTodos([]); // Clear selection after delete
        }
    };

    return (
        <Tabs defaultValue="tab-1">
            <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0 mt-2">
                <TabsTrigger
                    value="tab-1"
                    className="cursor-pointer relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
                >
                    Boards
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
                <DeleteButton
                    selectedCount={selectedTodos.length}
                    onDelete={handleBulkDelete}
                />
                <Todos
                    todos={todos}
                    selectedTodos={selectedTodos}
                    toggleSelection={toggleSelection}
                />
                {/* Form component would be here */}
                <Form setTodos={setTodos} />
            </TabsContent>
            <TabsContent value="tab-2">
                <p className="p-4 text-center text-xs text-muted-foreground">
                    Content for Tab 2
                </p>
            </TabsContent>
            <TabsContent value="tab-3">
                <p className="p-4 text-center text-xs text-muted-foreground">
                    This feature will come soon.
                </p>
            </TabsContent>
        </Tabs>
    );
}

export default TabsComponent;
