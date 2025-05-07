import React from "react";
import { FiTrash2 } from "react-icons/fi";

interface DeleteButtonProps {
    selectedCount: number;
    onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    selectedCount,
    onDelete,
}) => {
    if (!selectedCount) return null;
    return (
        <button
            onClick={onDelete}
            disabled={selectedCount === 0}
            className={`rounded px-2.5 py-1.5 text-sm text-red-300 backdrop-blur-sm transition-colors flex flex-row gap-2 items-center cursor-pointer mb-4 float-right border
                ${
                    selectedCount > 0
                        ? "bg-red-300/20 hover:bg-red-600 hover:text-red-200 border-red-300/30"
                        : "bg-red-300/10 text-red-300/50 border-red-300/20 cursor-not-allowed"
                }`}
        >
            <FiTrash2 />
            Delete
            {selectedCount > 0 && (
                <span className="bg-red-300/20 text-red-300/70 -me-1 inline-flex h-5 max-h-full items-center rounded px-1 font-[inherit] text-[0.675rem] font-medium border">
                    {selectedCount}
                </span>
            )}
        </button>
    );
};

export default DeleteButton;
