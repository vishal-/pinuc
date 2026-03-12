export interface Location {
    id: string;
    name: string;
    slug: string;
    providerCount: number;
}

export const locations: Location[] = [
    {
        id: "loc1",
        name: "Dwarka",
        slug: "dwarka-delhi",
        providerCount: 12
    },
    {
        id: "loc2",
        name: "Rohini",
        slug: "rohini-delhi",
        providerCount: 10
    },
    {
        id: "loc3",
        name: "Saket",
        slug: "saket-delhi",
        providerCount: 11
    },
    {
        id: "loc4",
        name: "Gurgaon",
        slug: "gurgaon-delhi",
        providerCount: 8
    },
    {
        id: "loc5",
        name: "Noida",
        slug: "noida-delhi",
        providerCount: 7
    }
];
