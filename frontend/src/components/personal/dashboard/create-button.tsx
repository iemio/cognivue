import React from "react";
import { PiPackageThin } from "react-icons/pi";
import { FiChevronRight } from "react-icons/fi";

interface CreateButtonProps {
    onDelete?: () => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({ onDelete }) => {
    return (
        <button
            onClick={onDelete}
            className="group flex items-center gap-2 w-auto rounded px-3 py-2.5 text-sm backdrop-blur-sm text-blue-300 transition-colors cursor-pointer border bg-blue-300/20 hover:bg-blue-600 hover:text-blue-200 border-blue-300/30 mb-5.5"
        >
            <PiPackageThin size={20} />
            Start from a configuration file
            <FiChevronRight className="opacity-0 group-hover:opacity-100 transform transition-transform duration-300 -translate-x-1.5 group-hover:translate-x-0" />
        </button>
    );
};

export default CreateButton;
