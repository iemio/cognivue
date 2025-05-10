// CommandMenu.tsx
import React from "react";

const commands = [
    { name: "Heading 1", command: "heading-1" },
    { name: "Bullet List", command: "bullet-list" },
    { name: "Numbered List", command: "number-list" },
    { name: "Code Block", command: "code-block" },
];

const CommandMenu = ({ position, onSelect }: any) => {
    return (
        <div
            className="command-menu"
            style={{ top: position.y, left: position.x }}
        >
            {commands.map((item) => (
                <div
                    key={item.command}
                    className="command-item"
                    onClick={() => onSelect(item.command)}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default CommandMenu;
