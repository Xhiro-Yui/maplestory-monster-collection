import { useEffect, useState } from "react";
import MobCard from "./components/MobCard.tsx";

interface MobEntry {
    mobId: number;
    name: string;
    category: string;
    type: number;
    starRank: number;
    mobLevel: string;
    difficultyRating: number;
    location: string;
    monColProperties: {
        category: string;
        page: number;
        line: number;
    };
    metadata?: {
        imageUrl?: string;
    };
}

const STORAGE_KEY = "mob-checklist";

const App = () => {
    const [mobData, setMobData] = useState<MobEntry[]>([]);
    const [checklist, setChecklist] = useState<Set<number>>(new Set());

    // Load mob data and checklist from localStorage
    useEffect(() => {
        fetch("/data/v242.json")
            .then((res) => res.json())
            .then((json) => {
                const data: MobEntry[] = json.mobData || [];
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
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">
                Monster Collection 📦
            </h1>
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
        </div>
    );
};

export default App;
