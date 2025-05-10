export const transformOptions = (
    options: string[],
    iconMap?: Record<string, React.ComponentType<{ className?: string }>>
) =>
    options.map((value) => ({
        label: value
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        value: value,
        icon: iconMap ? iconMap[value] : undefined,
    }));

// Converts an ENUM-styled string ("CREATE_FILE") to a more readable format ("CREATE FILE").
export const transformStatusEnum = (status: string): string => {
    return status.replace(/_/g, " ");
};

// Converts a readable string ("Create File") to an ENUM format ("CREATE_FILE").
export const formatStatusToEnum = (status: string): string => {
    return status.toUpperCase().replace(/\s+/g, "_");
};
