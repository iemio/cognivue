import { useTheme } from "next-themes";
import React, { CSSProperties } from "react";

const boxStyle: CSSProperties = {
    background: "#eee",
    position: "relative",
    width: "100%",
    flex: 1,
    height: "24px", // Add some height so it is visible
    borderRadius: "4px",
};

export default function Placeholder() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const bgColor = isDark ? "#141414" : "white";

    return (
        <div
            className="p-3 flex flex-col gap-2 rounded-md h-full relative z-10"
            style={{ backgroundColor: bgColor }}
        >
            <div style={boxStyle} />
            <div style={boxStyle} />
            <div style={boxStyle} />
            <div style={boxStyle} />
            <div style={boxStyle} />
            <div style={boxStyle} />
        </div>
    );
}
