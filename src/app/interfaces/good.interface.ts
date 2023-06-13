export interface Good {
    mainPrice: number;
    oldPrice?: number;
    description: string;
    category: string;
    id: string;
    name?: string;
    subcategory?: string[];
    img: string;
}