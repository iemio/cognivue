"use client";

import * as React from "react";

export function useMediaQuery() {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        // Check if window is defined (client-side)
        if (typeof window !== "undefined") {
            const checkIfMobile = () => {
                setIsMobile(window.innerWidth < 768);
            };

            // Initial check
            checkIfMobile();

            // Add event listener for window resize
            window.addEventListener("resize", checkIfMobile);

            // Clean up
            return () => {
                window.removeEventListener("resize", checkIfMobile);
            };
        }
    }, []);

    return { isMobile };
}
