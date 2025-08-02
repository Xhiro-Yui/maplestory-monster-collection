import React from "react";

type SidebarSorterProps = {
    onSortChange: (option: string | null) => void;
    currentSort: string | null; // 👈 add this prop
};

const SidebarSorter: React.FC<SidebarSorterProps> = ({ onSortChange, currentSort }) => {
    const sortOptions = [
        "location",
        "mobLevel",
        "difficultyRating",
        "category",
        "type",
    ];

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Sort</h3>
            <ul className="space-y-1">
                {sortOptions.map((option) => {
                    const isActive = currentSort === option;

                    return (
                        <li
                            key={option}
                            className={`cursor-pointer px-2 py-1 rounded capitalize transition-colors ${
                                isActive
                                    ? "bg-blue-500 text-white font-semibold"
                                    : "hover:bg-blue-100"
                            }`}
                            onClick={() =>
                                onSortChange(isActive ? null : option) // toggle
                            }
                        >
                            Sort by {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SidebarSorter;
