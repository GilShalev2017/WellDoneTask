export interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
}

export interface Category {
    name: string;
    // color: string;
}

export interface Location {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    category: string[];
}

export enum StorageKeys {
    Locations,
    Categories
}
