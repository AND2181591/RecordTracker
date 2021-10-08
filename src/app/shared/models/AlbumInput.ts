import { Album } from "./Album";

export interface AlbumInput {
    selectedAlbum: Album;
    orderType: string;
    variant?: string;
    trackingNum?: string;
    date?: Date;
}