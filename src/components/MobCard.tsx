import React from "react";
import type {MobData} from "../types";

type MobCardProps = {
    mob: MobData;
    checked: boolean;
    onToggle: () => void;
};

const MobCard: React.FC<MobCardProps> = ({mob, checked, onToggle}) => {
    return (
        <div
            onClick={onToggle}
            className={`flex p-4 rounded-2xl border shadow-md max-w-full mx-auto cursor-pointer transition-all duration-150 ${
                checked
                    ? "bg-green-100 border-green-400"
                    : "bg-white hover:shadow-lg hover:bg-gray-50"
            }`}
            style={{ height: "240px", width:"450px", minWidth: "0" }}
        >
            <div
                className="w-32 h-32 border-2 border-black rounded-xl flex items-center justify-center overflow-hidden mr-4">
                {mob.metadata?.imageUrl && (
                    <img
                        src={mob.metadata.imageUrl}
                        alt={mob.name}
                        className="object-contain max-h-full max-w-full"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                )}
            </div>

            <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col justify-between flex-1">
                    <div className="mb-2">
                        <h2 className="text-lg font-semibold leading-tight break-words mb-1">
                            {mob.name}
                        </h2>
                        <p className="text-sm text-gray-600">{mob.location}</p>
                        <p className="text-xs text-gray-500 italic">
                            Collection: {mob.monColProperties.category} (Page {mob.monColProperties.page})
                        </p>
                    </div>

                    <div className="text-xs text-gray-700 flex flex-col gap-0.5">
                        <p>
                            <span className="font-medium">Mob Category:</span> {mob.category}
                        </p>
                        <p>
                            <span className="font-medium">Type:</span> {mob.type}
                        </p>
                        <p>
                            <span className="font-medium">Star Rank:</span> {mob.starRank}
                        </p>
                        <p>
                            <span className="font-medium">Level Range:</span> {mob.mobLevel}
                        </p>
                        <p>
                            <span className="font-medium">Difficulty:</span> {mob.difficultyRating}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MobCard;
