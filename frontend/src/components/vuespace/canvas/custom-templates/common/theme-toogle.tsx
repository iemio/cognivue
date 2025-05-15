import { Button } from "@/components/ui/button";
import { RiMoonClearLine, RiSunLine } from "@remixicon/react";
import { useTheme } from "next-themes";
import React, { useState } from "react";

const ThemeToggleButton = () => {
    const { theme, setTheme } = useTheme();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [system, setSystem] = useState(false);

    const smartToggle = () => {
        const prefersDarkScheme = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        if (theme === "system") {
            setTheme(prefersDarkScheme ? "light" : "dark");
            setSystem(false);
        } else if (
            (theme === "light" && !prefersDarkScheme) ||
            (theme === "dark" && prefersDarkScheme)
        ) {
            setTheme(theme === "light" ? "dark" : "light");
            setSystem(false);
        } else {
            setTheme("system");
            setSystem(true);
        }
    };
    return (
        <Button
            variant="outline"
            size="icon"
            className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card cursor-pointer"
            onClick={smartToggle}
            aria-label="Fit view"
        >
            <RiSunLine className="dark:hidden size-5" aria-hidden="true" />
            <RiMoonClearLine
                className="hidden dark:block size-5"
                aria-hidden="true"
            />
        </Button>
    );
};

export default ThemeToggleButton;
