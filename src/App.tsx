import { useEffect, useState } from "react";
import MobCard from "./components/MobCard.tsx";
import Sidebar from "./components/sidebar/Sidebar";
import type {MobData} from "./types.ts";

const STORAGE_KEY = "mob-checklist";

const App = () => {
    const [mobData, setMobData] = useState<MobData[]>([]);
    const [checklist, setChecklist] = useState<Set<number>>(new Set());
    const [sortOption, setSortOption] = useState<string | null>(null);

    const groupMobs = (data: MobData[], key: keyof MobData) => {
        const grouped: { [group: string]: MobData[] } = {};
        for (const mob of data) {
            const group = String(mob[key] ?? "Unknown");
            if (!grouped[group]) grouped[group] = [];
            grouped[group].push(mob);
        }
        return grouped;
    };

    // Load mob data and checklist from localStorage
    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data/v243-1.json`)
            .then((res) => res.json())
            .then((json) => {
                const data: MobData[] = json.mobData || [];
                setMobData(data);
            });

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed: number[] = JSON.parse(saved);
                setChecklist(new Set(parsed));
            } catch (e) {
                console.error("Failed to parse checklist from localStorage", e);
            }
        }
    }, []);

    // Toggle mob checkbox
    const toggleCheck = (mobId: number) => {
        const updated = new Set(checklist);
        if (updated.has(mobId)) {
            updated.delete(mobId);
        } else {
            updated.add(mobId);
        }
        setChecklist(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated]));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar on the left */}
            <Sidebar
                onSortChange={setSortOption}
                currentSort={sortOption}
            />

            {/* Main content */}
            <div className="flex-1 p-4">
                <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-x-4">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/derpcol.webp`}
                        alt="Derp Mon Col"
                        className="w-32 h-32"
                    />
                    Monster Collection
                    <img
                        src={`${import.meta.env.BASE_URL}assets/derpcol.webp`}
                        alt="Derp Mon Col"
                        className="w-32 h-32"
                    />

                </h1>

                {sortOption ? (
                    Object.entries(groupMobs(mobData, sortOption as keyof MobData)).map(([group, mobs]) => (
                        <div key={group} className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">{group}</h2>
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {mobs.map((mob) => (
                                    <MobCard
                                        key={mob.mobId}
                                        mob={mob}
                                        checked={checklist.has(mob.mobId)}
                                        onToggle={() => toggleCheck(mob.mobId)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {mobData.map((mob) =>
                            mob?.mobId !== undefined ? (
                                <MobCard
                                    key={mob.mobId}
                                    mob={mob}
                                    checked={checklist.has(mob.mobId)}
                                    onToggle={() => toggleCheck(mob.mobId)}
                                />
                            ) : null
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
