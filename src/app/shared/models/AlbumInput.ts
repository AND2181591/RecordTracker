import { Album } from "./Album";

export interface AlbumInput {
    selectedAlbum: Album;
    orderType: string;
    trackingNum?: string;
    date?: Date;
}