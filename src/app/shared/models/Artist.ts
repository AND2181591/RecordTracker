import { Album } from "./Album";

export interface Artist {
    id: number;
    name: string;
    images: [{
        url: string;
    }];
    albums: Album[];
}