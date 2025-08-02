import React from "react";
import SidebarFilter from "./SidebarFilter.tsx";
import SidebarSorter from "./SidebarSorter.tsx";

type SidebarProps = {
    onSortChange: (option: string | null) => void;
    currentSort: string | null;
};

const Sidebar: React.FC<SidebarProps> = ({ onSortChange, currentSort  }) => {
    return (
        <div className="w-64 p-4 bg-white rounded shadow-md space-y-6">
            <SidebarFilter />
            <SidebarSorter onSortChange={onSortChange} currentSort={currentSort} />
        </div>
    );
};

export default Sidebar;
