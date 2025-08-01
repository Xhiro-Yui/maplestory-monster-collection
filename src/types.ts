export interface MonColProperties {
    category: string;
    page: number;
    line?: number;
}

export interface Metadata {
    imageUrl?: string;
}

export interface MobData {
    mobId: number;
    name: string;
    category: string;
    type: number;
    starRank: number;
    mobLevel: string;
    difficultyRating: number;
    location: string;
    monColProperties: MonColProperties;
    metadata?: Metadata;
}
