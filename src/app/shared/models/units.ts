export interface Unit {
    id: number;
    name: string;
    description: string;
    expansion: string;
    age: string;
    cost: Cost | null;
    build_time?: number;
    reload_time?: number;
    attack_delay?: number;
    movement_rate?: number;
    line_of_sight: number;
    hit_points: number;
    range?: number | string;
    attack?: number;
    armor: string;
    accuracy?: string;
    attack_bonus?: string[];
    search_radius?: number;
    blast_radius?: number;
    armor_bonus?: string[];
}

export enum Age {
    Castle = "Castle",
    Dark = "Dark",
    Feudal = "Feudal",
    Imperial = "Imperial",
}

export interface Cost {
    Wood?: number;
    Gold?: number;
    Food?: number;
}

export enum Expansion {
    AgeOfKings = "Age of Kings",
    TheConquerors = "The Conquerors",
}