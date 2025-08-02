import React from "react";

const locations = ["All", "Ludibrium", "Victoria Island"];
const levels = [
    {label: "1-30", min: 1, max: 30},
    {label: "31-100", min: 31, max: 100},
    {label: "101-300", min: 101, max: 300},
];

const SidebarFilter: React.FC = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Filter</h3>

            <div className="mb-4">
                <h4 className="font-medium mb-1">By Location</h4>
                <ul className="space-y-1">
                    {locations.map((loc) => (
                        <li
                            key={loc}
                            className="cursor-pointer px-2 py-1 rounded hover:bg-blue-100"
                            onClick={() => {
                                console.log(`Filter: ${loc}`);
                            }}
                        >
                            {loc}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="font-medium mb-1">By Mob Level</h4>
                <ul className="space-y-1">
                    {levels.map((range) => (
                        <li
                            key={range.label}
                            className="cursor-pointer px-2 py-1 rounded hover:bg-blue-100"
                            onClick={() => {
                                console.log(`Filter: ${range.label}`);
                            }}
                        >
                            {range.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SidebarFilter;
